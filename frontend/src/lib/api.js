// Typed, envelope-aware fetch client (§3.5). Success: { "data": ... } (lists add
// "meta"); failure: { "error": { code, message } }. Defer TanStack Query until a
// piece justifies caching. No F1 consumer yet — this fixes the convention so
// later pieces (services/courses reads, quote POST) plug straight in.

const BASE = '/api'

export class ApiError extends Error {
  constructor(code, message, status) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}

async function request(path, { method = 'GET', body, signal } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    signal,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  const envelope = await res.json().catch(() => null)

  if (!res.ok || (envelope && envelope.error)) {
    const error = envelope?.error ?? { code: 'unknown', message: res.statusText }
    throw new ApiError(error.code, error.message, res.status)
  }

  // Lists return { data, meta }; callers that need meta can read it off the
  // envelope via requestRaw. The common case wants data.
  return envelope?.data
}

export function apiGet(path, opts) {
  return request(path, { ...opts, method: 'GET' })
}

export function apiPost(path, body, opts) {
  return request(path, { ...opts, method: 'POST', body })
}
