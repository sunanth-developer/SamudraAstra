import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { aboutPillars, whyStatements } from '../data/content'
import { prefersReducedMotion } from '../animations/config'

export function FieldSection() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.fromTo(
        root.querySelectorAll('.field__reveal'),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 70%', once: true },
        }
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="field" id="about" ref={rootRef}>
      <div className="field__about theme-light">
        <div className="container field__split">
          <div className="field__reveal">
            <p className="eyebrow">About</p>
            <h2 className="section-heading">
              Building the future
              <br />
              of maritime systems.
            </h2>
          </div>
          <div className="field__reveal">
            <p className="body field__lead">
              Samudra Astra is an emerging defence technology company focused on
              the aquatic domain. We combine engineering, autonomous systems,
              sensing and intelligent data technologies to address the
              challenges of maritime security.
            </p>
            <ul className="about-pillars">
              {aboutPillars.map((item) => (
                <li className="about-pillar" key={item.id}>
                  <span className="meta">{item.id}</span>
                  <strong>{item.title}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="field__india">
        <div className="container">
          <p className="eyebrow field__reveal">Indigenous technology</p>
          <h3 className="field__sub field__reveal">
            Indigenous technology.
            <br />
            Maritime advantage.
          </h3>
          <ul className="why-list">
            {whyStatements.map((item) => (
              <li className="why-item field__reveal" key={item.title}>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
