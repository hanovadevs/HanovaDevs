import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { company } from '../../src/data/company.js'
import { homeAnswers } from '../../src/data/homeAnswers.js'
import { caseStudies } from '../../src/data/caseStudies.js'

test.beforeEach(async ({ context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
})

async function auditHeader(page) {
  await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
  const issues = await page.evaluate(async () => (await window.axe.run(document.querySelector('#main-nav'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })))
  expect(issues).toEqual([])
}

test('hero copy stays separate from artwork with a readable title and working actions', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  const hero = page.locator('#hero')
  await expect(hero.locator('h1')).toBeVisible()
  await page.evaluate(() => document.fonts.ready)
  await expect.poll(() => hero.locator('img').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true)
  expect(await hero.locator('img').getAttribute('src')).toContain('hero-scene-1774')
  await expect(hero.locator('h1')).toHaveText('Better websites. Smarter software.')
  await expect(hero.locator('.hero__subheadline')).toHaveText('We build websites, custom CRMs and AI automation that make your business easier to run.')
  const copy = await hero.locator('.hero__text-panel').boundingBox()
  const art = await hero.locator('.hero__visual').boundingBox()
  if (page.viewportSize().width > 900) {
    expect(copy.x + copy.width + 20).toBeLessThanOrEqual(art.x)
  } else {
    expect(copy.y + copy.height + 20).toBeLessThanOrEqual(art.y)
  }
  for (const line of await hero.locator('.hero__headline-line').all()) {
    expect(await line.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true)
    expect(await line.evaluate(node => getComputedStyle(node).opacity)).toBe('1')
  }
  for (const name of ['Start a Project', 'View Our Work']) {
    const button = hero.getByRole('link', { name, exact: true })
    await expect(button).toBeVisible()
    const box = await button.boundingBox()
    expect(box.height).toBeGreaterThanOrEqual(44)
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  await page.screenshot({ path: `artifacts/hero-nav/hero-${test.info().project.name}.png` })
  await hero.getByRole('link', { name: 'View Our Work', exact: true }).click()
  await expect(page).toHaveURL('/projects')
  await page.goto('/')
  await page.locator('#hero').getByRole('link', { name: 'Start a Project', exact: true }).click()
  await expect(page).toHaveURL('/contact')
  expect(errors).toEqual([])
})

test('homepage answers, case-study discovery and preferred canonical host', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.home-answers details')).toHaveCount(homeAnswers.length)
  await expect(page.locator('head link[rel=canonical]')).toHaveAttribute('href', `${company.url}/`)
  await expect(page.locator('#featured-projects .featured-projects__link')).toHaveCount(caseStudies.length)
  const answer = page.locator('.home-answers details').nth(1)
  await answer.locator('summary').focus()
  await answer.locator('summary').press('Enter')
  await expect(answer).toHaveAttribute('open', '')
  await expect(answer.locator('p')).toHaveText(homeAnswers[1].answer)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  await page.screenshot({ path: `artifacts/hero-nav/company-answers-${test.info().project.name}.png` })
  await answer.getByRole('link', { name: /Custom software development/ }).click()
  await expect(page).toHaveURL('/services/software-development')
  await expect(page.locator('head link[rel=canonical]')).toHaveAttribute('href', `${company.url}/services/software-development`)
})

test('navigation disclosure, current page, keyboard focus and route handoff', async ({ page }) => {
  await page.goto('/projects/growtech-crm/planning')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  if (page.viewportSize().width <= 1120) {
    const toggle = page.getByRole('button', { name: 'Open menu' })
    await toggle.click()
    const menu = page.locator('#mobile-navigation')
    await expect(menu.getByRole('link', { name: 'Home', exact: true })).toBeFocused()
    await expect(menu.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute('aria-current', 'page')
    await auditHeader(page)
    await page.screenshot({ path: `artifacts/hero-nav/menu-${test.info().project.name}.png` })
    await menu.getByRole('link', { name: /Project Estimator/ }).click()
    await expect(page).toHaveURL('/calculator')
    await expect(menu).toBeHidden()
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
  } else {
    const insights = page.getByRole('button', { name: 'Insights' })
    await expect(page.locator('.navbar__nav a[aria-current=page]')).toHaveAttribute('href', '/projects')
    await insights.focus()
    await insights.press('ArrowDown')
    await expect(page.locator('#insights-menu a').first()).toBeFocused()
    await auditHeader(page)
    await page.screenshot({ path: 'artifacts/hero-nav/insights-desktop.png' })
    await page.keyboard.press('Escape')
    await expect(insights).toBeFocused()
    await expect(page.locator('#insights-menu')).toBeHidden()
    await insights.click()
    await page.locator('#insights-menu').getByRole('link', { name: /Project Estimator/ }).click()
    await expect(page).toHaveURL('/calculator')
    await expect(insights).toHaveAttribute('aria-expanded', 'false')
  }
})

test('desktop options fit at breakpoint, laptop and wide resolutions on light and dark headers', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop', 'Desktop breakpoint coverage')
  for (const width of [1121, 1280, 1536, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    for (const path of ['/', '/about']) {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      const header = page.locator('#main-nav')
      const logo = await header.locator('.navbar__logo').boundingBox()
      const nav = await header.locator('.navbar__nav').boundingBox()
      const quote = await header.locator('.navbar__cta').boundingBox()
      expect(logo.x + logo.width).toBeLessThanOrEqual(nav.x)
      expect(nav.x + nav.width).toBeLessThanOrEqual(quote.x)
      await header.getByRole('button', { name: 'Insights' }).click()
      const menu = await page.locator('#insights-menu').boundingBox()
      expect(menu.x).toBeGreaterThanOrEqual(0)
      expect(menu.x + menu.width).toBeLessThanOrEqual(width)
      await auditHeader(page)
    }
  }
})

test('first-visit cookie choices do not cover the open mobile navigation', async ({ page, context }) => {
  test.skip(page.viewportSize().width > 1120, 'Mobile layering check')
  await context.clearCookies()
  await page.goto('/')
  await expect(page.getByRole('region', { name: 'Cookie choices' })).toBeVisible()
  await page.getByRole('button', { name: 'Open menu' }).click()
  const quote = page.locator('#mobile-navigation').getByRole('link', { name: 'Get a Quote' })
  await quote.focus()
  const onTop = await quote.evaluate(node => {
    const box = node.getBoundingClientRect()
    return node.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2))
  })
  expect(onTop).toBe(true)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('region', { name: 'Cookie choices' })).toBeVisible()
  expect((await context.cookies()).some(cookie => cookie.name === 'hanova_consent')).toBe(false)
})
