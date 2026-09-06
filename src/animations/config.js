import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerGsap() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

export const ease = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isDesktop() {
  return window.matchMedia('(min-width: 1024px)').matches
}

export function isFinePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}
