import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './Products.css'

export default function Products() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="cinematic-products">
      <SEO
        title="Products — HanovaDevs"
        description="Discover our cutting-edge AI products. Omnai Browser and Eunoia Desktop Companion."
        url="/products"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Products', item: '/products' }
        ]}
      />

      {/* ===== HERO ===== */}
      <section className="cp-hero">
        <div className="cp-hero__bg" />
        <div className="container">
          <div className="cp-hero__content reveal">
            <span className="cp-label">In-House Innovation</span>
            <h1>Built by us, <br /><span className="cp-gradient">for the future.</span></h1>
            <p>We build our own products to push the boundaries of what's possible with AI, local-first architectures, and modern design.</p>
          </div>
        </div>
      </section>

      {/* ===== OMNAI BROWSER ===== */}
      <section className="cp-showcase cp-showcase--omnai" id="omnai">
        <div className="cp-showcase__glow" />
        <div className="container">
          <div className="cp-showcase__layout">
            <div className="cp-showcase__text reveal-left">
              <div className="cp-badge cp-badge--omnai">In Active Development</div>
              <h2>Omnai Browser</h2>
              <p className="cp-showcase__desc">
                A next-generation AI browser built for the modern web. Experience intelligent task orchestration, persistent memory across sessions, and robust privacy intelligence.
              </p>
              <ul className="cp-showcase__highlights">
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Native AI Pipeline Automation</li>
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Zero-Config Ad Blocking</li>
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Tracker & Phishing Intelligence</li>
              </ul>
              <Link to="/products/omnai" className="btn cp-btn cp-btn--omnai">
                Discover Omnai <span>→</span>
              </Link>
            </div>
            
            <div className="cp-showcase__visual reveal-right">
              <Link to="/products/omnai" className="cp-frame-link">
                <div className="cp-frame cp-frame--omnai">
                  <div className="cp-frame__top">
                    <div className="cp-frame__dots"><span /><span /><span /></div>
                    <div className="cp-frame__url">omnai://welcome</div>
                  </div>
                  <img src="/products/omnai/B1.png" alt="Omnai Browser UI" className="cp-frame__img" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EUNOIA ===== */}
      <section className="cp-showcase cp-showcase--eunoia" id="eunoia">
        <div className="cp-showcase__glow cp-showcase__glow--eunoia" />
        <div className="container">
          <div className="cp-showcase__layout cp-showcase__layout--reverse">
            <div className="cp-showcase__text reveal-right">
              <div className="cp-badge cp-badge--eunoia">V1.0 Released</div>
              <img src="/products/eunoia/logo.png" alt="Eunoia Logo" className="cp-logo-icon" />
              <h2>Eunoia Desktop</h2>
              <p className="cp-showcase__desc">
                Your personal AI desktop assistant. A calming, local-first companion combining task planning, journaling, focus sessions, and proactive AI.
              </p>
              <ul className="cp-showcase__highlights">
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> Unified Planning & Diary</li>
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Pomodoro & Ambient Soundscapes</li>
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 7.1"/><path d="M12 12l9.9 4.9"/></svg> Local File Vault & Assistant</li>
              </ul>
              <Link to="/products/eunoia" className="btn cp-btn cp-btn--eunoia">
                Discover Eunoia <span>→</span>
              </Link>
            </div>
            
            <div className="cp-showcase__visual reveal-left">
              <Link to="/products/eunoia" className="cp-frame-link">
                <div className="cp-frame cp-frame--eunoia">
                  <div className="cp-frame__top">
                    <div className="cp-frame__dots"><span /><span /><span /></div>
                    <div className="cp-frame__title">Eunoia Companion</div>
                  </div>
                  <img src="/products/eunoia/E1.png" alt="Eunoia Application UI" className="cp-frame__img" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="cp-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="reveal">More ideas in the lab.</h2>
          <p className="reveal reveal-delay-1" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto 2rem' }}>
            We're constantly exploring new paradigms in AI and user experience. Check back later for more tools, or get in touch if you want us to build something for you.
          </p>
          <div className="reveal reveal-delay-2">
            <Link to="/contact" className="btn btn-ghost" style={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
              Work with us
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
