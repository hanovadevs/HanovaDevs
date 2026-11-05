import { test, expect } from '@playwright/test'
import { services } from '../../src/data/services.js'

test.beforeEach(async ({ context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
})

for (const service of services) test(`${service.id}: buyer guidance, native problem disclosure and specific project enquiry`, async ({ page }) => {
  await page.goto(`/services/${service.id}`)
  await page.getByRole('navigation', { name: 'On this service page' }).getByRole('link', { name: 'Project types', exact: true }).click()
  await expect.poll(async () => {
    const title = await page.locator('#service-projects-title').boundingBox()
    const header = await page.locator('#main-nav').boundingBox()
    const nav = await page.locator('.work-jump-nav').boundingBox()
    return title.y >= header.height + nav.height
  }).toBe(true)
  await expect(page.locator('.service-project-type')).toHaveCount(6)
  const problems = page.locator('.service-problem')
  await expect(problems).toHaveCount(10)
  await expect(problems.first()).toHaveAttribute('open', '')
  const last = problems.last()
  await last.locator('summary').focus()
  await last.locator('summary').press('Enter')
  await expect(last).toHaveAttribute('open', '')
  await expect(last.locator('.service-problem__answer')).toContainText(service.experience.problems[9][1])
  await expect(last.locator('.service-problem__answer')).toContainText(service.experience.problems[9][2])
  await expect(last.locator('.service-problem__answer')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  await expect(page.locator('.service-engagement-grid article')).toHaveCount(3)
  await expect(page.locator('.service-preparation-list li')).toHaveCount(4)
  await expect(page.locator('.service-measurement-grid li')).toHaveCount(3)
  if (['phone', 'desktop'].includes(test.info().project.name) && ['web-design', 'branding'].includes(service.id)) {
    await page.locator('#service-projects').screenshot({ path: `artifacts/services/${service.id}-project-types-${test.info().project.name}.png` })
    await page.locator('#service-problems').screenshot({ path: `artifacts/services/${service.id}-problems-${test.info().project.name}.png` })
  }
  await page.locator('.service-project-type').first().getByRole('link').click()
  await expect(page).toHaveURL(/\/contact\?source=service/)
  await expect(page.locator('#contact-form textarea')).toHaveValue(new RegExp(service.experience.projects[0][0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
})

test('services directory presents real local visuals and every service destination', async ({ page }) => {
  await page.goto('/services')
  await expect(page.locator('.service-directory-card')).toHaveCount(6)
  await page.locator('.service-directory-card img').evaluateAll(async images => {
    for (const image of images) { image.loading = 'eager'; await image.decode() }
  })
  for (const service of services) await expect(page.locator(`.service-directory-card[href="/services/${service.id}"]`)).toContainText(service.title)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
})
