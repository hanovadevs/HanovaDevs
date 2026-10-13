import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import { CookieConsentProvider } from './components/CookieConsent'
import './index.css'
import { initializeErrorMonitoring } from './lib/monitoring.js'

initializeErrorMonitoring()

// Native React 19 metadata takes ownership after the static first paint.
document.head.querySelectorAll('[data-hanova-seo]').forEach(element => element.remove())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CookieConsentProvider><App /></CookieConsentProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)
