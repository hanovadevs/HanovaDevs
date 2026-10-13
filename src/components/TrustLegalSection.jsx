import { Link } from 'react-router-dom'
import './TrustLegalSection.css'

export default function TrustLegalSection() {
  return (
    <section className="trust-legal section" id="trust-legal">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Transparency & Trust</span>
          <h2>Built on trust. <span className="gradient-text">Backed by clarity.</span></h2>
          <p>
            Great digital partnerships need more than technology. They need clear expectations, responsible data practices, and transparency from the start.
          </p>
        </div>

        <div className="trust-legal__grid">
          {/* Privacy Card */}
          <div className="trust-legal__card card card-glass reveal reveal-left">
            <div className="trust-legal__card-header">
              <div className="trust-legal__icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span className="trust-legal__tag">Data Protection</span>
            </div>

            <h3 className="trust-legal__title">Your data. Handled responsibly.</h3>
            <p className="trust-legal__desc">
              Learn what information we collect, why we use it, and the strict technical measures we take to protect your privacy and project integrity.
            </p>

            <ul className="trust-legal__highlights">
              <li>
                <span className="bullet">✓</span> Zero data broker selling
              </li>
              <li>
                <span className="bullet">✓</span> Optional analytics controls
              </li>
              <li>
                <span className="bullet">✓</span> Transparent analytics & cookies
              </li>
            </ul>

            <Link to="/privacy-policy" className="trust-legal__link">
              <span>Read Privacy Policy</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Terms Card */}
          <div className="trust-legal__card card card-glass reveal reveal-right reveal-delay-1">
            <div className="trust-legal__card-header">
              <div className="trust-legal__icon-wrap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <span className="trust-legal__tag">Commercial Terms</span>
            </div>

            <h3 className="trust-legal__title">Clear terms. Better partnerships.</h3>
            <p className="trust-legal__desc">
              Understand the principles, intellectual property rights, sprint structures, and transparent terms that govern our engineering engagements.
            </p>

            <ul className="trust-legal__highlights">
              <li>
                <span className="bullet">✓</span> Agreed ownership & handover
              </li>
              <li>
                <span className="bullet">✓</span> Clear milestone deliverables
              </li>
              <li>
                <span className="bullet">✓</span> Honest, realistic estimations
              </li>
            </ul>

            <Link to="/terms-of-service" className="trust-legal__link">
              <span>Read Terms of Service</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
