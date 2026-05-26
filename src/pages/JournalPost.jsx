import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEO from '../components/SEO'
import { journalPosts } from './Journal'
import './Journal.css'

export default function JournalPost() {
  const { slug } = useParams()
  const post = journalPosts.find(p => p.slug === slug)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)

  // Comments states
  const [comments, setComments] = useState([])
  const [commentName, setCommentName] = useState('')
  const [commentEmail, setCommentEmail] = useState('')
  const [commentBody, setCommentBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setCurrentPage(1) // Reset page on post shift

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [slug])

  // Load / Seed Comments dynamically
  useEffect(() => {
    if (!post) return
    const storageKey = `hanovadevs-comments-${slug}`
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      setComments(JSON.parse(saved))
    } else {
      const defaults = [
        {
          id: 'seed-1',
          name: 'Sarah Jenkins',
          role: 'CTO, EarthSync',
          date: 'May 20, 2026',
          body: 'This is a fantastic analysis! We shifted our core backend queries to edge workers recently and reduced our load times by over 60%. It is great to see these patterns mapped out so clearly.',
          likes: 12,
          liked: false
        },
        {
          id: 'seed-2',
          name: 'Marcus Chen',
          role: 'Full Stack Architect',
          date: 'May 21, 2026',
          body: 'Excellent writeup. I particularly agree with the shift towards Composable Architectures. Monolithic setups feel slower by the day. Do you recommend any specific edge deployment frameworks for startup scaling?',
          likes: 8,
          liked: false
        }
      ]
      setComments(defaults)
      localStorage.setItem(storageKey, JSON.stringify(defaults))
    }
  }, [slug, post])

  if (!post) return <Navigate to="/journal" replace />

  // Split content by <!-- pagebreak -->
  const contentPages = post.content.split('<!-- pagebreak -->')
  const hasMultiplePages = contentPages.length > 1

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    const element = document.querySelector('.jn-post__hero')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  // Like comment handler
  const handleLikeComment = (commentId) => {
    const updated = comments.map(c => {
      if (c.id === commentId) {
        return {
          ...c,
          likes: c.liked ? c.likes - 1 : c.likes + 1,
          liked: !c.liked
        }
      }
      return c
    })
    setComments(updated)
    localStorage.setItem(`hanovadevs-comments-${slug}`, JSON.stringify(updated))
  }

  // Submit comment handler
  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (!commentName || !commentBody) return
    setIsSubmitting(true)

    setTimeout(() => {
      const newComment = {
        id: 'user-' + Date.now(),
        name: commentName,
        role: 'Community Member',
        date: 'Today',
        body: commentBody,
        likes: 0,
        liked: false
      }
      const updated = [...comments, newComment]
      setComments(updated)
      localStorage.setItem(`hanovadevs-comments-${slug}`, JSON.stringify(updated))

      setCommentName('')
      setCommentEmail('')
      setCommentBody('')
      setIsSubmitting(false)
    }, 600)
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = journalPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  return (
    <div className="jn-post-page">
      <div className="jn-progress-bar" style={{ width: `${scrollProgress}%` }} />

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

      <article className="jn-post">
        <header className="jn-post__header">
          <div className="container">
            <Link to="/journal" className="jn-post__back">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back to Journal
            </Link>
            <div className="jn-post__meta">
              <span className="jn-category-tag">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} read</span>
            </div>
            <h1>{post.title}</h1>
          </div>
        </header>

        <div className="jn-post__hero container">
          <img src={post.image} alt={post.title} />
        </div>

        {/* Article content (segmented if multi-page) */}
        <div 
          className="jn-post__content container" 
          dangerouslySetInnerHTML={{ __html: contentPages[currentPage - 1] }} 
        />

        {/* Multi-page Pagination Controls */}
        {hasMultiplePages && (
          <div className="jn-post__pagination container">
            <div className="jn-pagination-card card-glass">
              <button 
                className="jn-pager-btn" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                &larr; Previous Page
              </button>
              <div className="jn-pager-numbers">
                {contentPages.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`jn-pager-num ${currentPage === idx + 1 ? 'jn-pager-num--active' : ''}`}
                    onClick={() => handlePageChange(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
              <button 
                className="jn-pager-btn" 
                disabled={currentPage === contentPages.length}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next Page &rarr;
              </button>
              <span className="jn-pager-info">Page {currentPage} of {contentPages.length}</span>
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="jn-post__author-bio container">
          <div className="jn-author-card">
            <img src="/octopus.png" alt="HanovaDevs" width="56" height="56" />
            <div>
              <strong>HanovaDevs Team</strong>
              <p>We're a full-service digital agency and software studio engineering digital ecosystems for ambitious businesses worldwide.</p>
            </div>
          </div>
        </div>

        {/* Discussions / Comments Section */}
        <div className="jn-comments-section container">
          <h3>Discussion ({comments.length})</h3>
          
          <div className="jn-comments-list">
            {comments.map(c => (
              <div key={c.id} className="jn-comment-card card-glass">
                <div className="jn-comment-avatar">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="jn-comment-content">
                  <div className="jn-comment-header">
                    <strong>{c.name}</strong>
                    <span className="jn-comment-role">{c.role}</span>
                    <span className="jn-comment-date">{c.date}</span>
                  </div>
                  <p className="jn-comment-body">{c.body}</p>
                  <button 
                    className={`jn-comment-like-btn ${c.liked ? 'jn-comment-like-btn--liked' : ''}`}
                    onClick={() => handleLikeComment(c.id)}
                    aria-label="Upvote comment"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={c.liked ? '#ef4444' : 'none'} stroke={c.liked ? '#ef4444' : 'currentColor'} strokeWidth="2.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span>{c.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form className="jn-comment-form" onSubmit={handleSubmitComment}>
            <h4>Join the discussion</h4>
            <p className="jn-comment-form-subtitle">Share your insights, ask a question, or leave your feedback.</p>
            <div className="jn-comment-form-row">
              <div className="jn-input-group">
                <label htmlFor="commentName">Name</label>
                <input 
                  type="text" 
                  id="commentName"
                  value={commentName} 
                  onChange={e => setCommentName(e.target.value)} 
                  placeholder="e.g. Jane Doe" 
                  required 
                />
              </div>
              <div className="jn-input-group">
                <label htmlFor="commentEmail">Email (Confidential)</label>
                <input 
                  type="email" 
                  id="commentEmail"
                  value={commentEmail} 
                  onChange={e => setCommentEmail(e.target.value)} 
                  placeholder="e.g. jane@domain.com" 
                />
              </div>
            </div>
            <div className="jn-input-group">
              <label htmlFor="commentBody">Comment</label>
              <textarea 
                id="commentBody"
                value={commentBody} 
                onChange={e => setCommentBody(e.target.value)} 
                rows="4" 
                placeholder="Write an insightful response..." 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary jn-comment-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>
          </form>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="jn-post__related container">
            <h3>Related Articles</h3>
            <div className="jn-related-grid">
              {relatedPosts.map(rp => (
                <Link to={`/journal/${rp.slug}`} key={rp.slug} className="jn-related-card">
                  <div className="jn-related-card__image">
                    <img src={rp.image} alt={rp.title} loading="lazy" />
                  </div>
                  <div className="jn-related-card__content">
                    <span className="jn-date">{rp.date}</span>
                    <h4>{rp.title}</h4>
                    <span className="jn-readtime">{rp.readTime} read</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <footer className="jn-post__footer container">
          <div className="jn-post__share">
            <h3>Enjoyed this article?</h3>
            <p>Share it with your network or get in touch to discuss how we can apply these insights to your business.</p>
            <div className="jn-post__actions">
              <Link to="/contact" className="btn btn-primary">Work with us</Link>
              <Link to="/journal" className="btn btn-ghost">More Articles</Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}
