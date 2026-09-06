import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Particles({ count = 140 }) {
  const points = useRef()
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = Math.random() * 6 - 0.4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 28
      speeds[i] = 0.04 + Math.random() * 0.08
    }
    return { positions, speeds }
  }, [count])

  useFrame((_, delta) => {
    if (!points.current) return
    const arr = points.current.geometry.attributes.position.array
    for (let i = 0; i < count; i += 1) {
      arr[i * 3 + 1] += speeds[i] * delta
      if (arr[i * 3 + 1] > 5.4) arr[i * 3 + 1] = -0.3
    }
    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#dce8f2"
        size={0.028}
        transparent
        opacity={0.38}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
