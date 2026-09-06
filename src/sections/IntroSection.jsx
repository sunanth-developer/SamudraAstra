import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../animations/config'

const lines = [
  'The next frontier of',
  'defence is underwater.',
]

const depths = ['Surface', 'Sub-surface', 'Deep water']

export function IntroSection() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const ctx = gsap.context(() => {
      const els = root.querySelectorAll('.intro__line')
      if (prefersReducedMotion()) {
        gsap.set(els, { opacity: 1, y: 0, filter: 'none' })
        gsap.set('.intro__depth-item', { opacity: 1 })
        return
      }
      gsap.fromTo(
        els,
        { opacity: 0, y: 50, filter: 'blur(10px)' },
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
        '.intro__depth-item',
        { opacity: 0.25 },
        {
          opacity: 1,
          stagger: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: true,
          },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="intro" id="mission">
      <div className="container" ref={rootRef}>
        <p className="eyebrow">01 / The mission</p>
        <p className="intro__statement display">
          {lines.map((line) => (
            <span className="intro__line" key={line}>
              {line}
            </span>
          ))}
        </p>
        <p className="intro__aside body">
          The maritime domain is vast, complex and increasingly contested.
          Samudra Astra is building technologies that extend awareness and
          operational capability beneath the surface.
        </p>

        <ol className="intro__depth">
          {depths.map((item) => (
            <li className="intro__depth-item" key={item}>
              {item}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
