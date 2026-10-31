// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { publicRoutes } from '../../../src/data/routes.js'

describe('retired admin and database integration', () => {
  it('has no dependency, client, schema, dashboard or admin email handler', () => {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
    expect(Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).filter(name => name.startsWith('@supabase/'))).toEqual([])
    for (const file of ['src/lib/supabaseClient.js', 'src/lib/supabase_schema.sql', 'supabase_schema.sql', 'src/pages/AdminDashboard.jsx', 'src/pages/AdminDashboard.css', 'api/send-email.js']) expect(existsSync(file), file).toBe(false)
  })

  it('does not route, build or index either former admin URL', () => {
    for (const file of ['src/app/App.jsx', 'src/app/entry-server.jsx', 'vite.config.js', 'vercel.json', 'scripts/build/prerender.mjs']) {
      const source = readFileSync(file, 'utf8')
      expect(source, file).not.toMatch(/AdminDashboard|hanova-portal-2026|['"]\/admin['"]/)
    }
    expect(publicRoutes).not.toContain('/admin')
    expect(publicRoutes).not.toContain('/hanova-portal-2026')
    expect(readFileSync('public/robots.txt', 'utf8')).not.toMatch(/\/admin|hanova-portal-2026/)
  })

  it('retains the independent public contact and assistant boundaries', () => {
    expect(readFileSync('src/pages/contact/Contact.jsx', 'utf8')).toContain('https://formsubmit.co/ajax/contact@hanovadevs.com')
    expect(readFileSync('src/components/assistant/AssistantContact.jsx', 'utf8')).toContain('/api/assistant-contact')
    expect(readFileSync('api/assistant-contact.js', 'utf8')).toContain('nodemailer')
  })
})
