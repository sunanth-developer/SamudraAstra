import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../animations/config'

export function SonarScanner({ compact = false, quiet = false }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const el = wrapRef.current
    if (!el) return undefined
    el.classList.add('is-live')
    return () => el.classList.remove('is-live')
  }, [])

  return (
    <div
      className={`sonar ${compact ? 'sonar--compact' : ''} ${quiet ? 'sonar--quiet' : ''}`}
      ref={wrapRef}
      aria-hidden="true"
    >
      <div className="sonar__grid" />
      <div className="sonar__sweep" />
      <span className="sonar__ring sonar__ring--a" />
      <span className="sonar__ring sonar__ring--b" />
      <span className="sonar__ring sonar__ring--c" />
      <span className="sonar__core" />
      <span className="sonar__blip sonar__blip--a" />
      <span className="sonar__blip sonar__blip--b is-target" />
      <span className="sonar__blip sonar__blip--c" />
      {!quiet && (
        <>
          <div className="sonar__hud sonar__hud--tl">
            <em>Scan</em>
            <span>──────────●────</span>
          </div>
          <div className="sonar__hud sonar__hud--tr">
            <em>Signal</em>
            <span className="sonar__live">● Active</span>
          </div>
          <div className="sonar__hud sonar__hud--bl">
            <em>Target 01</em>
            <span>Detected</span>
          </div>
          <div className="sonar__hud sonar__hud--br">
            <em>Status</em>
            <span>Sensing</span>
          </div>
        </>
      )}
    </div>
  )
}
