import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { leadershipProfiles } from '../../src/data/leadershipProfiles.js'

test('all leadership profiles have working links, portraits, keyboard FAQs and matching metadata', async ({ page, context }) => {
  test.setTimeout(90000)
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const member of leadershipProfiles) {
    await page.goto('/about')
    await page.locator('#leadership').getByRole('link', { name: `Meet ${member.name}`, exact: true }).click()
    await expect(page).toHaveURL(member.profile)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(member.name)
    await expect(page.getByText(member.jobTitle, { exact: true })).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    await page.locator('.leader-profile__portrait img').evaluate(async image => { await image.decode() })
    await expect(page.locator('.navbar__logo-full')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true)
    const faqs = page.locator('.leader-profile__answers details')
    await expect(faqs).toHaveCount(7)
    await expect(faqs.first()).toHaveAttribute('open', '')
    const summary = faqs.nth(1).locator('summary')
    await summary.focus(); await page.keyboard.press('Enter')
    await expect(faqs.nth(1)).toHaveAttribute('open', '')
    await expect(faqs.nth(1).locator('p')).toBeVisible()
    await page.keyboard.press('Enter')
    await expect(faqs.nth(1)).not.toHaveAttribute('open', '')
    const graph = await page.locator('script[type="application/ld+json"]').evaluate(node => JSON.parse(node.textContent)['@graph'])
    expect(graph.find(node => node['@type'] === 'ProfilePage').mainEntity['@id']).toBe(member.entityId)
    expect(graph.find(node => node['@type'] === 'FAQPage').mainEntity).toHaveLength(7)
    if (member.illustration) await expect(page.getByText('AI-generated illustration · not a photograph')).toBeVisible()
    await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
    const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('main'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })))
    expect(violations, member.name).toEqual([])
    const colleague = leadershipProfiles.find(person => person.id !== member.id)
    await page.locator('.leader-profile__team-grid').getByRole('link', { name: new RegExp(colleague.name) }).click()
    await expect(page).toHaveURL(colleague.profile)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(colleague.name)
  }
  await page.goto('/team/not-a-person')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('doesn’t exist')
  expect(errors).toEqual([])
})
