import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { Logo } from '../Logo'
import { navCta, navLinks, navPrimary, products } from '../../data/content'
import { prefersReducedMotion } from '../../animations/config'

export function Navbar({ onDatasheet }) {
  const [scrolled, setScrolled] = useState(false)
  const [onLight, setOnLight] = useState(false)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(true)
  const [catalogue, setCatalogue] = useState(false)
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const linksRef = useRef(null)
  const megaRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
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
    setCatalogue(false)
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
      gsap.fromTo(panelRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' })
      gsap.fromTo(
        linksRef.current?.querySelectorAll('a, button') ?? [],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, delay: 0.08, ease: 'power3.out' }
      )
    })
    return () => ctx.revert()
  }, [open])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setCatalogue(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const items = [...navLinks, navCta]

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${onLight ? 'is-light' : ''} ${hidden ? 'is-hidden' : ''}`}>
        <div className="nav__inner">
          <Link to="/" className="nav__brand" aria-label="Samudra Astra Defence Systems home">
            <Logo variant={onLight ? 'black' : 'white'} />
          </Link>

          <nav className="nav__links" aria-label="Primary">
            <div
              className="nav__item"
              onMouseEnter={() => setCatalogue(true)}
              onMouseLeave={() => setCatalogue(false)}
            >
              <NavLink
                to="/products"
                className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                onFocus={() => setCatalogue(true)}
              >
                Products
              </NavLink>
              <div className={`nav-mega ${catalogue ? 'is-open' : ''}`} ref={megaRef}>
                <p className="nav-mega__kicker">Products</p>
                <p className="nav-mega__title">Sentinel Series</p>
                <ul>
                  {products.map((item) => (
                    <li key={item.slug}>
                      <Link to={`/products/${item.slug}`}>
                        <span>{item.code.replace('SENTINEL-', '')}</span>
                        <b>{item.role}</b>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {navLinks
              .filter((item) => item.href !== '/products')
              .map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            <NavLink
              to={navCta.href}
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            >
              {navCta.label}
            </NavLink>
          </nav>

          <div className="nav__end">
            <button className="nav__cta" type="button" onClick={onDatasheet}>
              {navPrimary.label}
            </button>
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
              <div className="nav-overlay__series">
                {products.map((item) => (
                  <Link key={item.slug} to={`/products/${item.slug}`} onClick={() => setOpen(false)}>
                    <span>{item.code.replace('SENTINEL-', '')}</span>
                    {item.role}
                  </Link>
                ))}
              </div>
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
