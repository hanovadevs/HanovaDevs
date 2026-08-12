export function initializeErrorMonitoring() {
  const report = (payload) => {
    fetch('/api/report-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  }

  window.addEventListener('error', event => report({
    message: event.message,
    source: event.filename,
    stack: event.error?.stack,
  }))
  window.addEventListener('unhandledrejection', event => report({
    message: event.reason?.message || String(event.reason),
    source: 'unhandledrejection',
    stack: event.reason?.stack,
  }))
  window.addEventListener('hanova:error', event => report(event.detail || {}))
}
