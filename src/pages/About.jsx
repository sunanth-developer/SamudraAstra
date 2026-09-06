import { Seo } from '../components/Seo'
import { ImageReveal } from '../components/ImageReveal/ImageReveal'
import { aboutPillars, whyStatements } from '../data/content'
import { media } from '../data/media'

export function About() {
  return (
    <article className="page">
      <Seo
        title="About"
        description="Samudra Astra is an emerging defence technology company focused on the aquatic domain — engineering, autonomy, sensing and intelligence."
      />
      <header className="page__hero container">
        <p className="eyebrow">Company</p>
        <h1 className="display">Building the future of maritime systems.</h1>
        <p className="body">
          Samudra Astra is an emerging defence technology company focused on the
          aquatic domain. We combine engineering, autonomous systems, sensing
          and intelligent data technologies to address the challenges of
          maritime security.
        </p>
      </header>

      <div className="page__about container">
        <div className="page__about-media">
          <ImageReveal
            src={media.engineer}
            alt="Engineer in a technical laboratory"
            parallax
          />
        </div>
        <div className="page__about-copy">
          <h2 className="card-heading">What we are</h2>
          <p className="body">
            A compact engineering company working on technologies for the
            maritime and underwater domain. Research, systems and mission
            thinking in one place.
          </p>
          <h2 className="card-heading">How we work</h2>
          <p className="body">
            From research and prototyping to integration and validation. We
            describe capability honestly. We do not present unannounced systems
            as fielded products.
          </p>
          <ul className="about-pillars">
            {aboutPillars.map((item) => (
              <li className="about-pillar" key={item.id}>
                <span className="meta">{item.id}</span>
                <strong>{item.title}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container" style={{ marginTop: 'var(--space-9)' }}>
        <h2 className="section-heading" style={{ marginBottom: 'var(--space-6)' }}>
          Indigenous technology.
          <br />
          Maritime advantage.
        </h2>
        <ul className="why-list">
          {whyStatements.map((item) => (
            <li className="why-item" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
