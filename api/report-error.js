export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { message, source, stack } = req.body || {}
  console.error('Client application error', {
    message: String(message || 'Unknown error').slice(0, 500),
    source: String(source || 'browser').slice(0, 200),
    stack: String(stack || '').slice(0, 4000),
  })
  return res.status(202).json({ accepted: true })
}
