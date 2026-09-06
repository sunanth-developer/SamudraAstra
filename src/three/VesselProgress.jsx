import { createContext, useContext, useMemo, useRef } from 'react'

const VesselProgressContext = createContext(null)

export function VesselProgressProvider({ children }) {
  const progressRef = useRef(0)
  const showcaseRef = useRef(0)
  const showcaseBlendRef = useRef(0)
  const readyRef = useRef(false)
  const failedRef = useRef(false)
  const listeners = useRef(new Set())

  const api = useMemo(
    () => ({
      progressRef,
      showcaseRef,
      showcaseBlendRef,
      readyRef,
      failedRef,
      setProgress(value) {
        progressRef.current = Math.min(1, Math.max(0, value))
      },
      setShowcase(progress, blend) {
        showcaseRef.current = Math.min(1, Math.max(0, progress))
        showcaseBlendRef.current = Math.min(1, Math.max(0, blend))
      },
      setReady(value) {
        readyRef.current = value
        listeners.current.forEach((fn) => fn())
      },
      setFailed(value) {
        failedRef.current = value
        listeners.current.forEach((fn) => fn())
      },
      subscribe(fn) {
        listeners.current.add(fn)
        return () => listeners.current.delete(fn)
      },
    }),
    []
  )

  return (
    <VesselProgressContext.Provider value={api}>
      {children}
    </VesselProgressContext.Provider>
  )
}

export function useVesselProgress() {
  const ctx = useContext(VesselProgressContext)
  if (!ctx) throw new Error('useVesselProgress must be used within VesselProgressProvider')
  return ctx
}
