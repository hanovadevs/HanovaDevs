import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './EunoiaDetail.css'

const featureCategories = [
  {
    id: 'planner',
    label: 'Smart Planner',
    icon: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>),
    features: [
      { title: 'Unified Dashboard', desc: 'A personalized daily home screen with your tasks, focus progress, and recent reflections surfaced dynamically.' },
      { title: 'Status Workflow', desc: 'Track tasks through todo, in-progress, done, and skipped states. Subtasks help break down complex work.' },
      { title: 'Habits & Tracking', desc: 'Daily habits bar with quick completion toggles. Build consistent routines with weekly visual progress.' },
    ]
  },
  {
    id: 'notes',
    label: 'Notes & Diary',
    icon: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>),
    features: [
      { title: 'Rich Note Engine', desc: 'Create, tag, and filter rich-text notes. Pinned notes stay prioritized for quick access.' },
      { title: 'Private Journal', desc: 'A PIN-protected diary for personal reflection with mood tracking and depth stats.' },
      { title: 'Aesthetic Switching', desc: 'Specific typography and font switching for your diary to set a mindful, calm mood.' },
    ]
  },
  {
    id: 'focus',
    label: 'Focus & Alarms',
    icon: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
    features: [
      { title: 'Pomodoro Engine', desc: 'Integrated focus, short break, and long break timers to optimize your cognitive stamina.' },
      { title: 'Ambient Soundscapes', desc: 'Built-in lo-fi, rain, brown noise, and forest soundscapes to mask distractions.' },
      { title: 'Smart Alarms', desc: 'Wake up with Math or Text challenges to ensure you are truly awake. Import custom local tones.' },
    ]
  },
  {
    id: 'ai',
    label: 'AI Assistant',
    icon: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 7.1"/><path d="M12 12l9.9 4.9"/></svg>),
    features: [
      { title: 'Conversational UI', desc: 'Built-in AI assistant. Tell Eunoia to "add a task for tomorrow" and watch it happen instantly.' },
      { title: 'Voice & Offline Transcripts', desc: 'Speak to your assistant via microphone, transcribed completely offline using Transformer models.' },
      { title: 'Proactive Prompts', desc: 'Eunoia learns your patterns and proactively suggests focusing or journaling based on the time of day.' },
    ]
  },
]

const comparisonData = [
  { feature: 'Local-First Storage', eunoia: true, notion: false, obsidian: true },
  { feature: 'Built-in AI Actions', eunoia: true, notion: true, obsidian: false },
  { feature: 'Focus & Soundscapes', eunoia: true, notion: false, obsidian: false },
  { feature: 'Private Diary + PIN', eunoia: true, notion: false, obsidian: false },
  { feature: 'Offline Voice Input', eunoia: true, notion: false, obsidian: false },
  { feature: 'Local File Vault', eunoia: true, notion: false, obsidian: true },
]

const techCards = [
  { label: 'Framework', value: 'Electron', icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>) },
  { label: 'Data', value: 'SQLite + JSON', icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>) },
  { label: 'AI Models', value: 'Transformers.js', icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>) },
  { label: 'UI', value: 'Vanilla JS', icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>) },
]

const screenshots = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9']

const eunoiaReviews = [
  { id: 1, author: "Marcus B.", role: "Creative Director", avatar: "M", rating: 5, date: "3 days ago", text: "Eunoia is exactly what I needed to cut out the noise. The lo-fi soundscapes combined with the Pomodoro timer get me into a flow state instantly. Plus, knowing my journal is completely local gives me peace of mind." },
  { id: 2, author: "Jenny L.", role: "PhD Student", avatar: "J", rating: 5, date: "5 days ago", text: "The offline voice transcripts are flawless. I just ramble my thoughts, and the AI categorizes them into my tasks and notes. It feels like having an actual assistant sitting next to me without the privacy concerns of the cloud." },
  { id: 3, author: "Tom W.", role: "Freelancer", avatar: "T", rating: 5, date: "1 week ago", text: "I've replaced Notion, Obsidian, and Todoist with this single app. The aesthetic is beautiful, it never lags, and the local file vault keeps my client contracts organized perfectly." }
]

// --- Stat Counter Component ---
function AnimatedCounter({ value, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect()
        const duration = 1500
        const start = performance.now()
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.round(eased * value))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function EunoiaDetail() {
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const [activeCategory, setActiveCategory] = useState(featureCategories[0].id)
  const [expandedFeature, setExpandedFeature] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreenshot(prev => (prev + 1) % screenshots.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  const activeCat = featureCategories.find(c => c.id === activeCategory)

  return (
    <div className="eunoia-detail-page">
      <SEO
        title="Eunoia — AI Productivity Companion"
        description="Eunoia is a local-first desktop productivity companion. Planning, notes, journaling, focus sessions, and AI built for your everyday life."
        url="/products/eunoia"
      />

      {/* ===== HERO ===== */}
      <section className="ed-hero" id="eunoia-hero">
        <div className="ed-hero__grid-bg" />
        <div className="ed-hero__glow ed-hero__glow--1" />
        <div className="ed-hero__glow ed-hero__glow--2" />
        <div className="container">
          <div className="ed-hero__layout">
            <div className="ed-hero__text reveal">
              <div className="ed-hero__badge">
                <span className="ed-hero__pulse" />
                V1.0 Released
              </div>
              <img src="/products/eunoia/logo.png" alt="Eunoia Logo" className="ed-hero__logo" />
              <h1>Your mind, <span className="ed-gradient">beautifully</span> organized.</h1>
              <p className="ed-hero__tagline">
                A calm, local-first desktop companion combining planning, journaling, focus sessions, and a proactive AI assistant.
              </p>
              <p className="ed-hero__sub">
                Windows &middot; macOS &middot; Linux &middot; Local Data Only
              </p>
              <div className="ed-hero__actions">
                <a href="#download" className="btn btn-primary">Download Eunoia</a>
                <a href="#features" className="ed-hero__link">
                  Explore features <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                </a>
              </div>
            </div>

            <div className="ed-hero__visual reveal">
              <div className="ed-hero__frame">
                <div className="ed-hero__toolbar">
                  <div className="ed-hero__dots"><span /><span /><span /></div>
                  <div className="ed-hero__title">Eunoia - Daily Planner</div>
                </div>
                <img src="/products/eunoia/E1.png" alt="Eunoia Overview" className="ed-hero__img" />
              </div>
              <div className="ed-hero__float-card ed-hero__float-card--1">
                <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span> Local Vault Secured
              </div>
              <div className="ed-hero__float-card ed-hero__float-card--2">
                <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 7.1"/><path d="M12 12l9.9 4.9"/></svg></span> AI Ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY VIEWER ===== */}
      <section className="section bg-light" id="features">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Interface</span>
            <h2>A Calming Digital Space</h2>
            <p>Eunoia is designed to reduce anxiety and promote deep focus. Take a look inside.</p>
          </div>

          <div className="ed-gallery__viewer reveal">
            <div className="ed-gallery__main-frame">
              <img 
                key={activeScreenshot}
                src={`/products/eunoia/${screenshots[activeScreenshot]}.png`} 
                alt={`Eunoia interface ${activeScreenshot + 1}`} 
                className="ed-gallery__main-img" 
              />
            </div>
            <div className="ed-gallery__thumbs">
              {screenshots.slice(0, 5).map((img, i) => (
                <button
                  key={img}
                  className={`ed-gallery__thumb ${activeScreenshot === i ? 'ed-gallery__thumb--active' : ''}`}
                  onClick={() => setActiveScreenshot(i)}
                >
                  <img src={`/products/eunoia/${img}.png`} alt={`Thumbnail ${i+1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TABBED FEATURES ===== */}
      <section className="section">
        <div className="container">
          <div className="ed-opportunity__layout">
            <div className="ed-opportunity__text reveal">
              <span className="section-label">Capabilities</span>
              <h2>Everything you need. Nothing you don't.</h2>
              <p>Stop splitting your workflow across 5 different apps. Eunoia brings the essential tools of productivity and mindfulness into a single, cohesive desktop experience.</p>
              
              <div className="ed-features__tabs">
                {featureCategories.map((cat, idx) => (
                  <button
                    key={cat.id}
                    className={`ed-features__tab ${activeCategory === cat.id ? 'ed-features__tab--active' : ''}`}
                    onClick={() => { setActiveCategory(cat.id); setExpandedFeature(0); }}
                  >
                    <span className="ed-features__tab-icon">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="ed-features__panel">
                {activeCat.features.map((feat, idx) => (
                  <div 
                    key={idx} 
                    className={`ed-features__item ${expandedFeature === idx ? 'ed-features__item--expanded' : ''}`}
                    onClick={() => setExpandedFeature(expandedFeature === idx ? -1 : idx)}
                  >
                    <div className="ed-features__item-header">
                      <h4>{feat.title}</h4>
                      <div className="ed-features__item-toggle">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                    <div className="ed-features__item-body">
                      <p>{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal">
              <img src={`/products/eunoia/${screenshots[8]}.png`} alt="Eunoia Insights" style={{width: '100%', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.08)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPARISON & ARCHITECTURE ===== */}
      <section className="ed-comparison section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Why Eunoia?</span>
            <h2>Your data, on your machine.</h2>
            <p>Unlike cloud-first alternatives, Eunoia prioritizes local storage and privacy without sacrificing modern AI capabilities.</p>
          </div>

          <div className="ed-comparison__table-wrap reveal">
            <table className="ed-comparison__table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th className="ed-comparison__th--omnai">Eunoia</th>
                  <th>Notion</th>
                  <th>Obsidian</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td className="ed-comparison__td--omnai">
                      {row.eunoia ? '✓' : '—'}
                    </td>
                    <td>{row.notion ? '✓' : '—'}</td>
                    <td>{row.obsidian ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ed-tech mt-3xl reveal">
            <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Engineered for Desktop</h3>
            <div className="ed-tech__grid">
              {techCards.map((card, i) => (
                <div key={i} className="ed-tech__card">
                  <span className="ed-tech__icon">{card.icon}</span>
                  <span className="ed-tech__label">{card.label}</span>
                  <strong className="ed-tech__value">{card.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="ed-reviews section" id="reviews">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Community Love</span>
            <h2 style={{color: 'var(--white)'}}>What our users say</h2>
            <p style={{color: 'rgba(255,255,255,0.6)'}}>Real stories from people who found their focus.</p>
          </div>
          <div className="ed-reviews__grid">
            {eunoiaReviews.map((review, i) => (
              <div key={review.id} className={`ed-review-card reveal reveal-delay-${i + 1}`}>
                <div className="ed-review-card__header">
                  <div className="ed-review-card__avatar">{review.avatar}</div>
                  <div className="ed-review-card__meta">
                    <h4>{review.author}</h4>
                    <span>{review.role}</span>
                  </div>
                  <div className="ed-review-card__rating">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} width="14" height="14" viewBox="0 0 24 24" fill={idx < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                </div>
                <p className="ed-review-card__text">"{review.text}"</p>
                <div className="ed-review-card__date">{review.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="ed-cta" id="download">
        <div className="ed-cta__bg" />
        <div className="container" style={{ textAlign: 'center' }}>
          <img src="/products/eunoia/logo.png" alt="Eunoia" className="ed-cta__logo" />
          <h2>Ready to clear your mind?</h2>
          <p>Get Eunoia today and take control of your daily routine. Available for Windows, macOS, and Linux.</p>
          <div className="ed-cta__actions">
            <a href="https://drive.google.com/file/d/1Iw_OCgwdYqC1RniTpbyxdIj_ZSMi4X2o/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Download Eunoia</a>
            <Link to="/products" className="ed-cta__back">← Back to Products</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
