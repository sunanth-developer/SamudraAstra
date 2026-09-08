import { Link } from 'react-router-dom'
import { Logo } from '../Logo'
import { brand, footerLinks } from '../../data/content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo variant="white" />
            <p className="footer__tagline">
              Command the Blue Horizon.
              <br />
              No Compromise.
            </p>
          </div>
          <nav className="footer__nav" aria-label="Footer">
            {footerLinks.map((item) => (
              <Link key={item.href} to={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer__base">
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <p>{brand.parent}</p>
          <p>© {new Date().getFullYear()} Samudra Astra Defence Systems</p>
        </div>
      </div>
    </footer>
  )
}
