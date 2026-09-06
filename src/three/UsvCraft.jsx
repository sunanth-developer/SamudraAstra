import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { createUsvHullGeometry } from './hullGeometry'

const HULL = '#1b2744'
const DECK = '#12192c'
const STEEL = '#8b97a6'
const SIGNAL = '#f68048'
const ICE = '#dce8f2'

export function UsvCraft({
  scale = 1,
  lightsRef,
  accent = true,
}) {
  const hull = useMemo(() => createUsvHullGeometry(1), [])
  const localLights = useRef([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const nodes = lightsRef?.current || localLights.current
    nodes.forEach((mesh, i) => {
      if (!mesh?.material) return
      mesh.material.emissiveIntensity = 0.9 + Math.sin(t * 2.15 + i) * 0.45
    })
  })

  const setLight = (index) => (el) => {
    if (lightsRef) lightsRef.current[index] = el
    else localLights.current[index] = el
  }

  return (
    <group>
      <mesh geometry={hull} castShadow receiveShadow>
        <meshStandardMaterial color={HULL} metalness={0.38} roughness={0.46} />
      </mesh>
      <mesh position={[0.08, 0.23, 0]} receiveShadow>
        <boxGeometry args={[2.15, 0.035, 0.46]} />
        <meshStandardMaterial color={DECK} metalness={0.22} roughness={0.68} />
      </mesh>
      <mesh position={[-0.08, 0.38, 0]} castShadow>
        <boxGeometry args={[0.92, 0.26, 0.34]} />
        <meshStandardMaterial color="#162038" metalness={0.34} roughness={0.4} />
      </mesh>
      <mesh position={[0.42, 0.34, 0]} castShadow>
        <boxGeometry args={[0.42, 0.14, 0.26]} />
        <meshStandardMaterial color="#18233c" metalness={0.3} roughness={0.46} />
      </mesh>
      <mesh position={[-0.05, 0.62, 0]}>
        <boxGeometry args={[0.08, 0.28, 0.08]} />
        <meshStandardMaterial color={STEEL} metalness={0.62} roughness={0.26} />
      </mesh>
      <mesh position={[-0.05, 0.8, 0]}>
        <boxGeometry args={[0.16, 0.1, 0.08]} />
        <meshStandardMaterial
          color={SIGNAL}
          emissive={accent ? SIGNAL : ICE}
          emissiveIntensity={1.35}
        />
      </mesh>
      <mesh position={[-0.05, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.13, 0.01, 8, 22]} />
        <meshStandardMaterial color={ICE} metalness={0.48} roughness={0.24} />
      </mesh>
      <mesh position={[0.62, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.17, 0.008, 8, 26]} />
        <meshStandardMaterial color={ICE} metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh ref={setLight(0)} position={[2.18, 0.2, 0]}>
        <boxGeometry args={[0.08, 0.05, 0.05]} />
        <meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={1.4} />
      </mesh>
      <mesh ref={setLight(1)} position={[-1.82, 0.2, 0.26]}>
        <boxGeometry args={[0.05, 0.04, 0.04]} />
        <meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={1.1} />
      </mesh>
      <mesh ref={setLight(2)} position={[-1.82, 0.2, -0.26]}>
        <boxGeometry args={[0.05, 0.04, 0.04]} />
        <meshStandardMaterial color={ICE} emissive={ICE} emissiveIntensity={0.85} />
      </mesh>
      <pointLight position={[2.16, 0.28, 0]} color={SIGNAL} intensity={0.42} distance={2.8} />
    </group>
  )
}
