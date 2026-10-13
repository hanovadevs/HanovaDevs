import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { researchArticles } from '../data/research'
export { researchArticles } from '../data/research'
import './Research.css'

const categories = ['All', ...new Set(researchArticles.map(article => article.category))]

export default function Research() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedArticle, setSelectedArticle] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredArticles = activeCategory === 'All'
    ? researchArticles
    : researchArticles.filter(a => a.category === activeCategory)

  const featuredArticle = researchArticles.find(a => a.featured)
  const regularArticles = filteredArticles.filter(a => !a.featured || activeCategory !== 'All')

  return (
    <div className="research-page">
      <SEO
        title="Research Hub — HanovaDevs"
        description="Curated industry research, academic papers, and technical reports from leading institutions. Stay informed on AI, web development, cybersecurity, and more."
        url="/research"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Research Hub', item: '/research' }
        ]}
      />

      {/* ===== HERO ===== */}
      <section className="rs-hero" id="research-hero">
        <div className="rs-hero__grid-bg" />
        <div className="container">
          <div className="rs-hero__content reveal-up">
            <span className="rs-label">Research Hub</span>
            <h1>Curated <br /><span className="rs-gradient">Knowledge.</span></h1>
            <p>Industry-leading research, academic papers, and technical reports — curated and annotated by the HanovaDevs engineering team.</p>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY FILTER ===== */}
      <section className="rs-filters">
        <div className="container">
          <div className="rs-filters__bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`rs-filter-btn ${activeCategory === cat ? 'rs-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED SPOTLIGHT ===== */}
      {activeCategory === 'All' && featuredArticle && (
        <section className="rs-featured">
          <div className="container">
            <div className="rs-featured__card reveal-up" onClick={() => setSelectedArticle(featuredArticle)}>
              <div className="rs-featured__image">
                <img src={featuredArticle.image} alt={featuredArticle.title} loading="lazy" />
                <div className="rs-featured__badge">Featured Research</div>
              </div>
              <div className="rs-featured__content">
                <div className="rs-featured__meta">
                  <span className="rs-source">{featuredArticle.source}</span>
                  <span className="rs-date">{featuredArticle.date}</span>
                  <span className="rs-readtime">{featuredArticle.readTime} read</span>
                </div>
                <h2>{featuredArticle.title}</h2>
                <p>{featuredArticle.excerpt}</p>
                <div className="rs-featured__tags">
                  {featuredArticle.tags.map(tag => (
                    <span key={tag} className="rs-tag">{tag}</span>
                  ))}
                </div>
                <div className="rs-featured__actions">
                  <button className="btn rs-btn-read">
                    Read Analysis <span>→</span>
                  </button>
                  <a href={featuredArticle.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn rs-btn-source" onClick={e => e.stopPropagation()}>
                    View Original Source <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== RESEARCH GRID ===== */}
      <section className="rs-grid-section">
        <div className="container">
          <div className="rs-grid">
            {regularArticles.map((article, i) => (
              <div
                key={article.id}
                className={`rs-card reveal-up reveal-delay-${(i % 4) + 1}`}
                onClick={() => setSelectedArticle(article)}
              >
                <div className="rs-card__image">
                  <img src={article.image} alt={article.title} loading="lazy" />
                  <div className="rs-card__category">{article.category}</div>
                </div>
                <div className="rs-card__content">
                  <div className="rs-card__meta">
                    <span className="rs-source">{article.source}</span>
                    <span className="rs-date">{article.date}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="rs-card__footer">
                    <span className="rs-readtime">{article.readTime} read</span>
                    <div className="rs-card__actions">
                      <span className="rs-card__link">Read Analysis →</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARTICLE MODAL ===== */}
      {selectedArticle && (
        <div className="rs-modal-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="rs-modal" onClick={e => e.stopPropagation()}>
            <button className="rs-modal__close" onClick={() => setSelectedArticle(null)}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="rs-modal__header">
              <img src={selectedArticle.image} alt={selectedArticle.title} />
              <div className="rs-modal__header-overlay">
                <div className="rs-modal__meta">
                  <span className="rs-source">{selectedArticle.source}</span>
                  <span className="rs-date">{selectedArticle.date}</span>
                  <span className="rs-readtime">{selectedArticle.readTime} read</span>
                </div>
                <h2>{selectedArticle.title}</h2>
              </div>
            </div>
            <div className="rs-modal__body" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
            <div className="rs-modal__footer">
              <a href={selectedArticle.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn rs-btn-source">
                View Original Source <span>↗</span>
              </a>
              <Link to="/contact" className="btn btn-primary">Discuss This Research</Link>
            </div>
          </div>
        </div>
      )}

      {/* ===== SUBMIT CTA ===== */}
      <section className="rs-cta section">
        <div className="container text-center">
          <h2 className="reveal-up">Found something worth sharing?</h2>
          <p className="reveal-up reveal-delay-1">We're always looking for groundbreaking research to feature. Send us your recommendations.</p>
          <div className="reveal-up reveal-delay-2 mt-xl">
            <Link to="/contact" className="btn btn-primary">Submit Research</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
