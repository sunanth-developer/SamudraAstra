import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { VesselScene } from './VesselScene'
import { useVesselProgress } from './VesselProgress'
import { heroCameraStart } from './cameraPath'
import { isSimplifiedScene, shouldUseVesselScene } from '../utils/webgl'
import './VesselCanvas.css'

class SceneBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onError?.()
  }

  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

export function VesselCanvas() {
  const { progressRef, showcaseRef, showcaseBlendRef, setReady, setFailed } = useVesselProgress()
  const pointerRef = useRef({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)
  const [simplified, setSimplified] = useState(() => isSimplifiedScene())
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const allow = shouldUseVesselScene()
    setEnabled(allow)
    const media = window.matchMedia('(max-width: 1023px)')
    const sync = () => setSimplified(media.matches)
    sync()
    media.addEventListener('change', sync)
    if (!allow) {
      setFailed(true)
      setReady(true)
    }
    return () => media.removeEventListener('change', sync)
  }, [setFailed, setReady])

  useEffect(() => {
    const onMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const onVis = () => setVisible(document.visibilityState !== 'hidden')
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  if (!enabled) return null

  return (
    <div className="vessel-canvas" aria-hidden="true">
      <SceneBoundary
        onError={() => {
          setFailed(true)
          setReady(true)
        }}
      >
        <Canvas
          dpr={simplified ? [1, 1] : [1, 1.5]}
          gl={{
            antialias: !simplified,
            powerPreference: simplified ? 'low-power' : 'high-performance',
            alpha: false,
          }}
          camera={{
            position: heroCameraStart(simplified).position,
            fov: simplified ? 54 : 42,
            near: 0.1,
            far: 90,
          }}
          shadows={!simplified}
          frameloop={visible ? 'always' : 'never'}
          onCreated={() => {
            setFailed(false)
          }}
        >
          <AdaptiveDpr />
          <Suspense fallback={null}>
            <VesselScene
              progressRef={progressRef}
              showcaseRef={showcaseRef}
              showcaseBlendRef={showcaseBlendRef}
              pointerRef={pointerRef}
              simplified={simplified}
            />
          </Suspense>
        </Canvas>
      </SceneBoundary>
    </div>
  )
}
