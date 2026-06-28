import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import { journalPosts } from './Journal'
import './Journal.css'

export default function JournalPost() {
  const { slug } = useParams()
  const post = journalPosts.find(p => p.slug === slug)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [headings, setHeadings] = useState([])

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)

  // Review states
  const [reviews, setReviews] = useState([])
  const [reviewName, setReviewName] = useState('')
  const [reviewRole, setReviewRole] = useState('')
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewBody, setReviewBody] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Scroll tracking and heading extraction
  useEffect(() => {
    window.scrollTo(0, 0)
    setCurrentPage(1) // Reset page on post shift

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug])

  // Extract H2 headings dynamically from content for Table of Contents
  useEffect(() => {
    if (!post) return
    const h2Regex = /<h2>(.*?)<\/h2>/g
    const found = []
    let match
    // Temporary clean regex match without HTML tags inside the heading
    while ((match = h2Regex.exec(post.content)) !== null) {
      found.push(match[1].replace(/<[^>]*>/g, ''))
    }
    setHeadings(found)
  }, [post])

  // Load / Seed Reviews dynamically
  useEffect(() => {
    if (!post) return
    const storageKey = `hanovadevs-reviews-${slug}`
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      setReviews(JSON.parse(saved))
    } else {
      // Custom seeds depending on the article category
      const defaults = [
        {
          id: 'seed-1',
          name: 'Sarah Jenkins',
          role: 'CTO, EarthSync',
          date: 'May 20, 2026',
          rating: 5,
          title: 'Revolutionized our Edge Strategy',
          body: 'This is a fantastic analysis! We shifted our core backend queries to edge workers recently and reduced our load times by over 60%. It is great to see these patterns mapped out so clearly.',
          helpful: 14,
          voted: false
        },
        {
          id: 'seed-2',
          name: 'Marcus Chen',
          role: 'Full Stack Architect',
          date: 'May 21, 2026',
          rating: 4,
          title: 'Highly informative, great depth',
          body: 'Excellent writeup. I particularly agree with the shift towards Composable Architectures. Monolithic setups feel slower by the day. Highly recommend this read.',
          helpful: 8,
          voted: false
        }
      ]
      setReviews(defaults)
      localStorage.setItem(storageKey, JSON.stringify(defaults))
    }
  }, [slug, post])

  if (!post) return <Navigate to="/journal" replace />

  // Split content by <!-- pagebreak -->
  const contentPages = post.content.split('<!-- pagebreak -->')
  const hasMultiplePages = contentPages.length > 1

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    const element = document.querySelector('.jn-post__header-v2')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Scroll to heading in the article
  const scrollToHeading = (text) => {
    const el = Array.from(document.querySelectorAll('.jn-post__content-v2 h2'))
      .find(h => h.textContent.replace(/<[^>]*>/g, '') === text)
    if (el) {
      const offset = 90 // Account for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  // Helpfulness upvote handler
  const handleHelpfulVote = (reviewId) => {
    const updated = reviews.map(r => {
      if (r.id === reviewId) {
        return {
          ...r,
          helpful: r.voted ? r.helpful - 1 : r.helpful + 1,
          voted: !r.voted
        }
      }
      return r
    })
    setReviews(updated)
    localStorage.setItem(`hanovadevs-reviews-${slug}`, JSON.stringify(updated))
  }

  // Submit review handler
  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!reviewName || !reviewTitle || !reviewBody) return
    setIsSubmitting(true)

    setTimeout(() => {
      const newReview = {
        id: 'user-' + Date.now(),
        name: reviewName,
        role: reviewRole || 'Verified Reader',
        date: 'Today',
        rating: reviewRating,
        title: reviewTitle,
        body: reviewBody,
        helpful: 0,
        voted: false
      }
      const updated = [...reviews, newReview]
      setReviews(updated)
      localStorage.setItem(`hanovadevs-reviews-${slug}`, JSON.stringify(updated))

      // Reset form
      setReviewName('')
      setReviewRole('')
      setReviewTitle('')
      setReviewBody('')
      setReviewRating(5)
      setIsSubmitting(false)
    }, 600)
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = journalPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  // Calculate review stats
  const totalReviews = reviews.length
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '0.0'

  // Calculate star distribution
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach(r => {
    if (distribution[r.rating] !== undefined) {
      distribution[r.rating]++
    }
  })

  return (
    <div className="jn-post-page">
      {/* Scroll Progress Indicator */}
      <div className="jn-scroll-progress-container">
        <div className="jn-scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      <SEO
        title={`${post.title} — HanovaDevs Journal`}
        description={post.excerpt}
        url={`/journal/${post.slug}`}
        image={post.image}
        type="article"
        schemaMarkup={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://hanovadevs.com/journal/${post.slug}`
          },
          "headline": post.title,
          "description": post.excerpt,
          "image": post.image,
          "datePublished": "2026-05-26",
          "author": {
            "@type": "Organization",
            "name": "HanovaDevs",
            "logo": {
              "@type": "ImageObject",
              "url": "https://hanovadevs.com/favicon.svg"
            }
          },
          "publisher": {
            "@type": "Organization",
            "name": "HanovaDevs",
            "logo": {
              "@type": "ImageObject",
              "url": "https://hanovadevs.com/favicon.svg"
            }
          }
        }}
      />

      <div className="jn-post-container container">
        {/* Left Editorial Sidebar */}
        <aside className="jn-post__sidebar">
          {headings.length > 0 && (
            <div className="jn-post__toc card-glass">
              <h4>On This Page</h4>
              <ul>
                {headings.map((heading, i) => (
                  <li key={i}>
                    <button onClick={() => scrollToHeading(heading)} className="jn-toc-link">
                      {heading}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="jn-post__share-vertical">
            <span>Share</span>
            <button onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert('Link copied to clipboard!')
            }} className="jn-share-btn" title="Copy Link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
            </button>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="jn-share-btn" title="Share on X">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4l11.733 16h4.267l-11.733-16z M4 20l6.768-6.768M20 4l-6.768 6.768" /></svg>
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="jn-share-btn" title="Share on LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
          </div>
        </aside>

        {/* Main Article Body */}
        <article className="jn-post__main">
          <header className="jn-post__header-v2">
            <Link to="/journal" className="jn-post__back-v2">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back to Journal
            </Link>
            
            <div className="jn-post__meta-v2">
              <span className="jn-category-tag">{post.category}</span>
              <span className="meta-separator">•</span>
              <span>{post.date}</span>
              <span className="meta-separator">•</span>
              <span>{post.readTime} read</span>
            </div>
            
            <h1 className="jn-post__title-v2">{post.title}</h1>
            <p className="jn-post__excerpt-v2">{post.excerpt}</p>
            
            <div className="jn-post__author-strip">
              <img src="/octopus.png" alt="HanovaDevs Logo" className="author-avatar" style={{ filter: 'brightness(0) invert(1)' }} />
              <div className="author-info">
                <strong>HanovaDevs Editorial</strong>
                <span>Technology & Digital Strategy</span>
              </div>
            </div>
          </header>

          <div className="jn-post__hero-v2">
            <img src={post.image} alt={post.title} />
          </div>

          {/* Key Takeaway Highlight Box */}
          <div className="jn-post__takeaway-box">
            <div className="takeaway-header">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              <h3>Key Insight</h3>
            </div>
            <p>{post.excerpt}</p>
          </div>

          {/* Article Content */}
          <div 
            className="jn-post__content-v2" 
            dangerouslySetInnerHTML={{ __html: contentPages[currentPage - 1] }} 
          />

          {/* Multi-page Pagination Controls */}
          {hasMultiplePages && (
            <div className="jn-post__pagination-v2">
              <div className="jn-pagination-card-v2 card-glass">
                <button 
                  className="jn-pager-btn-v2" 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &larr; Previous Page
                </button>
                <div className="jn-pager-numbers-v2">
                  {contentPages.map((_, idx) => (
                    <button 
                      key={idx} 
                      className={`jn-pager-num-v2 ${currentPage === idx + 1 ? 'jn-pager-num-v2--active' : ''}`}
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button 
                  className="jn-pager-btn-v2" 
                  disabled={currentPage === contentPages.length}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next Page &rarr;
                </button>
                <span className="jn-pager-info-v2">Page {currentPage} of {contentPages.length}</span>
              </div>
            </div>
          )}

          {/* Author Bio Section */}
          <div className="jn-post__author-bio-v2 card-glass">
            <img src="/octopus.png" alt="HanovaDevs" width="60" height="60" style={{ filter: 'brightness(0) invert(1)' }} />
            <div className="bio-text">
              <h4>HanovaDevs Research</h4>
              <p>We are a high-performance software engineering and digital growth agency. We publish insights on technology trends, UX optimization, local AI scaling, and technical SEO based on verified client implementations.</p>
            </div>
          </div>

          {/* Premium Review/Rating System Section */}
          <section className="jn-reviews-section">
            <div className="reviews-section__header">
              <h3>Article Value Reviews</h3>
              <p>Rate the educational value and practical applicability of this article.</p>
            </div>

            {/* Review Statistics Dashboard */}
            <div className="reviews-dashboard card-glass">
              <div className="dashboard-rating">
                <span className="rating-num">{averageRating}</span>
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      viewBox="0 0 24 24" 
                      width="20" 
                      height="20" 
                      fill={i < Math.round(Number(averageRating)) ? '#facc15' : 'none'} 
                      stroke={i < Math.round(Number(averageRating)) ? '#facc15' : 'rgba(255,255,255,0.2)'} 
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="rating-count">Based on {totalReviews} reviews</span>
              </div>

              <div className="dashboard-bars">
                {[5, 4, 3, 2, 1].map(stars => {
                  const count = distribution[stars] || 0
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
                  return (
                    <div key={stars} className="dashboard-bar-row">
                      <span className="bar-label">{stars} Star</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="bar-count">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Reviews List */}
            <div className="reviews-list">
              {reviews.map(r => (
                <div key={r.id} className="review-item card-glass">
                  <div className="review-item__meta">
                    <div className="review-item__stars">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          viewBox="0 0 24 24" 
                          width="16" 
                          height="16" 
                          fill={i < r.rating ? '#facc15' : 'none'} 
                          stroke={i < r.rating ? '#facc15' : 'rgba(255,255,255,0.2)'} 
                          strokeWidth="2"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <span className="review-item__author">{r.name}</span>
                    <span className="review-item__role">{r.role}</span>
                    <span className="review-item__date">{r.date}</span>
                  </div>
                  <h4 className="review-item__title">{r.title}</h4>
                  <p className="review-item__body">{r.body}</p>
                  <div className="review-item__actions">
                    <button 
                      className={`review-helpful-btn ${r.voted ? 'review-helpful-btn--active' : ''}`}
                      onClick={() => handleHelpfulVote(r.id)}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                      <span>Helpful ({r.helpful})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Review Form */}
            <form className="review-form card-glass" onSubmit={handleSubmitReview}>
              <h4>Write a Review</h4>
              <p className="form-desc">Share your feedback on this article. Your email address will not be published.</p>
              
              {/* Interactive Star Rating Selector */}
              <div className="form-rating-group">
                <label>Your Rating</label>
                <div className="star-selector">
                  {[1, 2, 3, 4, 5].map(star => {
                    const isActive = hoverRating ? star <= hoverRating : star <= reviewRating
                    return (
                      <button
                        key={star}
                        type="button"
                        className="star-btn"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setReviewRating(star)}
                        aria-label={`Rate ${star} Stars`}
                      >
                        <svg 
                          viewBox="0 0 24 24" 
                          width="28" 
                          height="28" 
                          fill={isActive ? '#facc15' : 'none'} 
                          stroke={isActive ? '#facc15' : 'rgba(255,255,255,0.4)'} 
                          strokeWidth="2"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="reviewName">Your Name</label>
                  <input 
                    type="text" 
                    id="reviewName"
                    value={reviewName} 
                    onChange={e => setReviewName(e.target.value)} 
                    placeholder="e.g. Sarah Jenkins" 
                    required 
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="reviewRole">Your Role / Company</label>
                  <input 
                    type="text" 
                    id="reviewRole"
                    value={reviewRole} 
                    onChange={e => setReviewRole(e.target.value)} 
                    placeholder="e.g. CTO, EarthSync" 
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="reviewTitle">Review Title</label>
                <input 
                  type="text" 
                  id="reviewTitle"
                  value={reviewTitle} 
                  onChange={e => setReviewTitle(e.target.value)} 
                  placeholder="e.g. Incredibly insightful and detailed" 
                  required 
                />
              </div>

              <div className="input-group">
                <label htmlFor="reviewBody">Review Content</label>
                <textarea 
                  id="reviewBody"
                  value={reviewBody} 
                  onChange={e => setReviewBody(e.target.value)} 
                  rows="5" 
                  placeholder="What did you think of the article? Was it helpful for your projects?" 
                  required 
                />
              </div>

              <button type="submit" className="btn btn-primary form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </section>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="jn-post__related-v2">
              <h3>Related Articles</h3>
              <div className="jn-related-grid-v2">
                {relatedPosts.map(rp => (
                  <Link to={`/journal/${rp.slug}`} key={rp.slug} className="jn-related-card-v2 card-glass">
                    <div className="jn-related-card__image-v2">
                      <img src={rp.image} alt={rp.title} loading="lazy" />
                    </div>
                    <div className="jn-related-card__content-v2">
                      <span className="jn-date">{rp.date}</span>
                      <h4>{rp.title}</h4>
                      <span className="jn-readtime">{rp.readTime} read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <footer className="jn-post__footer-v2">
            <div className="jn-post__share-v2 card-glass">
              <h3>Interested in implementing these insights?</h3>
              <p>We help ambitious businesses scale operations, optimize search engine visibility, and build premium digital products.</p>
              <div className="jn-post__actions-v2">
                <Link to="/contact" className="btn btn-primary">Start a Project</Link>
                <Link to="/journal" className="btn btn-outline">Back to Journal</Link>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  )
}

