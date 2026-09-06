import { useEffect, useState } from 'react'
import { journeyMarks } from '../../data/content'
import './ScrollProgress.css'

export function ScrollProgress() {
  const [active, setActive] = useState(journeyMarks[0].href)

  useEffect(() => {
    const nodes = journeyMarks
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    if (!nodes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-28% 0px -48% 0px', threshold: [0.15, 0.4, 0.7] }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  const goTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="scroll-progress" aria-label="Section progress">
      {journeyMarks.map((item) => (
        <button
          key={item.id}
          type="button"
          className={active === item.href ? 'is-active' : ''}
          onClick={() => goTo(item.href)}
          aria-current={active === item.href ? 'true' : undefined}
        >
          <span>{item.id}</span>
          <em>{item.label}</em>
        </button>
      ))}
    </nav>
  )
}
