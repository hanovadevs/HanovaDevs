import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { CookieConsentProvider } from '../components/shared/CookieConsent'
import '../styles/globals.css'
import { initializeErrorMonitoring } from '../lib/monitoring.js'
import { mountWhenHomeReady } from './startup.js'

initializeErrorMonitoring()

mountWhenHomeReady({
  pathname: window.location.pathname,
  mount: initialHome => {
    // Keep both the static content and metadata until the homepage is ready.
    // A resolved component avoids replacing the hero with a lazy-route fallback.
    document.head.querySelectorAll('[data-hanova-seo], title, meta:not([charset]):not([name="viewport"]), link[rel="canonical"], script[type="application/ld+json"]').forEach(element => element.remove())

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <HelmetProvider>
          <BrowserRouter>
            <CookieConsentProvider><App initialHome={initialHome} /></CookieConsentProvider>
          </BrowserRouter>
        </HelmetProvider>
      </React.StrictMode>,
    )
  },
}).catch(error => {
  // If the chunk fails, retain the usable static page and report the failure.
  window.dispatchEvent(new CustomEvent('hanova:error', { detail: {
    message: error.message, source: 'homepage-startup', stack: error.stack,
  } }))
})
