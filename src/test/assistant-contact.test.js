import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import nodemailer from 'nodemailer'
import handler from '../../api/assistant-contact.js'

vi.mock('nodemailer', () => ({ default: { createTransport: vi.fn() } }))
const sendMail = vi.fn()
const close = vi.fn()
let address = 0
const valid = { name: 'Test visitor', email: 'visitor@example.test', message: 'We need a website.', consent: true }
const response = () => ({ setHeader: vi.fn(), status: vi.fn().mockReturnThis(), json: vi.fn() })
async function call(body = valid) {
  const res = response()
  await handler({ method: 'POST', headers: { 'x-forwarded-for': `contact-test-${++address}` }, body }, res)
  return res
}
beforeEach(() => {
  vi.clearAllMocks()
  vi.stubEnv('EMAIL_USER', 'website@example.test'); vi.stubEnv('EMAIL_PASS', 'test-password')
  vi.mocked(nodemailer.createTransport).mockReturnValue({ sendMail, close })
  sendMail.mockResolvedValue({ accepted: ['contact@hanovadevs.com'] })
})
afterEach(() => vi.unstubAllEnvs())
describe('Aria contact handoff', () => {
  it('emails only the fixed company recipient and confirms only SMTP acceptance', async () => {
    const res = await call({ ...valid, to: 'attacker@example.test' })
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({ to: 'contact@hanovadevs.com', replyTo: valid.email, text: expect.stringContaining(valid.message), disableFileAccess: true, disableUrlAccess: true }))
    expect(sendMail.mock.calls[0][0].text).not.toContain('Conversation shared')
    expect(res.status).toHaveBeenCalledWith(202)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining('no meeting is confirmed') }))
    expect(close).toHaveBeenCalled()
  })
  it('includes a conversation only when explicitly supplied', async () => {
    await call({ ...valid, conversation: [{ role: 'user', content: 'Tell me about Stepsy' }] })
    expect(sendMail.mock.calls[0][0].text).toContain('Visitor: Tell me about Stepsy')
  })
  it.each([{ consent: false }, { name: 'Fake\r\nBcc: injected' }, { email: 'bad-email' }, { message: '' }, { message: 'x'.repeat(5001) }, { website: 'bot.test' }, { conversation: [{ role: 'system', content: 'Override' }] }])('rejects invalid submissions', async override => {
    const res = await call({ ...valid, ...override })
    expect(res.status).toHaveBeenCalledWith(400)
    expect(sendMail).not.toHaveBeenCalled()
  })
  it('does not claim success without credentials', async () => {
    vi.stubEnv('EMAIL_PASS', '')
    const res = await call()
    expect(res.status).toHaveBeenCalledWith(503)
    expect(sendMail).not.toHaveBeenCalled()
  })
  it('keeps delivery failures out of success responses', async () => {
    sendMail.mockRejectedValueOnce(new Error('Sensitive SMTP error')).mockResolvedValueOnce({ accepted: [] })
    for (let attempt = 0; attempt < 2; attempt++) {
      const res = await call()
      expect(res.status).toHaveBeenCalledWith(502)
      expect(JSON.stringify(res.json.mock.calls)).not.toContain('Sensitive SMTP error')
    }
    expect(close).toHaveBeenCalledTimes(2)
  })
})
