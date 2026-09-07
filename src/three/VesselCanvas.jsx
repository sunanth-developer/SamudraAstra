import { Component, Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { VesselScene } from './VesselScene'
import { useVesselProgress } from './VesselProgress'
import { heroCameraStart, VESSEL_MOBILE_FOV, VESSEL_VIEW_FOV } from './cameraPath'
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
  const failedOnce = useRef(false)
  const [enabled, setEnabled] = useState(false)
  const [simplified] = useState(() => isSimplifiedScene())
  const [visible, setVisible] = useState(true)

  const fail = () => {
    if (failedOnce.current) return
    failedOnce.current = true
    setEnabled(false)
    setFailed(true)
    setReady(true)
  }

  useEffect(() => {
    if (!shouldUseVesselScene()) {
      fail()
      return undefined
    }
    const start = window.setTimeout(() => setEnabled(true), 50)
    return () => window.clearTimeout(start)
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
      <SceneBoundary onError={fail}>
        <Canvas
          dpr={1}
          gl={{
            antialias: !simplified,
            powerPreference: 'default',
            alpha: false,
            failIfMajorPerformanceCaveat: false,
          }}
          camera={{
            position: heroCameraStart(simplified).position,
            fov: simplified ? VESSEL_MOBILE_FOV : VESSEL_VIEW_FOV,
            near: 0.1,
            far: 90,
          }}
          shadows={false}
          frameloop={visible ? 'always' : 'never'}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              'webglcontextlost',
              (event) => {
                event.preventDefault()
                fail()
              },
              false
            )
          }}
        >
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
