import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Particles({ count = 140 }) {
  const points = useRef()
  const { geometry, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 28
      positions[i * 3 + 1] = Math.random() * 6 - 0.4
      positions[i * 3 + 2] = (Math.random() - 0.5) * 28
      speeds[i] = 0.04 + Math.random() * 0.08
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return { geometry, speeds }
  }, [count])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((_, delta) => {
    const attr = points.current?.geometry?.attributes?.position
    if (!attr || attr.array.length !== count * 3) return
    const arr = attr.array
    for (let i = 0; i < count; i += 1) {
      arr[i * 3 + 1] += speeds[i] * delta
      if (arr[i * 3 + 1] > 5.4) arr[i * 3 + 1] = -0.3
    }
    attr.needsUpdate = true
  })

  return (
    <points ref={points} geometry={geometry}>
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
