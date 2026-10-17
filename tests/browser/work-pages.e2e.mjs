import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { services } from '../../src/data/services.js'
import { caseStudies } from '../../src/data/caseStudies.js'

test.beforeEach(async ({ context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
})
async function checkPage(page) {
  await page.evaluate(() => { for (const image of document.querySelectorAll('main img')) image.loading = 'eager' })
  await expect.poll(() => page.locator('main img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
  const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('main'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })))
  expect(violations).toEqual([])
}

for (const service of services) test(`${service.id}: responsive service journey, scenarios and handoff`, async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(`/services/${service.id}`)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(service.title)
  await expect(page.locator('.navbar')).not.toHaveClass(/navbar--dark/)
  await checkPage(page)
  await page.screenshot({ path: `artifacts/work/${service.id}-${test.info().project.name}.png` })
  const tabs = page.getByRole('tab')
  await tabs.nth(1).click()
  await expect(page.getByRole('tabpanel')).toContainText(service.scenarios[1].title)
  await tabs.nth(1).press('ArrowRight')
  await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true')
  await tabs.nth(2).press('Home')
  await expect(tabs.nth(0)).toBeFocused()
  const faq = page.locator('.work-faq-list details').first()
  await faq.locator('summary').focus()
  await faq.locator('summary').press('Enter')
  await expect(faq).toHaveAttribute('open', '')
  await expect(faq.locator('p')).toBeVisible()
  await page.getByRole('link', { name: /Discuss your project/ }).click()
  await expect(page).toHaveURL(/\/contact\?source=service/)
  await expect(page.locator('.contact-form textarea')).toHaveValue(new RegExp(service.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  await expect(page.locator('.contact-form textarea')).toHaveValue(/Project enquiry/)
  expect(errors).toEqual([])
})

for (const study of caseStudies) test(`${study.id}: screenshot evidence, outcomes and enquiry`, async ({ page }) => {
  await page.goto(study.path)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(study.title)
  await checkPage(page)
  await expect(page.locator('#case-evidence')).toContainText('No verified before-and-after revenue')
  await expect(page.getByRole('link', { name: `Open full desktop screenshot of ${study.title}` })).toHaveAttribute('href', study.image)
  await page.screenshot({ path: `artifacts/work/case-${study.id}-${test.info().project.name}.png` })
  await page.getByRole('link', { name: /Discuss a similar project/ }).click()
  await expect(page.locator('.contact-form textarea')).toHaveValue(new RegExp(study.title))
})

test('project filtering, case-study navigation and unknown destinations', async ({ page }) => {
  await page.goto('/projects')
  await page.getByRole('button', { name: 'Industrial business' }).click()
  await expect(page.locator('.work-card')).toHaveCount(1)
  await page.getByRole('link', { name: 'Read the case study', exact: true }).click()
  await expect(page).toHaveURL(/\/projects\/crown$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Crown Accumulators')
  await page.goto('/projects/constructor')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('doesn’t exist')
})
