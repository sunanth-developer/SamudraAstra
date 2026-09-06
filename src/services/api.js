const API_URL = import.meta.env.VITE_API_URL || ''

export function apiUrl(path) {
  return `${API_URL}${path}`
}

export function authHeaders(token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  const response = await fetch(apiUrl(path), {
    method,
    headers: authHeaders(token),
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  let data = null
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    const error = new Error(data?.error || 'Request failed.')
    error.status = response.status
    throw error
  }

  return data
}
