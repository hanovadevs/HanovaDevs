import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { publicRoutes, legacyRedirects } from './src/data/routes.js'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { assistantDevApi } from './server/assistantDevMiddleware.js'

// https://vite.dev/config/
export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? 'mpa' : 'spa',
  plugins: [react(), assistantDevApi(), {
    name: 'prerender-preview-routing',
    configurePreviewServer(server) {
      // Match the production clean-URL destinations instead of Vite's SPA fallback.
      server.middlewares.use(async (req, res, next) => {
        const request = new URL(req.url, 'http://localhost')
        const pathname = request.pathname.replace(/\/+$/, '') || '/'
        const redirect = legacyRedirects.find(([from]) => from === pathname)
        if (redirect || pathname === '/admin') {
          res.statusCode = 308
          res.setHeader('Location', redirect ? redirect[1] : '/')
          res.end()
          return
        }
        if (publicRoutes.includes(pathname)) req.url = (pathname === '/' ? '/index.html' : `${pathname}/index.html`) + request.search
        else if (pathname === '/hanova-portal-2026') req.url = '/hanova-portal-2026/index.html'
        else if (!pathname.includes('.')) {
          try {
            const html = await readFile(path.resolve(server.config.root, server.config.build.outDir, '404.html'), 'utf8')
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(html)
          } catch (error) { next(error) }
          return
        }
        next()
      })
    },
  }],
  build: { manifest: true },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
}))
