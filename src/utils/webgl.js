export function detectWebGL() {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

export function isSimplifiedScene() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(max-width: 1023px)').matches
}

export function shouldUseVesselScene() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return detectWebGL()
}
