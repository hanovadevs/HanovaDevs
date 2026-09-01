import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import LegalTableOfContents from './LegalTableOfContents'
import './LegalPage.css'

export default function LegalPageLayout({
  data,
  meta,
  otherLegalDoc
}) {
  const [activeSectionId, setActiveSectionId] = useState(data.sections[0]?.id || '')
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const isScrollingRef = useRef(false)

  // Scroll to hash on mount or top
  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    if (hash) {
      const el = document.getElementById(hash)
      if (el && typeof el.scrollIntoView === 'function') {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          setActiveSectionId(hash)
        }, 150)
        return
      }
    }
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0)
    }
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const sectionElements = data.sections.map(s => document.getElementById(s.id)).filter(Boolean)
    if (sectionElements.length === 0) return

    const observerCallback = (entries) => {
      if (isScrollingRef.current) return

      // Find the uppermost intersecting section
      const visibleEntries = entries.filter(e => e.isIntersecting)
      if (visibleEntries.length > 0) {
        // Sort by distance from top
        visibleEntries.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        setActiveSectionId(visibleEntries[0].target.id)
      }
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-100px 0px -65% 0px',
      threshold: [0, 0.2, 0.5]
    })

    sectionElements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [data.sections])

  const handleSectionClick = (sectionId) => {
    isScrollingRef.current = true
    setActiveSectionId(sectionId)
    setMobileTocOpen(false)

    const targetEl = document.getElementById(sectionId)
    if (targetEl) {
      const navOffset = 90
      const elementPosition = targetEl.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Update URL hash without triggering full reload
      window.history.replaceState(null, '', `#${sectionId}`)

      setTimeout(() => {
        isScrollingRef.current = false
      }, 700)
    }
  }

  const activeSectionObj = data.sections.find(s => s.id === activeSectionId) || data.sections[0]

  return (
    <div className="legal-page">
      {/* Background Ambience */}
      <div className="legal-page__glow-1" />
      <div className="legal-page__glow-2" />

      {/* Hero Header */}
      <header className="legal-hero">
        <div className="container">
          <div className="legal-hero__content reveal">
            <div className="legal-hero__badges">
              <span className="section-label">{data.eyebrow}</span>
              {data.badge && (
                <span className="legal-hero__trust-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  {data.badge}
                </span>
              )}
            </div>

            <h1 className="legal-hero__title">{data.title}</h1>
            <p className="legal-hero__subtitle">{data.subtitle}</p>

            <div className="legal-hero__meta-strip">
              <div className="legal-hero__meta-item">
                <span className="legal-hero__meta-label">Effective & Last Updated</span>
                <strong className="legal-hero__meta-value">{meta.lastUpdated}</strong>
              </div>
              <div className="legal-hero__meta-divider" />
              <div className="legal-hero__meta-item">
                <span className="legal-hero__meta-label">Applicable To</span>
                <strong className="legal-hero__meta-value">Global Clients & Visitors</strong>
              </div>
              <div className="legal-hero__meta-divider" />
              <div className="legal-hero__meta-item">
                <span className="legal-hero__meta-label">Direct Inquiries</span>
                <a href={`mailto:${meta.contactEmail}`} className="legal-hero__meta-link">{meta.contactEmail}</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Jump-To-Section Floating Bar */}
      <aside className="legal-mobile-bar" aria-label="Mobile table of contents navigation">
        <div className="container">
          <button
            type="button"
            className="legal-mobile-bar__toggle"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            aria-expanded={mobileTocOpen}
            aria-controls="legal-mobile-drawer"
          >
            <div className="legal-mobile-bar__current">
              <span className="legal-mobile-bar__num">{activeSectionObj?.number}</span>
              <span className="legal-mobile-bar__name">{activeSectionObj?.title}</span>
            </div>
            <span className="legal-mobile-bar__btn">
              {mobileTocOpen ? 'Close ↑' : 'Jump to section ↓'}
            </span>
          </button>

          {mobileTocOpen && (
            <div className="legal-mobile-drawer" id="legal-mobile-drawer">
              <div className="legal-mobile-drawer__header">
                <span>Select a section</span>
                <button 
                  type="button" 
                  className="legal-mobile-drawer__close" 
                  onClick={() => setMobileTocOpen(false)}
                >
                  ✕
                </button>
              </div>
              <ul className="legal-mobile-drawer__list">
                {data.sections.map((section) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      className={`legal-mobile-drawer__link ${activeSectionId === section.id ? 'active' : ''}`}
                      onClick={() => handleSectionClick(section.id)}
                    >
                      <span className="num">{section.number}</span>
                      <span className="text">{section.title}</span>
                      {activeSectionId === section.id && <span className="indicator">●</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content & Sticky TOC Grid */}
      <section className="legal-body section">
        <div className="container">
          <div className="legal-body__grid">
            {/* Desktop Sticky Table of Contents */}
            <aside className="legal-body__sidebar">
              <div className="legal-body__sticky-wrap">
                <LegalTableOfContents
                  sections={data.sections}
                  activeSectionId={activeSectionId}
                  onSectionClick={handleSectionClick}
                />

                {/* Switch Document Card */}
                {otherLegalDoc && (
                  <div className="legal-switch-card">
                    <span className="legal-switch-card__label">Also Available</span>
                    <h4 className="legal-switch-card__title">{otherLegalDoc.title}</h4>
                    <p className="legal-switch-card__desc">{otherLegalDoc.desc}</p>
                    <Link to={otherLegalDoc.path} className="legal-switch-card__link">
                      View {otherLegalDoc.title} →
                    </Link>
                  </div>
                )}
              </div>
            </aside>

            {/* Main Policy Content Articles */}
            <article className="legal-body__content">
              {data.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="legal-section reveal"
                >
                  <div className="legal-section__header">
                    <span className="legal-section__badge">{section.number}</span>
                    <h2 className="legal-section__title">{section.title}</h2>
                  </div>

                  <div className="legal-section__body">
                    {section.content.map((block, idx) => {
                      if (block.type === 'paragraph') {
                        return <p key={idx} className="legal-paragraph">{block.text}</p>
                      }
                      if (block.type === 'heading') {
                        return <h3 key={idx} className="legal-subheading">{block.text}</h3>
                      }
                      if (block.type === 'callout') {
                        return (
                          <div key={idx} className="legal-callout">
                            <div className="legal-callout__icon">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                            </div>
                            <div className="legal-callout__content">
                              {block.title && <h4 className="legal-callout__title">{block.title}</h4>}
                              <p className="legal-callout__text">{block.text}</p>
                            </div>
                          </div>
                        )
                      }
                      if (block.type === 'list') {
                        return (
                          <ul key={idx} className="legal-list">
                            {block.items.map((item, itemIdx) => {
                              const parts = item.split(': ')
                              const hasLabel = parts.length > 1 && item.includes(':')
                              return (
                                <li key={itemIdx} className="legal-list__item">
                                  <span className="legal-list__bullet">✓</span>
                                  <div className="legal-list__text">
                                    {hasLabel ? (
                                      <>
                                        <strong>{parts[0]}:</strong> {parts.slice(1).join(': ')}
                                      </>
                                    ) : (
                                      item
                                    )}
                                  </div>
                                </li>
                              )
                            })}
                          </ul>
                        )
                      }
                      return null
                    })}
                  </div>
                </section>
              ))}

              {/* Bottom Assurance Card */}
              <div className="legal-bottom-card card card-glass reveal">
                <div className="legal-bottom-card__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--teal-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div className="legal-bottom-card__text">
                  <h3>Transparency & Engineering Governance</h3>
                  <p>
                    Have questions about our data practices, project contracts, or looking for a custom enterprise Master Services Agreement (MSA)? Our engineering leadership and legal team are happy to assist.
                  </p>
                  <div className="legal-bottom-card__actions">
                    <Link to="/contact" className="btn btn-primary">
                      Contact Legal Team
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                    {otherLegalDoc && (
                      <Link to={otherLegalDoc.path} className="btn btn-ghost">
                        Read {otherLegalDoc.title}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
