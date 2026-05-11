import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/products', label: 'Products' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const darkPages = ['/products/omnai', '/products/eunoia', '/about', '/products']
  const isDarkPage = darkPages.includes(location.pathname)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isDarkPage && !scrolled ? 'navbar--dark' : ''}`} id="main-nav">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" aria-label="HanovaDevs Home">
          <img src="/octopus.png" alt="HanovaDevs octopus" className="navbar__logo-icon" width="36" height="36" />
          <div className="navbar__wordmark">
            <span className="navbar__brand-name">HanovaDevs</span>
          </div>
        </Link>

        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link to="/contact" className="navbar__cta btn btn-primary">
          Get a Quote
        </Link>

        <button
          className={`navbar__burger ${mobileOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          id="mobile-menu-toggle"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        <nav className="mobile-menu__nav">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-menu__link ${location.pathname === link.path ? 'mobile-menu__link--active' : ''}`}
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn-primary mobile-menu__cta">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
