import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

// Public pages only: no login, sign-up, purchase or simulator play is submitted.
const origin = 'https://junkobodieroulette.com'
const source = 'assets/source/projects/junko-bodie-roulette'
const output = 'public/case-studies'
await mkdir(source, { recursive: true })
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ headless: true, args: ['--disable-http2'] })
try {
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const page = await context.newPage()
  // The public homepage hero did not render reliably during this review. Use the
  // fully rendered public calculator for the cover; never reconstruct the UI.
  for (const [name, route] of [['desktop', '/roulette-odds-calculator'], ['simulator', '/roulette-simulator'], ['calculator', '/roulette-odds-calculator'], ['learning', '/blog']]) {
    const response = await page.goto(`${origin}${route}`, { waitUntil: 'networkidle', timeout: 60000 })
    if (!response?.ok() || new URL(page.url()).hostname !== 'junkobodieroulette.com') throw Error(`Unexpected public response: ${route}`)
    await page.evaluate(() => document.fonts.ready)
    await page.waitForFunction(() => document.querySelector('h1') && parseFloat(getComputedStyle(document.querySelector('h1')).fontSize) > 40, undefined, { timeout: 15000 })
    await page.waitForTimeout(2000)
    if (name === 'desktop' || name === 'calculator') await page.evaluate(() => scrollTo(0, 620))
    console.log(JSON.stringify({ route, title: await page.title(), heading: await page.locator('h1').first().innerText() }))
    const capture = await page.screenshot({ path: `${source}/${name}.png` })
    await sharp(capture).webp({ quality: 85 }).toFile(`${output}/junko-bodie-roulette-${name}.webp`)
    if (name === 'desktop') {
      await sharp(capture).resize(800).webp({ quality: 83 }).toFile(`${output}/junko-bodie-roulette-card.webp`)
      await page.setViewportSize({ width: 390, height: 844 })
      await page.evaluate(() => scrollTo(0, 620))
      await page.waitForTimeout(800)
      await sharp(await page.screenshot({ path: `${source}/mobile.png` })).webp({ quality: 85 }).toFile(`${output}/junko-bodie-roulette-mobile.webp`)
      await page.setViewportSize({ width: 1600, height: 1000 })
    }
  }
  await context.close()
} finally { await browser.close() }
