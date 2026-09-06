import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
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
    <section className="systems-sec" id="systems">
      <div className="container">
        <p className="eyebrow">03 / Systems</p>
        <h2 className="section-heading">Engineered for the maritime domain.</h2>
        <p className="body systems-sec__lead">
          System development areas — described as capability, not as fielded
          products, contracts or specifications.
        </p>

        <div className="systems-sec__layout">
          <div className="systems-sec__list">
            {systems.map((item) => (
              <Link
                key={item.id}
                to="/systems"
                className={`systems-sec__row ${item.id === active.id ? 'is-active' : ''}`}
                data-cursor="EXPLORE"
                onMouseEnter={() => setActive(item)}
                onFocus={() => setActive(item)}
              >
                <span className="systems-sec__id">System {item.id}</span>
                <span className="systems-sec__name">{item.name}</span>
                <span className="systems-sec__copy">{item.body}</span>
                <span className="systems-sec__arrow" aria-hidden="true">
                  <ArrowRight size={20} />
                </span>
              </Link>
            ))}
          </div>

          <aside className="systems-sec__hud" aria-label="Active system panel">
            <p className="meta">System {active.id}</p>
            <h3>{active.name}</h3>
            <dl>
              <div>
                <dt>Status</dt>
                <dd>
                  <span className="systems-sec__live" /> Active
                </dd>
              </div>
              <div>
                <dt>Domain</dt>
                <dd>{active.domain}</dd>
              </div>
              <div>
                <dt>Mode</dt>
                <dd>{active.mode}</dd>
              </div>
              <div>
                <dt>Mission</dt>
                <dd>{active.mission}</dd>
              </div>
              <div>
                <dt>Class</dt>
                <dd>{active.meta}</dd>
              </div>
            </dl>

            <ol className="systems-sec__layers">
              {layers.map((layer, i) => (
                <li key={layer} className={i === layerIndex ? 'is-active' : ''}>
                  {layer}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  )
}
