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
            <p className="footer__parent">{brand.parent}</p>
          </div>
          <p className="footer__descriptor">{brand.tagline}</p>
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <p className="meta">Navigate</p>
            <ul>
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <p className="meta">Contact</p>
            <ul>
              <li>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
              </li>
            </ul>
          </div>
          <div className="footer__col footer__col--wide">
            <p className="meta">Position</p>
            <p className="footer__muted">{brand.supporting}</p>
          </div>
        </div>

        <div className="footer__base">
          <p>© {new Date().getFullYear()} Samudra Astra Defence Systems</p>
          <p>No Compromise.</p>
        </div>
      </div>
    </footer>
  )
}
