import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { media } from '../data/media'
import { MagneticButton } from '../components/MagneticButton/MagneticButton'
import { OceanBackground } from '../components/OceanBackground/OceanBackground'
import { useVesselProgress } from '../three/VesselProgress'
import { prefersReducedMotion } from '../animations/config'

export function HeroSection() {
  const rootRef = useRef(null)
  const { failedRef, readyRef, subscribe } = useVesselProgress()
  const fallbackRef = useRef(null)

  useEffect(() => {
    const sync = () => {
      if (!fallbackRef.current) return
      fallbackRef.current.classList.toggle(
        'is-hidden',
        readyRef.current && !failedRef.current
      )
    }
    sync()
    return subscribe(sync)
  }, [failedRef, readyRef, subscribe])

  useEffect(() => {
    const root = rootRef.current
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.hero__reveal', { opacity: 1, y: 0, filter: 'none' })
        return
      }
      gsap.fromTo(
        '.hero__reveal',
        { opacity: 0, y: 28, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.05,
          stagger: 0.08,
          delay: 0.28,
          ease: 'power3.out',
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="landing" ref={rootRef} aria-label="Samudra Astra">
      <div className="hero__fallback" ref={fallbackRef}>
        <OceanBackground />
      </div>
      <div className="hero__wash" />

      <div className="hero__layout container">
        <div className="hero__title">
          <p className="eyebrow hero__reveal">Samudra Astra · Aquatic defence technology</p>
          <h1 className="hero-heading hero__reveal">
            Built for the blue. <span className="hero__precision">Defined by precision.</span>
          </h1>
        </div>

        <div className="hero__stage">
          <img
            className="hero__vessel-still"
            src={media.usv}
            alt="Samudra Astra unmanned surface vessel"
          />
        </div>

        <div className="hero__footer">
          <p className="body hero__reveal">
            Samudra Astra develops advanced aquatic defence technologies designed
            to sense, understand and respond across the maritime domain.
          </p>
          <div className="hero__actions hero__reveal">
            <MagneticButton to="/technology" variant="solid" cursor="EXPLORE">
              Explore the Technology
            </MagneticButton>
          </div>
          <p className="hero__scroll hero__reveal">
            <span className="hero__dot" />
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  )
}
