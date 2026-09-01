import { useState, useEffect } from 'react'

export default function LegalTableOfContents({ sections, activeSectionId, onSectionClick }) {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="legal-toc" aria-label="Table of Contents">
      <div className="legal-toc__header">
        <div className="legal-toc__title-wrap">
          <span className="legal-toc__icon">§</span>
          <h3 className="legal-toc__title">Table of Contents</h3>
        </div>
        <div className="legal-toc__progress-track" title={`Reading Progress: ${Math.round(readingProgress)}%`}>
          <div 
            className="legal-toc__progress-bar" 
            style={{ width: `${readingProgress}%` }} 
            role="progressbar" 
            aria-valuenow={Math.round(readingProgress)} 
            aria-valuemin="0" 
            aria-valuemax="100"
          />
        </div>
      </div>

      <ul className="legal-toc__list">
        {sections.map((section) => {
          const isActive = activeSectionId === section.id
          return (
            <li key={section.id} className="legal-toc__item">
              <a
                href={`#${section.id}`}
                className={`legal-toc__link ${isActive ? 'legal-toc__link--active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  onSectionClick(section.id)
                }}
                aria-current={isActive ? 'location' : undefined}
              >
                <span className="legal-toc__number">{section.number}</span>
                <span className="legal-toc__text">{section.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
