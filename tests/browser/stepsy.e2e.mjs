import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { stepsyScenes } from '../../src/data/stepsy.js'

test.beforeEach(async ({ context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
})

test('Stepsy preview, supplied images, chapter anchors and FAQs work across sizes', async ({ page }) => {
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/products/stepsy')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Every step.More possibility.')
  await expect(page.locator('.stepsy-scene')).toHaveCount(5)
  for (const scene of stepsyScenes) {
    const chapter = page.locator(`#stepsy-${scene.id}`)
    await chapter.scrollIntoViewIfNeeded()
    await expect(chapter.getByRole('img')).toBeVisible()
    await chapter.getByRole('img').evaluate(image => image.decode())
  }
  await page.getByRole('navigation', { name: 'Stepsy story chapters' }).getByRole('link', { name: 'Rewards', exact: true }).click()
  await expect(page).toHaveURL(/#stepsy-rewards$/)
  expect(await page.locator('#stepsy-rewards').evaluate(node => node.getBoundingClientRect().top)).toBeGreaterThanOrEqual(80)
  const faq = page.locator('.stepsy-faq details').first()
  await faq.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(faq.locator('p')).toBeVisible()
  await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
  expect(await page.evaluate(async () => (await window.axe.run(document.querySelector('main'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })))).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true)
  expect(errors).toEqual([])
})

test('cinematic scroll transitions, still-view toggle and reduced-motion changes are real', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop', 'Desktop sticky cinema; responsive still story checked separately')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/products/stepsy')
  const story = page.locator('#stepsy-story')
  await expect(story).toHaveAttribute('data-cinematic', 'true')
  const frames = page.locator('.stepsy-film__frame')
  for (const [index, scene] of stepsyScenes.entries()) {
    await page.locator(`#stepsy-${scene.id}`).scrollIntoViewIfNeeded()
    await expect.poll(async () => Number(await frames.nth(index).evaluate(node => getComputedStyle(node).opacity))).toBeGreaterThan(.95)
  }
  await page.getByRole('button', { name: 'Use still view' }).click()
  await expect(story).not.toHaveAttribute('data-cinematic', 'true')
  await expect(page.locator('.stepsy-scene__preview').first()).toBeVisible()
  await page.getByRole('button', { name: 'Use animated view' }).click()
  await expect(story).toHaveAttribute('data-cinematic', 'true')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(story).not.toHaveAttribute('data-cinematic', 'true')
  await expect(page.locator('.stepsy-scene__preview').first()).toBeVisible()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(story).toHaveAttribute('data-cinematic', 'true')
  await page.getByRole('link', { name: 'HanovaDevs / Our products' }).click()
  await expect(page).toHaveURL('/products')
  expect(await page.locator('.stepsy-film__stage').count()).toBe(0)
})

test('Stepsy is linked from the product hub, Home and footer', async ({ page }) => {
  test.skip(test.info().project.name !== 'desktop', 'Shared discovery check')
  await page.goto('/products')
  await page.getByRole('link', { name: 'Experience the Stepsy story' }).click()
  await expect(page).toHaveURL('/products/stepsy')
  await page.goto('/')
  await expect(page.locator('#products-teaser').getByRole('link', { name: 'Explore the Stepsy story' })).toHaveAttribute('href', '/products/stepsy')
  await expect(page.locator('footer').getByRole('link', { name: 'Stepsy', exact: true })).toHaveAttribute('href', '/products/stepsy')
})
