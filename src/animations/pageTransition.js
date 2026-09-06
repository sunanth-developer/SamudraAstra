import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ease, prefersReducedMotion } from './config'

export function enterPage(el) {
  if (!el) return
  if (prefersReducedMotion()) {
    gsap.set(el, { clearProps: 'all' })
    return
  }

  gsap.fromTo(
    el,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.55,
      ease: ease.out,
      onComplete: () => ScrollTrigger.refresh(),
    }
  )
}

export function leavePage(el) {
  if (!el) return Promise.resolve()
  if (prefersReducedMotion()) {
    gsap.set(el, { opacity: 0 })
    return Promise.resolve()
  }

  return gsap.to(el, {
    opacity: 0,
    y: -12,
    duration: 0.32,
    ease: 'power2.in',
  })
}
