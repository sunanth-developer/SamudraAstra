import { STORAGE_KEYS } from './storage'
import { apiRequest } from './api'

const SESSION_KEY = STORAGE_KEYS.session

function readSession() {
  const raw =
    window.sessionStorage.getItem(SESSION_KEY) ||
    window.localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function persistSession(session, remember) {
  const encoded = JSON.stringify(session)
  window.sessionStorage.setItem(SESSION_KEY, encoded)
  if (remember) window.localStorage.setItem(SESSION_KEY, encoded)
  else window.localStorage.removeItem(SESSION_KEY)
}

function toClientUser(payload) {
  const user = payload.user || payload
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    initials: user.initials,
    token: payload.token || user.token,
  }
}

export const authService = {
  async login(email, password, remember = false) {
    try {
      const data = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: { email, password, remember },
      })
      const session = toClientUser(data)
      persistSession(session, remember)
      return session
    } catch (error) {
      if (error.status === 401) {
        const invalid = new Error('INVALID CREDENTIALS')
        invalid.code = 'INVALID_CREDENTIALS'
        throw invalid
      }
      throw error
    }
  },

  async logout() {
    const session = readSession()
    try {
      await apiRequest('/api/auth/logout', {
        method: 'POST',
        token: session?.token,
      })
    } catch {
      // Client session is cleared even if the API is unreachable.
    }
    window.sessionStorage.removeItem(SESSION_KEY)
    window.localStorage.removeItem(SESSION_KEY)
  },

  isAuthenticated() {
    const session = readSession()
    return Boolean(session?.token)
  },

  getCurrentUser() {
    const session = readSession()
    return session?.token ? session : null
  },
}
