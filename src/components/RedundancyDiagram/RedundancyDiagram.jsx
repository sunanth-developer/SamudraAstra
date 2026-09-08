import { useEffect, useState } from 'react'
import { redundancyPaths } from '../../data/content'
import { prefersReducedMotion } from '../../animations/config'
import './RedundancyDiagram.css'

const phases = [
  { id: 'online', label: 'System online' },
  { id: 'fault', label: 'One subsystem becomes unavailable' },
  { id: 'reroute', label: 'System reroutes' },
  { id: 'continue', label: 'Remaining architecture continues' },
  { id: 'mandate', label: 'No single point of failure.' },
]

export function RedundancyDiagram() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const tick = window.setInterval(() => {
      setPhase((current) => (current + 1) % phases.length)
    }, 2400)
    return () => window.clearInterval(tick)
  }, [])

  const liveSide = phase === 1 ? 1 : phase === 2 || phase === 3 ? 1 : 0
  const failedSide = phase === 1 || phase === 2 ? 0 : null

  return (
    <div className="redun">
      <p className="redun__status" aria-live="polite">
        {phases[phase].label}
      </p>
      <div className="redun__grid">
        {redundancyPaths.map((pair) => (
          <div className="redun__path" key={pair[0]}>
            <span className={failedSide === 0 ? 'is-down' : liveSide === 0 ? 'is-live' : ''}>
              {pair[0]}
            </span>
            <b aria-hidden="true" />
            <span className={liveSide === 1 ? 'is-live' : ''}>{pair[1]}</span>
          </div>
        ))}
      </div>
      <ol className="redun__phases">
        {phases.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              className={index === phase ? 'is-active' : ''}
              onClick={() => setPhase(index)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
