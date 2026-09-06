import { Link } from 'react-router-dom'
import { serviceLabels, services } from '../data/content'

export function ServicesSection() {
  return (
    <section className="services theme-light" id="technology">
      <div className="container">
        <p className="eyebrow">Technology</p>
        <h2 className="services__title">
          Engineered for
          <br />
          real-world missions.
        </h2>
        <p className="body services__lead">
          Technology areas under development for the maritime domain. These are
          capability descriptions — not a catalogue of fielded products.
        </p>

        <div className="tech-grid">
          {services.map((item) => (
            <Link
              key={item.id}
              to="/capabilities"
              className="tech-card"
              data-cursor="VIEW"
            >
              <span className="tech-card__label">
                <i />
                {serviceLabels[item.id]}
              </span>
              <strong className="tech-card__title">{item.name}</strong>
              <p>{item.description}</p>
              <span className="tech-card__visual" aria-hidden="true" />
              <em>{item.id}</em>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
