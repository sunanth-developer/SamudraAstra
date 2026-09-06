import { Link } from 'react-router-dom'
import { Logo } from '../Logo'
import { navLinks, services } from '../../data/content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wordmark">
          <Logo large />
        </div>
        <p className="footer__descriptor meta">Aquatic defence technology</p>

        <div className="footer__grid">
          <div>
            <p className="meta">Navigate</p>
            <ul>
              {navLinks
                .filter((item) => item.href !== '/')
                .map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="link-line">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="meta">Capabilities</p>
            <ul>
              {services.map((item) => (
                <li key={item.id}>
                  <Link to="/capabilities" className="link-line">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="meta">Company</p>
            <ul>
              <li>
                <Link to="/about" className="link-line">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-line">
                  Partner with us
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="link-line">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="meta">Domain</p>
            <p className="footer__muted">
              Technology for the maritime domain. Sensing, autonomy and
              intelligence beneath the surface.
            </p>
          </div>
        </div>

        <div className="footer__base">
          <p>© {new Date().getFullYear()} Samudra Astra</p>
          <p>Aquatic defence technology</p>
        </div>
      </div>
    </footer>
  )
}
