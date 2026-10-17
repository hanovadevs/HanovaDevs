import { loadEnv } from 'vite'

// Local Vite runtime for the same server-only handlers deployed as Vercel functions.
export function assistantDevApi() {
  return {
    name: 'aria-development-api',
    configureServer(server) {
      const values = loadEnv(server.config.mode, server.config.envDir, '')
      for (const key of ['ANTHROPIC_API_KEY', 'ANTHROPIC_MODEL', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_HOST', 'EMAIL_PORT']) {
        if (process.env[key] === undefined && values[key]) process.env[key] = values[key]
      }
      server.middlewares.use(async (req, res, next) => {
        const route = req.url?.split('?')[0]
        if (route !== '/api/chat' && route !== '/api/assistant-contact') return next()
        res.status = code => { res.statusCode = code; return res }
        res.json = body => { res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.end(JSON.stringify(body)) }
        try {
          if (req.method === 'POST') {
            const chunks = []
            let length = 0
            for await (const chunk of req) {
              length += chunk.length
              if (length > 26000) { res.status(413).json({ error: 'Please shorten your request.' }); return }
              chunks.push(chunk)
            }
            try { req.body = JSON.parse(Buffer.concat(chunks).toString('utf8')) }
            catch { res.status(400).json({ error: 'Invalid JSON request.' }); return }
          }
          const module = await server.ssrLoadModule(`${route}.js`)
          await module.default(req, res)
        } catch {
          if (!res.headersSent) res.status(500).json({ error: 'Assistant service unavailable. Please try again.' })
          else if (!res.writableEnded) res.end()
        }
      })
    },
  }
}
