import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { enterPage } from '../../animations/pageTransition'

export function PageTransition({ children }) {
  const ref = useRef(null)
  const location = useLocation()

  useLayoutEffect(() => {
    enterPage(ref.current)
    const lenis = window.__lenis
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="page-transition" ref={ref} key={location.pathname}>
      {children}
    </div>
  )
}
