import { useEffect, useMemo, useRef, useState } from 'react'
import SEO from '../components/SEO'
import './News.css'

const newsArticles = [
  {
    id: 'meta-open-source-ai-manifesto',
    title: 'Meta outlines its next phase of open-source AI development',
    excerpt: 'Mark Zuckerberg published a long-form vision for world-changing AI and argued that open access will remain central to Meta’s strategy.',
    summary: 'Meta has laid out a renewed case for open-source artificial intelligence as competition intensifies across frontier-model developers. The company says broader access can accelerate research and adoption, while critics continue to debate how increasingly capable model weights should be distributed. The announcement is a strategy statement rather than a product release.',
    category: 'AI',
    publishedAt: '2026-08-10',
    source: 'Associated Press',
    sourceUrl: 'https://apnews.com/article/df8a4e7d7825470d09e8090367457c2c',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=82',
    tags: ['Meta', 'Open Source', 'AI Policy'],
  },
  {
    id: 'openai-astra-cyber-review',
    title: 'OpenAI reportedly slows Astra release over cyber-capability concerns',
    excerpt: 'Internal evaluations reportedly found capabilities serious enough for OpenAI to delay a wider release while additional safeguards are assessed.',
    summary: 'OpenAI has slowed the release of its upcoming Astra model after internal safety evaluations raised concerns about advanced cybersecurity capabilities, according to Axios. The report reflects a wider shift in frontier-model launches: capability evaluations and deployment controls are increasingly determining when—and how—new systems reach users.',
    category: 'Security',
    publishedAt: '2026-08-07',
    source: 'Axios',
    sourceUrl: 'https://www.axios.com/2026/08/07/openai-astra-model-delay-cybersecurity-risks',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=82',
    tags: ['OpenAI', 'Cybersecurity', 'AI Safety'],
  },
  {
    id: 'nasa-iss-solar-array-spacewalk',
    title: 'NASA astronauts complete ISS spacewalk for solar-array preparation',
    excerpt: 'A 6.5-hour spacewalk installed the final mounting hardware needed for another International Space Station power-system upgrade.',
    summary: 'NASA astronauts completed a six-and-a-half-hour spacewalk outside the International Space Station, installing the final set of mounting hardware for additional roll-out solar arrays. The work supports ongoing power upgrades that extend the station’s research capacity and operational life.',
    category: 'Space',
    publishedAt: '2026-08-06',
    source: 'Space.com',
    sourceUrl: 'https://www.space.com/space-exploration/international-space-station/1-more-step-nasa-astronauts-conduct-6-5-hour-spacewalk-to-prep-iss-for-solar-array-upgrade',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=82',
    tags: ['NASA', 'ISS', 'Solar Power'],
  },
  {
    id: 'google-ai-leadership',
    title: 'Google reshapes DeepMind leadership as AI competition accelerates',
    excerpt: 'A major leadership transition places Demis Hassabis in a broader scientific role while Google adjusts how its AI organization is run.',
    summary: 'Google has announced a significant leadership change at DeepMind, with Demis Hassabis moving toward chairman and chief scientist responsibilities. The reorganization comes as model development, research retention, and product delivery place growing pressure on the world’s largest AI labs.',
    category: 'Business',
    publishedAt: '2026-08-06',
    source: 'Axios',
    sourceUrl: 'https://www.axios.com/2026/08/06/googles-ai-leadership-shuffle',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=82',
    tags: ['Google', 'DeepMind', 'Leadership'],
  },
  {
    id: 'openai-gpt-5-6-efficiency',
    title: 'OpenAI details how GPT-5.6 balances capability and efficiency',
    excerpt: 'OpenAI’s engineering overview focuses on serving frontier intelligence with lower latency and more efficient inference.',
    summary: 'OpenAI published an engineering overview of GPT-5.6 describing the work behind improved model capability and serving efficiency. For product teams, the practical story is increasingly about the full deployment envelope—latency, throughput, reliability, and cost—not benchmark performance alone.',
    category: 'AI',
    publishedAt: '2026-07-29',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/news/',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=82',
    tags: ['OpenAI', 'GPT-5.6', 'Inference'],
  },
  {
    id: 'openai-ai-scientific-computing',
    title: 'OpenAI examines scientific computing in the agentic-AI era',
    excerpt: 'A new publication explores how tool-using AI systems can support computational research while keeping results auditable.',
    summary: 'OpenAI’s latest publication considers the role of agentic systems in scientific computing. The useful distinction is between generating plausible answers and producing traceable computational work: researchers need artifacts, methods, and results that can be inspected and reproduced.',
    category: 'Research',
    publishedAt: '2026-07-28',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/news/',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=82',
    tags: ['Science', 'Agents', 'Research'],
  },
  {
    id: 'openai-health-chatgpt',
    title: 'OpenAI launches Health in ChatGPT',
    excerpt: 'The new product experience brings health-focused workflows into ChatGPT, raising both usability and safety questions for sensitive use cases.',
    summary: 'OpenAI announced Health in ChatGPT, extending the product into health-oriented workflows. The launch highlights the opportunity for more accessible information and organization while reinforcing the need for careful scope, privacy controls, clinical boundaries, and clear escalation to qualified professionals.',
    category: 'Product',
    publishedAt: '2026-07-23',
    source: 'OpenAI',
    sourceUrl: 'https://openai.com/news/',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=82',
    tags: ['Health', 'ChatGPT', 'Product'],
  },
  {
    id: 'gemini-notebook',
    title: 'NotebookLM becomes Gemini Notebook and adds code execution',
    excerpt: 'Google is bringing its research notebook deeper into the Gemini ecosystem, including code-based analysis for Pro users.',
    summary: 'Google renamed NotebookLM to Gemini Notebook and announced deeper integration across its AI ecosystem. The product is also adding code execution for data analysis, while notebook synchronization is planned across Gemini and Search. The shift turns the tool from a document companion into a broader research workspace.',
    category: 'Product',
    publishedAt: '2026-07-16',
    source: 'Google',
    sourceUrl: 'https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/',
    image: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&q=82',
    tags: ['Google', 'Gemini', 'Research Tools'],
  },
  {
    id: 'gemini-chrome-uk',
    title: 'Gemini in Chrome expands to desktop users in the UK',
    excerpt: 'Google is rolling out cross-tab assistance and connected-app actions, with iOS availability scheduled to follow.',
    summary: 'Google is expanding Gemini in Chrome to UK desktop users. The assistant can summarize pages, compare information across tabs, and connect with services such as Calendar, Maps, Gmail, and YouTube. Google says sensitive actions require confirmation and that the system includes prompt-injection safeguards.',
    category: 'Product',
    publishedAt: '2026-07-14',
    source: 'Google',
    sourceUrl: 'https://blog.google/products-and-platforms/products/chrome/were-expanding-gemini-in-chrome-to-users-in-the-uk/',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=82',
    tags: ['Chrome', 'Gemini', 'Browser'],
  },
  {
    id: 'anthropic-canadian-ai-research',
    title: 'Anthropic commits $10 million to Canadian AI research',
    excerpt: 'The funding commitment is aimed at expanding Canadian research capacity and supporting work around advanced AI systems.',
    summary: 'Anthropic announced a $10 million commitment to Canadian AI research. The investment adds to a broader contest among model developers to support research ecosystems, recruit technical talent, and build long-term relationships with governments and academic institutions.',
    category: 'Research',
    publishedAt: '2026-07-14',
    source: 'Anthropic',
    sourceUrl: 'https://www.anthropic.com/news',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=82',
    tags: ['Anthropic', 'Canada', 'Funding'],
  },
]

const categories = ['All', 'Saved', ...new Set(newsArticles.map(article => article.category))]
const updatedAt = 'August 12, 2026'

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

      <main>
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
      </main>

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
