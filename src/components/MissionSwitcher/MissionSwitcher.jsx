import { useState } from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../data/imageConfig'
import { products } from '../../data/content'
import { USVViewer } from '../USVViewer/USVViewer'
import './MissionSwitcher.css'

const visuals = {
  'sentinel-m': images.sentinelM,
  'sentinel-r': images.sentinelR,
  'sentinel-i': images.sentinelI,
}

export function MissionSwitcher() {
  const [index, setIndex] = useState(0)
  const active = products[index]

  return (
    <div className="switcher">
      <div className="switcher__tabs" role="tablist" aria-label="Sentinel mission configuration">
        {products.map((item, i) => (
          <button
            key={item.slug}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? 'is-active' : ''}
            onClick={() => setIndex(i)}
          >
            <span>{item.code.replace('SENTINEL-', '')}</span>
            {item.role}
          </button>
        ))}
      </div>

      <div className="switcher__stage">
        <USVViewer
          src={visuals[active.slug]}
          alt={`${active.code} configuration`}
          annotations={active.annotations}
          caption={`${active.code} · ${active.epithet}`}
        />
        <div className="switcher__copy" aria-live="polite">
          <p className="eyebrow">{active.code}</p>
          <h3 className="card-heading">{active.epithet}</h3>
          <p className="body">{active.summary}</p>
          <ul className="sads-list">
            {active.systems.slice(0, 4).map((system) => (
              <li key={system}>{system}</li>
            ))}
          </ul>
          <Link className="btn" to={`/products/${active.slug}`}>
            Explore {active.code}
          </Link>
        </div>
      </div>
    </div>
  )
}
