import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../animations/config'

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)')
    if (!desktop.matches) return undefined

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      syncTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    window.__lenis = lenis
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 160)

    return () => {
      window.clearTimeout(refresh)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}
