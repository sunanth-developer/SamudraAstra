import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { aboutPillars, fieldNodes, whyStatements } from '../data/content'
import { prefersReducedMotion } from '../animations/config'

export function FieldSection() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        root.querySelectorAll('.field__marker, .why-item, .about-pillar'),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 70%', once: true },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="field" id="about">
      <div className="container" ref={rootRef}>
        <p className="eyebrow">About</p>
        <h2 className="section-heading">
          Building the next generation of
          <br />
          aquatic defence technology.
        </h2>
        <p className="body field__lead">
          Samudra Astra is an emerging defence technology company focused on the
          aquatic domain. We combine engineering, autonomous systems, sensing
          and intelligent data technologies to address the challenges of
          maritime security.
        </p>

        <ul className="about-pillars">
          {aboutPillars.map((item) => (
            <li className="about-pillar" key={item.id}>
              <span className="meta">{item.id}</span>
              <strong>{item.title}</strong>
            </li>
          ))}
        </ul>

        <h3 className="field__sub">Indigenous technology. Maritime advantage.</h3>
        <ul className="why-list">
          {whyStatements.map((item) => (
            <li className="why-item" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="field__map" aria-label="Maritime domain layers">
          <div className="field__grid" />
          <span className="field__coord field__coord--tl">Surface</span>
          <span className="field__coord field__coord--tr">Sub-surface</span>
          <span className="field__coord field__coord--bl">Deep water</span>
          <span className="field__coord field__coord--br">Mission</span>

          {fieldNodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className="field__marker"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              data-cursor="VIEW"
            >
              <span className="field__pulse" />
              <span className="field__dot" />
              <span className="field__label">
                <strong>{node.name}</strong>
                <em>{node.coord}</em>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
