import { useEffect, useRef } from 'react'
import { prefersReducedMotion, isFinePointer } from '../../animations/config'

const STEP_PART = {
  0: ['sensors'],
  1: ['radar'],
  2: ['comms'],
  3: ['hull', 'propulsion'],
}

function v(x, y, z) {
  return { x, y, z }
}

function rotate(p, yaw, pitch) {
  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const x1 = p.x * cy + p.z * sy
  const z1 = -p.x * sy + p.z * cy
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)
  return {
    x: x1,
    y: p.y * cp - z1 * sp,
    z: p.y * sp + z1 * cp,
  }
}

function project(p, cx, cy, fov) {
  const z = p.z + 5.4
  const s = fov / Math.max(0.6, z)
  return { x: cx + p.x * s, y: cy - p.y * s, z }
}

function path(ctx, pts) {
  ctx.beginPath()
  pts.forEach((pt, i) => (i ? ctx.lineTo(pt.x, pt.y) : ctx.moveTo(pt.x, pt.y)))
  ctx.closePath()
}

export function UsvModel({ active = 0 }) {
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
    const fine = isFinePointer()
    const rot = { yaw: 0.55, pitch: 0.32, targetYaw: 0.55, targetPitch: 0.32 }
    let drag = false
    let lastX = 0
    let lastY = 0
    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, Math.floor(rect.width))
      h = Math.max(1, Math.floor(rect.height))
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const xf = (p, yaw, pitch, cx, cy, fov) =>
      project(rotate(p, yaw, pitch), cx, cy, fov)

    const draw = (time) => {
      const idx = activeRef.current
      const hot = STEP_PART[idx] || ['hull']
      if (!drag && !reduced) {
        rot.targetYaw = 0.42 + idx * 0.38 + Math.sin(time * 0.00035) * 0.08
        rot.targetPitch = 0.28 + Math.sin(time * 0.00022) * 0.04
      }
      rot.yaw += (rot.targetYaw - rot.yaw) * (reduced ? 1 : 0.06)
      rot.pitch += (rot.targetPitch - rot.pitch) * (reduced ? 1 : 0.06)

      const cx = w * 0.5
      const cy = h * 0.54
      const fov = Math.min(w, h) * 0.92

      ctx.clearRect(0, 0, w, h)

      ctx.fillStyle = 'rgba(31, 40, 83, 0.4)'
      ctx.beginPath()
      ctx.ellipse(cx, cy + 28, Math.min(w, h) * 0.42, Math.min(w, h) * 0.12, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = 'rgba(254, 78, 70, 0.22)'
      ctx.stroke()

      const map = (pts) => pts.map((p) => xf(p, rot.yaw, rot.pitch, cx, cy, fov))
      const glow = (name) => (hot.includes(name) ? '#fe4e46' : 'rgba(255, 255, 255, 0.72)')
      const fill = (name) =>
        hot.includes(name) ? 'rgba(254, 78, 70, 0.5)' : 'rgba(31, 40, 83, 0.94)'

      const keel = map([
        v(1.38, -0.02, 0),
        v(0.55, -0.16, 0.18),
        v(-1.12, -0.08, 0.16),
        v(-1.12, -0.08, -0.16),
        v(0.55, -0.16, -0.18),
      ])
      ctx.fillStyle = fill('hull')
      ctx.strokeStyle = glow('hull')
      ctx.lineWidth = hot.includes('hull') ? 1.8 : 1
      path(ctx, keel)
      ctx.fill()
      ctx.stroke()

      const hull = map([
        v(1.42, 0.16, 0),
        v(0.62, 0.24, 0.32),
        v(-0.15, 0.24, 0.36),
        v(-1.18, 0.18, 0.28),
        v(-1.18, 0.18, -0.28),
        v(-0.15, 0.24, -0.36),
        v(0.62, 0.24, -0.32),
      ])
      ctx.fillStyle = fill('hull')
      path(ctx, hull)
      ctx.fill()
      ctx.stroke()

      const deck = map([
        v(1.12, 0.26, 0),
        v(0.5, 0.3, 0.22),
        v(-0.95, 0.28, 0.18),
        v(-0.95, 0.28, -0.18),
        v(0.5, 0.3, -0.22),
      ])
      ctx.fillStyle = 'rgba(20, 24, 46, 0.78)'
      path(ctx, deck)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)'
      ctx.stroke()

      const prop = map([v(-1.28, -0.02, 0), v(-1.42, -0.02, 0), v(-1.42, 0.08, 0)])
      ctx.strokeStyle = glow('propulsion')
      ctx.lineWidth = hot.includes('propulsion') ? 2.4 : 1.2
      ctx.beginPath()
      ctx.moveTo(prop[0].x, prop[0].y)
      ctx.lineTo(prop[1].x, prop[1].y)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(prop[1].x, prop[1].y, hot.includes('propulsion') ? 7 : 5, 0, Math.PI * 2)
      ctx.stroke()

      const mastBase = xf(v(0.12, 0.3, 0), rot.yaw, rot.pitch, cx, cy, fov)
      const mastTop = xf(v(0.12, 0.92, 0), rot.yaw, rot.pitch, cx, cy, fov)
      ctx.strokeStyle = glow('sensors')
      ctx.lineWidth = hot.includes('sensors') ? 3 : 1.6
      ctx.beginPath()
      ctx.moveTo(mastBase.x, mastBase.y)
      ctx.lineTo(mastTop.x, mastTop.y)
      ctx.stroke()

      const camera = xf(v(0.28, 0.58, 0), rot.yaw, rot.pitch, cx, cy, fov)
      ctx.fillStyle = hot.includes('sensors') ? '#fe4e46' : '#ffffff'
      ctx.beginPath()
      ctx.arc(camera.x, camera.y, 4.5, 0, Math.PI * 2)
      ctx.fill()

      const radar = xf(v(0.12, 1.02, 0), rot.yaw, rot.pitch, cx, cy, fov)
      ctx.strokeStyle = glow('radar')
      ctx.lineWidth = hot.includes('radar') ? 2 : 1
      ctx.beginPath()
      ctx.arc(radar.x, radar.y, hot.includes('radar') ? 16 : 12, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(radar.x, radar.y, 4, 0, Math.PI * 2)
      ctx.fillStyle = hot.includes('radar') ? '#fe4e46' : '#1f2853'
      ctx.fill()

      if (hot.includes('radar') && !reduced) {
        const sweep = ((time * 0.0018) % 1) * Math.PI * 2
        ctx.strokeStyle = 'rgba(254, 78, 70, 0.45)'
        ctx.beginPath()
        ctx.arc(radar.x, radar.y, 28, sweep, sweep + 0.7)
        ctx.stroke()
      }

      const antA = xf(v(-0.18, 0.78, 0.08), rot.yaw, rot.pitch, cx, cy, fov)
      const antB = xf(v(-0.18, 0.78, -0.08), rot.yaw, rot.pitch, cx, cy, fov)
      const antBase = xf(v(-0.18, 0.3, 0), rot.yaw, rot.pitch, cx, cy, fov)
      ctx.strokeStyle = glow('comms')
      ctx.lineWidth = hot.includes('comms') ? 2 : 1
      ctx.beginPath()
      ctx.moveTo(antBase.x, antBase.y)
      ctx.lineTo(antA.x, antA.y)
      ctx.moveTo(antBase.x, antBase.y)
      ctx.lineTo(antB.x, antB.y)
      ctx.stroke()

      ctx.font = '500 10px Inter, system-ui, sans-serif'
      ctx.fillStyle = 'rgba(196, 199, 214, 0.9)'
      ctx.letterSpacing = '0.14em'
      const labels = [
        { p: xf(v(1.42, 0.28, 0), rot.yaw, rot.pitch, cx, cy, fov), t: 'HULL', id: 'hull' },
        { p: camera, t: 'SENSORS', id: 'sensors' },
        { p: radar, t: 'RADAR', id: 'radar' },
        { p: antA, t: 'COMMS', id: 'comms' },
        { p: prop[1], t: 'PROP', id: 'propulsion' },
      ]
      labels.forEach((item) => {
        ctx.fillStyle = hot.includes(item.id) ? '#fe4e46' : 'rgba(196, 199, 214, 0.8)'
        ctx.fillText(item.t, item.p.x + 10, item.p.y - 8)
      })

      raf = window.requestAnimationFrame(draw)
    }

    const onDown = (e) => {
      if (!fine) return
      drag = true
      lastX = e.clientX
      lastY = e.clientY
    }
    const onMove = (e) => {
      if (!drag) return
      rot.targetYaw += (e.clientX - lastX) * 0.008
      rot.targetPitch = Math.max(-0.2, Math.min(0.7, rot.targetPitch + (e.clientY - lastY) * 0.004))
      lastX = e.clientX
      lastY = e.clientY
    }
    const onUp = () => {
      drag = false
    }

    resize()
    raf = window.requestAnimationFrame(draw)
    const observer = new ResizeObserver(resize)
    observer.observe(wrap)
    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    return () => {
      observer.disconnect()
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="usv-model" ref={wrapRef}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <ul className="usv-model__parts" aria-hidden="true">
        {['hull', 'sensors', 'radar', 'comms', 'propulsion'].map((part, i) => (
          <li key={part} className={(STEP_PART[active] || []).includes(part) ? 'is-on' : ''}>
            0{i + 1} {part}
          </li>
        ))}
      </ul>
    </div>
  )
}
