import { Link, useOutletContext } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { JsonLd } from '../components/JsonLd'
import { TechnicalSpec } from '../components/TechnicalSpec/TechnicalSpec'
import { USVViewer } from '../components/USVViewer/USVViewer'
import { images } from '../data/imageConfig'
import { brand, commonTechnical, missionModules, platformSpecs, products } from '../data/content'

export function Products() {
  const { openDatasheet } = useOutletContext() ?? {}

  return (
    <article className="page">
      <Seo
        title="Sentinel Series | Samudra Astra Defence Systems"
        description="The Sentinel Series is a family of sub-6-metre USVs for surveillance, reconnaissance and interception."
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://samudraastra.com/' },
            { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://samudraastra.com/products' },
          ],
        }}
      />

      <header className="container sads-page-hero" data-reveal>
        <p className="sads-crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          Products
        </p>
        <p className="eyebrow">The Sentinel Series</p>
        <h1 className="section-heading">One platform. Multiple missions.</h1>
        <p className="body">
          Multi-disciplinary craft for diverse missions: surveillance, reconnaissance, and
          interception. All Sentinel Series vessels share a common platform architecture.
        </p>
      </header>

      <section className="sads-section sads-section--navy">
        <div className="container sads-family" data-reveal>
          {products.map((item) => (
            <article key={item.slug}>
              <div className="sads-family__copy">
                <p className="eyebrow">{item.role}</p>
                <h2 className="sads-name">{item.code}</h2>
                <p className="meta">{item.epithet}</p>
                <p className="body">{item.summary}</p>
                <Link className="btn btn--solid" to={`/products/${item.slug}`}>
                  Explore {item.code}
                </Link>
              </div>
              <div className="sads-family__visual">
                <USVViewer
                  src={images[item.slug === 'sentinel-r' ? 'sentinelR' : item.slug === 'sentinel-i' ? 'sentinelI' : 'sentinelM']}
                  alt={`${item.code} configuration`}
                  annotations={item.annotations}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sads-section sads-section--dark">
        <div className="container" data-reveal>
          <p className="eyebrow">Common platform</p>
          <h2 className="section-heading">Shared architecture.</h2>
          <div className="sads-spec-grid">
            {platformSpecs.map((item) => (
              <TechnicalSpec key={item.label} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="sads-section sads-section--navy">
        <div className="container">
          <p className="eyebrow">Common technical specifications</p>
          <div className="sads-spec-grid">
            {commonTechnical.map((item) => (
              <TechnicalSpec key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      </section>

      <section className="sads-section sads-section--dark">
        <div className="container">
          <p className="eyebrow">Mission modules</p>
          <h2 className="section-heading">Interchangeable mission systems.</h2>
          <div className="sads-modules">
            {missionModules.map((item) => (
              <article className="sads-module" key={item.id}>
                <p className="eyebrow">{item.name}</p>
                <ul className="sads-list">
                  {item.items.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="sads-hero__actions" style={{ marginTop: 36 }}>
            <button className="btn btn--solid" type="button" onClick={openDatasheet}>
              Request Datasheet
            </button>
            <a className="btn" href={`mailto:${brand.email}`}>
              Start a Conversation
            </a>
          </div>
        </div>
      </section>
    </article>
  )
}
