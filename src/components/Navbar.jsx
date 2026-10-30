import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/products', label: 'Products' },
  { path: '/student-builder-program', label: 'Builders' },
  {
    label: 'Insights',
    dropdown: [
      { path: '/journal', label: 'Journal', desc: 'Ideas and engineering perspectives', group: 'Learn & discover' },
      { path: '/research', label: 'Research Hub', desc: 'Original sources, clearly introduced', group: 'Learn & discover' },
      { path: '/news', label: 'News', desc: 'Technology and company updates', group: 'Learn & discover' },
      { path: '/reviews', label: 'Client Stories & Reviews', desc: 'The context behind our project work', group: 'Plan & evaluate' },
      { path: '/stack', label: 'Tech Stack', desc: 'Our tools and technical approach', group: 'Plan & evaluate' },
      { path: '/calculator', label: 'Project Estimator', desc: 'Explore an indicative project budget', group: 'Plan & evaluate' },
    ]
  },
]
const resourceGroups = ['Learn & discover', 'Plan & evaluate']
const isCurrent = (pathname, path) => path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const toggleRef = useRef(null)
  const location = useLocation()
  const focusDropdown = (event) => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return
    event.preventDefault()
    setDropdownOpen(true)
    const last = event.key === 'ArrowUp'
    requestAnimationFrame(() => {
      const links = dropdownRef.current?.querySelectorAll('.navbar__dropdown a')
      links?.[last ? links.length - 1 : 0]?.focus()
    })
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        if (mobileOpen) toggleRef.current?.focus()
        else if (dropdownOpen) dropdownRef.current?.querySelector('button')?.focus()
        setDropdownOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [mobileOpen, dropdownOpen])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    let focusFrame
    const focusFirstLink = () => {
      const first = mobileMenuRef.current?.querySelector('a')
      if (first && getComputedStyle(first).visibility === 'visible') {
        first.focus({ preventScroll: true })
      } else {
        focusFrame = requestAnimationFrame(focusFirstLink)
      }
    }
    focusFrame = requestAnimationFrame(focusFirstLink)
    const trapFocus = event => {
      if (event.key !== 'Tab') return
      const links = mobileMenuRef.current?.querySelectorAll('a')
      const last = links?.[links.length - 1]
      if (event.shiftKey && document.activeElement === toggleRef.current) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        toggleRef.current?.focus()
      } else if (event.shiftKey && document.activeElement === links?.[0]) {
        event.preventDefault()
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', trapFocus)
    return () => {
      cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', trapFocus)
    }
  }, [mobileOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1121px)')
    const closeOnDesktop = event => {
      if (event.matches) setMobileOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('pointerdown', handleClickOutside)
    return () => document.removeEventListener('pointerdown', handleClickOutside)
  }, [])

  // Only dark hero surfaces need the inverse desktop logo and navigation colors.
  const isDarkPage = ['/about', '/research', '/journal', '/news'].includes(location.pathname)
    || location.pathname.startsWith('/journal/')
  const isInsightsActive = ['/journal', '/reviews', '/research', '/news', '/stack', '/calculator'].some(p => location.pathname.startsWith(p))

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isDarkPage && !scrolled ? 'navbar--dark' : ''}`} id="main-nav">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" aria-label="HanovaDevs Home">
          <img 
            src="/agency-logo-720.webp"
            srcSet="/agency-logo-360.webp 360w, /agency-logo-720.webp 720w"
            sizes="(max-width: 1120px) 150px, 180px"
            width="720"
            height="277"
            alt="HanovaDevs Software Agency" 
            className="navbar__logo-full" 
          />
          <span className="navbar__logo-inverse" aria-hidden="true">
            <img src="/agency-logo-white.webp" width="128" height="128" alt="" className="navbar__inverse-mark" decoding="async" />
            <span className="navbar__inverse-copy">
              <span className="navbar__inverse-name">Hanova<span>Devs</span></span>
              <span className="navbar__inverse-tagline">Software Agency</span>
            </span>
          </span>
        </Link>

        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map(link => (
            link.dropdown ? (
              <div key={link.label} className="navbar__dropdown-wrap" ref={dropdownRef} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setDropdownOpen(false) }}>
                <button
                  className={`navbar__link navbar__link--dropdown ${isInsightsActive ? 'navbar__link--active' : ''}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onKeyDown={focusDropdown}
                  aria-expanded={dropdownOpen}
                  aria-controls="insights-menu"
                >
                  {link.label}
                  <svg className={`navbar__chevron ${dropdownOpen ? 'navbar__chevron--open' : ''}`} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
                </button>
                <div id="insights-menu" hidden={!dropdownOpen} inert={!dropdownOpen} className={`navbar__dropdown ${dropdownOpen ? 'navbar__dropdown--open' : ''}`}>
                  <p className="navbar__dropdown-intro">Explore ideas. Understand the work. Plan your next step.</p>
                  {resourceGroups.map(group => <div className="navbar__resource-group" key={group}><p className="navbar__group-label">{group}</p>{link.dropdown.filter(item => item.group === group).map(item => (
                    <Link key={item.path} to={item.path} aria-current={isCurrent(location.pathname, item.path) ? 'page' : undefined} className="navbar__dropdown-item">
                      <strong>{item.label}</strong><span>{item.desc}</span>
                    </Link>
                  ))}</div>)}
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__link ${isCurrent(location.pathname, link.path) ? 'navbar__link--active' : ''}`}
                aria-current={isCurrent(location.pathname, link.path) ? 'page' : undefined}
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
          ref={toggleRef}
          className={`navbar__burger ${mobileOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          id="mobile-menu-toggle"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && <button className="mobile-menu__backdrop" aria-label="Close navigation" tabIndex={-1} onClick={() => { setMobileOpen(false); toggleRef.current?.focus() }} />}
      <div ref={mobileMenuRef} id="mobile-navigation" inert={!mobileOpen} aria-hidden={!mobileOpen} className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        <p className="mobile-menu__heading">Explore HanovaDevs</p>
        <nav className="mobile-menu__nav" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            link.dropdown ? (
              <div key={link.label} className="mobile-menu__group">
                <span className="mobile-menu__group-label">{link.label} & resources</span>
                <div className="mobile-menu__resources">
                {link.dropdown.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`mobile-menu__link mobile-menu__link--sub ${isCurrent(location.pathname, item.path) ? 'mobile-menu__link--active' : ''}`}
                    aria-current={isCurrent(location.pathname, item.path) ? 'page' : undefined}
                    style={{ animationDelay: `${0.1 + (i + 0.5) * 0.06}s` }}
                  >
                    <span>{item.label}</span><small>{item.desc}</small>
                  </Link>
                ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-menu__link ${isCurrent(location.pathname, link.path) ? 'mobile-menu__link--active' : ''}`}
                aria-current={isCurrent(location.pathname, link.path) ? 'page' : undefined}
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
