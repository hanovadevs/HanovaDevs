import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { getGuideReply } from '../../src/data/assistantKnowledge.js'

test.beforeEach(async ({ context }) => {
  await context.addCookies([{ name: 'hanova_consent', value: encodeURIComponent(JSON.stringify({ version: 1, analytics: false })), url: 'http://127.0.0.1:5173' }])
})

test('the local frontend serves the real API handlers and rejects invalid requests without contacting providers', async ({ request }) => {
  const get = await request.get('/api/chat')
  expect(get.status()).toBe(405)
  const chat = await request.post('/api/chat', { data: { messages: [] } })
  expect(chat.status()).toBe(400)
  const contact = await request.post('/api/assistant-contact', { data: { consent: false } })
  expect(contact.status()).toBe(400)
})

test('Aria opens accessibly, answers from reviewed content and follows the conversation', async ({ page }) => {
  const consoleErrors = []
  page.on('pageerror', error => consoleErrors.push(error.message))
  await page.route('**/api/chat', async route => {
    const body = route.request().postDataJSON()
    await route.fulfill({ status: 200, json: getGuideReply(body.messages.at(-1).content, body.messages.slice(0, -1), body.page) })
  })
  await page.goto('/products/stepsy')
  const initialScroll = await page.evaluate(() => scrollY)
  await page.getByRole('button', { name: 'Toggle AI Assistant' }).click()
  const panel = page.locator('#ai-assistant-panel')
  const bounds = await panel.boundingBox()
  const viewport = page.viewportSize()
  expect(bounds.x).toBeGreaterThanOrEqual(0)
  expect(bounds.y).toBeGreaterThanOrEqual(0)
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(viewport.width)
  expect(bounds.y + bounds.height).toBeLessThanOrEqual(viewport.height)
  const input = page.getByRole('textbox', { name: 'Message Aria' })
  await expect(input).toBeFocused()
  await input.fill('Who is Noor Fatima?')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(panel.locator('.aria-message--assistant').last()).toContainText('Business Analyst')
  await expect(panel.getByRole('link', { name: 'Noor Fatima' })).toHaveAttribute('href', '/team/noor-fatima')
  await expect(panel.getByText('Live AI is unavailable.', { exact: false })).toBeVisible()
  await input.fill('Tell me about Stepsy')
  await input.press('Enter')
  await expect(panel.locator('.aria-message--assistant').last()).toContainText('Pakistan')
  await input.fill('Can I download it?')
  await input.press('Enter')
  await expect(panel.locator('.aria-message--assistant').last()).toContainText('No app-store availability')
  expect(await page.evaluate(() => scrollY)).toBe(initialScroll)
  await page.addScriptTag({ content: readFileSync('node_modules/axe-core/axe.min.js', 'utf8') })
  const violations = await page.evaluate(async () => (await window.axe.run(document.querySelector('#ai-assistant-panel'))).violations.filter(item => ['serious', 'critical'].includes(item.impact)).map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) })))
  expect(violations).toEqual([])
  await page.screenshot({ path: `artifacts/aria/conversation-${test.info().project.name}.png` })
  await input.press('Escape')
  await expect(page.getByRole('button', { name: 'Toggle AI Assistant' })).toBeFocused()
  await expect(panel).toHaveAttribute('inert', '')
  expect(consoleErrors).toEqual([])
})

test('Aria contact handoff preserves failed drafts and sends only visitor-approved data', async ({ page }) => {
  const sent = []
  await page.route('**/api/chat', async route => route.fulfill({ status: 200, json: getGuideReply(route.request().postDataJSON().messages.at(-1).content) }))
  await page.route('**/api/assistant-contact', async route => {
    sent.push(route.request().postDataJSON())
    await route.fulfill(sent.length === 1 ? { status: 503, json: { error: 'Messaging is temporarily unavailable. Your draft is unchanged.' } } : { status: 202, json: { message: 'Your enquiry was accepted by our mail server. No meeting is confirmed yet.' } })
  })
  await page.goto('/services')
  await page.getByRole('button', { name: 'Toggle AI Assistant' }).click()
  await page.getByRole('textbox', { name: 'Message Aria' }).fill('I need a new Shopify store')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.locator('.aria-message--assistant')).toBeVisible()
  await page.getByRole('button', { name: 'Talk to the team' }).click()
  const form = page.getByRole('form', { name: 'Contact HanovaDevs through Aria' })
  await expect(form.getByLabel('Your enquiry')).toHaveValue('I need a new Shopify store')
  await form.getByLabel('Your name').fill('Browser test visitor')
  await form.getByLabel('Email address').fill('visitor@example.test')
  await form.getByRole('checkbox', { name: 'I agree to be contacted' }).check()
  await form.getByRole('button', { name: 'Send enquiry' }).click()
  await expect(form.getByRole('alert')).toContainText('temporarily unavailable')
  await expect(form.getByLabel('Your enquiry')).toHaveValue('I need a new Shopify store')
  expect(sent[0].conversation).toBeUndefined()
  await form.getByRole('checkbox', { name: 'Also share my recent conversation' }).check()
  await form.getByRole('button', { name: 'Send enquiry' }).click()
  await expect(page.locator('.aria-contact-confirmation')).toContainText('No meeting is confirmed yet')
  expect(sent).toHaveLength(2)
  expect(sent[1].conversation.some(message => message.content.includes('Shopify'))).toBe(true)
  expect(sent[1].consent).toBe(true)
})

test('offline mode, reset and calculator handoff remain usable', async ({ page }) => {
  await page.route('**/api/chat', route => route.abort())
  await page.goto('/calculator')
  await page.getByRole('button', { name: 'Toggle AI Assistant' }).click()
  await page.getByRole('textbox', { name: 'Message Aria' }).fill('When is Omnai launching?')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  await expect(page.locator('.aria-message--assistant')).toContainText('No public release date')
  await page.getByRole('button', { name: 'Start a new conversation' }).click()
  await expect(page.locator('.aria-message')).toHaveCount(0)
  await page.evaluate(() => window.dispatchEvent(new CustomEvent('hanova_secure_quote', { detail: { service: 'Web Design', details: 'Five pages and a CMS', range: '$800–$1,000', timeline: '4 weeks' } })))
  await expect(page.getByRole('textbox', { name: 'Your enquiry' })).toHaveValue(/Five pages and a CMS/)
  await expect(page.getByRole('textbox', { name: 'Your enquiry' })).toHaveValue(/Planning estimate/)
})

test('a stopped response cannot overwrite a fresh conversation', async ({ page }) => {
  let finishRequest
  let requestCount = 0
  await page.route('**/api/chat', async route => {
    requestCount += 1
    await new Promise(resolve => { finishRequest = resolve })
    await route.fulfill({ status: 200, json: { text: 'This late answer must not appear.', mode: 'ai', sources: [], followUps: [] } }).catch(() => {})
  })
  await page.goto('/')
  await page.getByRole('button', { name: 'Toggle AI Assistant' }).click()
  const input = page.getByRole('textbox', { name: 'Message Aria' })
  await input.fill('Tell me about Stepsy')
  await input.press('Enter')
  await expect.poll(() => requestCount).toBe(1)
  await input.fill('Another question')
  await input.press('Enter')
  expect(requestCount).toBe(1)
  await page.getByRole('button', { name: 'Stop response' }).click()
  await expect(page.locator('#ai-assistant-panel').getByRole('alert')).toContainText('Response stopped')
  await page.getByRole('button', { name: 'Start a new conversation' }).click()
  finishRequest()
  await expect(page.locator('.aria-welcome')).toBeVisible()
  await expect(page.locator('.aria-message')).toHaveCount(0)
  await expect(page.getByText('This late answer must not appear.')).toHaveCount(0)
})

test('model text cannot inject HTML or arbitrary links', async ({ page }) => {
  await page.route('**/api/chat', route => route.fulfill({ status: 200, json: {
    mode: 'ai', text: '<img src=x onerror=alert(1)> [unsafe](javascript:alert(1))', followUps: [],
    sources: [{ title: 'Unsafe source', url: 'javascript:alert(1)' }, { title: 'Eunoia', url: '/products/eunoia' }],
  } }))
  await page.goto('/')
  await page.getByRole('button', { name: 'Toggle AI Assistant' }).click()
  await page.getByRole('textbox', { name: 'Message Aria' }).fill('Tell me about Eunoia')
  await page.getByRole('button', { name: 'Send message', exact: true }).click()
  const message = page.locator('.aria-message--assistant')
  await expect(message).toContainText('<img src=x onerror=alert(1)>')
  await expect(message.locator('img, script, a[href^="javascript:"]')).toHaveCount(0)
  await expect(message.getByRole('link')).toHaveCount(1)
  await expect(message.getByRole('link')).toHaveAttribute('href', '/products/eunoia')
})
