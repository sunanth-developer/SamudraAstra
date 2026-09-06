import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from './models/User.js'

const SALT_ROUNDS = 12

function publicUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    initials: user.initials,
  }
}

function signToken(user, remember = false) {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    const error = new Error('JWT secret is not configured.')
    error.status = 500
    throw error
  }

  return jwt.sign(
    {
      sub: String(user._id),
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: remember ? '7d' : '1d' }
  )
}

export async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'admin@samudraastra.com').toLowerCase().trim()
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME || 'Admin'

  if (!password) {
    console.warn('ADMIN_PASSWORD is not set. Skipping admin seed.')
    return
  }

  const existing = await User.findOne({ email })
  if (existing) return

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
  await User.create({
    name,
    email,
    passwordHash,
    role: 'Administrator',
    initials: name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'SA',
  })
  console.log(`Seeded admin account for ${email}`)
}

export async function loginAdmin({ email, password, remember = false } = {}) {
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
  const cleanPassword = typeof password === 'string' ? password : ''

  if (!cleanEmail || !cleanPassword) {
    const error = new Error('Email and password are required.')
    error.status = 400
    throw error
  }

  const user = await User.findOne({ email: cleanEmail }).select('+passwordHash')
  const matches = user ? await bcrypt.compare(cleanPassword, user.passwordHash) : false

  if (!user || !matches) {
    const error = new Error('Invalid credentials.')
    error.status = 401
    throw error
  }

  return {
    user: publicUser(user),
    token: signToken(user, Boolean(remember)),
  }
}

export async function getAdminFromToken(token) {
  if (!token) {
    const error = new Error('Authentication required.')
    error.status = 401
    throw error
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    const error = new Error('JWT secret is not configured.')
    error.status = 500
    throw error
  }

  let payload
  try {
    payload = jwt.verify(token, secret)
  } catch {
    const error = new Error('Invalid or expired session.')
    error.status = 401
    throw error
  }

  const user = await User.findById(payload.sub)
  if (!user) {
    const error = new Error('Invalid or expired session.')
    error.status = 401
    throw error
  }

  return publicUser(user)
}
