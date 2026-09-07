import { useEffect, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { media } from '../data/media'
import { useVesselProgress } from './VesselProgress'

useGLTF.preload(media.vesselModel)

export function GlbVessel() {
  const { scene } = useGLTF(media.vesselModel)
  const { setReady, setFailed } = useVesselProgress()

  const model = useMemo(() => {
    try {
      const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches
      const root = scene.clone(true)
      const box = new THREE.Box3().setFromObject(root)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      const target = 8.8
      const scale = target / Math.max(size.x, size.z, 0.001)
      const height = size.y * scale

      root.scale.setScalar(scale)
      root.position.set(
        -center.x * scale,
        -box.min.y * scale - height * 0.32,
        -center.z * scale
      )

      root.traverse((obj) => {
        if (!obj.isMesh) return
        if (obj.geometry?.morphAttributes && Object.keys(obj.geometry.morphAttributes).length) {
          obj.geometry = obj.geometry.clone()
          obj.geometry.morphAttributes = {}
          obj.morphTargetInfluences = undefined
          obj.morphTargetDictionary = undefined
        }
        obj.castShadow = !mobile
        obj.receiveShadow = !mobile
        obj.frustumCulled = true
        if (obj.material) {
          if (!mobile) obj.material = obj.material.clone()
          obj.material.envMapIntensity = mobile ? 0.95 : 0.7
          obj.material.toneMapped = true
          if (obj.material.emissive) {
            obj.material.emissive.set('#1a2740')
            obj.material.emissiveIntensity = mobile ? 0.28 : 0.12
          }
        }
      })

      return root
    } catch {
      return null
    }
  }, [scene])

  useEffect(() => {
    if (!model) {
      setFailed(true)
      setReady(true)
      return undefined
    }
    setFailed(false)
    setReady(true)
    return undefined
  }, [model, setFailed, setReady])

  if (!model) return null
  return <primitive object={model} />
}
