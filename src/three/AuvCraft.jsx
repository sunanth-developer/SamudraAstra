const BODY = '#11161f'
const SIGNAL = '#f68048'
const ICE = '#dce8f2'

export function AuvCraft() {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.13, 1.15, 8, 16]} />
        <meshStandardMaterial color={BODY} metalness={0.28} roughness={0.42} />
      </mesh>
      <mesh position={[0.68, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <sphereGeometry args={[0.128, 16, 12]} />
        <meshStandardMaterial
          color={ICE}
          metalness={0.15}
          roughness={0.12}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh position={[0.18, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.138, 0.018, 8, 20]} />
        <meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[-0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.138, 0.018, 8, 20]} />
        <meshStandardMaterial color={SIGNAL} emissive={SIGNAL} emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[-0.72, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.09, 0.09, 0.04, 12]} />
        <meshStandardMaterial color="#2a3344" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-0.82, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.11, 0.012, 8, 16]} />
        <meshStandardMaterial color={ICE} metalness={0.4} roughness={0.28} />
      </mesh>
    </group>
  )
}
