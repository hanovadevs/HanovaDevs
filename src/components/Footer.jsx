import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About Us' },
    { path: '/projects', label: 'Projects' },
  ]

  const productLinks = [
    { path: '/products', label: 'Omnai Browser' },
    { path: '/products', label: 'Eunoia App' },
  ]

  const legalLinks = [
    { path: '/contact', label: 'Contact' },
    { path: '#', label: 'Privacy Policy' },
    { path: '#', label: 'Terms of Service' },
  ]

  return (
    <footer className="footer" id="site-footer">
      <div className="container">
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
            <div className="footer__socials">
              <a href="https://instagram.com/hanovadevs" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://linkedin.com/company/hanovadevs" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://twitter.com/hanovadevs" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="footer__social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://github.com/hanovadevs" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer__social-link">
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
            <h5 className="footer__col-title">Products</h5>
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
            © 2025 HanovaDevs. All rights reserved.
          </p>
          <p className="footer__motto">
            Engineering the Future. 🐙
          </p>
        </div>
      </div>
    </footer>
  )
}
