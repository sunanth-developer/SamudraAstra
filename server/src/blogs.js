import { Blog } from './models/Blog.js'

const MAX_IMAGE_CHARS = 7_000_000
const BASE64_RE = /^(data:image\/[a-zA-Z0-9.+-]+;base64,)?[A-Za-z0-9+/=\s]+$/
const OBJECT_ID_RE = /^[a-fA-F0-9]{24}$/

function cleanText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function cleanImage(value) {
  if (typeof value !== 'string') return ''
  return value.trim()
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function isImageValue(value) {
  if (!value) return true
  if (value.startsWith('/') || /^https?:\/\//i.test(value)) return true
  const compact = value.replace(/\s/g, '')
  return compact.length <= MAX_IMAGE_CHARS && BASE64_RE.test(compact)
}

async function uniqueSlug(input, excludeId) {
  const base = slugify(input) || 'article'
  let next = base
  let i = 2
  while (true) {
    const existing = await Blog.findOne({ slug: next }).select('_id')
    if (!existing || (excludeId && String(existing._id) === String(excludeId))) return next
    next = `${base}-${i}`
    i += 1
  }
}

export function toClient(doc) {
  const blog = typeof doc.toObject === 'function' ? doc.toObject() : doc
  const id = String(blog._id)
  return {
    id,
    title: blog.title,
    slug: blog.slug,
    description: blog.description || '',
    excerpt: blog.description || '',
    content: blog.content || '',
    image: blog.image || '',
    featuredImage: blog.image || '',
    category: blog.category || 'Technology',
    tags: Array.isArray(blog.tags) ? blog.tags : [],
    author: blog.author || 'Samudra Astra',
    status: blog.status || 'draft',
    publishedAt: blog.publishedAt || null,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    seoTitle: blog.seoTitle || '',
    seoDescription: blog.seoDescription || '',
  }
}

export function isBlogPublic(blog, at = new Date()) {
  if (!blog) return false
  if (blog.status === 'published') return true
  if (blog.status === 'scheduled') {
    return Boolean(blog.publishedAt) && new Date(blog.publishedAt).getTime() <= at.getTime()
  }
  return false
}

function normalizeInput(input = {}) {
  const title = cleanText(input.title)
  const description = cleanText(input.description ?? input.discription ?? input.excerpt)
  const image = cleanImage(input.image ?? input.featuredImage)
  const status = ['draft', 'published', 'scheduled'].includes(input.status)
    ? input.status
    : 'published'
  const publishedAt =
    input.publishedAt === null || input.publishedAt === ''
      ? null
      : input.publishedAt
        ? new Date(input.publishedAt)
        : status === 'published'
          ? new Date()
          : null

  return {
    title,
    slug: input.slug,
    description,
    content: typeof input.content === 'string' ? input.content : '',
    image,
    category: cleanText(input.category) || 'Technology',
    tags: Array.isArray(input.tags) ? input.tags.map(cleanText).filter(Boolean) : [],
    author: cleanText(input.author) || 'Samudra Astra',
    status,
    publishedAt,
    seoTitle: cleanText(input.seoTitle) || title,
    seoDescription: cleanText(input.seoDescription) || description,
  }
}

function assertImage(image) {
  if (!image) return
  if (image.length > MAX_IMAGE_CHARS) {
    const error = new Error('Image is too large. Keep the base64 payload under 7MB.')
    error.status = 413
    throw error
  }
  if (!isImageValue(image)) {
    const error = new Error('Image must be a URL or a valid base64 string.')
    error.status = 400
    throw error
  }
}

export async function createBlog(input = {}) {
  const data = normalizeInput(input)

  if (!data.title) {
    const error = new Error('Title is required.')
    error.status = 400
    throw error
  }

  assertImage(data.image)
  data.slug = await uniqueSlug(data.slug || data.title)

  const blog = await Blog.create(data)
  return toClient(blog)
}

export async function updateBlog(id, input = {}) {
  const blog = await Blog.findById(id)
  if (!blog) {
    const error = new Error('Blog not found.')
    error.status = 404
    throw error
  }

  const data = normalizeInput({ ...toClient(blog), ...input })
  if (!data.title) {
    const error = new Error('Title is required.')
    error.status = 400
    throw error
  }

  assertImage(data.image)
  data.slug = await uniqueSlug(data.slug || data.title, id)
  Object.assign(blog, data)
  await blog.save()
  return toClient(blog)
}

export async function getBlogs({ query = '', status = 'all', category = 'all' } = {}) {
  const filter = {}
  if (status !== 'all') filter.status = status
  if (category !== 'all') filter.category = category
  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
      { category: { $regex: query, $options: 'i' } },
      { author: { $regex: query, $options: 'i' } },
    ]
  }

  const blogs = await Blog.find(filter).sort({ updatedAt: -1 }).lean()
  return blogs.map(toClient)
}

export async function getPublicBlogs() {
  const blogs = await Blog.find({
    $or: [
      { status: 'published' },
      { status: 'scheduled', publishedAt: { $lte: new Date() } },
    ],
  })
    .sort({ publishedAt: -1, createdAt: -1 })
    .lean()
  return blogs.map(toClient)
}

export async function getBlog(idOrSlug, { allowPrivate = false } = {}) {
  const doc = OBJECT_ID_RE.test(idOrSlug)
    ? await Blog.findById(idOrSlug)
    : await Blog.findOne({ slug: idOrSlug })

  if (!doc) {
    const error = new Error('Blog not found.')
    error.status = 404
    throw error
  }

  if (!allowPrivate && !isBlogPublic(doc)) {
    const error = new Error('Blog not found.')
    error.status = 404
    throw error
  }

  return toClient(doc)
}

export async function deleteBlog(id) {
  const deleted = await Blog.findByIdAndDelete(id)
  if (!deleted) {
    const error = new Error('Blog not found.')
    error.status = 404
    throw error
  }
  return true
}

export async function getBlogStats() {
  const [total, published, drafts, scheduled] = await Promise.all([
    Blog.countDocuments(),
    Blog.countDocuments({ status: 'published' }),
    Blog.countDocuments({ status: 'draft' }),
    Blog.countDocuments({ status: 'scheduled' }),
  ])
  return { total, published, drafts, scheduled }
}
