import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar } from './Navbar/Navbar'
import { Footer } from './Footer/Footer'
import { Cursor } from './Cursor/Cursor'
import { PageTransition } from './PageTransition/PageTransition'
import { useLenis } from '../hooks/useLenis'

export function Layout() {
  useLenis()

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = window.setTimeout(refresh, 600)
    return () => {
      window.removeEventListener('load', refresh)
      window.clearTimeout(t)
    }
  }, [])

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <main id="main">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
