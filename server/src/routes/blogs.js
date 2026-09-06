import { Router } from 'express'
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogStats,
  getBlogs,
  getPublicBlogs,
  updateBlog,
} from '../blogs.js'
import { optionalAuth, requireAuth } from '../middleware/requireAuth.js'

export const blogRouter = Router()

blogRouter.get('/stats', requireAuth, async (_req, res, next) => {
  try {
    const stats = await getBlogStats()
    res.json({ ok: true, stats })
  } catch (error) {
    next(error)
  }
})

blogRouter.get('/', optionalAuth, async (req, res, next) => {
  try {
    const blogs = req.user
      ? await getBlogs({
          query: req.query.query || '',
          status: req.query.status || 'all',
          category: req.query.category || 'all',
        })
      : await getPublicBlogs()
    res.json({ ok: true, blogs })
  } catch (error) {
    next(error)
  }
})

blogRouter.get('/:idOrSlug', optionalAuth, async (req, res, next) => {
  try {
    const blog = await getBlog(req.params.idOrSlug, { allowPrivate: Boolean(req.user) })
    res.json({ ok: true, blog })
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', requireAuth, async (req, res, next) => {
  try {
    const blog = await createBlog(req.body)
    res.status(201).json({ ok: true, blog })
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', requireAuth, async (req, res, next) => {
  try {
    const blog = await updateBlog(req.params.id, req.body)
    res.json({ ok: true, blog })
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await deleteBlog(req.params.id)
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})
