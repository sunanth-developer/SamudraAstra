import gsap from 'gsap'
import { ease, prefersReducedMotion } from './config'

export function revealImage(wrapper, media, options = {}) {
  if (!wrapper) return

  if (prefersReducedMotion()) {
    wrapper.classList.add('is-revealed')
    gsap.set(wrapper, { clipPath: 'inset(0% 0% 0% 0%)' })
    gsap.set(media, { scale: 1, opacity: 1 })
    return
  }

  gsap.set(wrapper, { clipPath: 'inset(100% 0% 0% 0%)' })
  if (media) gsap.set(media, { scale: 1.12, opacity: 1 })

  const play = () => {
    wrapper.classList.add('is-revealed')
    const tl = gsap.timeline()
    tl.to(wrapper, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: options.duration ?? 1.15,
      ease: ease.out,
    })
    if (media) {
      tl.to(
        media,
        {
          scale: 1,
          duration: options.duration ?? 1.35,
          ease: ease.out,
        },
        0
      )
    }
    return tl
  }

  return gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: options.start || 'top 92%',
      once: true,
      onEnter: play,
    },
  })
}

export function parallaxImage(media, trigger, amount = 80) {
  if (!media || prefersReducedMotion()) return

  return gsap.fromTo(
    media,
    { yPercent: -amount * 0.08 },
    {
      yPercent: amount * 0.08,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    }
  )
}
