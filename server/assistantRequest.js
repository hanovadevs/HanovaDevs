import { createHash } from 'node:crypto'

// Per-instance guard only; deployment-wide abuse controls belong in the platform firewall.
const requests = new Map()
export function guardAssistantRequest(req, res, bucket, limit = 15) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'Method not allowed.' })
    return false
  }
  const origin = req.headers?.origin
  const host = req.headers?.host
  if (origin) {
    try {
      const url = new URL(origin)
      if (!['http:', 'https:'].includes(url.protocol) || url.host !== host) throw new Error('Origin mismatch')
    } catch {
      res.status(403).json({ error: 'Please send your request from this website.' })
      return false
    }
  }
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    res.status(400).json({ error: 'Invalid request body.' })
    return false
  }
  if (Buffer.byteLength(JSON.stringify(req.body), 'utf8') > 26000) {
    res.status(413).json({ error: 'Please shorten your request.' })
    return false
  }
  const address = req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown'
  const key = `${bucket}:${createHash('sha256').update(address).digest('hex')}`
  const now = Date.now()
  for (const [storedKey, value] of requests) if (value.until <= now) requests.delete(storedKey)
  const record = requests.get(key) || { count: 0, until: now + 60000 }
  if (record.count >= limit || requests.size > 10000) {
    res.setHeader('Retry-After', '60')
    res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' })
    return false
  }
  record.count += 1
  requests.set(key, record)
  return true
}
