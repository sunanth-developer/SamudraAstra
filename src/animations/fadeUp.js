import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ease, prefersReducedMotion } from './config'

export function fadeUp(targets, options = {}) {
  const reduced = prefersReducedMotion()
  const els = gsap.utils.toArray(targets)

  els.forEach((el, i) => {
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, filter: 'none' })
      return
    }

    gsap.fromTo(
      el,
      { opacity: 0, y: options.y ?? 50, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: options.duration ?? 1.05,
        ease: ease.out,
        delay: (options.stagger ?? 0.12) * i,
        scrollTrigger: {
          trigger: options.trigger || el,
          start: options.start || 'top 82%',
          once: true,
        },
      }
    )
  })
}

export function killFadeTriggers(scope) {
  ScrollTrigger.getAll().forEach((st) => {
    if (!scope || scope.contains(st.trigger)) st.kill()
  })
}
