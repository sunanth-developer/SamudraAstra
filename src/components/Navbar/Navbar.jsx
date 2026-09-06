import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { Logo } from '../Logo'
import { navLinks } from '../../data/content'
import { prefersReducedMotion } from '../../animations/config'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
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
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
      gsap.fromTo(
        panelRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }
      )
      gsap.fromTo(
        linksRef.current?.querySelectorAll('a, button') ?? [],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, delay: 0.12, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [open])

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden ? 'is-hidden' : ''}`}>
        <div className="nav__inner">
          <div className="nav__hull" aria-hidden="true">
            <div className="nav__hull-glass" />
            <svg className="nav__usv" viewBox="0 0 1000 80" preserveAspectRatio="none">
              <path
                className="nav__usv-body"
                d="M22 40 L42 12 L88 5 L220 3 L520 4 L780 7 L900 14 L958 28 L994 40 L958 52 L900 66 L780 73 L520 76 L220 77 L88 75 L42 68 Z"
              />
            </svg>
          </div>
          <Link to="/" className="nav__brand" aria-label="Samudra Astra home">
            <Logo />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `nav__link ${isActive ? 'is-active' : ''}`
                }
                end={item.href === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav__end">
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
              {navLinks.map((item, i) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                >
                  <span>0{i + 1}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
