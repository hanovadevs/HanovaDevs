import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribing(true)

    try {
      const response = await fetch("https://formsubmit.co/ajax/hanovadevs@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          _subject: `New Newsletter Subscriber: ${email}`
        })
      })

      if (response.ok) {
        setSubscribed(true)
        setEmail('')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSubscribing(false)
    }
  }

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/services/graphic-design', label: 'Graphic Design' },
    { path: '/services/ai-automation', label: 'AI Automation' },
    { path: '/about', label: 'About Us' },
    { path: '/projects', label: 'Projects' },
  ]

  const insightLinks = [
    { path: '/journal', label: 'Journal' },
    { path: '/research', label: 'Research Hub' },
    { path: '/news', label: 'Tech News' },
    { path: '/stack', label: 'Tech Stack' },
  ]

  const productLinks = [
    { path: '/products', label: 'Omnai Browser' },
    { path: '/products', label: 'Eunoia App' },
  ]

  const legalLinks = [
    { path: '/contact', label: 'Contact' },
    { path: '/admin', label: 'Admin Portal' },
    { path: '#', label: 'Privacy Policy' },
    { path: '#', label: 'Terms of Service' },
  ]

  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        {/* Newsletter Section */}
        <div className="footer__newsletter">
          <div className="footer__newsletter-text">
            <h4>Stay ahead of the curve</h4>
            <p>Get the latest insights on tech, engineering, and digital growth — straight to your inbox.</p>
          </div>
          <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="footer__newsletter-success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>You're in! Welcome to the HanovaDevs community.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="footer__newsletter-input"
                />
                <button type="submit" className="btn btn-primary footer__newsletter-btn" disabled={subscribing}>
                  {subscribing ? 'Joining...' : 'Subscribe'}
                </button>
              </>
            )}
          </form>
        </div>

        <div className="footer__divider" />

        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/octopus.png" alt="HanovaDevs" width="40" height="40" style={{ filter: 'brightness(0) invert(1)' }} />
              <div>
                <h4 className="footer__brand-name">HanovaDevs</h4>
                <span className="footer__tagline">Digital Marketing Agency</span>
              </div>
            </div>
            <p className="footer__desc">
              Custom software & marketing for modern businesses. We engineer digital experiences that drive growth.
            </p>
            <div className="footer__contact-info">
              <a href="mailto:hanovadevs@gmail.com">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                hanovadevs@gmail.com
              </a>
              <a href="tel:+19177355385">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +1 (917) 735-5385
              </a>
            </div>
            <div className="footer__socials">
              <a href="https://www.instagram.com/hanovadevs/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/hanova-devs-8516073b2/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://github.com/hanovadevs/" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h5 className="footer__col-title">Quick Links</h5>
            {quickLinks.map(link => (
              <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
            ))}
          </div>

          <div className="footer__col">
            <h5 className="footer__col-title">Insights</h5>
            {insightLinks.map(link => (
              <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
            ))}
            <h5 className="footer__col-title" style={{ marginTop: '1rem' }}>Products</h5>
            {productLinks.map(link => (
              <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
            ))}
          </div>

          <div className="footer__col">
            <h5 className="footer__col-title">Legal</h5>
            {legalLinks.map(link => (
              <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
            ))}
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 HanovaDevs. All rights reserved.
          </p>
          <p className="footer__motto">
            Engineering the Future.
          </p>
        </div>
      </div>
    </footer>
  )
}
