import { generateText } from 'ai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { buildAssistantInstructions, getGuideReply } from '../src/data/assistantKnowledge.js'
import { guardAssistantRequest } from '../server/assistantRequest.js'

export default async function handler(req, res) {
  if (!guardAssistantRequest(req, res, 'chat')) return
  const { messages, page } = req.body
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 16 || messages.some(message =>
    !message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string' || !message.content.trim() || message.content.length > 2000
  ) || messages.at(-1).role !== 'user' || messages.reduce((sum, message) => sum + message.content.length, 0) > 16000) {
    return res.status(400).json({ error: 'Please send a shorter conversation with a valid question.' })
  }
  const cleanMessages = messages.map(({ role, content }) => ({ role, content: content.trim() }))
  const path = typeof page === 'string' ? page.slice(0, 150) : '/'
  const guide = getGuideReply(cleanMessages.at(-1).content, cleanMessages.slice(0, -1), path)
  // Keep the established direct Anthropic account; do not silently change billing or credentials.
  if (!process.env.ANTHROPIC_API_KEY) return res.status(200).json(guide)
  const controller = new AbortController()
  const disconnect = () => controller.abort()
  res.once?.('close', disconnect)
  try {
    const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
    const result = await generateText({
      model: anthropic(process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5'),
      instructions: buildAssistantInstructions(path), messages: cleanMessages,
      maxOutputTokens: 900, maxRetries: 1, timeout: 18000, abortSignal: controller.signal,
    })
    if (!result.text?.trim()) throw new Error('Empty assistant response')
    return res.status(200).json({ ...guide, text: result.text.trim().slice(0, 6000), mode: 'ai' })
  } catch {
    if (controller.signal.aborted) return
    console.warn('Aria generation unavailable; using reviewed site guide.')
    return res.status(200).json(guide)
  } finally { res.off?.('close', disconnect) }
}
