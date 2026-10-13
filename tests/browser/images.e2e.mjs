import { test, expect } from '@playwright/test'
import { publicRoutes } from '../../src/data/routes.js'

test('public page images decode rather than showing broken-image placeholders', async ({ page, context }) => {
  test.skip(!['phone', 'desktop'].includes(test.info().project.name), 'One mobile and one desktop audit cover all public routes')
  test.setTimeout(120000)
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  for (const route of publicRoutes) {
    await page.goto(route)
    await expect(page.locator('main h1')).toBeVisible()
    const failed = await page.locator('main img').evaluateAll(async images => {
      return (await Promise.all(images.map(async image => {
        image.loading = 'eager'
        try { await image.decode(); return null }
        catch { return { src: image.currentSrc || image.src, alt: image.alt } }
      }))).filter(Boolean)
    })
    expect(failed, `Broken images on ${route}`).toEqual([])
  }
})
