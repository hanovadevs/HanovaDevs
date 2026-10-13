import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { useCookieConsent } from './CookieConsent'

export default function SiteAnalytics() {
  const { preferences } = useCookieConsent()
  useEffect(() => {
    if (!preferences?.analytics) return undefined
    window.dataLayer = window.dataLayer || []
    function gtag() { window.dataLayer.push(arguments) }
    gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    if (!document.getElementById('hanova-gtm')) {
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
      const script = document.createElement('script')
      script.id = 'hanova-gtm'; script.async = true
      script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-WNB5ZMNL'
      document.head.appendChild(script)
    }
    return undefined
  }, [preferences?.analytics])
  return preferences?.analytics ? <><Analytics /><SpeedInsights /></> : null
}
