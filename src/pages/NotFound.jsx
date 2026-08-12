import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <section className="not-found container">
      <SEO title="Page Not Found" description="The requested page could not be found." noIndex />
      <p className="section-label">404</p>
      <h1>This page doesn’t exist.</h1>
      <p>The link may be outdated, or the page may have moved.</p>
      <Link className="btn btn-primary" to="/">Return home</Link>
    </section>
  )
}
