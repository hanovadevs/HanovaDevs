import { afterEach, expect, it, vi } from 'vitest'
import handler from '../../api/chat.js'

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals() })
it('runs the installed AI SDK against an Anthropic-compatible HTTP response', async () => {
  vi.stubEnv('ANTHROPIC_API_KEY', 'test-only-not-a-real-key')
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({
    id: 'msg_test', type: 'message', role: 'assistant', model: 'claude-sonnet-5-5',
    content: [{ type: 'text', text: 'Noor Fatima is CMO and Business Analyst at HanovaDevs.' }],
    stop_reason: 'end_turn', stop_sequence: null, usage: { input_tokens: 30, output_tokens: 20 },
  }), { status: 200, headers: { 'Content-Type': 'application/json' } }))
  vi.stubGlobal('fetch', fetchMock)
  const res = { setHeader: vi.fn(), status: vi.fn().mockReturnThis(), json: vi.fn() }
  await handler({ method: 'POST', headers: { 'x-forwarded-for': 'provider-sdk-fixture' }, body: { messages: [{ role: 'user', content: 'Who is Noor Fatima?' }] } }, res)
  expect(fetchMock).toHaveBeenCalledTimes(1)
  const body = JSON.parse(fetchMock.mock.calls[0][1].body)
  expect(body.model).toBe('claude-sonnet-5-5')
  expect(JSON.stringify(body.system)).toContain('Business Analyst')
  expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ mode: 'ai', text: expect.stringContaining('Business Analyst') }))
})
