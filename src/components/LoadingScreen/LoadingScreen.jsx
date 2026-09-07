import { useEffect, useState } from 'react'
import { Logo } from '../Logo'
import { useVesselProgress } from '../../three/VesselProgress'
import './LoadingScreen.css'

export function LoadingScreen() {
  const { readyRef, failedRef, subscribe } = useVesselProgress()
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState('loading')
  const [progress, setProgress] = useState(12)

  useEffect(() => {
    const started = performance.now()
    let frame
    const hide = () => {
      setPhase('ready')
      setProgress(100)
      window.setTimeout(() => setVisible(false), 280)
    }
    const tick = () => {
      const elapsed = performance.now() - started
      setProgress((prev) => Math.min(100, Math.max(prev, elapsed / 18)))
      if (readyRef.current || failedRef.current || elapsed > 2200) {
        hide()
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    const unsub = subscribe(() => {
      if (readyRef.current || failedRef.current) hide()
    })
    return () => {
      cancelAnimationFrame(frame)
      unsub()
    }
  }, [failedRef, readyRef, subscribe])

  if (!visible) return null

  return (
    <div className={`loader ${phase === 'ready' ? 'is-ready' : ''}`} role="status" aria-live="polite">
      <Logo large variant="white" />
      <p className="loader__label">
        {phase === 'ready' ? 'System ready' : 'Initializing system'}
      </p>
      <div className="loader__track" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
