import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Ocean } from './Ocean'
import { Vessel } from './Vessel'
import { shadowGeometry } from './geometries'
import { fitDesktopCamera, fitMobileCamera, sampleCamera, sampleShowcaseCamera, VESSEL_MOBILE_FOV, VESSEL_VIEW_FOV } from './cameraPath'

function mixSample(a, b, t) {
  return {
    position: [
      a.position[0] + (b.position[0] - a.position[0]) * t,
      a.position[1] + (b.position[1] - a.position[1]) * t,
      a.position[2] + (b.position[2] - a.position[2]) * t,
    ],
    look: [
      a.look[0] + (b.look[0] - a.look[0]) * t,
      a.look[1] + (b.look[1] - a.look[1]) * t,
      a.look[2] + (b.look[2] - a.look[2]) * t,
    ],
    fog: a.fog + (b.fog - a.fog) * t,
    under: a.under + (b.under - a.under) * t,
  }
}

export function VesselScene({
  progressRef,
  showcaseRef,
  showcaseBlendRef,
  pointerRef,
  simplified = false,
}) {
  const underRef = useRef(0)
  const fogRef = useRef()
  const hemiRef = useRef()
  const keyRef = useRef()
  const fillRef = useRef()
  const rimRef = useRef()
  const faceRef = useRef()
  const target = useMemo(() => new THREE.Vector3(), [])
  const nextPos = useMemo(() => new THREE.Vector3(), [])
  const bgA = useMemo(() => new THREE.Color('#050812'), [])
  const bgB = useMemo(() => new THREE.Color('#030814'), [])
  const bg = useMemo(() => new THREE.Color(), [])

  useFrame((state, delta) => {
    const progress = progressRef.current
    const journey = sampleCamera(progress)
    const showcase = sampleShowcaseCamera(showcaseRef?.current || 0)
    const blend = showcaseBlendRef?.current || 0
    const mixed = mixSample(journey, showcase, blend)
    const sample = simplified ? fitMobileCamera(mixed) : fitDesktopCamera(mixed)
    const hero = Math.max(0, 1 - progress / 0.14) * (1 - blend)
    const highlight = hero * hero * (3 - 2 * hero)
    underRef.current = sample.under
    nextPos.set(...sample.position)
    target.set(...sample.look)
    if (simplified) {
      const width = state.size.width
      const height = state.size.height
      const fullH = height * 1.46
      state.camera.setViewOffset(width, fullH, 0, fullH - height, width, height)
    } else if (state.camera.view) {
      state.camera.clearViewOffset()
    }
    const damp = 1 - Math.exp(-3.6 * delta)
    state.camera.position.lerp(nextPos, damp)
    state.camera.lookAt(target)
    const fov = simplified ? VESSEL_MOBILE_FOV : VESSEL_VIEW_FOV
    if (Math.abs(state.camera.fov - fov) > 0.01) {
      state.camera.fov = fov
    }
    state.camera.updateProjectionMatrix()
    if (fogRef.current) fogRef.current.density = sample.fog * (1 - 0.42 * highlight)
    if (hemiRef.current) {
      hemiRef.current.intensity = (simplified ? 0.92 : 0.55) + 0.5 * highlight
    }
    if (keyRef.current) {
      keyRef.current.intensity = (simplified ? 1.55 : 1.15) + (simplified ? 0.85 : 0.7) * highlight
    }
    if (fillRef.current) {
      fillRef.current.intensity = (simplified ? 0.7 : 0.34) + 0.4 * highlight
    }
    if (rimRef.current) {
      rimRef.current.intensity = (simplified ? 0.85 : 0.22) + 1.15 * highlight
    }
    if (faceRef.current) {
      faceRef.current.intensity = (simplified ? 0.95 : 0.18) + 1.35 * highlight
    }
    bg.copy(bgA).lerp(bgB, sample.under)
    state.scene.background = bg
    if (state.scene.fog) state.scene.fog.color.copy(bg)
  })

  return (
    <>
      <fogExp2 ref={fogRef} args={['#050812', 0.03]} attach="fog" />
      <hemisphereLight ref={hemiRef} args={['#eef5fb', '#0d1a63', simplified ? 0.92 : 0.55]} />
      <directionalLight
        ref={keyRef}
        position={[6, 8, 4]}
        intensity={simplified ? 1.55 : 1.15}
        color="#e4eef8"
        castShadow={!simplified}
        shadow-mapSize-width={simplified ? 512 : 1024}
        shadow-mapSize-height={simplified ? 512 : 1024}
        shadow-camera-far={40}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight ref={fillRef} position={[-7, 2.4, -5]} intensity={simplified ? 0.7 : 0.34} color="#ffffff" />
      <directionalLight ref={rimRef} position={[-3.2, 3.4, 5.6]} intensity={simplified ? 0.85 : 0.22} color="#f3f7fb" />
      <pointLight ref={faceRef} position={[0.2, 2.8, 6.4]} intensity={simplified ? 0.95 : 0.18} color="#fff4e8" distance={18} decay={2} />
      <Ocean underRef={underRef} />
      {!simplified && (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.12, 0]}
          geometry={shadowGeometry}
          receiveShadow
        >
          <shadowMaterial transparent opacity={0.28} />
        </mesh>
      )}
      <Vessel
        progressRef={progressRef}
        pointerRef={pointerRef}
        underRef={underRef}
        showcaseBlendRef={showcaseBlendRef}
        simplified={simplified}
      />
    </>
  )
}
