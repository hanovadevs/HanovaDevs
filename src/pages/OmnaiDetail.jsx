import { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './OmnaiDetail.css'

/* ─── DATA ─── */
const screenshots = [
  { src: '/products/omnai/B1.png', caption: 'New Tab — AI Tool Marketplace', desc: 'The default new tab experience. Access 50+ AI tools from a single, searchable interface.' },
  { src: '/products/omnai/B2.png', caption: 'Browsing with AI Sidebar', desc: 'Chat with AI about any page you\'re viewing. Summarize, translate, or ask questions in real-time.' },
  { src: '/products/omnai/B3.png', caption: 'AI Orchestrator Pipeline', desc: 'Chain multiple AI tools into automated workflows. Save, share, and re-run your pipelines.' },
  { src: '/products/omnai/B4.png', caption: 'Privacy Intelligence Dashboard', desc: 'Real-time privacy scoring for every website. Track trackers, cookies, and data exposure.' },
  { src: '/products/omnai/B5.png', caption: 'Developer Tools AI Layer', desc: 'AI-powered error explanations, network analysis, and accessibility auditing built right in.' },
]

const featureCategories = [
  {
    id: 'orchestration',
    label: 'AI Orchestration',
    icon: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>),
    features: [
      { title: 'Pipeline Builder', desc: 'Describe a task in plain language and Omnai chains multiple AI tools together to complete it. Save, share, and re-run named pipelines like "My YouTube Workflow".' },
      { title: 'Parallel Execution', desc: 'Run independent steps simultaneously, not just sequentially. Omnai optimizes pipeline execution for maximum speed.' },
      { title: 'Error Recovery', desc: 'If one AI tool fails mid-pipeline, Omnai auto-suggests an alternative and continues execution without losing progress.' },
      { title: 'Cost Estimator', desc: 'Before executing, see the estimated API cost of any pipeline. Set budget limits so you never get a surprise bill.' },
    ]
  },
  {
    id: 'memory',
    label: 'AI Memory',
    icon: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>),
    features: [
      { title: 'Cross-Tab Memory', desc: 'Research a topic across 3 tabs — AI summarizes all of them together on request. No more copy-pasting between windows.' },
      { title: 'Session Memory', desc: 'AI remembers what you were working on yesterday and resumes context. Edge Copilot resets every session — Omnai doesn\'t.' },
      { title: 'Smart Tab Groups', desc: 'AI automatically groups related tabs and names them (e.g., "Competitor Research — July"). Your workspace organizes itself.' },
      { title: 'Semantic Bookmarks', desc: 'Describe what you remember about a page ("that article about sleep and memory") and Omnai finds it instantly.' },
    ]
  },
  {
    id: 'privacy',
    label: 'Privacy & Security',
    icon: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
    features: [
      { title: 'Privacy Score', desc: 'Every website gets a real-time privacy grade (A–F) based on trackers, cookies, fingerprinting, and data sold.' },
      { title: 'Phishing Intelligence', desc: 'Goes beyond URL blacklists — uses AI to analyze page content and visual design to detect sophisticated phishing attacks.' },
      { title: 'Cookie Negotiator', desc: 'Automatically accepts only essential cookies on every site, rejecting marketing/tracking cookies without any user interaction.' },
      { title: 'Data Broker Scanner', desc: 'Periodically scans the web to find where your email/name appears and offers one-click opt-out links.' },
    ]
  },
  {
    id: 'devtools',
    label: 'Developer Tools',
    icon: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>),
    features: [
      { title: 'AI Console', desc: 'Explain any error in plain English with fix suggestions. No more Googling cryptic error messages.' },
      { title: 'Network Inspector AI', desc: 'Explain why a request is slow, what\'s blocking it, and exactly what to fix. Performance debugging in seconds.' },
      { title: 'Accessibility Auditor', desc: 'AI scans any page and lists WCAG violations with ready-to-use fix code. Built in, no extensions needed.' },
      { title: 'Performance Copilot', desc: 'Auto-profiles Core Web Vitals and suggests optimizations specific to the current page\'s code.' },
    ]
  },
  {
    id: 'research',
    label: 'Research & Reading',
    icon: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>),
    features: [
      { title: 'Auto TL;DR', desc: 'Every long article gets a 3-sentence summary floating at the top. Save hours of reading time.' },
      { title: 'Claim Checker', desc: 'Highlight a statement and instantly see sources that confirm or contradict it. Fact-checking in one click.' },
      { title: 'Multi-Article Synthesis', desc: 'Select 3–5 tabs and ask "What do all these articles agree on?" or "What are the key disagreements?"' },
      { title: 'Citation Generator', desc: 'One click to generate a properly formatted citation (APA, MLA, Chicago) for any page you\'re reading.' },
    ]
  },
  {
    id: 'productivity',
    label: 'Productivity',
    icon: (<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>),
    features: [
      { title: 'Focus Mode', desc: 'Block distracting sites with AI that detects when you\'re in a work session. Not a timer — an intelligent work detector.' },
      { title: 'Note-Taking Layer', desc: 'Clip, annotate, and organize content from anywhere on the web. Built-in, not an extension.' },
      { title: 'Browser Automation', desc: 'Record your actions and replay them. Chain automations with AI decisions for intelligent web scraping and monitoring.' },
      { title: 'Inline Translator', desc: 'AI translation that preserves page formatting and context. Far beyond Chrome\'s literal, crude translations.' },
    ]
  },
]

const comparisonData = [
  { feature: 'AI Task Orchestration',   omnai: true,  chrome: false, edge: false, brave: false },
  { feature: 'Cross-Tab AI Memory',     omnai: true,  chrome: false, edge: false, brave: false },
  { feature: 'Privacy Score per Site',   omnai: true,  chrome: false, edge: false, brave: true  },
  { feature: 'AI Dev Tools',            omnai: true,  chrome: false, edge: false, brave: false },
  { feature: 'Built-in Ad Blocker',     omnai: true,  chrome: false, edge: false, brave: true  },
  { feature: 'Pipeline Automation',     omnai: true,  chrome: false, edge: false, brave: false },
  { feature: 'Semantic Bookmarks',      omnai: true,  chrome: false, edge: false, brave: false },
  { feature: 'Claim Checker',           omnai: true,  chrome: false, edge: false, brave: false },
  { feature: 'Cookie Auto-Negotiator',  omnai: true,  chrome: false, edge: false, brave: true  },
  { feature: 'Local-First Storage',     omnai: true,  chrome: false, edge: false, brave: true  },
]

const techCards = [
  { label: 'Core Engine', value: 'Chromium', icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>) },
  { label: 'Framework', value: 'Electron', icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>) },
  { label: 'AI Layer', value: 'Isolated Service', icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="3"/><path d="M12 8v3"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/><path d="M9 18h6"/></svg>) },
  { label: 'Tab Engine', value: 'BrowserView', icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3H3v18h18V3zM21 9H3M9 21V9"/></svg>) },
  { label: 'Local DB', value: 'SQLite', icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>) },
  { label: 'Security', value: 'contextBridge', icon: (<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>) },
]

const roadmapPhases = [
  {
    phase: 'Phase 1', title: 'Core Product', timeline: 'Now', status: 'active',
    items: ['AI Tool Marketplace (default new tab)', 'AI Orchestrator — pipeline builder', 'AI Chatbot sidebar via preload.js', 'Tracker blocking & privacy score', 'Built-in zero-config ad blocker']
  },
  {
    phase: 'Phase 2', title: 'Power User Features', timeline: '3–6 mo', status: 'upcoming',
    items: ['Cross-tab AI memory & sessions', 'AI Reading Mode + claim checker', 'Intelligent search bar', 'Developer tools AI layer', 'Data Broker Scanner']
  },
  {
    phase: 'Phase 3', title: 'Platform', timeline: '6–12 mo', status: 'future',
    items: ['Cloud sync (post 1K users)', 'Browser automation builder', 'Collaborative browsing', 'Extension API for 3rd parties', 'Mobile companion app']
  },
]

const omnaiReviews = [
  { id: 1, author: "Elena R.", role: "Lead Researcher", avatar: "E", rating: 5, date: "2 days ago", text: "The persistent memory feature is a game changer. I used to keep 50 tabs open just to remember contexts. Now, Omnai just knows what I was working on last week. The local AI is shockingly fast." },
  { id: 2, author: "David T.", role: "Software Engineer", avatar: "D", rating: 5, date: "1 week ago", text: "Finally, a browser that doesn't feel like a memory hog. The zero-config ad blocking is aggressive in the best way possible, and having the AI orchestrate my dev workflows right in the sidebar saves me hours." },
  { id: 3, author: "Sarah K.", role: "Product Manager", avatar: "S", rating: 4, date: "2 weeks ago", text: "I've tried Arc, Chrome, Edge... Omnai is the first one that actually feels 'smart'. The interface is stunning. My only wish is for mobile syncing, but for desktop, it's unmatched." }
]

const stats = [
  { value: 3, suffix: 'x', label: 'Faster than Chrome' },
  { value: 98, suffix: '%', label: 'Ads Blocked' },
  { value: 0, suffix: '', label: 'Data Collected' },
  { value: 50, suffix: 'ms', label: 'AI Response' },
]

/* ─── ANIMATED COUNTER ─── */
function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
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

/* ─── COMPONENT ─── */
export default function OmnaiDetail() {
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const [activeCategory, setActiveCategory] = useState('orchestration')
  const [expandedFeature, setExpandedFeature] = useState(null)
  const heroRef = useRef(null)

  // Parallax tilt on hero image
  const handleMouseMove = useCallback((e) => {
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (heroRef.current) heroRef.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)'
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Auto-rotate gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreenshot(prev => (prev + 1) % screenshots.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const activeCat = featureCategories.find(c => c.id === activeCategory)

  return (
    <div className="omnai-detail-page">
      <SEO
        title="Omnai Browser — AI-Native Browser"
        description="Omnai is a next-generation AI-powered browser. AI Task Orchestration, Persistent Memory, Privacy Intelligence, and Developer Tools — built from the ground up."
        url="/products/omnai"
      />

      {/* ===== HERO ===== */}
      <section className="od-hero" id="omnai-hero">
        <div className="od-hero__grid-bg" />
        <div className="od-hero__glow od-hero__glow--1" />
        <div className="od-hero__glow od-hero__glow--2" />
        <div className="container">
          <div className="od-hero__layout">
            <div className="od-hero__text reveal">
              <div className="od-hero__badge">
                <span className="od-hero__pulse" />
                In Active Development
              </div>
              <h1>The browser, <span className="od-gradient">reimagined</span> with AI.</h1>
              <p className="od-hero__tagline">
                Every major browser was built before AI existed. They bolt chatbots onto old architectures as an afterthought. Omnai is different — AI isn't a feature, it's the foundation.
              </p>
              <p className="od-hero__sub">
                Chain AI tools into automated pipelines. Remember your research across sessions. Get real-time privacy intelligence. Debug code with AI-powered dev tools. All in one browser.
              </p>
              <div className="od-hero__actions">
                <Link to="/contact" className="btn btn-glow">Join the Waitlist</Link>
                <a href="#gallery" className="od-hero__link">
                  See it in action
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                </a>
              </div>
            </div>
            <div
              className="od-hero__visual reveal-right reveal-delay-2"
              ref={heroRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="od-hero__frame">
                <div className="od-hero__toolbar">
                  <div className="od-hero__dots"><span /><span /><span /></div>
                  <div className="od-hero__url">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    omnai://newtab
                  </div>
                </div>
                <img src="/products/omnai/B1.png" alt="Omnai Browser" className="od-hero__img" />
              </div>
              <div className="od-hero__float-card od-hero__float-card--1">
                <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="3"/><path d="M12 8v3"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/><path d="M9 18h6"/></svg></span> AI Pipeline Active
              </div>
              <div className="od-hero__float-card od-hero__float-card--2">
                <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span> Privacy: A+
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS COUNTER ===== */}
      <section className="od-stats">
        <div className="container">
          <div className="od-stats__grid">
            {stats.map((s, i) => (
              <div key={i} className="od-stats__item">
                <div className="od-stats__value">
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="od-stats__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE GALLERY ===== */}
      <section className="od-gallery section" id="gallery">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Preview</span>
            <h2>See Omnai in action</h2>
            <p>Real screenshots from active development — not mockups, not concepts.</p>
          </div>
          <div className="od-gallery__viewer reveal">
            <div className="od-gallery__main">
              <div className="od-gallery__main-frame">
                <img
                  src={screenshots[activeScreenshot].src}
                  alt={screenshots[activeScreenshot].caption}
                  key={activeScreenshot}
                  className="od-gallery__main-img"
                />
              </div>
              <div className="od-gallery__info">
                <h3>{screenshots[activeScreenshot].caption}</h3>
                <p>{screenshots[activeScreenshot].desc}</p>
              </div>
            </div>
            <div className="od-gallery__thumbs">
              {screenshots.map((shot, i) => (
                <button
                  key={i}
                  className={`od-gallery__thumb ${i === activeScreenshot ? 'od-gallery__thumb--active' : ''}`}
                  onClick={() => setActiveScreenshot(i)}
                >
                  <img src={shot.src} alt={shot.caption} />
                  <span className="od-gallery__thumb-label">{shot.caption}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== OPPORTUNITY ===== */}
      <section className="od-opportunity section" id="opportunity">
        <div className="container">
          <div className="od-opportunity__layout">
            <div className="od-opportunity__text reveal-left">
              <span className="section-label">The Problem</span>
              <h2>Browsers haven't changed in <span className="od-gradient">15 years.</span></h2>
              <p>Chrome added a chatbot. Edge got a sidebar. That's not innovation — that's decoration. The core browsing experience remains the same isolated, forgetful, dumb window it was in 2010.</p>
              <p>A 2024 survey by Andreessen Horowitz found that the #1 friction point for AI power users is switching between 5–10 different AI tools to complete a single project. People are desperate for something that connects these tools. No browser does this.</p>
            </div>
            <div className="od-opportunity__cards reveal-right reveal-delay-2">
              {[
                { num: '5–10', text: 'AI tools the average power user juggles daily' },
                { num: '#1', text: 'Friction: switching between disconnected AI tools' },
                { num: '0', text: 'Browsers that chain AI tools into pipelines' },
              ].map((card, i) => (
                <div key={i} className="od-opportunity__card">
                  <strong>{card.num}</strong>
                  <span>{card.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TABBED FEATURES ===== */}
      <section className="od-features section" id="features">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Capabilities</span>
            <h2>Features no browser has</h2>
            <p>Real pain points sourced from user research, developer forums, and AI productivity gaps.</p>
          </div>

          <div className="od-features__tabs reveal">
            {featureCategories.map(cat => (
              <button
                key={cat.id}
                className={`od-features__tab ${activeCategory === cat.id ? 'od-features__tab--active' : ''}`}
                onClick={() => { setActiveCategory(cat.id); setExpandedFeature(null) }}
              >
                <span className="od-features__tab-icon">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          <div className="od-features__panel reveal">
            {activeCat && activeCat.features.map((feat, i) => (
              <div
                key={`${activeCategory}-${i}`}
                className={`od-features__item ${expandedFeature === i ? 'od-features__item--expanded' : ''}`}
                onClick={() => setExpandedFeature(expandedFeature === i ? null : i)}
              >
                <div className="od-features__item-header">
                  <h4>{feat.title}</h4>
                  <span className="od-features__item-toggle">{expandedFeature === i ? '−' : '+'}</span>
                </div>
                <div className="od-features__item-body">
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="od-comparison section" id="comparison">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Comparison</span>
            <h2>Omnai vs. everyone else</h2>
          </div>
          <div className="od-comparison__table-wrap reveal">
            <table className="od-comparison__table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="od-comparison__th--omnai">Omnai</th>
                  <th>Chrome</th>
                  <th>Edge</th>
                  <th>Brave</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    <td className="od-comparison__td--omnai">{row.omnai ? '✓' : '—'}</td>
                    <td>{row.chrome ? '✓' : '—'}</td>
                    <td>{row.edge ? '✓' : '—'}</td>
                    <td>{row.brave ? '✓' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== TECH ARCHITECTURE ===== */}
      <section className="od-tech section" id="architecture">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Under the Hood</span>
            <h2>Engineered for speed & security</h2>
          </div>
          <div className="od-tech__grid">
            {techCards.map((card, i) => (
              <div key={i} className={`od-tech__card reveal-scale reveal-delay-${(i % 4) + 1}`}>
                <span className="od-tech__icon">{card.icon}</span>
                <span className="od-tech__label">{card.label}</span>
                <strong className="od-tech__value">{card.value}</strong>
              </div>
            ))}
          </div>
          <div className="od-tech__principles reveal">
            {[
              { title: 'Local-First Storage', desc: 'Zero latency. No network round trips. Your data stays on your machine. Privacy by default. Everything works offline. When you\'re ready for cloud sync, the abstracted data layer makes migration a 2-week job.' },
              { title: 'Lazy-Loaded AI', desc: 'AI services initialize only when first used, not on browser launch. Responses are cached aggressively to save API costs. Background AI tasks only run when CPU is idle.' },
              { title: 'Extension-Ready', desc: 'Even though extensions aren\'t shipping at launch, the architecture supports them from day one. Retrofitting extensions later is extremely painful — we planned ahead.' },
            ].map((p, i) => (
              <div key={i} className="od-tech__principle">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VERTICAL ROADMAP ===== */}
      <section className="od-roadmap section" id="roadmap">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Roadmap</span>
            <h2>The path to launch</h2>
          </div>
          <div className="od-roadmap__timeline">
            <div className="od-roadmap__line" />
            {roadmapPhases.map((phase, i) => (
              <div key={i} className={`od-roadmap__phase od-roadmap__phase--${phase.status} reveal reveal-delay-${i + 1}`}>
                <div className="od-roadmap__dot" />
                <div className="od-roadmap__content">
                  <div className="od-roadmap__header">
                    <span className="od-roadmap__badge">{phase.timeline}</span>
                    <h3>{phase.phase}: {phase.title}</h3>
                  </div>
                  <ul>
                    {phase.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section className="od-reviews section" id="reviews">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Testimonials</span>
            <h2>What early testers are saying</h2>
            <p>Real feedback from our private beta group.</p>
          </div>
          <div className="od-reviews__grid">
            {omnaiReviews.map((review, i) => (
              <div key={review.id} className={`od-review-card reveal reveal-delay-${i + 1}`}>
                <div className="od-review-card__header">
                  <div className="od-review-card__avatar">{review.avatar}</div>
                  <div className="od-review-card__meta">
                    <h4>{review.author}</h4>
                    <span>{review.role}</span>
                  </div>
                  <div className="od-review-card__rating">
                    {[...Array(5)].map((_, idx) => (
                      <svg key={idx} width="14" height="14" viewBox="0 0 24 24" fill={idx < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>
                </div>
                <p className="od-review-card__text">"{review.text}"</p>
                <div className="od-review-card__date">{review.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="od-cta" id="omnai-cta">
        <div className="od-cta__bg" />
        <div className="container text-center">
          <img src="/products/omnai/logo.png" alt="" className="od-cta__logo reveal-scale" />
          <h2 className="reveal reveal-delay-1">Ready to browse <span className="od-gradient">intelligently?</span></h2>
          <p className="reveal reveal-delay-2">The features on this page are not moonshots. They are gaps that every user feels every day. We're building them one at a time.</p>
          <div className="od-cta__actions reveal reveal-delay-3">
            <Link to="/contact" className="btn btn-glow">Join the Waitlist</Link>
            <Link to="/products" className="od-cta__back">← Back to Products</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
