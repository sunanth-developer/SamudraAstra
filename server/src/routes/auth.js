import { Router } from 'express'
import { loginAdmin } from '../auth.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const authRouter = Router()

authRouter.post('/login', async (req, res, next) => {
  try {
    const session = await loginAdmin(req.body)
    res.json({ ok: true, ...session })
  } catch (error) {
    next(error)
  }
})

authRouter.get('/me', requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user })
})

authRouter.post('/logout', (_req, res) => {
  res.json({ ok: true })
})
