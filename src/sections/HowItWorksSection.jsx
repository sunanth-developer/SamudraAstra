import { useEffect, useRef, useState } from 'react'
import { processSteps } from '../data/content'
import { prefersReducedMotion } from '../animations/config'
import { UsvVisual } from '../components/UsvVisual/UsvVisual'

function stepFromProgress(progress, total) {
  if (progress >= 0.999) return total - 1
  return Math.min(total - 1, Math.max(0, Math.floor(progress * total)))
}

function sectionProgress(section) {
  const travel = section.offsetHeight - window.innerHeight
  if (travel <= 1) return 0
  const top = section.getBoundingClientRect().top
  return Math.min(1, Math.max(0, -top / travel))
}

export function HowItWorksSection() {
  const sectionRef = useRef(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(
    () => !prefersReducedMotion() && window.matchMedia('(min-width: 1024px)').matches
  )
  const total = processSteps.length

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 1024px)')
    const sync = () => setPinned(!motion.matches && desktop.matches)
    sync()
    motion.addEventListener('change', sync)
    desktop.addEventListener('change', sync)
    return () => {
      motion.removeEventListener('change', sync)
      desktop.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !pinned) return undefined

    let frame = 0
    const apply = () => {
      const next = stepFromProgress(sectionProgress(section), total)
      if (next !== activeRef.current) {
        activeRef.current = next
        setActive(next)
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        apply()
      })
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', apply)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', apply)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [pinned, total])

  return (
    <section
      ref={sectionRef}
      className={`process ${pinned ? 'process--pinned' : 'process--static'}`}
      id="process"
      style={{ '--process-steps': String(total) }}
    >
      <div className="process__pin">
        <header className="process__head">
          <p className="eyebrow">From sensing to mission</p>
          <h2 className="section-heading">Sonar. Target. Data. Intelligence.</h2>
        </header>

        <div className="process__stage">
          <div className="process__visual">
            <UsvVisual active={active} />
          </div>

          <div className="process__copies">
            {processSteps.map((step, i) => (
              <article
                key={step.id}
                className={`process__copy ${!pinned || i === active ? 'is-active' : ''}`}
                aria-hidden={pinned ? i !== active : undefined}
              >
                <span className="process__num">{step.id}</span>
                <p className="meta">{step.meta}</p>
                <h3 className="card-heading">{step.title}</h3>
                <p className="body">{step.body}</p>
              </article>
            ))}
          </div>
        </div>

        {pinned && (
          <div className="process__bar" aria-hidden="true">
            <div className="process__ticks">
              {processSteps.map((step, i) => (
                <span key={step.id} className={i === active ? 'is-active' : ''}>
                  {step.id}
                </span>
              ))}
            </div>
            <div className="process__track">
              <span style={{ transform: `scaleX(${(active + 1) / total})` }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
