import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'

const baseURL = process.env.RESPONSIVE_BASE_URL || 'http://127.0.0.1:5173'
const widths = (process.env.RESPONSIVE_WIDTHS || '320,360,390,430,768,820,1024,1280,1440,1920').split(',').map(Number)
const routes = [
  '/', '/services', '/about', '/projects', '/products', '/contact',
  '/news', '/research', '/journal', '/stack', '/calculator',
  '/products/omnai', '/products/eunoia', '/products/eunoia/privacy',
  '/privacy-policy', '/terms-of-service', '/missing-page', '/hanova-portal-2026',
  '/journal/future-of-web-dev', '/journal/autonomous-agent-swarms-quantum-mesh',
  ...['web-design', 'software-development', 'ai-automation', 'shopify-development', 'seo', 'branding', 'digital-marketing', 'ugc-ads'].map(id => `/services/${id}`),
]
const browser = await chromium.launch()
const results = []
await mkdir('artifacts/responsive', { recursive: true })

function measureLayout() {
  const viewport = document.documentElement.clientWidth
  const isVisible = element => {
    if (element.closest('[inert], [aria-hidden="true"]')) return false
    for (let node = element; node; node = node.parentElement) {
      const style = getComputedStyle(node)
      if (style.visibility === 'hidden' || style.display === 'none' || Number(style.opacity) < 0.1) return false
    }
    return element.getBoundingClientRect().width > 0
  }
  const clipped = element => {
    for (let node = element.parentElement; node && node !== document.body; node = node.parentElement) {
      if (/hidden|clip|auto|scroll/.test(getComputedStyle(node).overflowX)) return true
    }
    return false
  }
  const overflow = [...document.querySelectorAll('body *')].filter(element => {
    if (!isVisible(element) || clipped(element)) return false
    const rect = element.getBoundingClientRect()
    return rect.right > viewport + 2 || rect.left < -2
  }).slice(0, 12).map(element => ({
    element: `${element.tagName.toLowerCase()}.${String(element.className).replaceAll(' ', '.')}`,
    text: element.textContent.trim().slice(0, 70),
    width: Math.round(element.getBoundingClientRect().width),
    right: Math.round(element.getBoundingClientRect().right),
  }))
  const headingOverflow = [...document.querySelectorAll('main h1, main h2, main h3')].filter(isVisible).filter(element => {
    const range = document.createRange()
    range.selectNodeContents(element)
    return [...range.getClientRects()].some(rect => rect.right > viewport + 2 || rect.left < -2)
  }).map(element => element.textContent.trim().slice(0, 80))
  return { scrollWidth: document.documentElement.scrollWidth, viewport, overflow, headingOverflow }
}

try {
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: width < 600 ? 740 : 900 }, reducedMotion: 'reduce', isMobile: width < 600, hasTouch: width <= 1024 })
    const page = await context.newPage()
    for (const route of routes) {
      const errors = []
      const captureError = error => errors.push(error.message)
      page.on('pageerror', captureError)
      await page.goto(`${baseURL}${route}`, { waitUntil: 'domcontentloaded' })
      await page.locator('main h1, .admin-login, .portal-login, .admin-login-card').first().waitFor({ timeout: 20000 })
      await page.evaluate(() => document.fonts.ready)
      await page.evaluate(async () => {
        const steps = Math.ceil(document.documentElement.scrollHeight / window.innerHeight)
        for (let step = 0; step < steps; step++) {
          window.scrollTo(0, step * window.innerHeight)
          await new Promise(resolve => requestAnimationFrame(resolve))
        }
        window.scrollTo(0, 0)
      })
      const layout = await page.evaluate(measureLayout)
      const result = { route, width, ...layout, errors }
      results.push(result)
      if (layout.scrollWidth > width + 2 || layout.overflow.length || layout.headingOverflow.length || errors.length) console.log(JSON.stringify(result))
      if (['/', '/contact', '/products/eunoia', '/news'].includes(route) && [390, 820, 1440].includes(width)) {
        await page.screenshot({ path: `artifacts/responsive/${route.replaceAll('/', '-') || 'home'}-${width}.png`, fullPage: true })
      }
      page.off('pageerror', captureError)
    }
    await context.close()
    console.log(`Checked ${routes.length} routes at ${width}px`)
  }
  const failures = results.filter(result => result.scrollWidth > result.width + 2 || result.overflow.length || result.headingOverflow.length || result.errors.length)
  await writeFile('artifacts/responsive/layout-report.json', JSON.stringify({ results, failures }, null, 2))
  console.log(`${results.length} layout checks; ${failures.length} failures`)
  process.exitCode = failures.length ? 1 : 0
} finally {
  await browser.close()
}
