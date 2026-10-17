import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assistantKnowledge, getGuideReply } from '../data/assistantKnowledge'
import AssistantContact from './assistant/AssistantContact'
import './AIChatbot.css'

function AriaMark() {
  return <svg className="aria-mark" width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M25 8.5H11a5 5 0 0 0-5 5v6a5 5 0 0 0 5 5h3l5 4v-4h2a5 5 0 0 0 5-5v-8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="m12 18 4-7 4 7m-6.5-2.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="m25 3 .9 2.6L28.5 6l-2.6.9L25 9.5l-.9-2.6L21.5 6l2.6-.4L25 3Z" fill="#66e0d4" /></svg>
}
const pageQuestions = path => path.includes('/products/stepsy') ? ['How will Stepsy work?', 'Can businesses partner with Stepsy?'] : path.includes('student-builder') ? ['What is the Student Builder Program?', 'Who mentors the builders?'] : path.includes('/products') ? ['Is Eunoia available?', 'When is Omnai launching?', 'Tell me about Stepsy'] : path.includes('/team') || path === '/about' ? ['Who leads HanovaDevs?', 'Who is Hira Maqsood?', 'What services do you offer?'] : ['What services do you offer?', 'Explore your products', 'Who leads HanovaDevs?']

// Model output is text, never HTML. Only reviewed on-site sources become clickable.
function MessageText({ text }) {
  return <div className="aria-message-text">{text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]*\))/g).map((part, index) => part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part.startsWith('[') && part.includes('](') ? <span key={index}>{part.slice(1, part.indexOf(']('))}</span> : part)}</div>
}
function reviewedSources(sources) {
  return Array.isArray(sources) ? sources.filter(source => assistantKnowledge.some(document => document.url === source?.url && document.title === source?.title)).slice(0, 3) : []
}

export default function AIChatbot() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState('chat')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState(null)
  const [error, setError] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactVersion, setContactVersion] = useState(0)
  const inputRef = useRef(null)
  const triggerRef = useRef(null)
  const scrollRef = useRef(null)
  const controller = useRef(null)
  const requestId = useRef(0)
  const busy = useRef(false)
  useEffect(() => () => controller.current?.abort(), [])
  useEffect(() => { if (isOpen && view === 'chat') inputRef.current?.focus({ preventScroll: true }) }, [isOpen, view])
  useEffect(() => {
    if (isOpen && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isLoading, isOpen])
  function close() { setIsOpen(false); triggerRef.current?.focus({ preventScroll: true }) }
  useEffect(() => {
    if (!isOpen) return
    const escape = event => { if (event.key === 'Escape') { event.preventDefault(); close() } }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [isOpen])
  useEffect(() => {
    const quote = event => {
      const detail = event.detail || {}
      const brief = `I’d like to discuss a ${String(detail.service || 'software')} project.\n${String(detail.details || '').slice(0, 1800)}\nPlanning estimate: ${String(detail.range || 'To be discussed')}.\nTimeline estimate: ${String(detail.timeline || 'To be discussed')}.\nPlease review this scope and provide a proposal.`
      setContactMessage(brief)
      setContactVersion(version => version + 1)
      setView('contact')
      setIsOpen(true)
    }
    window.addEventListener('hanova_secure_quote', quote)
    return () => window.removeEventListener('hanova_secure_quote', quote)
  }, [])
  function startContact() {
    setContactMessage(messages.filter(message => message.role === 'user').slice(-3).map(message => message.content).join('\n\n').slice(0, 4500))
    setContactVersion(version => version + 1)
    setView('contact')
  }
  async function send(question = input, retry = false) {
    const text = question.trim()
    if (!text || text.length > 2000 || busy.current) return
    busy.current = true
    const id = ++requestId.current
    controller.current = new AbortController()
    const history = retry ? messages.slice(0, -1) : messages
    const next = retry ? history : [...history, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setError('')
    setIsLoading(true)
    const timeout = setTimeout(() => controller.current?.abort('timeout'), 23000)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.current.signal,
        body: JSON.stringify({ messages: next.slice(-12).map(({ role, content }) => ({ role, content: content.slice(0, 1200) })), page: pathname }),
      })
      const data = await response.json().catch(() => null)
      if (response.status === 429 || response.status === 400 || response.status === 403) throw Object.assign(new Error(data?.error || 'Please wait a moment and try again.'), { requestRejected: true })
      if (!response.ok || !data?.text || !['ai', 'guide'].includes(data.mode)) throw new Error('Assistant unavailable')
      if (requestId.current !== id) return
      setMode(data.mode)
      setMessages(previous => [...previous, { role: 'assistant', content: data.text.slice(0, 6000), sources: reviewedSources(data.sources), followUps: Array.isArray(data.followUps) ? data.followUps.filter(value => typeof value === 'string' && value.length <= 100).slice(0, 3) : [], mode: data.mode }])
    } catch (failure) {
      if (requestId.current !== id) return
      if (failure.requestRejected) {
        setMessages(history)
        setInput(text)
        setError(failure.message)
      } else {
        const guide = getGuideReply(text, history, pathname)
        setMode('guide')
        setMessages(previous => [...previous, { role: 'assistant', content: guide.text, ...guide }])
      }
    } finally {
      clearTimeout(timeout)
      if (requestId.current === id) { busy.current = false; setIsLoading(false); inputRef.current?.focus({ preventScroll: true }) }
    }
  }
  function stop() {
    requestId.current += 1
    controller.current?.abort()
    busy.current = false
    setIsLoading(false)
    setError('Response stopped. You can send another question or talk to the team.')
  }
  function reset() {
    stop()
    setMessages([]); setMode(null); setError(''); setInput(''); setView('chat')
    inputRef.current?.focus({ preventScroll: true })
  }
  const last = messages.at(-1)
  const suggestions = last?.role === 'assistant' && last.followUps?.length ? last.followUps : pageQuestions(pathname)
  return <div className="ai-chatbot-wrapper">
    <button ref={triggerRef} className={`ai-chatbot-trigger ${isOpen ? 'ai-chatbot-trigger--active' : ''}`} onClick={() => isOpen ? close() : setIsOpen(true)} aria-label="Toggle AI Assistant" aria-expanded={isOpen} aria-controls="ai-assistant-panel"><AriaMark /><span>Ask Aria</span></button>
    <section id="ai-assistant-panel" role="region" aria-labelledby="aria-heading" inert={!isOpen} aria-hidden={!isOpen} className={`ai-chatbot-panel ${isOpen ? 'ai-chatbot-panel--open' : ''}`}>
      <header className="aria-header"><div className="aria-header-mark"><AriaMark /></div><div className="aria-header-title"><h2 id="aria-heading">Aria<span>HANOVA DEVS</span></h2><p>Your guide to what we build</p></div><button className="aria-header-button" aria-label="Start a new conversation" onClick={reset} disabled={view === 'contact'} title="New conversation">↺</button><button className="aria-header-button" aria-label="Close Aria" onClick={close}>×</button></header>
      {view === 'contact' ? <div className="aria-contact-scroll"><AssistantContact key={contactVersion} initialMessage={contactMessage} messages={messages} onBack={() => setView('chat')} onNavigate={close} /></div> : <>
        {mode === 'guide' && <p className="aria-guide-notice" role="status">Live AI is unavailable. Answers below use reviewed site information.</p>}
        <div ref={scrollRef} className="aria-conversation" role="log" aria-label="Conversation with Aria" aria-live="polite" aria-relevant="additions text" aria-busy={isLoading}>
          {messages.length === 0 && <div className="aria-welcome"><p className="aria-eyebrow">A good place to start</p><h3>What can we help you build?</h3><p>I’m Aria, your AI guide to HanovaDevs. Explore our work, find the right service, or take an idea to the team.</p><div className="aria-welcome-note">Company knowledge. Clear next steps.</div></div>}
          {messages.map((message, index) => <article key={index} className={`aria-message aria-message--${message.role}`} aria-label={message.role === 'user' ? 'You' : 'Aria'}><span className="aria-speaker">{message.role === 'user' ? 'You' : 'Aria'}</span><MessageText text={message.content} />{reviewedSources(message.sources).length > 0 && <div className="aria-sources"><span>Explore on our site</span>{reviewedSources(message.sources).map(source => <Link key={source.url} to={source.url} onClick={close}>{source.title} ↗</Link>)}</div>}</article>)}
          {isLoading && <p className="aria-thinking" role="status">Aria is preparing a response…</p>}
        </div>
        <div className="aria-bottom"><div className="aria-suggestions" aria-label="Suggested questions">{suggestions.map(question => <button type="button" key={question} disabled={isLoading} onClick={() => send(question)}>{question} ↗</button>)}</div>
          {last?.mode === 'guide' && !isLoading && <button className="aria-retry aria-text-button" onClick={() => send(messages.at(-2)?.content || '', true)}>Try live AI again</button>}
          <button className="aria-handoff" type="button" onClick={startContact}>Talk to the team <span aria-hidden="true">↗</span></button>
          {error && <p className="aria-error" role="alert">{error}</p>}
          <form className="aria-composer" onSubmit={event => { event.preventDefault(); send() }}><textarea ref={inputRef} aria-label="Message Aria" placeholder="Ask about a service, product or idea…" value={input} onChange={event => setInput(event.target.value)} maxLength={2000} rows={2} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); send() } }} />{isLoading ? <button key="stop" type="button" aria-label="Stop response" onClick={event => { event.preventDefault(); stop() }}>■</button> : <button key="send" type="submit" aria-label="Send message" disabled={!input.trim()}>↑</button>}</form>
          <p className="aria-privacy">AI can make mistakes. Messages may be processed by Anthropic. Sharing chat with the team is optional. <Link to="/privacy-policy" onClick={close}>Privacy</Link></p>
        </div>
      </>}
    </section>
  </div>
}
