import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar } from './Navbar/Navbar'
import { Footer } from './Footer/Footer'
import { Cursor } from './Cursor/Cursor'
import { PageTransition } from './PageTransition/PageTransition'
import { DatasheetModal } from './DatasheetModal/DatasheetModal'
import { useLenis } from '../hooks/useLenis'
import { useScrollReveal } from '../hooks/useScrollReveal'

export function Layout() {
  const [sheet, setSheet] = useState(false)
  const { pathname } = useLocation()
  useLenis()
  useScrollReveal()

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
    <div className={pathname === '/' ? 'app is-home' : 'app'}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Navbar onDatasheet={() => setSheet(true)} />
      <main id="main">
        <PageTransition>
          <Outlet context={{ openDatasheet: () => setSheet(true) }} />
        </PageTransition>
      </main>
      <Footer />
      <DatasheetModal open={sheet} onClose={() => setSheet(false)} />
    </div>
  )
}
