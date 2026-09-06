import { DEFAULT_SETTINGS } from '../data/mockSettings'
import { STORAGE_KEYS, readJson, wait, writeJson } from './storage'

export const settingsService = {
  // TODO: Replace local settings store with GET/PUT /api/admin/settings.
  async get() {
    await wait(80)
    return { ...DEFAULT_SETTINGS, ...readJson(STORAGE_KEYS.settings, {}) }
  },

  async save(next) {
    await wait(160)
    const merged = { ...DEFAULT_SETTINGS, ...next }
    writeJson(STORAGE_KEYS.settings, merged)
    return merged
  },
}
