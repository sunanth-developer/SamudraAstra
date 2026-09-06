import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MagneticButton } from '../components/MagneticButton/MagneticButton'
import { media } from '../data/media'
import { prefersReducedMotion } from '../animations/config'

export function CTASection() {
  const rootRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined
    video.muted = true
    video.playsInline = true
    const markReady = () => video.classList.add('is-ready')
    const tryPlay = () => {
      const playPromise = video.play()
      if (playPromise) playPromise.then(markReady).catch(() => {})
    }
    video.addEventListener('canplay', tryPlay)
    tryPlay()
    return () => video.removeEventListener('canplay', tryPlay)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll('.cta__line')
      if (prefersReducedMotion()) {
        gsap.set(lines, { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(
        lines,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 70%', once: true },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="cta" ref={rootRef}>
      <video
        ref={videoRef}
        className="cta__video"
        autoPlay
        muted
        loop
        playsInline
        poster={media.ctaStill}
        aria-hidden="true"
        onPlaying={(e) => e.currentTarget.classList.add('is-ready')}
      >
        <source src={media.ctaVideo} type="video/mp4" />
      </video>
      <img src={media.ctaStill} alt="" className="cta__fallback" />
      <div className="cta__overlay" />
      <div className="container cta__inner">
        <p className="eyebrow">Begin</p>
        <h2 className="display">
          <span className="cta__line">The surface is only</span>
          <span className="cta__line">the beginning.</span>
        </h2>
        <p className="body cta__support">
          Explore what Samudra Astra is building for the maritime domain.
        </p>
        <div className="cta__actions">
          <MagneticButton to="/technology" variant="solid" cursor="EXPLORE">
            Explore our technology
          </MagneticButton>
          <MagneticButton to="/contact" cursor="OPEN">
            Partner with us
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
