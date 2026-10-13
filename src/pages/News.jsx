import { useEffect, useMemo, useRef, useState } from 'react'
import SEO from '../components/SEO'
import './News.css'

import { newsArticles, newsUpdatedAt } from '../data/news'

const categories = ['All', 'Saved', ...new Set(newsArticles.map(article => article.category))]
const updatedAt = new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${newsUpdatedAt}T12:00:00Z`))

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${value}T12:00:00Z`))
}

export default function News() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hd_saved_news') || '[]') } catch { return [] }
  })
  const closeButtonRef = useRef(null)

  const filteredArticles = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return newsArticles.filter(article => {
      const inCategory = activeCategory === 'All' || (activeCategory === 'Saved' ? savedIds.includes(article.id) : article.category === activeCategory)
      const searchable = `${article.title} ${article.excerpt} ${article.source} ${article.tags.join(' ')}`.toLowerCase()
      return inCategory && (!normalized || searchable.includes(normalized))
    })
  }, [activeCategory, query, savedIds])

  useEffect(() => {
    localStorage.setItem('hd_saved_news', JSON.stringify(savedIds))
  }, [savedIds])

  useEffect(() => {
    if (!selectedArticle) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const closeOnEscape = event => {
      if (event.key === 'Escape') setSelectedArticle(null)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedArticle])

  const toggleSaved = (id) => {
    setSavedIds(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }

  const lead = filteredArticles[0]
  const remaining = filteredArticles.slice(1)

  return (
    <div className="news-page nw2-page">
      <SEO
        title="Technology News Briefing"
        description="A source-backed briefing covering the latest developments in AI, cybersecurity, digital products, research, business, and space technology."
        url="/news"
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'News', item: '/news' }]}
      />

      <header className="nw2-hero">
        <div className="container nw2-hero__inner">
          <div>
            <span className="nw2-eyebrow">HanovaDevs briefing</span>
            <h1>Technology news,<br /><span>without the noise.</span></h1>
            <p>A concise, source-backed view of the developments worth your attention.</p>
          </div>
          <div className="nw2-update" aria-label={`Last editorial update ${updatedAt}`}>
            <span className="nw2-update__dot" />
            <div><small>Editorial update</small><strong>{updatedAt}</strong></div>
          </div>
        </div>
      </header>

      <div className="nw2-main">
        <section className="nw2-tools" aria-label="Filter news">
          <div className="container nw2-tools__inner">
            <label className="nw2-search">
              <span className="sr-only">Search news</span>
              <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
              <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search topics, companies, or sources" type="search" />
            </label>
            <div className="nw2-categories" role="group" aria-label="News categories">
              {categories.map(category => (
                <button key={category} className={activeCategory === category ? 'is-active' : ''} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="nw2-feed container" aria-live="polite">
          <div className="nw2-feed__header">
            <div><span>Latest briefing</span><h2>{activeCategory === 'All' ? 'Top stories' : activeCategory === 'Saved' ? 'Saved stories' : activeCategory}</h2></div>
            <p>{filteredArticles.length} {filteredArticles.length === 1 ? 'story' : 'stories'}</p>
          </div>

          {!lead ? (
            <div className="nw2-empty"><h2>No matching stories</h2><p>Try a different search or category.</p><button className="btn btn-primary" onClick={() => { setQuery(''); setActiveCategory('All') }}>Reset filters</button></div>
          ) : (
            <>
              <article className="nw2-lead">
                <img src={lead.image} alt="" />
                <div className="nw2-lead__content">
                  <NewsMeta article={lead} />
                  <h2>{lead.title}</h2>
                  <p>{lead.excerpt}</p>
                  <ArticleActions article={lead} saved={savedIds.includes(lead.id)} onPreview={setSelectedArticle} onSave={toggleSaved} />
                </div>
              </article>

              <div className="nw2-grid">
                {remaining.map(article => (
                  <article className="nw2-card" key={article.id}>
                    <img src={article.image} alt="" loading="lazy" />
                    <div className="nw2-card__content">
                      <NewsMeta article={article} />
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <ArticleActions article={article} saved={savedIds.includes(article.id)} onPreview={setSelectedArticle} onSave={toggleSaved} />
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      {selectedArticle && (
        <div className="nw2-dialog-backdrop" onMouseDown={event => event.target === event.currentTarget && setSelectedArticle(null)}>
          <section className="nw2-dialog" role="dialog" aria-modal="true" aria-labelledby="news-dialog-title">
            <button ref={closeButtonRef} className="nw2-dialog__close" aria-label="Close article summary" onClick={() => setSelectedArticle(null)}>×</button>
            <NewsMeta article={selectedArticle} />
            <h2 id="news-dialog-title">{selectedArticle.title}</h2>
            <p className="nw2-dialog__summary">{selectedArticle.summary}</p>
            <div className="nw2-tags">{selectedArticle.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <p className="nw2-source-note">HanovaDevs summary. Use the original source for complete reporting and subsequent corrections.</p>
            <div className="nw2-dialog__actions">
              <button className="btn btn-ghost" onClick={() => toggleSaved(selectedArticle.id)}>{savedIds.includes(selectedArticle.id) ? 'Saved' : 'Save story'}</button>
              <a className="btn btn-primary" href={selectedArticle.sourceUrl} target="_blank" rel="noopener noreferrer">Read on {selectedArticle.source}<span aria-hidden="true"> ↗</span></a>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

function NewsMeta({ article }) {
  return <div className="nw2-meta"><span>{article.category}</span><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time><span>{article.source}</span></div>
}

function ArticleActions({ article, saved, onPreview, onSave }) {
  return (
    <div className="nw2-actions">
      <button className="nw2-read" onClick={() => onPreview(article)}>Quick read</button>
      <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Original source <span aria-hidden="true">↗</span></a>
      <button className={`nw2-save ${saved ? 'is-saved' : ''}`} aria-pressed={saved} aria-label={`${saved ? 'Remove' : 'Save'} ${article.title}`} onClick={() => onSave(article.id)}>{saved ? 'Saved' : 'Save'}</button>
    </div>
  )
}
