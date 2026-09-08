import { Link } from 'react-router-dom'
import { images } from '../../data/imageConfig'
import { SpecRail } from '../SpecRail/SpecRail'
import './SentinelChapter.css'

const visuals = {
  'sentinel-m': images.sentinelM,
  'sentinel-r': images.sentinelR,
  'sentinel-i': images.sentinelI,
}

export function SentinelChapter({ product, mood = 'persist' }) {
  const ink = mood === 'precision'

  return (
    <section className={`chapter chapter--${mood} ${ink ? 'theme-light' : ''}`}>
      <div className="chapter__media">
        <img src={visuals[product.slug]} alt={`${product.code} ${product.epithet}`} />
      </div>
      <div className="container chapter__inner">
        <p className="eyebrow">{product.role}</p>
        <p className="chapter__code">{product.code}</p>
        <h2 className="section-heading">{product.epithet}</h2>
        <p className="body">{product.summary}</p>
        <ul className="sads-list chapter__mission">
          {product.mission.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <SpecRail items={product.performance.slice(0, 4)} ink={ink} />
        <div className="sads-actions">
          <Link className="btn btn--solid" to={`/products/${product.slug}`}>
            Explore {product.code}
          </Link>
        </div>
      </div>
    </section>
  )
}
