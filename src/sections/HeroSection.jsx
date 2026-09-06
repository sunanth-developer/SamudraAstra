import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { media } from '../data/media'
import { MagneticButton } from '../components/MagneticButton/MagneticButton'
import { SonarScanner } from '../components/SonarScanner/SonarScanner'
import { prefersReducedMotion } from '../animations/config'
import { scrubScale } from '../animations/parallax'

export function HeroSection() {
  const rootRef = useRef(null)
  const mediaRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set('.hero__reveal', { opacity: 1, y: 0, filter: 'none' })
        gsap.set(mediaRef.current, { scale: 1 })
        return
      }

      gsap.fromTo(
        mediaRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 2.6, ease: 'power2.out' }
      )

      gsap.fromTo(
        '.hero__reveal',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.05,
          stagger: 0.1,
          delay: 0.18,
          ease: 'power3.out',
        }
      )

      scrubScale(mediaRef.current, root, 1, 1.08)
      gsap.to('.hero__copy', {
        y: -40,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, root)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    video.muted = true
    video.defaultMuted = true
    video.loop = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.setAttribute('webkit-playsinline', '')

    if (prefersReducedMotion()) {
      video.pause()
      return undefined
    }

    const markReady = () => video.classList.add('is-ready')
    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise) playPromise.then(markReady).catch(() => {})
    }

    if (video.readyState >= 2) {
      markReady()
      tryPlay()
    }

    video.addEventListener('loadeddata', tryPlay)
    video.addEventListener('canplay', tryPlay)
    video.addEventListener('playing', markReady)
    tryPlay()

    return () => {
      video.removeEventListener('loadeddata', tryPlay)
      video.removeEventListener('canplay', tryPlay)
      video.removeEventListener('playing', markReady)
    }
  }, [])

  return (
    <section className="hero" ref={rootRef} aria-label="Samudra Astra">
      <div className="hero__media">
        <div className="hero__media-inner" ref={mediaRef}>
          <video
            ref={videoRef}
            className="hero__video"
            src={media.heroVideo}
            poster={media.heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <img className="hero__still" src={media.heroPoster} alt="" />
        </div>
        <div className="hero__wash" />
        <div className="hero__sonar">
          <SonarScanner compact />
        </div>
      </div>

      <div className="hero__copy container">
        <p className="eyebrow hero__reveal">Samudra Astra · Aquatic defence technology</p>
        <h1 className="hero-heading">
          <span className="hero__reveal">Defence</span>
          <span className="hero__reveal">beyond the</span>
          <span className="hero__reveal">surface.</span>
        </h1>
        <p className="body hero__reveal">
          Samudra Astra develops advanced aquatic defence technologies designed
          to sense, understand and respond across the maritime domain.
        </p>
        <div className="hero__actions hero__reveal">
          <MagneticButton to="/systems" variant="solid" cursor="EXPLORE">
            Explore our systems
          </MagneticButton>
          <MagneticButton to="/contact" cursor="OPEN">
            Partner with us
          </MagneticButton>
        </div>
        <ul className="hero__status hero__reveal">
          <li>Maritime domain</li>
          <li>
            <span className="hero__dot" /> System status · Active
          </li>
          <li>Autonomous technology</li>
        </ul>
      </div>
    </section>
  )
}
