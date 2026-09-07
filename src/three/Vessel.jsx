import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { GlbVessel } from './GlbVessel'
import { AuvCraft } from './AuvCraft'
import { VESSEL_VIEW_SCALE } from './cameraPath'

export function Vessel({ progressRef, pointerRef, underRef, showcaseBlendRef, simplified = false }) {
  const lead = useRef()
  const auv = useRef()
  const yaw = useRef(0)
  const mats = useRef([])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const p = progressRef.current
    const under = underRef?.current || 0
    const rock = Math.sin(t * 0.68) * 0.012
    const pitch = Math.sin(t * 0.44) * 0.006
    const pointer = pointerRef.current
    yaw.current += ((pointer?.x || 0) * 0.1 - yaw.current) * Math.min(1, delta * 2.1)
    const showcase = showcaseBlendRef?.current || 0
    const surge = p * 1.15 * (1 - showcase)

    if (lead.current) {
      lead.current.position.x = surge
      lead.current.position.y = rock - under * 0.06
      lead.current.rotation.z = rock * 0.22
      lead.current.rotation.x = pitch
      lead.current.rotation.y = yaw.current
      lead.current.scale.setScalar(simplified ? VESSEL_VIEW_SCALE.mobile : VESSEL_VIEW_SCALE.desktop)
      lead.current.visible = under < 0.92
      if (!mats.current.length) {
        lead.current.traverse((obj) => {
          if (obj.isMesh && obj.material) mats.current.push(obj.material)
        })
      }
      const hero = Math.max(0, 1 - p / 0.14) * (1 - showcase)
      const highlight = hero * hero * (3 - 2 * hero)
      const env = (simplified ? 0.95 : 0.7) + 0.55 * highlight
      const glow = (simplified ? 0.28 : 0.12) + 0.38 * highlight
      for (const mat of mats.current) {
        if (mat.envMapIntensity != null) mat.envMapIntensity = env
        if (mat.emissiveIntensity != null) mat.emissiveIntensity = glow
      }
    }

    if (auv.current) {
      const reveal = Math.max(0, under - 0.18)
      auv.current.visible = reveal > 0.02
      auv.current.position.set(0.35 + p * 0.6, -0.55 - under * 0.85, 0.35)
      auv.current.rotation.y = Math.PI / 2 + Math.sin(t * 0.3) * 0.04
      auv.current.rotation.z = Math.sin(t * 0.8) * 0.03
      auv.current.scale.setScalar(0.55 + reveal * 0.7)
    }
  })

  return (
    <group>
      <group ref={lead}>
        <GlbVessel />
      </group>
      {!simplified && (
        <group ref={auv}>
          <AuvCraft />
        </group>
      )}
    </group>
  )
}
