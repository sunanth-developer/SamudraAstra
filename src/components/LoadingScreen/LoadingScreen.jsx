import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { Logo } from '../Logo'
import { useVesselProgress } from '../../three/VesselProgress'
import './LoadingScreen.css'

export function LoadingScreen() {
  const { progress: network } = useProgress()
  const { readyRef, failedRef, subscribe } = useVesselProgress()
  const [visible, setVisible] = useState(true)
  const [phase, setPhase] = useState('loading')
  const [progress, setProgress] = useState(8)

  useEffect(() => {
    const started = performance.now()
    let frame
    const tick = () => {
      const ready = readyRef.current
      const failed = failedRef.current
      const elapsed = performance.now() - started
      setProgress((prev) => {
        if (ready || failed) return 100
        return Math.max(prev, Math.min(96, network || prev + 0.4))
      })
      if ((ready || failed) && elapsed > 500) {
        setPhase('ready')
        window.setTimeout(() => setVisible(false), 420)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    const unsub = subscribe(() => {})
    const failSafe = window.setTimeout(() => {
      setPhase('ready')
      setProgress(100)
      setVisible(false)
    }, 45000)
    return () => {
      cancelAnimationFrame(frame)
      unsub()
      window.clearTimeout(failSafe)
    }
  }, [failedRef, network, readyRef, subscribe])

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
      <p className="loader__meta">Loading vessel system</p>
    </div>
  )
}
