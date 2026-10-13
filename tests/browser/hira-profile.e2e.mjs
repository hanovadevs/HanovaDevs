import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

test('Hira’s official role is reachable, readable and linked to the company entity', async ({ page, context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/about')
  await page.locator('#leadership').getByRole('link', { name: 'Meet Hira Maqsood' }).click()
  await expect(page).toHaveURL('/team/hira-maqsood')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hira Maqsood')
  await expect(page.getByText('Co-founder & Chief Operating Officer', { exact: true })).toBeVisible()
  await expect(page.locator('.navbar__logo-full')).toBeVisible()
  await expect(page.locator('.navbar__logo-inverse')).toBeHidden()
  await page.evaluate(() => document.fonts.ready)
  await page.locator('.leader-profile__portrait img').evaluate(async image => { await image.decode() })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true)
  const graph = await page.locator('script[type="application/ld+json"]').evaluate(node => JSON.parse(node.textContent)['@graph'])
  const profile = graph.find(node => node['@type'] === 'ProfilePage')
  const person = graph.find(node => node['@id'] === profile.mainEntity['@id'])
  expect(person.name).toBe('Hira Maqsood')
  expect(person.jobTitle).toBe('Co-founder & Chief Operating Officer')
  await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
  const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('main'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })))
  expect(violations).toEqual([])
  await page.getByRole('link', { name: 'Meet the full leadership team.' }).click()
  await expect(page).toHaveURL('/about#leadership')
  expect(errors).toEqual([])
})
