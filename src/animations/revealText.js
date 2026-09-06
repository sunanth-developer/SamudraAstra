import gsap from 'gsap'
import { ease, prefersReducedMotion } from './config'

export function revealLines(lines, options = {}) {
  if (!lines?.length) return

  if (prefersReducedMotion()) {
    gsap.set(lines, { opacity: 1, y: 0, filter: 'none' })
    return
  }

  gsap.fromTo(
    lines,
    { opacity: 0, y: options.y ?? 40, filter: 'blur(10px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: options.duration ?? 1,
      ease: ease.out,
      stagger: options.stagger ?? 0.12,
      delay: options.delay ?? 0,
      scrollTrigger: options.scrollTrigger,
    }
  )
}

export function revealWords(words, options = {}) {
  if (!words?.length) return

  if (prefersReducedMotion()) {
    gsap.set(words, { opacity: 1, y: 0 })
    return
  }

  gsap.fromTo(
    words,
    { opacity: 0, y: '110%' },
    {
      opacity: 1,
      y: '0%',
      duration: options.duration ?? 0.85,
      ease: ease.out,
      stagger: options.stagger ?? 0.04,
      delay: options.delay ?? 0,
      scrollTrigger: options.scrollTrigger,
    }
  )
}

export function revealChars(chars, options = {}) {
  if (!chars?.length) return

  if (prefersReducedMotion()) {
    gsap.set(chars, { opacity: 1, y: 0 })
    return
  }

  gsap.fromTo(
    chars,
    { opacity: 0, y: '80%' },
    {
      opacity: 1,
      y: '0%',
      duration: 0.7,
      ease: ease.out,
      stagger: 0.02,
      ...options,
    }
  )
}
