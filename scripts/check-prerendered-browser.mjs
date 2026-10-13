import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'
import { publicRoutes } from '../src/data/routes.js'

const browser = await chromium.launch()
const origin = process.env.PRERENDER_BASE_URL || 'http://127.0.0.1:4173'
try {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  for (const route of publicRoutes) {
    await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' })
    await page.locator('main h1').waitFor({ state: 'visible' })
    assert.equal(await page.locator('head link[rel="canonical"]').getAttribute('href'), `https://hanovadevs.com${route}`)
    assert.equal(await page.locator('head meta[name="description"]').count(), 1)
    assert.equal(await page.locator('head script[type="application/ld+json"]').count(), 1)
    assert.equal(await page.locator('script[src*="googletagmanager"], iframe[src*="googletagmanager"]').count(), 0)
  }
  const missing = await page.goto(`${origin}/a-page-that-does-not-exist`)
  assert.equal(missing.status(), 404)
  assert((await page.locator('main h1').textContent()).includes('doesn’t exist'))
  const redirect = await context.request.get(`${origin}/blog`, { maxRedirects: 0 })
  assert.equal(redirect.status(), 308)
  assert.equal(redirect.headers().location, '/journal')
  await context.close()
  console.log(`PASS: ${publicRoutes.length} production pages load meaningful headings and route metadata with JavaScript disabled; preview returns HTTP 404 and legacy HTTP 308.`)
} finally { await browser.close() }
