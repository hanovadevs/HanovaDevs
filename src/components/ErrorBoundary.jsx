import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Application error', error, info)
    window.dispatchEvent(new CustomEvent('hanova:error', {
      detail: { message: error.message, componentStack: info.componentStack }
    }))
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-fallback">
          <h1>Something went wrong.</h1>
          <p>The error has been recorded. Please reload the page or contact us if it continues.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Reload page</button>
        </main>
      )
    }
    return this.props.children
  }
}
