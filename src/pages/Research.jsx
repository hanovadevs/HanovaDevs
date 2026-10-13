import { useState } from 'react'
import SEO from '../components/SEO'
import { researchArticles } from '../data/research'
import './Research.css'
import './CompanyPages.css'
const categories = ['All', ...new Set(researchArticles.map(article => article.category))]
export default function Research() {
  const [category, setCategory] = useState('All')
  const articles = researchArticles.filter(article => category === 'All' || article.category === category)
  return <div className="research-page">
    <SEO title="Research Library" description="Short introductions to original AI research, accessibility standards and web performance guidance. Read the original sources for methods and results." url="/research" pageType="CollectionPage" />
    <header className="rs-hero"><div className="container rs-hero__content"><span className="rs-label">Research library</span><h1>Useful ideas.<br /><span className="rs-gradient">Original sources.</span></h1><p>Short editorial introductions to research and technical references. These are source summaries, not claims of proprietary HanovaDevs research.</p></div></header>
    <section className="rs-filters"><div className="container rs-filters__bar" role="group" aria-label="Research categories">{categories.map(item => <button key={item} className={`rs-filter-btn ${item === category ? 'rs-filter-btn--active' : ''}`} aria-pressed={item === category} onClick={() => setCategory(item)}>{item}</button>)}</div></section>
    <section className="rs-grid-section"><div className="container rs-grid">{articles.map(article => <article className="rs-card" key={article.id}><div className="rs-card__image"><img src={article.image} alt="" loading="lazy" /><span className="rs-card__category">{article.category}</span></div><div className="rs-card__content"><div className="rs-card__meta"><span className="rs-source">{article.source}</span><span className="rs-date">{article.date}</span></div><h2>{article.title}</h2><p>{article.excerpt}</p><details className="research-summary"><summary>Read editorial introduction</summary><div dangerouslySetInnerHTML={{ __html: article.content }} /></details><a className="btn btn-outline" href={article.sourceUrl} target="_blank" rel="noopener noreferrer">Read original source ↗</a></div></article>)}</div></section>
  </div>
}
