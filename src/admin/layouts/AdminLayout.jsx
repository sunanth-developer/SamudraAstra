import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  X,
} from 'lucide-react'
import { Logo } from '../../components/Logo'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/blogs', label: 'Blogs', icon: FileText, end: true },
  { to: '/admin/blogs/new', label: 'New Post', icon: Plus, indent: true },
  { to: '/admin/media', label: 'Media', icon: ImageIcon },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState(false)

  const onLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="cms-shell">
      <header className="cms-top">
        <button
          className="cms-icon-btn cms-top__menu"
          type="button"
          aria-label="Open navigation"
          onClick={() => setOpen(true)}
        >
          <Menu size={18} />
        </button>
        <p className="cms-top__brand">Samudra Astra Admin</p>
        <div className="cms-top__end">
          <span className="cms-live">
            Admin <i />
          </span>
          <div className="cms-user">
            <button
              type="button"
              className="cms-user__btn"
              aria-haspopup="menu"
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
            >
              <span>{user?.initials || 'SA'}</span>
              {user?.name || 'Admin'}
            </button>
            {menu && (
              <div className="cms-user__menu" role="menu">
                <Link to="/admin/settings" onClick={() => setMenu(false)}>
                  Profile
                </Link>
                <Link to="/admin/settings" onClick={() => setMenu(false)}>
                  Settings
                </Link>
                <a href="/" target="_blank" rel="noreferrer">
                  View website
                </a>
                <button type="button" onClick={onLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <aside className={`cms-side ${open ? 'is-open' : ''}`}>
        <div className="cms-side__head">
          <Logo />
          <button
            className="cms-icon-btn cms-side__close"
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <nav className="cms-side__nav" aria-label="Admin">
          {NAV.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `cms-side__link ${item.indent ? 'is-indent' : ''} ${isActive ? 'is-active' : ''}`
                }
                onClick={() => setOpen(false)}
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="cms-side__foot">
          <a href="/" className="cms-side__link">
            View website
          </a>
          <button type="button" className="cms-side__link" onClick={onLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {open && (
        <button className="cms-scrim" type="button" aria-label="Close menu" onClick={() => setOpen(false)} />
      )}

      <main className="cms-main">
        <Outlet />
      </main>
    </div>
  )
}
