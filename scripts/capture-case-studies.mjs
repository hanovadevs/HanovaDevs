import { chromium } from '@playwright/test'
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { clientProjects } from '../src/data/company.js'

const browser = await chromium.launch({ headless: true })
await mkdir('public/case-studies', { recursive: true })
try {
  for (const project of clientProjects) {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference', deviceScaleFactor: 1 })
    const page = await context.newPage()
    try {
      const response = await page.goto(project.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
      if (!response?.ok() || new URL(page.url()).hostname.replace(/^www\./, '') !== new URL(project.url).hostname.replace(/^www\./, '')) throw new Error('Unexpected response or destination')
      await page.waitForFunction(() => document.body.innerText.trim().length > 250 && document.querySelector('h1, h2'), { timeout: 20000 })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForTimeout(8000)
      const visibleText = await page.locator('body').innerText()
      console.log(JSON.stringify({ id: project.id, title: await page.title(), text: visibleText.slice(0, 2400).replace(/\s+/g, ' ') }))
      for (const [view, viewport] of [['desktop', { width: 1440, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
        await page.setViewportSize(viewport)
        await page.evaluate(() => scrollTo(0, 0))
        await page.waitForTimeout(1800)
        await sharp(await page.screenshot()).webp({ quality: 84 }).toFile(`public/case-studies/${project.id}-${view}.webp`)
      }
      await page.setViewportSize({ width: 1440, height: 1000 })
      await page.evaluate(() => scrollTo(0, Math.min(innerHeight * 0.9, document.documentElement.scrollHeight - innerHeight)))
      await page.waitForTimeout(800)
      await sharp(await page.screenshot()).webp({ quality: 84 }).toFile(`public/case-studies/${project.id}-detail.webp`)
      console.log(`${project.id}: three public-page screenshots captured`)
    } catch (error) { console.log(`${project.id}: capture unavailable (${error.name})`) }
    finally { await context.close() }
  }
} finally { await browser.close() }
