export const CONSENT_COOKIE = 'hanova_consent'
export const CONSENT_VERSION = 1

export function readConsent(cookie = '') {
  const encoded = cookie.split('; ').find(value => value.startsWith(`${CONSENT_COOKIE}=`))?.split('=').slice(1).join('=')
  if (!encoded) return null
  try {
    const value = JSON.parse(decodeURIComponent(encoded))
    if (value.version !== CONSENT_VERSION || typeof value.analytics !== 'boolean') return null
    return { analytics: value.analytics, version: CONSENT_VERSION }
  } catch { return null }
}

export function consentCookie(analytics, secure = true) {
  const value = encodeURIComponent(JSON.stringify({ version: CONSENT_VERSION, analytics }))
  return `${CONSENT_COOKIE}=${value}; Path=/; Max-Age=15552000; SameSite=Lax${secure ? '; Secure' : ''}`
}
