import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

test.beforeEach(async ({ context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
})

test('Junko project: discovery, screenshots, keyboard gallery, FAQs and contact handoff', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/projects')
  await page.getByRole('link', { name: 'Read the Junko Bodie Roulette case study', exact: true }).click()
  await expect(page).toHaveURL('/projects/junko-bodie-roulette')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Junko Bodie Roulette')
  await expect(page.locator('time')).toHaveText('6 November 2026')
  const tabs = page.getByRole('tab')
  await expect(tabs).toHaveCount(4)
  for (let index = 0; index < 4; index++) {
    await tabs.nth(index).click()
    const image = page.getByRole('tabpanel').getByRole('img')
    await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBe(true)
  }
  await tabs.last().press('ArrowRight')
  await expect(tabs.first()).toBeFocused()
  await page.locator('#case-questions summary').first().focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('#case-questions details').first()).toHaveAttribute('open', '')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
  const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('main'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })))
  expect(violations).toEqual([])
  await page.screenshot({ path: `artifacts/work/junko-${test.info().project.name}.png` })
  await page.getByRole('link', { name: 'Discuss a similar project ↗' }).click()
  await expect(page.locator('.contact-form textarea')).toHaveValue(/Junko Bodie Roulette/)
  expect(errors).toEqual([])
})
