import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

test('overview heroes stay light, readable and usable across screen sizes and client navigation', async ({ page, context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const path of ['/services', '/products', '/projects']) {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    const hero = page.locator('.page-hero-light')
    await expect(hero).toBeVisible()
    await expect(page.locator('.navbar__logo-full')).toBeVisible()
    await expect(page.locator('.navbar__logo-inverse')).toBeHidden()
    await expect(page.locator('#main-nav')).not.toHaveClass(/navbar--dark/)
    expect(await hero.evaluate(element => {
      const color = getComputedStyle(element).backgroundColor.match(/\d+/g).map(Number)
      return color.slice(0, 3).every(channel => channel > 230)
    })).toBe(true)
    for (const element of await hero.locator('h1, p, a').all()) {
      const bounds = await element.boundingBox()
      expect(bounds.x).toBeGreaterThanOrEqual(0)
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize().width + 1)
      expect(await element.evaluate(node => node.scrollWidth <= node.clientWidth + 1)).toBe(true)
    }
    await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
    const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('.page-hero-light'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })))
    expect(violations).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true)
    if (path === '/services') {
      await hero.getByRole('link', { name: 'Explore services', exact: true }).click()
      await expect(page).toHaveURL(/#services-grid$/)
      await expect(page.locator('.services-bento').getByRole('link').first()).toBeInViewport()
    } else if (path === '/products') {
      await hero.getByRole('link', { name: 'Discover Eunoia', exact: true }).click()
      await expect(page).toHaveURL('/products/eunoia')
      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Your mind, beautifully organized.')
    } else {
      await hero.getByRole('link', { name: 'Client stories & reviews', exact: true }).click()
      await expect(page).toHaveURL('/reviews')
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    }
  }
  // Lazy route CSS must not change an earlier hero when returning without a reload.
  for (const path of ['/services', '/products', '/projects', '/services']) {
    await page.evaluate(destination => {
      history.pushState(null, '', destination)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }, path)
    await expect(page.locator('.page-hero-light')).toBeVisible()
    await expect(page.locator('#main-nav')).not.toHaveClass(/navbar--dark/)
    expect(await page.locator('.page-hero-light').evaluate(element => getComputedStyle(element).backgroundColor)).not.toBe('rgb(15, 17, 21)')
  }
  expect(errors).toEqual([])
})
