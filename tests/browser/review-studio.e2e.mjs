import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

test.beforeEach(async ({ context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
})

test('sample studio: responsive cards, keyboard edits and honest draft download', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/design/reviews')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Thoughtfully framed.')
  await expect(page.locator('.testimonial-card[data-sample=true]')).toHaveCount(20)
  await expect(page.getByText('Not a client endorsement.', { exact: false })).toHaveCount(20)
  await expect(page.locator('meta[name=robots]')).toHaveAttribute('content', 'noindex, nofollow')
  const filter = page.getByRole('button', { name: 'Communication', exact: true })
  await filter.focus()
  await page.keyboard.press('Enter')
  await expect(filter).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.testimonial-card')).toHaveCount(6)
  await page.getByText('Edit sample 01', { exact: true }).focus()
  await page.keyboard.press('Enter')
  await page.getByLabel('Draft text for sample 01', { exact: true }).fill('Local draft replacement. Not a client endorsement.')
  await expect(page.locator('.testimonial-card blockquote').first()).toHaveText('Local draft replacement. Not a client endorsement.')
  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download all 20 drafts' }).click()
  const download = await downloadEvent
  expect(download.suggestedFilename()).toBe('hanovadevs-review-drafts.json')
  const data = JSON.parse(readFileSync(await download.path(), 'utf8'))
  expect(data.reviews).toHaveLength(20)
  expect(data.reviews[0].quote).toBe('Local draft replacement. Not a client endorsement.')
  expect(data.reviews.every(review => review.sample && !review.approvedForPublication)).toBe(true)
  await page.getByRole('button', { name: 'All samples' }).click()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
  const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('.review-lab'), { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations)
  expect(violations.map(item => `${item.id}: ${item.nodes.map(node => node.target).join(', ')}`)).toEqual([])
  expect(errors).toEqual([])
})

test('public homepage: approved feedback only and link to full source', async ({ page }) => {
  await page.goto('/')
  const spotlight = page.getByRole('region', { name: 'The work matters. So does the experience.' })
  await expect(spotlight.locator('blockquote')).toContainText('We had an excellent experience')
  await expect(spotlight).toContainText('Affan Mughal')
  await expect(page.locator('[data-sample]')).toHaveCount(0)
  await spotlight.getByRole('link', { name: 'Read the complete review' }).click()
  await expect(page).toHaveURL(/\/reviews#story-growtech$/)
  await page.getByText('Read Affan’s full review', { exact: true }).click()
  await expect(page.locator('.testimonial-card__full')).toHaveAttribute('open', '')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
})
