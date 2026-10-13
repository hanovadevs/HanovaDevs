import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import NotFound from './NotFound'
import { journalPosts, retiredJournalSlugs } from '../data/journal'
import { company } from '../data/company'
import { canonicalUrl } from '../lib/seo'
import './JournalArticle.css'

export default function JournalPost() {
  const { slug } = useParams()
  const [copied, setCopied] = useState(false)
  const post = journalPosts.find(article => article.slug === slug)
  if (!post) return retiredJournalSlugs.includes(slug) ? <Navigate to="/journal" replace /> : <NotFound />
  const path = `/journal/${post.slug}`
  const url = canonicalUrl(path)
  const headings = []
  const content = post.content.replace(/<h2>(.*?)<\/h2>/g, (_, label) => {
    const id = `section-${headings.length + 1}`
    headings.push({ id, label: label.replace(/<[^>]*>/g, '') })
    return `<h2 id="${id}">${label}</h2>`
  })
  const related = journalPosts.filter(article => article.slug !== post.slug).slice(0, 3)
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(url); setCopied(true) }
    catch { setCopied(false) }
  }
  return (
    <article className="journal-article">
      <SEO title={post.title} description={post.excerpt} url={path} type="article" image={post.image}
        publishedAt={post.publishedAt} modifiedAt={post.modifiedAt}
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Journal', item: '/journal' }, { name: post.title, item: path }]}
        schemaMarkup={{ '@type': 'BlogPosting', '@id': `${url}#article`, headline: post.title, description: post.excerpt,
          url, mainEntityOfPage: { '@id': `${url}#webpage` }, image: new URL(post.image, company.url).href,
          datePublished: post.publishedAt, dateModified: post.modifiedAt, wordCount: post.wordCount,
          author: { '@type': 'Organization', name: 'HanovaDevs Editorial', url: `${company.url}/about` },
          publisher: { '@id': `${company.url}/#organization` }, inLanguage: 'en' }} />
      <header className="article-hero">
        <div className="container">
          <Link to="/journal" className="article-hero__back">← Back to the journal</Link>
          <span className="section-label">{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="article-meta">
            <span>By HanovaDevs Editorial</span><time dateTime={post.publishedAt}>{post.date}</time>
            <span>{post.readTime} read · {post.wordCount.toLocaleString('en-US')} words</span>
          </div>
        </div>
      </header>
      <div className="container article-layout">
        <aside className="article-toc" aria-label="Article contents">
          <details open><summary>In this guide</summary><ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.label}</a></li>)}</ol></details>
        </aside>
        <div className="article-content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <div className="article-share">
            <button type="button" className="btn btn-outline" onClick={copyLink}>{copied ? 'Link copied' : 'Copy article link'}</button>
            <a className="btn btn-primary" href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`}>Share by email</a>
            <span role="status" className="sr-only">{copied ? 'Article link copied to clipboard.' : ''}</span>
          </div>
        </div>
      </div>
      <section className="article-related container" aria-labelledby="related-guides">
        <span className="section-label">Continue reading</span><h2 id="related-guides">More useful perspectives</h2>
        <div className="article-related__grid">{related.map(article => <Link key={article.slug} to={`/journal/${article.slug}`}><span>{article.category} · {article.readTime}</span><h3>{article.title}</h3><p>{article.excerpt}</p></Link>)}</div>
      </section>
    </article>
  )
}

