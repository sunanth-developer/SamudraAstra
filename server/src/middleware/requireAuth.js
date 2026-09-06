import { getAdminFromToken } from '../auth.js'

export async function requireAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : ''
    req.user = await getAdminFromToken(token)
    next()
  } catch (error) {
    next(error)
  }
}

export async function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return next()
  try {
    req.user = await getAdminFromToken(token)
    next()
  } catch (error) {
    next(error)
  }
}
