import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { media } from '../data/media'
import { SonarScanner } from '../components/SonarScanner/SonarScanner'
import { prefersReducedMotion } from '../animations/config'

export function ExperienceSection() {
  const rootRef = useRef(null)
  const imgRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1 },
        {
          scale: 1.14,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0.28 },
        {
          opacity: 0.78,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top center',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="experience" ref={rootRef}>
      <img
        ref={imgRef}
        src={media.deepWater}
        alt="Deep ocean water, cinematic underwater environment"
        loading="lazy"
      />
      <div className="experience__overlay" ref={overlayRef} />
      <div className="experience__sonar" aria-hidden="true">
        <SonarScanner compact quiet />
      </div>
      <div className="experience__copy">
        <p className="eyebrow">Deep water</p>
        <h2 className="display">
          Built for the environment
          <br />
          others cannot see.
        </h2>
        <ul className="experience__words">
          <li>Pressure.</li>
          <li>Darkness.</li>
          <li>Distance.</li>
          <li>Uncertainty.</li>
        </ul>
      </div>
    </section>
  )
}
