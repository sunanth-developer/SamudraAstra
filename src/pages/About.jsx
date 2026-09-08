import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { JsonLd } from '../components/JsonLd'
import {
  aboutFacts,
  brand,
  designPhilosophy,
  heritageSteps,
  whyPillars,
} from '../data/content'

export function About() {
  return (
    <article className="page">
      <Seo
        title="About Samudra Astra Defence Systems"
        description="Samudra Astra Defence Systems engineers complete marine unmanned systems for India's defence requirements."
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Samudra Astra Defence Systems',
          mainEntity: {
            '@type': 'Organization',
            name: brand.name,
            parentOrganization: 'Eunoia Innovations Private Limited',
          },
        }}
      />

      <header className="container sads-page-hero" data-reveal>
        <p className="eyebrow">About</p>
        <h1 className="section-heading">Engineered for resilience. Built for sovereignty.</h1>
        <p className="body">{brand.parent}</p>
      </header>

      <section className="sads-section sads-section--navy">
        <div className="container sads-manifesto" data-reveal>
          <p className="eyebrow">Our mission</p>
          <h2 className="display">A single mandate.</h2>
          <p className="body sads-manifesto__lead">
            Samudra Astra Defence Systems was founded with a single, audacious mandate: to
            engineer complete marine unmanned systems for India’s defence forces, solving
            operational challenges that have waited too long for indigenous answers.
          </p>
          <p className="body">
            We are not born to compete for what already exists. We are born to anticipate the
            problem statements of tomorrow’s battlefields — and to build the solutions that
            bridge capability gaps with certainty, resilience, and Indian ingenuity.
          </p>
        </div>
      </section>

      <section className="sads-section sads-section--mist theme-light">
        <div className="container">
          <p className="eyebrow">The Samudra Astra philosophy</p>
          <h2 className="section-heading">{brand.tagline}</h2>
          <p className="body">
            The blue horizon represents the maritime domain — vast, contested, and unforgiving.
            To command it requires platforms that are:
          </p>
          <div className="sads-principles">
            {whyPillars.map((item) => (
              <article key={item.id}>
                <p className="sads-num">{item.id}</p>
                <h3 className="display">{item.title}</h3>
                <p className="body">{item.line}</p>
              </article>
            ))}
          </div>
          <p className="body" style={{ marginTop: 40 }}>
            No Compromise. means we do not trade endurance for speed, payload for reliability,
            or cost for capability. Every design decision is measured against operational reality.
          </p>
        </div>
      </section>

      <section className="sads-section sads-section--dark">
        <div className="container">
          <p className="eyebrow">Design philosophy</p>
          <ol className="sads-timeline">
            {designPhilosophy.map((item) => (
              <li key={item.id}>
                <p className="meta">{item.id}</p>
                <div>
                  <h2 className="card-heading">{item.title}</h2>
                  <p className="body">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sads-section sads-section--navy">
        <div className="container">
          <p className="eyebrow">Our heritage</p>
          <h2 className="section-heading">Eunoia Innovations Private Limited</h2>
          <p className="body">
            Eunoia Innovations Private Limited — the parent entity — brings deep expertise in
            precision engineering, systems integration, and defence technology development.
            Samudra Astra Defence Systems is the vehicle for our leap into complete marine
            platforms: to conceive, design, integrate, test, and deliver entire Unmanned Surface
            Vessel systems as total solutions.
          </p>
          <ol className="sads-lifecycle">
            {heritageSteps.map((item) => (
              <li key={item.id}>
                <p className="sads-num">{item.id}</p>
                <h3 className="card-heading">{item.title}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sads-section sads-section--mist theme-light">
        <div className="container sads-india">
          <p className="eyebrow">India</p>
          <h2 className="section-heading">Why India needs indigenous USVs</h2>
          <p className="body">
            India’s maritime borders span over 7,500 kilometres, with critical sea lanes, island
            territories, and exclusive economic zones requiring persistent surveillance and rapid
            response. Global USV benchmarks show that the 6-metre class is becoming a highly
            capable tactical platform — not merely a small surveillance boat.
          </p>
          <p className="body">
            The opportunity: to build compact, fast, modular, autonomous, and long-range vessels
            at scale, reducing dependency on foreign imports while strengthening India’s defence
            industrial base.
          </p>
          <p className="body">
            Samudra Astra’s response: the Sentinel Series — a family of sub-6-metre USVs designed
            specifically for Indian operational conditions, Indian manufacturing, and Indian
            strategic requirements.
          </p>
        </div>
      </section>

      <section className="sads-section sads-section--dark">
        <div className="container">
          <div className="sads-systems sads-systems--dark">
            {aboutFacts.map((item) => (
              <div key={item.label}>
                <p className="eyebrow">{item.label}</p>
                <p className="card-heading">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="sads-actions">
            <Link className="btn btn--solid" to="/products">
              Explore the Sentinel Series
            </Link>
            <Link className="btn" to="/contact">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
