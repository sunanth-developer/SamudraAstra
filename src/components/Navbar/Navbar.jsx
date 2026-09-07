import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { Logo } from '../Logo'
import { navCta, navLinks, navPrimary } from '../../data/content'
import { prefersReducedMotion } from '../../animations/config'

export function Navbar({ onDatasheet }) {
  const [scrolled, setScrolled] = useState(false)
  const [onLight, setOnLight] = useState(false)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(true)
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const linksRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const lights = document.querySelectorAll('.theme-light')
    if (!lights.length) {
      setOnLight(false)
      return undefined
    }
    const observer = new IntersectionObserver(
      (entries) => {
        setOnLight(entries.some((entry) => entry.isIntersecting))
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0.08 }
    )
    lights.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setHidden(false)
  }, [])

  useEffect(() => {
    if (!open || !overlayRef.current) return undefined
    const reduced = prefersReducedMotion()
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([overlayRef.current, panelRef.current], { opacity: 1, y: 0 })
        return
      }
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.fromTo(panelRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
      gsap.fromTo(
        linksRef.current?.querySelectorAll('a, button') ?? [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.06, delay: 0.1, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [open])

  const items = [...navLinks, navCta]

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${onLight ? 'is-light' : ''} ${hidden ? 'is-hidden' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand" aria-label="Samudra Astra Defence Systems home">
            <Logo variant={onLight ? 'black' : 'white'} />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav__end">
            <button className="nav__cta" type="button" onClick={onDatasheet}>
              {navPrimary.label}
            </button>
            <Link to={navCta.href} className="nav__contact">
              {navCta.label}
            </Link>
            <button
              className="nav__menu"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="nav-overlay" ref={overlayRef}>
          <div className="nav-overlay__panel" ref={panelRef}>
            <div className="nav-overlay__links" ref={linksRef}>
              {items.map((item, i) => (
                <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
                  <span>0{i + 1}</span>
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onDatasheet?.()
                }}
              >
                <span>06</span>
                {navPrimary.label}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
