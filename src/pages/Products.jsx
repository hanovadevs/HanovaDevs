import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './Products.css'
import './PageHeroes.css'

export default function Products() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="cinematic-products">
      <SEO
        title="Products — HanovaDevs"
        description="Explore HanovaDevs products: Eunoia on Microsoft Store, Omnai Browser launching soon, and Stepsy, our mobile walking and partner-rewards project."
        url="/products"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Products', item: '/products' }
        ]}
      />

      {/* ===== HERO ===== */}
      <section className="cp-hero page-hero-light page-hero-light--products">
        <div className="page-hero-light__curves" aria-hidden="true" />
        <div className="container">
          <div className="cp-hero__content page-hero-light__content reveal">
            <span className="page-hero-light__eyebrow">In-house innovation</span>
            <h1>Proprietary Products, <br /><span className="cp-gradient">Powered by HanovaDevs.</span></h1>
            <p>From desktop workspaces to everyday movement: explore Eunoia, Omnai Browser and Stepsy, our in-house products and projects built by HanovaDevs.</p>
            <div className="page-hero-light__actions">
              <Link to="/products/eunoia" className="btn btn-primary">Discover Eunoia</Link>
              <Link to="/products/omnai" className="page-hero-light__link">Explore Omnai</Link>
              <Link to="/products/stepsy" className="page-hero-light__link">Meet Stepsy</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== OMNAI BROWSER ===== */}
      <section className="cp-showcase cp-showcase--omnai" id="omnai">
        <div className="cp-showcase__glow" />
        <div className="container">
          <div className="cp-showcase__layout">
            <div className="cp-showcase__text reveal-left">
              <div className="cp-badges-wrap">
                <span className="cp-badge cp-badge--omnai">Launching soon</span>
                <span className="cp-badge cp-badge--powered">⚡ Powered by HanovaDevs</span>
              </div>
              <h2>Omnai Browser</h2>
              <p className="cp-showcase__desc">
                An in-house AI-native browser built and powered by HanovaDevs for the modern web. Explore the development preview as the team prepares for launch; final features and availability will be announced at release.
              </p>
              <ul className="cp-showcase__highlights">
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> AI-focused browser preview</li>
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Desktop workspace direction</li>
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Launch details coming soon</li>
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
                  <img src="/products/omnai/B1.webp" alt="Omnai Browser UI" className="cp-frame__img" />
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
              <div className="cp-badges-wrap">
                <span className="cp-badge cp-badge--eunoia">Available on Microsoft Store</span>
                <span className="cp-badge cp-badge--powered">⚡ Powered by HanovaDevs</span>
              </div>
              <img src="/products/eunoia/logo.webp" alt="Eunoia Logo" className="cp-logo-icon" />
              <h2>Eunoia Desktop</h2>
              <p className="cp-showcase__desc">
                An in-house personal AI desktop assistant built and powered by HanovaDevs. A personal workspace combining planning, notes, journaling and focused work. Now available on Microsoft Store.
              </p>
              <ul className="cp-showcase__highlights">
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> Unified Planning & Diary</li>
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Pomodoro & Ambient Soundscapes</li>
                <li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 7.1"/><path d="M12 12l9.9 4.9"/></svg> Notes & Personal Workspace</li>
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
                  <img src="/products/eunoia/2.webp" alt="Eunoia Application UI" className="cp-frame__img" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cp-stepsy" id="stepsy" aria-labelledby="cp-stepsy-title"><div className="container cp-stepsy__layout"><div><span className="cp-badge cp-badge--stepsy">Product preview · Mobile</span><p className="cp-stepsy__byline">Developed by HanovaDevs</p><h2 id="cp-stepsy-title">Stepsy.<br /><em>Every step. More possibility.</em></h2><p>A mobile app project connecting walking with planned points, partner discounts and rewards. Designed around everyday habits, with Pakistan as the intended first market.</p><p className="cp-stepsy__note">Launch availability and reward rules are still being defined.</p><Link to="/products/stepsy" className="btn btn-primary">Experience the Stepsy story</Link></div><Link to="/products/stepsy" className="cp-stepsy__visual" aria-label="Explore the Stepsy mobile product preview"><img src="/media/stepsy/walking-1122.webp" srcSet="/media/stepsy/walking-640.webp 640w, /media/stepsy/walking-1122.webp 1122w" sizes="(max-width: 760px) 90vw, 40vw" width="1122" height="1402" alt="Stepsy walking and rewards product concept" loading="lazy" decoding="async" /></Link></div></section>

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
