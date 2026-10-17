import nodemailer from 'nodemailer'
import { company } from '../src/data/company.js'
import { guardAssistantRequest } from '../server/assistantRequest.js'

const bounded = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max
export default async function handler(req, res) {
  if (!guardAssistantRequest(req, res, 'contact', 3)) return
  const { name, email, message, consent, website, conversation } = req.body
  if (website) return res.status(400).json({ error: 'Unable to send this request.' })
  if (!bounded(name, 100) || /[\r\n]/.test(name) || !bounded(email, 254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !bounded(message, 5000) || consent !== true) {
    return res.status(400).json({ error: 'Enter your name, a valid email, a short enquiry and consent to be contacted.' })
  }
  if (conversation !== undefined && (!Array.isArray(conversation) || conversation.length > 12 || conversation.some(item => !['user', 'assistant'].includes(item?.role) || !bounded(item?.content, 2000)))) {
    return res.status(400).json({ error: 'The optional conversation is too long or invalid.' })
  }
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(503).json({ error: `Messaging is temporarily unavailable. Please email ${company.email}.` })
  }
  const port = Number(process.env.EMAIL_PORT || 465)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com', port,
    secure: port === 465, requireTLS: port !== 465,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000,
  })
  try {
    const text = `Website enquiry via Aria\n\nName: ${name.trim()}\nReply email: ${email.trim()}\n\n${message.trim()}\n\nConsent: visitor agreed to be contacted about this enquiry.${conversation?.length ? '\n\nConversation shared by visitor:\n' + conversation.map(item => `${item.role === 'user' ? 'Visitor' : 'Aria'}: ${item.content}`).join('\n\n') : ''}`
    const info = await transporter.sendMail({
      from: { name: 'HanovaDevs Website', address: process.env.EMAIL_USER },
      to: company.email, replyTo: email.trim(), subject: 'New website enquiry via Aria', text,
      disableFileAccess: true, disableUrlAccess: true,
    })
    if (!info.accepted?.some(address => String(address).toLowerCase() === company.email.toLowerCase())) throw new Error('Recipient not accepted')
    return res.status(202).json({ message: 'Your enquiry was accepted by our mail server. The team will reply by email; no meeting is confirmed yet.' })
  } catch {
    console.warn('Aria contact delivery failed.')
    return res.status(502).json({ error: `Your enquiry could not be sent. Your draft is still here; retry or email ${company.email}.` })
  } finally { transporter.close() }
}
