import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { journalPosts } from '../data/journal'
export { journalPosts } from '../data/journal'
import './Journal.css'

const journalCategories = ['All', ...new Set(journalPosts.map(post => post.category))]

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPosts = activeCategory === 'All'
    ? journalPosts
    : journalPosts.filter(p => p.category === activeCategory)

  const featuredPost = journalPosts.find(p => p.featured)
  const regularPosts = activeCategory === 'All'
    ? filteredPosts.filter(p => !p.featured)
    : filteredPosts

  return (
    <div className="journal-page">
      <SEO
        title="The HanovaDevs Journal — Tech Insights & Engineering"
        description="Original articles on web development, AI, emerging technology, and digital marketing from the HanovaDevs engineering team."
        url="/journal"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Journal', item: '/journal' }
        ]}
      />

      {/* ===== HERO ===== */}
      <section className="jn-hero" id="journal-hero">
        <div className="jn-hero__bg" />
        <div className="container">
          <div className="jn-hero__content reveal-up">
            <span className="jn-label">The Journal</span>
            <h1>The <span className="jn-gradient">HanovaDevs</span> Journal.</h1>
            <p>Original insights on engineering, emerging technology, and the future of the digital world — written by our team.</p>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY FILTER ===== */}
      <section className="jn-filters">
        <div className="container">
          <div className="jn-filters__bar">
            {journalCategories.map(cat => (
              <button
                key={cat}
                className={`jn-filter-btn ${activeCategory === cat ? 'jn-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      {activeCategory === 'All' && featuredPost && (
        <section className="jn-featured">
          <div className="container">
            <Link to={`/journal/${featuredPost.slug}`} className="jn-featured__card reveal-up">
              <div className="jn-featured__image">
                <img src={featuredPost.image} alt={featuredPost.title} loading="lazy" />
                <div className="jn-featured__badge">Featured</div>
              </div>
              <div className="jn-featured__content">
                <div className="jn-featured__meta">
                  <span className="jn-category-tag">{featuredPost.category}</span>
                  <span className="jn-date">{featuredPost.date}</span>
                  <span className="jn-readtime">{featuredPost.readTime} read</span>
                </div>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div className="jn-featured__author">
                  <img src="/white.png" alt="" width="28" height="28" />
                  <span>{featuredPost.author}</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ===== POSTS GRID ===== */}
      <section className="jn-grid-section">
        <div className="container">
          <div className="jn-grid">
            {regularPosts.map((post, i) => (
              <Link to={`/journal/${post.slug}`} key={post.slug} className={`jn-card reveal-up reveal-delay-${(i % 3) + 1}`}>
                <div className="jn-card__image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <div className="jn-card__category">{post.category}</div>
                </div>
                <div className="jn-card__content">
                  <div className="jn-card__meta">
                    <span className="jn-date">{post.date}</span>
                    <span className="jn-readtime">{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="jn-card__footer">
                    <div className="jn-card__author">
                      <img src="/icon.png" alt="" width="22" height="22" />
                      <span>{post.author}</span>
                    </div>
                    <span className="jn-card__link">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
