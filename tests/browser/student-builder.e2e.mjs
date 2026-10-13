import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { studentBuilders, builderProgram } from '../../src/data/studentBuilderProgram.js'
import { leadershipTeam } from '../../src/data/leadership.js'

test('program roster, mentors, anchors, FAQs, assets and sharing work across resolutions', async ({ page, context }) => {
  test.setTimeout(90000)
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(builderProgram.path)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Build somethingthat matters.')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('.navbar__logo-full')).toBeVisible()
  await expect(page.locator('.sbp-builder')).toHaveCount(13)
  expect(await page.locator('.sbp-builder').evaluateAll(cards => cards.map(card => card.dataset.builderId))).toEqual(Array.from({ length: 13 }, (_, index) => `HD-SB-${String(index + 1).padStart(3, '0')}`))
  for (const builder of studentBuilders) {
    const card = page.locator('.sbp-builder').filter({ has: page.getByRole('heading', { name: builder.name, exact: true }) })
    await expect(card.locator('.sbp-builder__id')).toHaveText(`Participant ID: ${builder.id}`)
    if (builder.linkedin) await expect(card.getByRole('link')).toHaveAttribute('href', builder.linkedin)
    else await expect(card.getByRole('link')).toHaveCount(0)
    const badge = await card.locator('.sbp-builder__id').boundingBox()
    const initials = await card.locator('.sbp-initials').boundingBox()
    expect(badge.x).toBeGreaterThanOrEqual(initials.x + initials.width)
    const bounds = await card.boundingBox()
    expect(bounds.x).toBeGreaterThanOrEqual(0)
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize().width + 1)
  }
  await page.getByRole('link', { name: 'Meet the builders', exact: true }).click()
  await expect(page).toHaveURL(/#builders$/)
  const builderTop = await page.locator('#builders').evaluate(node => node.getBoundingClientRect().top)
  expect(builderTop).toBeGreaterThanOrEqual(130)
  for (const member of leadershipTeam) await expect(page.locator('#mentors').getByRole('link', { name: `Meet ${member.name}` })).toHaveAttribute('href', member.profile)
  const imageErrors = await page.locator('.sbp-page img').evaluateAll(async images => (await Promise.all(images.map(async image => { image.loading = 'eager'; try { await image.decode(); return null } catch { return image.src } }))).filter(Boolean))
  expect(imageErrors).toEqual([])
  const details = page.locator('.sbp-faq details').first()
  await details.locator('summary').focus(); await page.keyboard.press('Enter')
  await expect(details.locator('p')).toBeVisible()
  await expect(details).toHaveAttribute('open', '')
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.copiedProgramUrl = value } } }))
  await page.getByRole('button', { name: 'Copy program link' }).click()
  await expect(page.getByRole('status')).toHaveText('Program link copied.')
  expect(await page.evaluate(() => window.copiedProgramUrl)).toBe(builderProgram.url)
  await expect(page.getByRole('link', { name: 'Share on LinkedIn' })).toHaveAttribute('href', `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(builderProgram.url)}`)
  await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
  const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('main'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })))
  expect(violations).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true)
  expect(await page.locator('.sbp-builder').first().evaluate(node => getComputedStyle(node).transitionDuration)).toBe('0s')
  expect(errors).toEqual([])
})

test('program is discoverable from homepage, About, News, header and footer', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop', 'Shared discovery check')
  for (const path of ['/', '/about', '/news']) {
    await page.goto(path)
    await expect(page.locator('.program-spotlight').getByRole('link')).toHaveAttribute('href', builderProgram.path)
    await expect(page.locator('header').first().getByRole('link', { name: 'Builders', exact: true })).toHaveAttribute('href', builderProgram.path)
    await expect(page.locator('footer').getByRole('link', { name: 'Student Builder Program', exact: true })).toHaveAttribute('href', builderProgram.path)
  }
  await page.locator('.program-spotlight').getByRole('link').click()
  await expect(page).toHaveURL(builderProgram.path)
})
