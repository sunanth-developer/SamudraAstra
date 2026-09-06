import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../data/content'
import { isFinePointer } from '../animations/config'

export function ServicesSection() {
  const [preview, setPreview] = useState(null)
  const previewRef = useRef(null)

  useEffect(() => {
    const hide = () => {
      const el = previewRef.current
      if (!el) return
      el.classList.remove('is-on')
      setPreview(null)
    }
    window.addEventListener('scroll', hide, { passive: true })
    return () => window.removeEventListener('scroll', hide)
  }, [])

  const showPreview = (e, item) => {
    if (!isFinePointer() || window.matchMedia('(max-width: 1023px)').matches) return
    const el = previewRef.current
    if (!el) return
    setPreview(item)
    el.style.transform = `translate3d(${e.clientX + 28}px, ${e.clientY - 96}px, 0)`
    el.classList.add('is-on')
  }

  const hidePreview = () => {
    previewRef.current?.classList.remove('is-on')
    setPreview(null)
  }

  return (
    <section className="services" id="capabilities">
      <div className="container">
        <p className="eyebrow">02 / Capabilities</p>
        <h2 className="services__title">
          See further.
          <br />
          Understand faster.
          <br />
          Respond with precision.
        </h2>

        <div className="services__list">
          {services.map((item) => (
            <Link
              key={item.id}
              to="/capabilities"
              className="service-row"
              data-cursor="VIEW"
              onMouseMove={(e) => showPreview(e, item)}
              onMouseLeave={hidePreview}
            >
              <span className="service-row__num">{item.id}</span>
              <span className="service-row__name">{item.name}</span>
              <span className="service-row__desc">{item.description}</span>
              <span className="service-row__arrow" aria-hidden="true">
                <ArrowRight size={22} />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="service-preview" ref={previewRef} aria-hidden="true">
        {preview && <img src={preview.image} alt="" />}
      </div>
    </section>
  )
}
