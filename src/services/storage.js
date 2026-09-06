export const STORAGE_KEYS = {
  session: 'sa.cms.session',
  posts: 'sa.cms.posts',
  media: 'sa.cms.media',
  settings: 'sa.cms.settings',
}

export function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function writeJson(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function removeKey(key) {
  window.localStorage.removeItem(key)
}

export function wait(ms = 180) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export function nowIso() {
  return new Date().toISOString()
}

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

export function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
