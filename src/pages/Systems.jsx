import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Seo } from '../components/Seo'
import { ImageReveal } from '../components/ImageReveal/ImageReveal'
import { MagneticButton } from '../components/MagneticButton/MagneticButton'
import { systems } from '../data/content'

export function Systems() {
  return (
    <article className="page">
      <Seo
        title="Systems"
        description="System development areas at Samudra Astra: autonomous underwater systems, sensors, maritime surveillance, and mission control."
      />
      <header className="page__hero container">
        <p className="eyebrow">03 / Systems</p>
        <h1 className="display">Engineered for the maritime domain.</h1>
        <p className="body">
          System development areas. Until a platform is formally announced, we
          describe capability — not deployed products, contracts, or
          specifications.
        </p>
      </header>

      <div className="page__list container">
        {systems.map((item) => (
          <section className="system-block" key={item.id}>
            <div className="system-block__media">
              <ImageReveal src={item.image} alt={item.name} />
            </div>
            <div>
              <span className="meta">
                System {item.id} · {item.meta}
              </span>
              <h2 className="card-heading">{item.name}</h2>
              <p className="body">{item.body}</p>
              <p className="meta">
                Domain {item.domain} · Mode {item.mode} · Mission {item.mission}
              </p>
              <Link to="/contact" className="link-line">
                Discuss this area <ArrowRight size={14} />
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
