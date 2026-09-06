import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../animations/config'

const words = ['Detect', 'Monitor', 'Protect']

export function IntroSection() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const ctx = gsap.context(() => {
      const els = root.querySelectorAll('.intro__line')
      if (prefersReducedMotion()) {
        gsap.set(els, { opacity: 1, y: 0, filter: 'none' })
        gsap.set('.intro__word', { opacity: 1 })
        return
      }
      gsap.fromTo(
        els,
        { opacity: 0, y: 48, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 72%', once: true },
        }
      )
      gsap.fromTo(
        '.intro__word',
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 65%',
            end: 'bottom 35%',
            scrub: true,
          },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="intro" id="mission">
      <div className="intro__rays" aria-hidden="true" />
      <div className="container" ref={rootRef}>
        <p className="eyebrow">Our mission</p>
        <h2 className="intro__statement display">
          <span className="intro__line">Autonomy below.</span>
          <span className="intro__line">Security beyond.</span>
        </h2>
        <p className="intro__aside body">
          The maritime domain is vast, complex and increasingly contested.
          Samudra Astra is building technologies that extend awareness and
          operational capability beneath the surface.
        </p>
        <ol className="intro__words">
          {words.map((item) => (
            <li className="intro__word" key={item}>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
