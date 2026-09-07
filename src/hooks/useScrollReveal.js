import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { prefersReducedMotion } from '../animations/config'

export function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((node) => {
        if (node.closest('#journey')) return
        gsap.fromTo(
          node,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: node, start: 'top 86%' },
          }
        )
      })
    })

    return () => ctx.revert()
  }, [pathname])
}
