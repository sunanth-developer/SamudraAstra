import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/Logo'
import { useAuth } from '../../context/AuthContext'

export function AdminLogin() {
  const { login, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('admin@samudraastra.com')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [hint, setHint] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setHint('')
    if (!email.trim() || !password) {
      setError('Required fields are missing')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email')
      return
    }
    try {
      await login(email, password, remember)
      const next = location.state?.from?.pathname || '/admin/dashboard'
      navigate(next, { replace: true })
    } catch (err) {
      setError(err.message || 'INVALID CREDENTIALS')
    }
  }

  return (
    <div className="cms-login">
      <div className="cms-login__fx" aria-hidden="true">
        <span className="cms-login__ring" />
        <span className="cms-login__ring cms-login__ring--b" />
        <span className="cms-login__grid" />
      </div>
      <form className="cms-login__panel" onSubmit={onSubmit}>
        <Logo />
        <p className="cms-kicker">Administration</p>
        <p className="cms-login__lead">Manage Samudra Astra content and insights.</p>

        <label>
          Email
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label className="cms-check">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>

        {error ? <p className="cms-error">{error}</p> : null}
        {hint ? <p className="cms-hint">{hint}</p> : null}

        <button className="cms-btn cms-btn--solid" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <button
          type="button"
          className="cms-text-btn"
          onClick={() =>
            setHint('Ask an administrator to reset the account password.')
          }
        >
          Forgot password?
        </button>
        <p className="cms-proto">Sign in with an administrator account.</p>
      </form>
    </div>
  )
}
