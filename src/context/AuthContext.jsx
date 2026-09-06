import { createContext, useContext, useMemo, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getCurrentUser())
  const [loading, setLoading] = useState(false)

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      loading,
      async login(email, password, remember) {
        setLoading(true)
        try {
          const session = await authService.login(email, password, remember)
          setUser(session)
          return session
        } finally {
          setLoading(false)
        }
      },
      async logout() {
        setLoading(true)
        try {
          await authService.logout()
          setUser(null)
        } finally {
          setLoading(false)
        }
      },
    }),
    [user, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
