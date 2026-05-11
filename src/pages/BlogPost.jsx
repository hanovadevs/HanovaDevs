import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import SEO from '../components/SEO'
import { blogPosts } from './Blog'
import './Blog.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) return <Navigate to="/blog" replace />

  return (
    <div className="blog-post-page">
      <SEO 
        title={`${post.title} — HanovaDevs Blog`}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
      />

      <article className="blog-post">
        <header className="blog-post__header">
          <div className="container">
            <Link to="/blog" className="blog-post__back">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              Back to Blog
            </Link>
            <div className="blog-post__meta">
              <span>{post.category}</span> • <span>{post.date}</span>
            </div>
            <h1>{post.title}</h1>
          </div>
        </header>

        <div className="blog-post__hero container">
          <img src={post.image} alt={post.title} />
        </div>

        <div className="blog-post__content container" dangerouslySetInnerHTML={{ __html: post.content }} />

        <footer className="blog-post__footer container">
          <div className="blog-post__share">
            <h3>Enjoyed this post?</h3>
            <p>Share it with your network or get in touch to discuss how we can apply these insights to your business.</p>
            <div className="blog-post__actions">
              <Link to="/contact" className="btn btn-primary">Work with us</Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}
