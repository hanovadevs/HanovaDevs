import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { company } from '../../data/company'

export default function AssistantContact({ initialMessage, messages, onBack, onNavigate }) {
  const id = useId()
  const [form, setForm] = useState({ name: '', email: '', message: initialMessage, consent: false, share: false, website: '' })
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const busy = useRef(false)
  const nameRef = useRef(null)
  const controller = useRef(null)
  useEffect(() => { nameRef.current?.focus(); return () => controller.current?.abort() }, [])
  const update = event => setForm(previous => ({ ...previous, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value }))
  async function submit(event) {
    event.preventDefault()
    if (busy.current || status === 'sent') return
    busy.current = true
    setStatus('sending')
    setFeedback('')
    controller.current = new AbortController()
    const timeout = setTimeout(() => controller.current?.abort(), 30000)
    try {
      const response = await fetch('/api/assistant-contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.current.signal,
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message, consent: form.consent, website: form.website,
          ...(form.share ? { conversation: messages.slice(-12).map(({ role, content }) => ({ role, content: content.slice(0, 1200) })) } : {}),
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.status !== 202 || typeof data.message !== 'string') throw new Error(data.error || 'Delivery was not confirmed. Keep your draft and try again, or email us directly.')
      setStatus('sent')
      setFeedback(data.message)
    } catch (error) {
      setStatus('error')
      setFeedback(error.name === 'AbortError' ? 'Delivery could not be confirmed in time. Keep your draft and contact us directly before resending.' : error.message)
    } finally { clearTimeout(timeout); busy.current = false }
  }
  const mailto = `mailto:${company.email}?subject=${encodeURIComponent('Project enquiry via Aria')}&body=${encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)}`
  return <section className="aria-contact" aria-labelledby={`${id}-heading`}>
    <button className="aria-text-button" type="button" onClick={onBack} disabled={status === 'sending'}>← Back to conversation</button>
    <p className="aria-eyebrow">A conversation with our team</p>
    <h3 id={`${id}-heading`}>Let’s take the next step.</h3>
    <p className="aria-contact-intro">Review your enquiry below. This sends it to {company.email}; it does not book a meeting or subscribe you to marketing.</p>
    {status === 'sent' ? <div className="aria-contact-confirmation" role="status"><strong>Enquiry submitted</strong><p>{feedback}</p><button type="button" className="aria-text-button" onClick={onBack}>Return to Aria</button></div> : <form onSubmit={submit} aria-label="Contact HanovaDevs through Aria">
      <label htmlFor={`${id}-name`}>Your name<input id={`${id}-name`} ref={nameRef} name="name" autoComplete="name" maxLength={100} required value={form.name} onChange={update} disabled={status === 'sending'} /></label>
      <label htmlFor={`${id}-email`}>Email address<input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={254} required value={form.email} onChange={update} disabled={status === 'sending'} /></label>
      <label htmlFor={`${id}-message`}>Your enquiry<textarea id={`${id}-message`} name="message" maxLength={5000} rows={4} required value={form.message} onChange={update} disabled={status === 'sending'} /></label>
      <div className="aria-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} /></label></div>
      <label className="aria-checkbox"><input name="consent" type="checkbox" required checked={form.consent} onChange={update} disabled={status === 'sending'} /><span>I agree to be contacted about this enquiry. <Link to="/privacy-policy" onClick={onNavigate}>Privacy policy</Link></span></label>
      {messages.length > 0 && <label className="aria-checkbox"><input name="share" type="checkbox" checked={form.share} onChange={update} disabled={status === 'sending'} /><span>Also share my recent conversation with the team.</span></label>}
      {status === 'error' && <p className="aria-error" role="alert">{feedback}</p>}
      <button className="aria-primary-button" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending enquiry…' : 'Send enquiry'}</button>
      <a className="aria-email-fallback" href={mailto}>Prefer your email app? Open an email draft ↗</a>
    </form>}
  </section>
}
