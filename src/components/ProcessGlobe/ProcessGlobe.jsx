import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../animations/config'

const POINTS = [
  { lat: 37.8, lon: -122.4, id: '01' },
  { lat: 51.5, lon: 0.1, id: '02' },
  { lat: 25.2, lon: 55.3, id: '03' },
  { lat: -33.9, lon: 151.2, id: '04' },
]

const DEG = Math.PI / 180
const LINE = 'rgba(255, 255, 255, 0.28)'
const INK = '#14182e'
const DOT = '#ffffff'
const DOT_ACTIVE = '#fe4e46'

function project(lat, lon, radius, rotY, rotX) {
  const phi = (90 - lat) * DEG
  const theta = (lon + rotY) * DEG
  let x = radius * Math.sin(phi) * Math.sin(theta)
  let y = radius * Math.cos(phi)
  let z = radius * Math.sin(phi) * Math.cos(theta)
  const cx = Math.cos(rotX * DEG)
  const sx = Math.sin(rotX * DEG)
  const y2 = y * cx - z * sx
  const z2 = y * sx + z * cx
  return { x, y: y2, z: z2 }
}

export function ProcessGlobe({ active = 0 }) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return undefined

    const ctx = canvas.getContext('2d')
    const reduced = prefersReducedMotion()
    const rot = { y: -POINTS[0].lon, x: POINTS[0].lat * 0.28 }
    let pulse = 0
    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const drawMeridian = (lon, radius, rotY, rotX, cx, cy) => {
      ctx.beginPath()
      let started = false
      for (let lat = -90; lat <= 90; lat += 3) {
        const p = project(lat, lon, radius, rotY, rotX)
        const sx = cx + p.x
        const sy = cy + p.y
        if (!started) {
          ctx.moveTo(sx, sy)
          started = true
        } else ctx.lineTo(sx, sy)
      }
      ctx.strokeStyle = LINE
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const drawParallel = (lat, radius, rotY, rotX, cx, cy) => {
      ctx.beginPath()
      let started = false
      for (let lon = 0; lon <= 360; lon += 4) {
        const p = project(lat, lon, radius, rotY, rotX)
        const sx = cx + p.x
        const sy = cy + p.y
        if (!started) {
          ctx.moveTo(sx, sy)
          started = true
        } else ctx.lineTo(sx, sy)
      }
      ctx.closePath()
      ctx.strokeStyle = lat === 0 ? 'rgba(254, 78, 70, 0.5)' : LINE
      ctx.lineWidth = lat === 0 ? 1.15 : 1
      ctx.stroke()
    }

    const draw = (time) => {
      const idx = activeRef.current
      const target = POINTS[idx] || POINTS[0]
      const ty = -target.lon
      const tx = target.lat * 0.28
      const ease = reduced ? 1 : 0.055
      rot.y += (ty - rot.y) * ease
      rot.x += (tx - rot.x) * ease
      pulse = time * 0.0024

      const cx = width / 2
      const cy = height / 2
      const radius = Math.min(width, height) * 0.38

      ctx.clearRect(0, 0, width, height)

      ctx.beginPath()
      ctx.arc(cx, cy, radius + 18, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(254, 78, 70, 0.06)'
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = INK
      ctx.fill()

      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()

      for (let lon = 0; lon < 180; lon += 15) {
        drawMeridian(lon, radius, rot.y, rot.x, cx, cy)
      }
      for (let lat = -75; lat <= 75; lat += 15) {
        drawParallel(lat, radius, rot.y, rot.x, cx, cy)
      }

      const plotted = POINTS.map((pt, i) => {
        const p = project(pt.lat, pt.lon, radius, rot.y, rot.x)
        return { ...pt, ...p, i }
      }).sort((a, b) => a.z - b.z)

      plotted.forEach((pt) => {
        const onFront = pt.z > -radius * 0.08
        const isActive = pt.i === idx
        const sx = cx + pt.x
        const sy = cy + pt.y
        const size = isActive ? 5.5 : 3.2
        const alpha = onFront ? 1 : 0.28

        if (isActive) {
          const ring = 12 + Math.sin(pulse) * 5
          ctx.beginPath()
          ctx.arc(sx, sy, ring, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(254, 78, 70, ${0.32 * alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(sx, sy, ring + 8, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.16 * alpha})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = isActive ? DOT_ACTIVE : DOT
        ctx.globalAlpha = alpha
        ctx.fill()
        ctx.globalAlpha = 1

        if (onFront || isActive) {
          ctx.font = '500 10px Inter, system-ui, sans-serif'
          ctx.fillStyle = isActive ? DOT_ACTIVE : 'rgba(196, 199, 214, 0.85)'
          ctx.letterSpacing = '0.16em'
          ctx.fillText(pt.id, sx + 10, sy - 8)
        }
      })

      ctx.restore()

      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.32)'
      ctx.lineWidth = 1.2
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(cx - radius * 0.28, cy - radius * 0.32, radius * 0.72, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
      ctx.lineWidth = 40
      ctx.stroke()

      raf = window.requestAnimationFrame(draw)
    }

    resize()
    raf = window.requestAnimationFrame(draw)
    const observer = new ResizeObserver(resize)
    observer.observe(wrap)
    window.addEventListener('resize', resize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="process-globe" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  )
}
