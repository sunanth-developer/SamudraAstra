import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { engineeringSteps, securityFeatures } from '../data/content'
import { SonarScanner } from '../components/SonarScanner/SonarScanner'
import { prefersReducedMotion } from '../animations/config'

export function SecuritySection() {
  const rootRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set('.security__item, .eng-step', { opacity: 1, y: 0 })
        gsap.set(lineRef.current, { scaleX: 1 })
        return
      }
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top 70%', end: 'center center', scrub: true },
        }
      )
      gsap.fromTo(
        root.querySelectorAll('.security__item, .eng-step'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 70%', once: true },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="security">
      <div className="container security__grid" ref={rootRef}>
        <div>
          <p className="eyebrow">05 / Engineering</p>
          <h2 className="section-heading">Built with precision. Tested with purpose.</h2>
          <p className="body">
            From research and prototyping to system integration and validation,
            Samudra Astra approaches every platform as a mission-critical
            engineering system.
          </p>
          <ol className="eng-line" aria-label="Engineering process">
            <span className="eng-line__track" ref={lineRef} />
            {engineeringSteps.map((step) => (
              <li className="eng-step" key={step.title}>
                {step.title}
              </li>
            ))}
          </ol>
          <ul className="security__list">
            {securityFeatures.map((item) => (
              <li className="security__item" key={item.id}>
                <span>{item.id}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="security__stage">
          <SonarScanner />
        </div>
      </div>
    </section>
  )
}
