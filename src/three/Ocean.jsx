import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertex = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    vUv = uv;
    vec3 p = position;
    float w1 = sin(p.x * 0.42 + uTime * 0.55) * 0.09;
    float w2 = sin(p.y * 0.28 - uTime * 0.38) * 0.06;
    float w3 = sin((p.x + p.y) * 0.18 + uTime * 0.22) * 0.05;
    vWave = w1 + w2 + w3;
    p.z += vWave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const fragment = `
  uniform float uTime;
  uniform float uUnder;
  uniform vec3 uDeep;
  uniform vec3 uShallow;
  varying vec2 vUv;
  varying float vWave;
  void main() {
    float foam = smoothstep(0.08, 0.14, vWave);
    vec3 color = mix(uDeep, uShallow, vUv.y * 0.35 + foam * 0.25);
    color = mix(color, vec3(0.02, 0.05, 0.1), uUnder * 0.72);
    float fade = smoothstep(0.0, 0.18, vUv.y) * smoothstep(1.0, 0.82, vUv.y);
    gl_FragColor = vec4(color, 0.92 * fade);
  }
`

export function Ocean({ underRef, simplified = false }) {
  const mat = useRef()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uUnder: { value: 0 },
      uDeep: { value: new THREE.Color('#08113f') },
      uShallow: { value: new THREE.Color('#246b70') },
    }),
    []
  )

  useFrame((_, delta) => {
    if (!mat.current) return
    uniforms.uTime.value += delta
    uniforms.uUnder.value = THREE.MathUtils.damp(
      uniforms.uUnder.value,
      underRef.current,
      3,
      delta
    )
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
      <planeGeometry args={simplified ? [60, 60, 28, 28] : [80, 80, 96, 96]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
