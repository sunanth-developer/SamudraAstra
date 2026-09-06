import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { media } from '../data/media'
import { OceanBackground } from '../components/OceanBackground/OceanBackground'
import { useVesselView } from '../hooks/useVesselView'
import { useVesselProgress } from '../three/VesselProgress'
import { prefersReducedMotion } from '../animations/config'
import './VesselShowcaseSection.css'

const views = [
  { id: '01', name: 'Front' },
  { id: '02', name: 'Profile' },
  { id: '03', name: 'Top' },
  { id: '04', name: 'Detail' },
]

const hotspots = [
  [
    { label: 'Sensing', x: 58, y: 36 },
    { label: 'Autonomy', x: 34, y: 48 },
  ],
  [
    { label: 'Communication', x: 46, y: 32 },
    { label: 'Mission control', x: 62, y: 58 },
  ],
  [
    { label: 'Sensing', x: 40, y: 42 },
    { label: 'Autonomy', x: 58, y: 54 },
  ],
  [
    { label: 'Sensing', x: 52, y: 34 },
    { label: 'Communication', x: 38, y: 56 },
  ],
]

function sectionProgress(section) {
  const travel = section.offsetHeight - window.innerHeight
  if (travel <= 1) return 0
  return Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel))
}

function sectionBlend(section) {
  const rect = section.getBoundingClientRect()
  const vh = window.innerHeight
  if (rect.bottom <= vh * 0.18 || rect.top >= vh * 0.82) return 0
  if (rect.top <= 8 && rect.bottom >= vh * 0.72) return 1
  if (rect.top > 8) return Math.min(1, Math.max(0, 1 - rect.top / (vh * 0.45)))
  return Math.min(1, Math.max(0, (rect.bottom - vh * 0.22) / (vh * 0.4)))
}

export function VesselShowcaseSection() {
  const rootRef = useRef(null)
  const view = useVesselView()
  const { failedRef, subscribe, setShowcase } = useVesselProgress()
  const [failed, setFailed] = useState(true)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const sync = () => setFailed(failedRef.current)
    sync()
    return subscribe(sync)
  }, [failedRef, subscribe])

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setPinned(!motion.matches)
    apply()
    motion.addEventListener('change', apply)
    return () => {
      motion.removeEventListener('change', apply)
    }
  }, [])

  useEffect(() => {
    const section = rootRef.current
    if (!section) return undefined

    let frame = 0
    const tick = () => {
      frame = 0
      if (prefersReducedMotion()) {
        setShowcase(0, 0)
        return
      }
      setShowcase(sectionProgress(section), sectionBlend(section))
    }
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(tick)
    }

    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', tick)
    window.__lenis?.on('scroll', onScroll)
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 280)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', tick)
      window.__lenis?.off('scroll', onScroll)
      window.clearTimeout(refresh)
      if (frame) window.cancelAnimationFrame(frame)
      setShowcase(0, 0)
    }
  }, [pinned, setShowcase])

  return (
    <section
      ref={rootRef}
      className={`vessel-show ${pinned ? 'vessel-show--pinned' : ''}`}
      id="vessel"
    >
      <div className="vessel-show__pin">
        {failed && (
          <div className="vessel-show__fallback">
            <OceanBackground src={media.usv} />
          </div>
        )}
        <div className="container vessel-show__top">
          <p className="eyebrow">The vessel</p>
          <h2 className="display">Precision on the water.</h2>
        </div>

        <ul className="vessel-show__views" aria-label="Vessel views">
          {views.map((item, i) => (
            <li key={item.id} className={i === view ? 'is-active' : ''}>
              <span>View {item.id}</span>
              {item.name}
            </li>
          ))}
        </ul>

        <ul className="vessel-show__hotspots">
          {hotspots[view].map((item) => (
            <li key={item.label} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
              <i />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>

        <dl className="vessel-show__telemetry">
          <div>
            <dt>Vessel system</dt>
            <dd>01</dd>
          </div>
          <div>
            <dt>Navigation</dt>
            <dd>
              <i /> Active
            </dd>
          </div>
          <div>
            <dt>Mission state</dt>
            <dd>Ready</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
