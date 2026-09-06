import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { isFinePointer, prefersReducedMotion } from '../../animations/config'

export function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return undefined

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring) return undefined

    document.body.classList.add('has-cursor')

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      gsap.to(dot, { x: mouse.x, y: mouse.y, duration: 0.12, ease: 'power2.out' })
    }

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.18
      pos.y += (mouse.y - pos.y) * 0.18
      gsap.set(ring, { x: pos.x, y: pos.y })
    }

    const ticker = () => tick()
    gsap.ticker.add(ticker)
    window.addEventListener('mousemove', onMove)

    const setState = (active, text) => {
      ring.classList.toggle('is-active', active)
      label.textContent = text || ''
    }

    const enter = (e) => {
      const text = e.currentTarget.getAttribute('data-cursor') || 'OPEN'
      setState(true, text)
    }
    const leave = () => setState(false, '')

    const bind = () => {
      document.querySelectorAll('[data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }

    bind()
    const observer = new MutationObserver(bind)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(ticker)
      observer.disconnect()
      document.querySelectorAll('[data-cursor]').forEach((el) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor__ring" ref={ringRef}>
        <span className="cursor__label" ref={labelRef} />
      </div>
      <div className="cursor__dot" ref={dotRef} />
    </div>
  )
}
