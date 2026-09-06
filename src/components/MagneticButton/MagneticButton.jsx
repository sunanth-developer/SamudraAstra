import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { isFinePointer, prefersReducedMotion } from '../../animations/config'

export function MagneticButton({
  to,
  href,
  children,
  className = '',
  variant = 'outline',
  cursor = 'OPEN',
}) {
  const ref = useRef(null)
  const classes = `btn ${variant === 'solid' ? 'btn--solid' : ''} ${className}`

  const onMove = (e) => {
    if (!isFinePointer() || prefersReducedMotion()) return
    const el = ref.current
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * 0.22, y: y * 0.22, duration: 0.35, ease: 'power3.out' })
  }

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' })
  }

  const inner = (
    <>
      {children}
      <ArrowUpRight />
    </>
  )

  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={classes}
        data-cursor={cursor}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {inner}
      </Link>
    )
  }

  return (
    <a
      ref={ref}
      href={href}
      className={classes}
      data-cursor={cursor}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {inner}
    </a>
  )
}
