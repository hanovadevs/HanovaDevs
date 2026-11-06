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
  // The public homepage hero did not render reliably during this review. Use
  // the static learning-library cover and a controls-only calculator close-up.
  for (const [name, route] of [['desktop', '/blog'], ['simulator', '/roulette-simulator'], ['calculator', '/roulette-odds-calculator'], ['learning', '/blog']]) {
    const response = await page.goto(`${origin}${route}`, { waitUntil: 'networkidle', timeout: 60000 })
    if (!response?.ok() || new URL(page.url()).hostname !== 'junkobodieroulette.com') throw Error(`Unexpected public response: ${route}`)
    await page.evaluate(() => document.fonts.ready)
    await page.waitForFunction(() => document.querySelector('h1') && parseFloat(getComputedStyle(document.querySelector('h1')).fontSize) > 40, undefined, { timeout: 15000 })
    await page.waitForTimeout(2000)
    if (name === 'calculator') await page.evaluate(() => scrollTo(0, 620))
    console.log(JSON.stringify({ route, title: await page.title(), heading: await page.locator('h1').first().innerText() }))
    const capture = await page.screenshot({ path: `${source}/${name}.png` })
    const asset = sharp(capture)
    if (name === 'calculator') asset.extract({ left: 720, top: 80, width: 680, height: 850 })
    await asset.webp({ quality: 85 }).toFile(`${output}/junko-bodie-roulette-${name}.webp`)
    if (name === 'desktop') {
      await sharp(capture).resize(800).webp({ quality: 83 }).toFile(`${output}/junko-bodie-roulette-card.webp`)
    }
  }
  await context.close()
} finally { await browser.close() }
