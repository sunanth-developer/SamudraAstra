import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { technologyTracks } from '../data/content'

export function Technology() {
  return (
    <article className="page">
      <Seo
        title="Marine Unmanned Systems Technology | Samudra Astra"
        description="Technology architecture behind the Sentinel Series unmanned maritime systems."
      />
      <header className="container sads-page-hero" data-reveal>
        <p className="sads-crumbs">
          <Link to="/">Home</Link>
          <span>/</span>
          Technology
        </p>
        <p className="eyebrow">Technology</p>
        <h1 className="section-heading">Engineered from the hull up.</h1>
        <p className="body">
          Technology deep-dives into the architecture behind the Sentinel Series.
        </p>
      </header>

      <section className="sads-section sads-section--navy">
        <div className="container">
          <ol className="sads-teasers">
            {technologyTracks.map((item) => (
              <li key={item.id}>
                <p className="sads-num">{item.id}</p>
                <div>
                  <h2 className="display">{item.title}</h2>
                  <p className="sads-coming">Coming soon</p>
                  <p className="body">
                    Detailed engineering content for this track will be published when it is
                    released.
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  )
}
