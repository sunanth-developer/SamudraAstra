import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useVesselProgress } from './VesselProgress'
import { prefersReducedMotion } from '../animations/config'

export function VesselJourney({ children }) {
  const rootRef = useRef(null)
  const { setProgress } = useVesselProgress()

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    if (prefersReducedMotion()) {
      setProgress(0)
      return undefined
    }

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.85,
      onUpdate: (self) => setProgress(self.progress),
    })

    const refresh = () => ScrollTrigger.refresh()
    const t = window.setTimeout(refresh, 400)

    return () => {
      window.clearTimeout(t)
      trigger.kill()
    }
  }, [setProgress])

  return (
    <div className="journey" id="journey" ref={rootRef}>
      {children}
    </div>
  )
}
