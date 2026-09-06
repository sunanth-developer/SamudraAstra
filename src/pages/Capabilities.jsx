import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { ImageReveal } from '../components/ImageReveal/ImageReveal'
import { MagneticButton } from '../components/MagneticButton/MagneticButton'
import { services } from '../data/content'

export function Capabilities() {
  return (
    <article className="page">
      <Seo
        title="Capabilities"
        description="Samudra Astra capability areas: underwater surveillance, autonomous systems, sonar and sensing, maritime intelligence, and mission systems."
      />
      <header className="page__hero container">
        <p className="eyebrow">Capabilities</p>
        <h1 className="display">See further. Understand faster.</h1>
        <p className="body">
          Technology areas under development for the maritime domain. These are
          capability descriptions — not a catalogue of fielded products.
        </p>
      </header>

      <div className="page__list container">
        {services.map((item) => (
          <section className="system-block" key={item.id} id={item.slug}>
            <div className="system-block__media">
              <ImageReveal src={item.image} alt={item.name} />
            </div>
            <div>
              <span className="meta">{item.id} · Capability</span>
              <h2 className="card-heading">{item.name}</h2>
              <p className="body">{item.copy}</p>
              <Link to="/contact" className="link-line">
                Partner on this area <ArrowRight size={14} />
              </Link>
            </div>
          </section>
        ))}
      </div>

      <div className="page__end container">
        <MagneticButton to="/contact" variant="solid">
          Partner with us
        </MagneticButton>
      </div>
    </article>
  )
}
