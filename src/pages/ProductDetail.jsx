import { Link, Navigate, useOutletContext, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { JsonLd } from '../components/JsonLd'
import { SpecRail } from '../components/SpecRail/SpecRail'
import { USVViewer } from '../components/USVViewer/USVViewer'
import { images } from '../data/imageConfig'
import { getProduct, platformSpecs } from '../data/content'

export function ProductDetail() {
  const { slug } = useParams()
  const { openDatasheet } = useOutletContext() ?? {}
  const product = getProduct(slug)

  if (!product) return <Navigate to="/products" replace />

  const visual =
    product.slug === 'sentinel-r'
      ? images.sentinelR
      : product.slug === 'sentinel-i'
        ? images.sentinelI
        : images.sentinelM

  return (
    <article className="page">
      <Seo title={product.seo.title} description={product.seo.description} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.code,
          description: product.seo.description,
          brand: 'Samudra Astra Defence Systems',
          category: 'Unmanned Surface Vessel',
        }}
      />

      <header className="sads-product-hero">
        <div className="sads-product-hero__media">
          <img src={visual} alt={`${product.code} ${product.epithet}`} />
        </div>
        <div className="container sads-product-hero__copy" data-reveal>
          <p className="sads-crumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/products">Products</Link>
            <span>/</span>
            {product.code}
          </p>
          <p className="eyebrow">{product.role}</p>
          <h1 className="sads-name">{product.code}</h1>
          <p className="meta">{product.epithet}</p>
          <p className="body">{product.summary}</p>
          <div className="sads-actions">
            <button className="btn btn--solid" type="button" onClick={openDatasheet}>
              Request Datasheet
            </button>
          </div>
        </div>
      </header>

      <section className="sads-section sads-section--dark">
        <div className="container">
          <p className="eyebrow">Performance</p>
          <SpecRail items={product.performance} />
        </div>
      </section>

      <section className="sads-section sads-section--navy">
        <div className="container">
          <USVViewer
            src={visual}
            alt={`${product.code} ${product.epithet}`}
            annotations={product.annotations}
            caption={`${product.code} · ${product.role}`}
          />
        </div>
      </section>

      <section className="sads-section sads-section--dark">
        <div className="container sads-split">
          <div>
            <p className="eyebrow">Mission</p>
            <h2 className="section-heading">Operational focus.</h2>
            <ul className="sads-list">
              {product.mission.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Design philosophy</p>
            <p className="body">{product.philosophy}</p>
          </div>
        </div>
      </section>

      <section className="sads-section sads-section--navy">
        <div className="container sads-split">
          <div>
            <p className="eyebrow">Key systems</p>
            <h2 className="section-heading">Fitted for the mission.</h2>
          </div>
          <ul className="sads-list">
            {product.systems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sads-section sads-section--mist theme-light">
        <div className="container">
          <p className="eyebrow">Use cases</p>
          <h2 className="section-heading">Where the platform works.</h2>
          <ul className="sads-usecases">
            {product.useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sads-section sads-section--dark">
        <div className="container">
          <p className="eyebrow">Common platform</p>
          <h2 className="section-heading">Shared Sentinel architecture.</h2>
          <SpecRail items={platformSpecs.slice(0, 4)} />
          <div className="sads-actions">
            <button className="btn btn--solid" type="button" onClick={openDatasheet}>
              Request Datasheet
            </button>
            <Link className="btn" to="/products">
              Explore the Sentinel Series
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
