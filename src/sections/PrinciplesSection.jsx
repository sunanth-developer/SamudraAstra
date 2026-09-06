import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { principles, principleNotes } from '../data/content'
import { prefersReducedMotion } from '../animations/config'

export function PrinciplesSection() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const ctx = gsap.context(() => {
      const items = root.querySelectorAll('.principle, .principle-note')
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="principles" id="technology">
      <div className="container" ref={rootRef}>
        <p className="eyebrow">04 / Technology</p>
        <h2 className="section-heading">
          Intelligence
          <br />
          in every layer.
        </h2>

        <ul className="principles__list">
          {principles.map((item, i) => (
            <li className="principle" key={item.title}>
              <span className="principle__num">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>

        <ul className="principles__notes">
          {principleNotes.map((note) => (
            <li className="principle-note" key={note}>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
