import { test, expect } from '@playwright/test'

test.beforeEach(async ({ context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
})

test('retired admin URLs show the public not-found page without database requests', async ({ page }) => {
  const databaseRequests = []
  const errors = []
  page.on('request', request => { if (/supabase\.(?:co|in)\b|\/auth\/v1\//i.test(request.url())) databaseRequests.push(request.url()) })
  page.on('pageerror', error => errors.push(error.message))
  for (const route of ['/admin', '/hanova-portal-2026']) {
    await page.goto(route)
    await expect(page.locator('main h1')).toContainText('doesn’t exist')
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toHaveCount(0)
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
  }
  expect(databaseRequests).toEqual([])
  expect(errors).toEqual([])
})

test('public contact submits through its independent email provider', async ({ page }) => {
  const sent = []
  await page.route('https://formsubmit.co/ajax/contact@hanovadevs.com', async route => {
    sent.push(route.request().postDataJSON())
    await route.fulfill({ status: 200, json: { success: 'true' } })
  })
  await page.goto('/contact')
  await page.getByLabel('Full Name', { exact: false }).fill('Structure test visitor')
  await page.getByLabel('Email Address', { exact: false }).fill('visitor@example.test')
  await page.getByLabel('Budget Range', { exact: false }).selectOption({ label: '$1,000 – $5,000' })
  await page.getByLabel('Project Description', { exact: false }).fill('A synthetic test enquiry. Do not send real email.')
  await page.locator('#contact-form button[type="submit"]').click()
  await expect(page.getByRole('heading', { name: 'Message Sent!' })).toBeVisible()
  expect(sent).toHaveLength(1)
  expect(sent[0]).toMatchObject({ name: 'Structure test visitor', email: 'visitor@example.test' })
})
