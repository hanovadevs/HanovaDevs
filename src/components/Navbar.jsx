import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/products', label: 'Products' },
  {
    label: 'Insights',
    dropdown: [
      { path: '/journal', label: 'Journal', desc: 'Original articles by our team' },
      { path: '/research', label: 'Research Hub', desc: 'Curated industry research' },
      { path: '/news', label: 'News', desc: 'Latest technology headlines' },
      { path: '/stack', label: 'Tech Stack', desc: 'Our interactive arsenal' },
    ]
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isDarkPage = ['/products', '/about', '/projects', '/research', '/journal', '/news', '/stack'].some(p =>
    location.pathname === p || location.pathname.startsWith(p + '/')
  )
  const isInsightsActive = ['/journal', '/research', '/news', '/stack'].some(p => location.pathname.startsWith(p))

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
            link.dropdown ? (
              <div key={link.label} className="navbar__dropdown-wrap" ref={dropdownRef}>
                <button
                  className={`navbar__link navbar__link--dropdown ${isInsightsActive ? 'navbar__link--active' : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                >
                  {link.label}
                  <svg className={`navbar__chevron ${dropdownOpen ? 'navbar__chevron--open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                <div className={`navbar__dropdown ${dropdownOpen ? 'navbar__dropdown--open' : ''}`}>
                  {link.dropdown.map(item => (
                    <Link key={item.path} to={item.path} className="navbar__dropdown-item">
                      <strong>{item.label}</strong>
                      <span>{item.desc}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
              >
                {link.label}
              </Link>
            )
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
            link.dropdown ? (
              <div key={link.label} className="mobile-menu__group">
                <span className="mobile-menu__group-label" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>{link.label}</span>
                {link.dropdown.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-menu__link mobile-menu__link--sub ${location.pathname === item.path ? 'mobile-menu__link--active' : ''}`}
                    style={{ animationDelay: `${0.1 + (i + 0.5) * 0.06}s` }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-menu__link ${location.pathname === link.path ? 'mobile-menu__link--active' : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                {link.label}
              </Link>
            )
          ))}
          <Link to="/contact" className="btn btn-primary mobile-menu__cta">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
