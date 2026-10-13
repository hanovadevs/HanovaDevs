import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

test('cookie choice blocks optional trackers and remembers essential-only consent', async ({ page }) => {
  const trackers = []
  page.on('request', request => { if (/googletagmanager|_vercel\/insights|_vercel\/speed-insights/.test(request.url())) trackers.push(request.url()) })
  await page.goto('/about')
  const banner = page.getByRole('region', { name: 'Cookie choices' })
  await expect(banner).toBeVisible()
  expect(trackers).toHaveLength(0)
  await banner.getByRole('button', { name: 'Essential only', exact: true }).click()
  await expect(banner).toHaveCount(0)
  await page.reload()
  await expect(page.getByRole('heading', { name: /built on purpose/i })).toBeVisible()
  await expect(banner).toHaveCount(0)
  expect(trackers).toHaveLength(0)
  const preferences = await page.context().cookies()
  expect(JSON.parse(decodeURIComponent(preferences.find(cookie => cookie.name === 'hanova_consent').value)).analytics).toBe(false)
})

test('cookie settings are keyboard operable, analytics is opt-in, and revocation persists', async ({ page }) => {
  const trackers = []
  await page.route('**/*', route => {
    if (/googletagmanager|_vercel\/insights|_vercel\/speed-insights/.test(route.request().url())) { trackers.push(route.request().url()); return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }) }
    return route.continue()
  })
  await page.goto('/reviews')
  await page.getByRole('button', { name: 'Choose settings' }).click()
  const dialog = page.getByRole('dialog', { name: 'You’re in control.' })
  await expect(dialog).toBeVisible()
  const close = dialog.getByRole('button', { name: 'Close cookie settings' })
  await expect(close).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('link', { name: 'Privacy policy' })).toBeFocused()
  await page.keyboard.press('Tab'); await expect(close).toBeFocused()
  await expect(dialog.getByRole('checkbox', { name: 'Allow optional analytics' })).not.toBeChecked()
  expect(trackers).toHaveLength(0)
  await dialog.getByRole('checkbox').check()
  await dialog.getByRole('button', { name: 'Save preferences' }).click()
  await expect.poll(() => trackers.some(url => url.includes('googletagmanager'))).toBe(true)
  const consent = await page.evaluate(() => [...window.dataLayer].filter(value => value[0] === 'consent').map(value => ({ action: value[1], consent: value[2] })))
  expect(consent.at(-1).consent.analytics_storage).toBe('granted')
  expect(consent.at(-1).consent.ad_storage).toBe('denied')
  const settings = page.getByRole('button', { name: 'Cookie settings' })
  await settings.click(); await page.keyboard.press('Escape'); await expect(settings).toBeFocused()
  await settings.click()
  await dialog.getByRole('button', { name: 'Essential only' }).click()
  await expect(page.getByRole('heading', { name: 'Good work. Real partnerships.' })).toBeVisible()
  await settings.click(); await expect(dialog.getByRole('checkbox')).not.toBeChecked()
})

test('client stories are filterable and display project delivery without invented reviews', async ({ page, context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  await page.goto('/reviews')
  await expect(page.locator('.review-story')).toHaveCount(4)
  await expect(page.locator('.review-story blockquote')).toHaveCount(0)
  await page.getByRole('button', { name: 'Industrial business' }).click()
  const story = page.locator('.review-story')
  await expect(story).toHaveCount(1); await expect(story).toContainText('Shahid Mahmood')
  await story.locator('summary').click()
  await expect(story.getByText('Corporate website', { exact: true })).toBeVisible()
  await expect(story.getByRole('link', { name: 'Visit website' })).toHaveAttribute('href', 'https://www.crownaccumulator.com')
  await page.getByRole('button', { name: 'All work' }).click(); await expect(page.locator('.review-story')).toHaveCount(4)
  await page.getByLabel('Your name', { exact: true }).fill('Client reviewer')
  await page.getByLabel('Your feedback', { exact: true }).fill('A specific review that explains our own experience.')
  await expect(page.getByRole('button', { name: 'Email your review' })).toBeEnabled()
})

test('company article has working contents and unique route metadata', async ({ page, context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  await page.goto('/journal/hanovadevs-software-company-guide')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('HanovaDevs Approach')
  await expect(page.locator('.article-content h2')).toHaveCount(18)
  await page.locator('.article-toc a[href="#section-2"]').click()
  await expect(page.locator('#section-2')).toBeInViewport()
  await expect(page.locator('head link[rel="canonical"]')).toHaveCount(1)
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', 'https://hanovadevs.com/journal/hanovadevs-software-company-guide')
  await page.getByRole('link', { name: 'Back to the journal' }).click()
  await expect(page).toHaveURL('/journal')
  await expect(page.locator('head meta[name="description"]')).toHaveCount(1)
  await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute('href', 'https://hanovadevs.com/journal')
})

test('founder and client pages have no serious automated accessibility violations', async ({ page, context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  for (const route of ['/about', '/reviews']) {
    await page.goto(route); await expect(page.locator('main h1')).toBeVisible()
    await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
    const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('main'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })))
    expect(violations).toEqual([])
  }
})
