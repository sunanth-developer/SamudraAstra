import { useEffect, useRef } from 'react'
import { parallaxImage, revealImage } from '../../animations/imageReveal'

export function ImageReveal({
  src,
  alt,
  className = '',
  parallax = false,
  hoverScale = true,
  eager = false,
}) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap) return undefined
    const reveal = revealImage(wrap, img)
    const parallaxTween = parallax ? parallaxImage(img, wrap) : null

    const fallback = window.setTimeout(() => {
      wrap.classList.add('is-revealed')
      wrap.style.clipPath = 'inset(0% 0% 0% 0%)'
    }, 2200)

    return () => {
      window.clearTimeout(fallback)
      reveal?.kill?.()
      parallaxTween?.kill?.()
    }
  }, [parallax, src])

  return (
    <div
      className={`image-reveal ${hoverScale ? 'image-reveal--hover' : ''} ${className}`}
      ref={wrapRef}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}
