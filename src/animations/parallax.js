import gsap from 'gsap'
import { prefersReducedMotion } from './config'

export function scrubScale(target, trigger, from = 1, to = 1.12) {
  if (!target || prefersReducedMotion()) return

  gsap.fromTo(
    target,
    { scale: from },
    {
      scale: to,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
}

export function scrubY(target, trigger, from = 0, to = -80) {
  if (!target || prefersReducedMotion()) return

  gsap.fromTo(
    target,
    { y: from },
    {
      y: to,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
}

export function scrubOpacity(target, trigger, from = 1, to = 0) {
  if (!target || prefersReducedMotion()) return

  gsap.fromTo(
    target,
    { opacity: from },
    {
      opacity: to,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
}
