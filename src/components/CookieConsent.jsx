import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { readConsent, consentCookie } from '../lib/consent'
import './CookieConsent.css'

const ConsentContext = createContext(null)

export function CookieConsentProvider({ children }) {
  const [preferences, setPreferences] = useState(null)
  const [ready, setReady] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const settingsRef = useRef(null)
  const returnFocus = useRef(null)
  useEffect(() => {
    const stored = readConsent(document.cookie)
    setPreferences(stored); setAnalytics(stored?.analytics || false); setReady(true)
  }, [])
  useEffect(() => {
    if (!settingsOpen) return undefined
    const dialog = settingsRef.current
    dialog?.querySelector('button')?.focus()
    const onKey = event => {
      if (event.key === 'Escape') { setSettingsOpen(false); returnFocus.current?.focus() }
      if (event.key !== 'Tab') return
      const controls = dialog.querySelectorAll('button, input, a')
      const first = controls[0], last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', onKey) }
  }, [settingsOpen])
  const save = allowed => {
    const wasEnabled = preferences?.analytics
    document.cookie = consentCookie(allowed, window.location.protocol === 'https:')
    setPreferences({ version: 1, analytics: allowed }); setAnalytics(allowed); setSettingsOpen(false)
    returnFocus.current?.focus()
    if (!allowed && wasEnabled) {
      for (const value of document.cookie.split('; ')) {
        const name = value.split('=')[0]
        if (/^(_ga|_gid|_gat|_gcl)/.test(name)) {
          document.cookie = `${name}=; Max-Age=0; Path=/`
          document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.hanovadevs.com`
        }
      }
      window.location.reload()
    }
  }
  const openSettings = () => { returnFocus.current = document.activeElement; setAnalytics(preferences?.analytics || false); setSettingsOpen(true) }
  return (
    <ConsentContext.Provider value={{ preferences, openSettings }}>
      {children}
      {ready && !preferences && !settingsOpen && <section className="cookie-banner" aria-label="Cookie choices">
        <div><span className="cookie-eyebrow">Your privacy, your choice</span><h2>A little clarity about cookies.</h2><p>Essential storage keeps your preferences working. Optional analytics helps us understand visits and improve performance. It stays off until you enable it.</p><Link to="/privacy-policy#analytics-and-cookies">Read our privacy policy</Link></div>
        <div className="cookie-actions"><button className="btn cookie-secondary" onClick={() => save(false)}>Essential only</button><button className="btn cookie-secondary" onClick={openSettings}>Choose settings</button><button className="btn btn-primary" onClick={() => save(true)}>Allow analytics</button></div>
      </section>}
      {settingsOpen && <div className="cookie-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) { setSettingsOpen(false); returnFocus.current?.focus() } }}>
        <section ref={settingsRef} className="cookie-settings" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
          <button className="cookie-close" aria-label="Close cookie settings" onClick={() => { setSettingsOpen(false); returnFocus.current?.focus() }}>×</button>
          <span className="cookie-eyebrow">Privacy preferences</span><h2 id="cookie-settings-title">You’re in control.</h2>
          <div className="cookie-option"><div><h3>Essential</h3><p>Remembers consent and supports saved news and secure portal access.</p></div><span>Always on</span></div>
          <label className="cookie-option"><div><h3>Analytics</h3><p>Optional visit and performance measurement from Vercel and Google. Advertising consent stays off.</p></div><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} aria-label="Allow optional analytics" /></label>
          <p className="cookie-note">Switching enabled analytics off reloads this page to stop existing measurement tools.</p>
          <div className="cookie-actions"><button className="btn cookie-secondary" onClick={() => save(false)}>Essential only</button><button className="btn btn-primary" onClick={() => save(analytics)}>Save preferences</button></div>
          <Link to="/privacy-policy#analytics-and-cookies">Privacy policy</Link>
        </section>
      </div>}
    </ConsentContext.Provider>
  )
}

export function useCookieConsent() { return useContext(ConsentContext) || { preferences: null, openSettings: () => {} } }
export function CookieSettingsButton() {
  const { openSettings } = useCookieConsent()
  return <button className="footer__link cookie-settings-link" onClick={openSettings}>Cookie settings</button>
}
