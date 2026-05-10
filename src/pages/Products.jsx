import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Products.css'

const omnaiFeatures = [
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="3" /><path d="M12 8v3" /><circle cx="9" cy="15" r="1" fill="var(--royal-blue)" stroke="none" /><circle cx="15" cy="15" r="1" fill="var(--royal-blue)" stroke="none" /><path d="M9 18h6" /></svg>),
    title: 'AI Assistant Built-in',
    desc: 'Ask questions, summarize pages, and get intelligent suggestions — right in your browser.'
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    title: 'Ad Blocker',
    desc: 'Built-in, zero-config ad blocking for a clean browsing experience.'
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>),
    title: 'Speed-Optimized',
    desc: 'Engineered from the ground up for blazing-fast page loads.'
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>),
    title: 'Privacy Mode',
    desc: 'Your data stays yours. No tracking, no telemetry, no compromise.'
  },
]

const eunoiaFeatures = [
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
    title: 'Smart Task Management',
    desc: 'AI-powered task prioritization that adapts to your workflow.'
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>),
    title: 'AI-Powered Journaling',
    desc: 'Capture thoughts and let AI help you organize and reflect.'
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>),
    title: 'Focus Modes',
    desc: 'Deep work sessions with distraction blocking and ambient soundscapes.'
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>),
    title: 'Cross-Platform',
    desc: 'Available on Windows, macOS, and Linux. Your data syncs everywhere.'
  },
]

const omnaiTechStack = ['Electron', 'Chromium', 'Node.js', 'WebGPU', 'TensorFlow.js']
const eunoiaTechStack = ['React', 'Electron', 'SQLite', 'OpenAI API', 'Tailwind']

const omnaiStats = [
  { value: '3x', label: 'Faster than Chrome' },
  { value: '98%', label: 'Ads Blocked' },
  { value: '0', label: 'Data Collected' },
  { value: '50ms', label: 'AI Response' },
]

const eunoiaStats = [
  { value: '10K+', label: 'Beta Users' },
  { value: '4.9', label: 'User Rating' },
  { value: '∞', label: 'Possibilities' },
  { value: '24/7', label: 'AI Assistance' },
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
        <div className="products-hero__bg" />
        <div className="container">
          <div className="products-hero__content reveal">
            <span className="section-label">Our Products</span>
            <h1>Built by us, <span className="gradient-text">for the world.</span></h1>
            <p>We don't just build for clients — we create products that push the boundaries of what's possible.</p>
            <div className="products-hero__badges">
              <div className="products-hero__badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>
                <span>2 Products</span>
              </div>
              <div className="products-hero__badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span>Privacy-First</span>
              </div>
              <div className="products-hero__badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                <span>AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OMNAI BROWSER ===== */}
      <section className="product-section product-section--omnai" id="omnai-browser">
        <div className="container">
          <div className="product-section__header reveal">
            <div className="product-badge product-badge--dev">
              <span className="product-badge__pulse" />
              <span>In Development</span>
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

          {/* Performance Stats */}
          <div className="product-stats reveal">
            {omnaiStats.map((stat, i) => (
              <div key={i} className="product-stats__item">
                <span className="product-stats__value">{stat.value}</span>
                <span className="product-stats__label">{stat.label}</span>
              </div>
            ))}
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

          {/* Tech Stack */}
          <div className="product-tech-stack reveal">
            <span className="product-tech-stack__label">Built with</span>
            <div className="product-tech-stack__tags">
              {omnaiTechStack.map((tech, i) => (
                <span key={i} className="product-tech-stack__tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* Waitlist */}
          <div className="product-waitlist reveal">
            {omnaiSubmitted ? (
              <div className="product-waitlist__success">
                <span className="product-waitlist__check">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
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
              <span>Ready to Launch</span>
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
              <span className="product-launch-badge__icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg></span>
              <span className="product-launch-badge__text">Launch Imminent</span>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="product-stats reveal">
            {eunoiaStats.map((stat, i) => (
              <div key={i} className="product-stats__item">
                <span className="product-stats__value">{stat.value}</span>
                <span className="product-stats__label">{stat.label}</span>
              </div>
            ))}
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

          {/* Tech Stack */}
          <div className="product-tech-stack reveal">
            <span className="product-tech-stack__label">Built with</span>
            <div className="product-tech-stack__tags">
              {eunoiaTechStack.map((tech, i) => (
                <span key={i} className="product-tech-stack__tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* Waitlist + Download */}
          <div className="product-waitlist product-waitlist--eunoia reveal">
            {eunoiaSubmitted ? (
              <div className="product-waitlist__success">
                <span className="product-waitlist__check">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
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

      {/* Comparison / Why Choose Us */}
      <section className="products-comparison section" id="why-our-products">
        <div className="container">
          <div className="products-comparison__header reveal">
            <span className="section-label">Why Our Products?</span>
            <h2>Built different. <span className="gradient-text">By design.</span></h2>
          </div>
          <div className="products-comparison__grid reveal reveal-delay-1">
            <div className="products-comparison__card card card-glass">
              <div className="products-comparison__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              </div>
              <h4>Open Source DNA</h4>
              <p>Transparency is our default. Community-driven development with open roadmaps and feedback loops.</p>
            </div>
            <div className="products-comparison__card card card-glass">
              <div className="products-comparison__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
              </div>
              <h4>Privacy by Default</h4>
              <p>Zero telemetry, zero tracking, zero compromises. Your data stays exclusively on your device.</p>
            </div>
            <div className="products-comparison__card card card-glass">
              <div className="products-comparison__icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <h4>Performance-Obsessed</h4>
              <p>Every millisecond matters. We obsess over performance benchmarks so our users never have to wait.</p>
            </div>
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
