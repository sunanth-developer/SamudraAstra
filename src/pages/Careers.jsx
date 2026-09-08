import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { brand } from '../data/content'

export function Careers() {
  return (
    <article className="page">
      <Seo
        title="Careers | Samudra Astra Defence Systems"
        description="Build marine unmanned systems with Samudra Astra Defence Systems."
      />
      <header className="container sads-page-hero" data-reveal>
        <p className="eyebrow">Careers</p>
        <h1 className="section-heading">Build the systems that command the Blue Horizon.</h1>
        <p className="body">
          Roles will be published here when they are open. Until then, send an enquiry.
        </p>
        <div className="sads-actions">
          <Link className="btn btn--solid" to="/contact?subject=Careers">
            Contact Us
          </Link>
          <a className="btn" href={`mailto:${brand.email}`}>
            {brand.email}
          </a>
        </div>
      </header>
    </article>
  )
}
