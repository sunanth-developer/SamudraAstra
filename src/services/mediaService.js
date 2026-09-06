import { media } from '../data/media'
import { STORAGE_KEYS, nowIso, readJson, uid, wait, writeJson } from './storage'

const KEY = STORAGE_KEYS.media

const SEED_MEDIA = [
  { src: media.usv, name: 'usv-craft.jpg' },
  { src: media.usvModel, name: 'usv-model.jpg' },
  { src: media.ctaStill, name: 'usv-cta.jpg' },
  { src: media.lab, name: 'lab.jpg' },
  { src: media.engineer, name: 'engineer.jpg' },
  { src: media.control, name: 'control.jpg' },
].map((item, index) => ({
  id: `media-seed-${index + 1}`,
  url: item.src,
  name: item.name,
  type: 'image/jpeg',
  createdAt: '2026-06-01T09:00:00.000Z',
  width: null,
  height: null,
}))

function loadMedia() {
  const stored = readJson(KEY, null)
  if (Array.isArray(stored) && stored.length) return stored
  writeJson(KEY, SEED_MEDIA)
  return SEED_MEDIA.map((item) => ({ ...item }))
}

function saveMedia(items) {
  writeJson(KEY, items)
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function measureImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = () => resolve({ width: null, height: null })
    img.src = url
  })
}

export const mediaService = {
  // TODO: Replace local FileReader persistence with POST /api/admin/media and object storage.
  async list() {
    await wait()
    return loadMedia().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async uploadImage(file) {
    await wait(260)
    const url = await readFileAsDataUrl(file)
    const size = await measureImage(url)
    const item = {
      id: uid('media'),
      url,
      name: file.name || 'upload.jpg',
      type: file.type || 'image/*',
      createdAt: nowIso(),
      width: size.width,
      height: size.height,
    }
    const items = loadMedia()
    items.unshift(item)
    saveMedia(items)
    return item
  },

  async deleteImage(id) {
    await wait(160)
    saveMedia(loadMedia().filter((item) => item.id !== id))
    return true
  },
}
