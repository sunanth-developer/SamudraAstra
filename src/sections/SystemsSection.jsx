import { useState } from 'react'
import { Link } from 'react-router-dom'
import { systems } from '../data/content'

const layers = ['System', 'Sensors', 'Communication', 'Autonomy', 'Mission control']

const layerBySystem = {
  '01': 3,
  '02': 1,
  '03': 2,
  '04': 4,
}

export function SystemsSection() {
  const [active, setActive] = useState(systems[0])
  const layerIndex = layerBySystem[active.id] ?? 0

  return (
    <section className="systems-sec theme-light" id="systems">
      <div className="container">
        <header className="systems-sec__head">
          <p className="eyebrow">The system</p>
          <h2 className="section-heading">
            Integrated for the
            <br />
            maritime domain.
          </h2>
          <p className="body systems-sec__lead">
            System development areas — described as capability, not as fielded
            products, contracts or specifications.
          </p>
        </header>

        <div className="systems-sec__grid">
          {systems.map((item) => (
            <Link
              key={item.id}
              to="/systems"
              className={`system-card ${item.id === active.id ? 'is-active' : ''}`}
              data-cursor="EXPLORE"
              onMouseEnter={() => setActive(item)}
              onFocus={() => setActive(item)}
            >
              <span className="system-card__label">
                <i />
                System {item.id}
              </span>
              <strong className="system-card__title">{item.name}</strong>
              <p>{item.body}</p>
              <ul className="system-card__meta">
                <li>{item.domain}</li>
                <li>{item.mode}</li>
                <li>{item.mission}</li>
              </ul>
              <span className="system-card__visual" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <aside className="systems-sec__detail" aria-label="Selected system">
          <div>
            <p className="meta">
              <i className="systems-sec__live" />
              {active.meta}
            </p>
            <h3 className="card-heading">{active.name}</h3>
            <p className="body">{active.body}</p>
          </div>
          <ol className="systems-sec__layers">
            {layers.map((layer, i) => (
              <li key={layer} className={i === layerIndex ? 'is-active' : ''}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {layer}
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  )
}
