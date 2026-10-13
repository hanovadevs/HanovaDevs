import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

test('leadership cards load the correct portraits, fit the viewport and remain accessible', async ({ page, context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/about')
  const team = page.locator('#leadership')
  await team.scrollIntoViewIfNeeded()
  await expect(team.getByRole('article')).toHaveCount(4)
  for (const [name, role] of [['Ali Haider', 'Founder & CEO'], ['Hira Maqsood', 'Co-founder & COO'], ['Noor Fatima', 'CMO'], ['Faizan Javed', 'CTO']]) {
    const card = team.getByRole('article', { name })
    await card.scrollIntoViewIfNeeded()
    await expect(card.getByRole('heading', { name })).toBeVisible()
    await expect(card.getByText(role, { exact: true })).toBeVisible()
    const box = await card.boundingBox()
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize().width)
    const photo = card.locator('img')
    if (await photo.count()) await expect.poll(() => photo.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true)
  }
  await expect(team.getByRole('img', { name: 'Faceless illustrated avatar for Noor Fatima' })).toBeVisible()
  await expect(team.locator('svg, [class*="icon"]')).toHaveCount(0)
  await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
  const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('#leadership'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => item.id))
  expect(violations).toEqual([])
  expect(errors).toEqual([])
})
