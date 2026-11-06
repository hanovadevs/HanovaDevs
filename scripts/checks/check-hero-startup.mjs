import assert from 'node:assert/strict'
import { chromium } from '@playwright/test'
import { preview } from 'vite'

// Production-only regression: dev HTML has no prerendered first paint to protect.
const server = await preview({ preview: { host: '127.0.0.1', port: 0, strictPort: true } })
const origin = `http://127.0.0.1:${server.httpServer.address().port}`
const browser = await chromium.launch()
let count = 0
try {
  for (const width of [320, 390, 820, 1440]) {
    for (const motion of ['no-preference', 'reduce']) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: motion })
      // Isolate startup/animation from external font swap timing.
      await context.route('https://fonts.googleapis.com/**', route => route.abort())
      await context.route('https://fonts.gstatic.com/**', route => route.abort())
      await context.route('**/assets/*.js', async route => {
        const url = route.request().url()
        const delay = /\/index-[^/]+\.js/.test(url) ? 350 : /\/Home-[^/]+\.js/.test(url) ? 700 : /\/AIChatbot-[^/]+\.js/.test(url) ? 1000 : 0
        if (delay) await new Promise(resolve => setTimeout(resolve, delay))
        await route.continue()
      })
      await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: origin }])
      await context.addInitScript(() => {
        window.heroStartupFrames = []
        window.heroStartupDone = false
        const started = performance.now()
        const sample = () => {
          const elements = [...document.querySelectorAll('.hero__headline-line, .hero__subheadline, .hero__cta-row')]
          window.heroStartupFrames.push({
            at: Math.round(performance.now()),
            count: elements.length,
            loading: Boolean(document.querySelector('.route-loading')),
            items: elements.map(element => {
              const style = getComputedStyle(element)
              const box = element.getBoundingClientRect()
              return { opacity: Number(style.opacity), transform: style.transform, y: box.y, height: box.height, animation: style.animationName }
            }),
          })
          if (performance.now() - started < 3000) requestAnimationFrame(sample)
          else window.heroStartupDone = true
        }
        requestAnimationFrame(sample)
      })
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      for (const visit of ['cold load', 'reload']) {
        if (visit === 'cold load') await page.goto(origin, { waitUntil: 'domcontentloaded' })
        else await page.reload({ waitUntil: 'domcontentloaded' })
        await page.waitForFunction(() => window.heroStartupDone)
        const frames = await page.evaluate(() => window.heroStartupFrames)
        const first = frames.findIndex(frame => frame.count === 4)
        assert(first >= 0, 'Headline, paragraph and actions are rendered')
        const visible = frames.slice(first)
        assert(visible.every(frame => frame.count === 4 && !frame.loading), `${width}/${motion}/${visit}: hero disappeared after first paint`)
        for (const frame of visible) for (const item of frame.items) {
          assert.equal(item.opacity, 1, 'Hero copy must never dim')
          assert.equal(item.transform, 'none', 'Hero copy must not jump or slide on startup')
          assert.equal(item.animation, 'none', 'No delayed entrance replay')
        }
        const firstBoxes = visible[0].items
        for (const frame of visible) frame.items.forEach((item, index) => {
          assert(Math.abs(item.y - firstBoxes[index].y) < 1, `${width}/${visit}: hero copy shifted vertically`)
          assert(Math.abs(item.height - firstBoxes[index].height) < 1, `${width}/${visit}: hero line layout changed`)
        })
        assert.equal(await page.locator('head meta[name="description"]').count(), 1)
        assert.equal(await page.locator('head link[rel="canonical"]').count(), 1)
        // React 19 hoists native meta/link tags, but JSON-LD can remain in body.
        assert.equal(await page.locator('script[type="application/ld+json"]').count(), 1)
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No horizontal overflow')
        assert.deepEqual(errors, [])
        console.log(`PASS: ${width}px / ${motion} / ${visit}: ${visible.length} continuous visible frames`)
        count++
      }
      // The page must actually become interactive, not stay a static fallback.
      await page.getByRole('link', { name: 'View Our Work', exact: true }).click()
      await page.waitForURL(`${origin}/projects`)
      await page.getByRole('button', { name: 'CRM & operations', exact: true }).click()
      assert.equal(await page.locator('.work-card').count(), 2)
      await context.close()
    }
  }
  const failedContext = await browser.newContext({ viewport: { width: 390, height: 844 } })
  await failedContext.route('**/assets/*.js', route => /\/Home-[^/]+\.js/.test(route.request().url()) ? route.abort() : route.continue())
  await failedContext.route('**/api/report-error', route => route.fulfill({ status: 204 }))
  const failedPage = await failedContext.newPage()
  const report = failedPage.waitForRequest(request => request.url().endsWith('/api/report-error'))
  await failedPage.goto(origin, { waitUntil: 'domcontentloaded' })
  assert.equal((await report).postDataJSON().source, 'homepage-startup')
  assert.equal(await failedPage.locator('.hero__headline-line').count(), 2, 'A failed chunk retains the original hero')
  assert.equal(await failedPage.locator('.route-loading').count(), 0)
  assert.equal(await failedPage.locator('head link[rel="canonical"]').count(), 1, 'Static metadata survives a failed chunk')
  await failedContext.close()
  console.log(`PASS: ${count} production startup checks; homepage handoff remains interactive; failed chunk retains static content.`)
} finally {
  await browser.close()
  await new Promise(resolve => server.httpServer.close(resolve))
}
