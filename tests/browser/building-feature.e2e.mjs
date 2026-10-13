import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'

test('premises feature loads, stays responsive and has working keyboard navigation', async ({ page, context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
  for (const path of ['/', '/about']) {
    await page.goto(path)
    const section = page.locator('#company-space')
    await section.scrollIntoViewIfNeeded()
    await expect(section.getByRole('heading')).toHaveText('Room for ideas.Space to build.')
    await expect(section).not.toContainText(/USA|premises/i)
    const image = section.getByRole('img')
    await expect(image).toBeVisible()
    await image.evaluate(image => image.decode())
    const bounds = await image.boundingBox()
    expect(bounds.x).toBeGreaterThanOrEqual(0)
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize().width + 1)
    expect(bounds.width / bounds.height).toBeCloseTo(1.5, 1)
    expect(await image.evaluate(image => getComputedStyle(image).objectFit)).toBe('contain')
    await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
    expect(await section.evaluate(async node => (await window.axe.run(node)).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => item.id))).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true)
    await section.getByRole('link').focus()
    await page.keyboard.press('Enter')
    if (path === '/') await expect(page).toHaveURL('/about')
    else {
      await expect(page).toHaveURL('/about#leadership')
      await expect(page.locator('#leadership')).toBeInViewport()
    }
  }
})
