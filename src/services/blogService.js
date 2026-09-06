import { authService } from './authService'
import { apiRequest } from './api'

function notify() {
  window.dispatchEvent(new CustomEvent('sa:posts-changed'))
}

function token() {
  return authService.getCurrentUser()?.token
}

async function readBlog(path, withAuth) {
  try {
    const data = await apiRequest(path, { token: withAuth ? token() : undefined })
    return data.blog || null
  } catch (error) {
    if (error.status === 404) return null
    throw error
  }
}

export function isPostPublic(post, at = new Date()) {
  if (!post) return false
  if (post.status === 'draft') return false
  if (post.status === 'published') return true
  if (post.status === 'scheduled') {
    if (!post.publishedAt) return false
    return new Date(post.publishedAt).getTime() <= at.getTime()
  }
  return false
}

export const blogService = {
  async getPosts() {
    const data = await apiRequest('/api/blogs', { token: token() })
    return data.blogs || []
  },

  async getPost(id) {
    return readBlog(`/api/blogs/${id}`, true)
  },

  async getPostBySlug(slug) {
    return readBlog(`/api/blogs/${encodeURIComponent(slug)}`, false)
  },

  async getPublicPosts() {
    const data = await apiRequest('/api/blogs')
    return data.blogs || []
  },

  async getRelatedPosts(post, limit = 3) {
    const publicPosts = (await this.getPublicPosts()).filter((item) => item.id !== post.id)
    const scored = publicPosts.map((item) => {
      let score = 0
      if (item.category === post.category) score += 3
      const overlap = (item.tags || []).filter((tag) => (post.tags || []).includes(tag)).length
      score += overlap
      return { item, score }
    })
    scored.sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.item.publishedAt) - new Date(a.item.publishedAt)
    )
    const related = scored.filter((row) => row.score > 0).slice(0, limit).map((row) => row.item)
    if (related.length < limit) {
      const extras = publicPosts.filter((item) => !related.some((r) => r.id === item.id))
      return [...related, ...extras].slice(0, limit)
    }
    return related
  },

  async createPost(data) {
    const result = await apiRequest('/api/blogs', {
      method: 'POST',
      token: token(),
      body: data,
    })
    notify()
    return result.blog
  },

  async updatePost(id, data) {
    const result = await apiRequest(`/api/blogs/${id}`, {
      method: 'PUT',
      token: token(),
      body: data,
    })
    notify()
    return result.blog
  },

  async deletePost(id) {
    await apiRequest(`/api/blogs/${id}`, {
      method: 'DELETE',
      token: token(),
    })
    notify()
    return true
  },

  async publishPost(id, data = {}) {
    return this.updatePost(id, {
      ...data,
      status: 'published',
      publishedAt: data.publishedAt || new Date().toISOString(),
    })
  },

  async saveDraft(id, data = {}) {
    if (!id) return this.createPost({ ...data, status: 'draft' })
    return this.updatePost(id, { ...data, status: 'draft' })
  },

  async searchPosts(query) {
    return this.filterPosts({ query })
  },

  async filterPosts({ query = '', status = 'all', category = 'all' } = {}) {
    const params = new URLSearchParams({ query, status, category })
    const data = await apiRequest(`/api/blogs?${params.toString()}`, { token: token() })
    return data.blogs || []
  },

  async getStats() {
    const data = await apiRequest('/api/blogs/stats', { token: token() })
    return data.stats
  },
}
