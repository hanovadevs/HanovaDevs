import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Products.css'

const omnaiFeatures = [
  { icon: '🤖', title: 'AI Assistant Built-in', desc: 'Ask questions, summarize pages, and get intelligent suggestions — right in your browser.' },
  { icon: '🛡️', title: 'Ad Blocker', desc: 'Built-in, zero-config ad blocking for a clean browsing experience.' },
  { icon: '⚡', title: 'Speed-Optimized', desc: 'Engineered from the ground up for blazing-fast page loads.' },
  { icon: '🔒', title: 'Privacy Mode', desc: 'Your data stays yours. No tracking, no telemetry, no compromise.' },
]

const eunoiaFeatures = [
  { icon: '📋', title: 'Smart Task Management', desc: 'AI-powered task prioritization that adapts to your workflow.' },
  { icon: '📝', title: 'AI-Powered Journaling', desc: 'Capture thoughts and let AI help you organize and reflect.' },
  { icon: '🎯', title: 'Focus Modes', desc: 'Deep work sessions with distraction blocking and ambient soundscapes.' },
  { icon: '💻', title: 'Cross-Platform', desc: 'Available on Windows, macOS, and Linux. Your data syncs everywhere.' },
]

export default function Products() {
  const [omnaiEmail, setOmnaiEmail] = useState('')
  const [eunoiaEmail, setEunoiaEmail] = useState('')
  const [omnaiSubmitted, setOmnaiSubmitted] = useState(false)
  const [eunoiaSubmitted, setEunoiaSubmitted] = useState(false)

  const handleWaitlist = (e, type) => {
    e.preventDefault()
    if (type === 'omnai') {
      setOmnaiSubmitted(true)
      setOmnaiEmail('')
    } else {
      setEunoiaSubmitted(true)
      setEunoiaEmail('')
    }
  }

  return (
    <div className="products-page">
      {/* Hero */}
      <section className="products-hero" id="products-hero">
        <div className="container">
          <div className="products-hero__content reveal">
            <span className="section-label">Our Products</span>
            <h1>Built by us, <span className="gradient-text">for the world.</span></h1>
            <p>We don't just build for clients — we create products that push the boundaries of what's possible.</p>
          </div>
        </div>
      </section>

      {/* ===== OMNAI BROWSER ===== */}
      <section className="product-section product-section--omnai" id="omnai-browser">
        <div className="container">
          <div className="product-section__header reveal">
            <div className="product-badge product-badge--dev">
              <span className="product-badge__pulse" />
              <span>🔧 In Development</span>
            </div>
            <h2>Omnai Browser</h2>
            <p className="product-section__tagline">
              A next-generation AI-powered browser built for the modern web. Faster, smarter, and privacy-first.
            </p>
          </div>

          {/* Product Mockup */}
          <div className="product-mockup reveal reveal-delay-1">
            <div className="product-mockup__frame">
              <div className="product-mockup__toolbar">
                <div className="product-mockup__dots">
                  <span /><span /><span />
                </div>
                <div className="product-mockup__url-bar">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <span>omnai://newtab</span>
                </div>
              </div>
              <div className="product-mockup__screen">
                <img
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80"
                  alt="Omnai Browser interface concept"
                  loading="lazy"
                />
                <div className="product-mockup__screen-overlay">
                  <h3>Your intelligent browsing companion</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="product-features">
            {omnaiFeatures.map((feat, i) => (
              <div key={i} className={`product-feature card card-glass reveal reveal-delay-${(i % 4) + 1}`}>
                <span className="product-feature__icon">{feat.icon}</span>
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Waitlist */}
          <div className="product-waitlist reveal">
            {omnaiSubmitted ? (
              <div className="product-waitlist__success">
                <span className="product-waitlist__check">✓</span>
                <h3>You're on the list!</h3>
                <p>We'll notify you when Omnai Browser is ready.</p>
              </div>
            ) : (
              <>
                <h3>Stay Tuned — Coming Soon</h3>
                <p>Be the first to experience the future of browsing.</p>
                <form className="product-waitlist__form" onSubmit={e => handleWaitlist(e, 'omnai')}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={omnaiEmail}
                    onChange={e => setOmnaiEmail(e.target.value)}
                    required
                    id="omnai-email"
                  />
                  <button type="submit" className="btn btn-primary">Join Waitlist</button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ===== EUNOIA ===== */}
      <section className="product-section product-section--eunoia bg-off-white" id="eunoia-app">
        <div className="container">
          <div className="product-section__header reveal">
            <div className="product-badge product-badge--launch">
              <span className="product-badge__pulse product-badge__pulse--green" />
              <span>🚀 Ready to Launch</span>
            </div>
            <h2>Eunoia</h2>
            <p className="product-section__tagline">
              Your personal AI desktop assistant — designed to help you think, organize, and execute at peak performance.
            </p>
          </div>

          {/* Laptop Mockup */}
          <div className="product-mockup product-mockup--laptop reveal reveal-delay-1">
            <div className="product-mockup__laptop">
              <div className="product-mockup__laptop-screen">
                <img
                  src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80"
                  alt="Eunoia desktop application interface"
                  loading="lazy"
                />
                <div className="product-mockup__screen-overlay product-mockup__screen-overlay--eunoia">
                  <h3>Think. Organize. Execute.</h3>
                </div>
              </div>
              <div className="product-mockup__laptop-base">
                <div className="product-mockup__laptop-notch" />
              </div>
            </div>
          </div>

          {/* Launch Badge */}
          <div className="product-launch-badge reveal">
            <div className="product-launch-badge__inner">
              <span className="product-launch-badge__icon">🚀</span>
              <span className="product-launch-badge__text">Launch Imminent</span>
            </div>
          </div>

          {/* Features */}
          <div className="product-features">
            {eunoiaFeatures.map((feat, i) => (
              <div key={i} className={`product-feature card card-glass reveal reveal-delay-${(i % 4) + 1}`}>
                <span className="product-feature__icon">{feat.icon}</span>
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Waitlist + Download */}
          <div className="product-waitlist product-waitlist--eunoia reveal">
            {eunoiaSubmitted ? (
              <div className="product-waitlist__success">
                <span className="product-waitlist__check">✓</span>
                <h3>You're on the list!</h3>
                <p>We'll let you know the moment Eunoia launches.</p>
              </div>
            ) : (
              <>
                <h3>Get Early Access</h3>
                <p>Join the waitlist or download the preview build.</p>
                <form className="product-waitlist__form" onSubmit={e => handleWaitlist(e, 'eunoia')}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={eunoiaEmail}
                    onChange={e => setEunoiaEmail(e.target.value)}
                    required
                    id="eunoia-email"
                  />
                  <button type="submit" className="btn btn-primary">Join Waitlist</button>
                </form>
                <div className="product-waitlist__download">
                  <a href="#" className="btn btn-ghost" id="download-windows">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download for Windows
                  </a>
                  <a href="#" className="btn btn-ghost" id="download-mac">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download for macOS
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="products-cta section" id="products-cta">
        <div className="container text-center">
          <h2 className="reveal">Have an idea for a product?</h2>
          <p className="reveal reveal-delay-1" style={{ maxWidth: 500, margin: '0 auto var(--space-lg)' }}>
            We're always looking for new challenges. If you have an idea, we'd love to hear it.
          </p>
          <Link to="/contact" className="btn btn-primary reveal reveal-delay-2">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
