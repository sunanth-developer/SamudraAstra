import { useEffect, useState } from 'react'
import { showcaseViewIndex } from '../three/cameraPath'
import { useVesselProgress } from '../three/VesselProgress'

export function useVesselView() {
  const { showcaseRef } = useVesselProgress()
  const [view, setView] = useState(0)

  useEffect(() => {
    let frame
    const tick = () => {
      const next = showcaseViewIndex(showcaseRef.current)
      setView((current) => (current === next ? current : next))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [showcaseRef])

  return view
}
