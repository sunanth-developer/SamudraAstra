import { Link } from 'react-router-dom'
import { Logo } from '../Logo'
import { footerLinks, services } from '../../data/content'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Logo variant="white" />
          <p className="footer__descriptor">
            Built for the blue. Defined by precision.
          </p>
        </div>

        <div className="footer__grid">
          <div className="footer__col">
            <p className="meta">Navigate</p>
            <ul>
              {footerLinks
                .filter((item) => item.href !== '/')
                .map((item) => (
                  <li key={item.href}>
                    <Link to={item.href}>{item.label}</Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="meta">Capabilities</p>
            <ul>
              {services.map((item) => (
                <li key={item.id}>
                  <Link to="/capabilities">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="meta">Company</p>
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Get in Touch</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
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
