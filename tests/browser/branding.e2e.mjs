import { test, expect } from '@playwright/test'

test('logo matches the real header surface across scroll, routes and viewport changes', async ({ page, context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  await page.goto('/about')
  const original = page.locator('.navbar__logo-full')
  const inverse = page.locator('.navbar__logo-inverse')
  const isDesktop = page.viewportSize().width > 1120
  if (isDesktop) {
    await expect(inverse).toBeVisible(); await expect(original).toBeHidden()
    expect(await inverse.evaluate(element => getComputedStyle(element).color)).toBe('rgb(248, 250, 252)')
    await expect.poll(() => page.locator('.navbar__inverse-mark').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true)
  } else {
    await expect(original).toBeVisible(); await expect(inverse).toBeHidden()
  }
  await page.evaluate(() => window.scrollTo(0, 250))
  await expect(page.locator('#main-nav')).toHaveClass(/navbar--scrolled/)
  await expect(original).toBeVisible(); await expect(inverse).toBeHidden()
  await page.evaluate(() => window.scrollTo(0, 0))
  if (isDesktop) await expect(inverse).toBeVisible()
  await page.setViewportSize({ width: 820, height: 1000 })
  await expect(original).toBeVisible(); await expect(inverse).toBeHidden()
  await page.setViewportSize({ width: 1440, height: 900 })
  await expect(inverse).toBeVisible(); await expect(original).toBeHidden()
  for (const path of ['/services', '/products', '/projects', '/stack', '/products/eunoia', '/products/omnai', '/products/eunoia/privacy', '/reviews']) {
    await page.goto(path)
    await expect(original).toBeVisible(); await expect(inverse).toBeHidden()
    await expect(page.locator('#main-nav')).not.toHaveClass(/navbar--dark/)
  }
  for (const path of ['/services/web-design', '/journal', '/news', '/research']) {
    await page.goto(path)
    await expect(inverse).toBeVisible(); await expect(original).toBeHidden()
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true)
})
