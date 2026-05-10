import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './OmnaiDetail.css'

const screenshots = [
  { src: '/products/omnai/B1.png', caption: 'New Tab — AI Tool Marketplace' },
  { src: '/products/omnai/B2.png', caption: 'Browsing with AI Sidebar' },
  { src: '/products/omnai/B3.png', caption: 'AI Orchestrator Pipeline' },
  { src: '/products/omnai/B4.png', caption: 'Privacy Intelligence Dashboard' },
  { src: '/products/omnai/B5.png', caption: 'Developer Tools AI Layer' },
]

const coreFeatures = [
  {
    title: 'AI Task Orchestration',
    desc: 'Describe a task in plain language and Omnai chains multiple AI tools together to complete it. Save, share, and re-run named pipelines. Run steps in parallel. If one tool fails, Omnai auto-suggests an alternative and shows estimated API costs before execution.',
    highlight: true,
    tag: 'Core Differentiator'
  },
  {
    title: 'Persistent Contextual Memory',
    desc: 'Researching a topic across 3 tabs? Omnai summarizes all of them together. It remembers what you worked on yesterday and resumes context. Smart Tab Groups auto-organize your workspace with a Memory Dashboard for full transparency.',
    tag: 'AI Memory'
  },
  {
    title: 'AI-Enhanced Reading Mode',
    desc: 'Every long article gets a 3-sentence TL;DR. Highlight any statement and instantly see sources that confirm or contradict it. Multi-article synthesis, instant glossary for jargon, one-click citation generator (APA, MLA, Chicago).',
    tag: 'Research'
  },
  {
    title: 'Privacy Intelligence',
    desc: 'Every website gets a real-time privacy score (A–F) based on trackers, cookies, fingerprinting, and data sold. AI-powered phishing detection that analyzes visual design, not just URL blacklists. Cookie Negotiator auto-rejects tracking.',
    tag: 'Security'
  },
  {
    title: 'AI-Native Developer Tools',
    desc: 'AI Console explains any error in plain English with fix suggestions. Network Inspector AI tells you why a request is slow. Accessibility Auditor scans pages for WCAG violations and generates fix code. Performance Copilot auto-profiles Core Web Vitals.',
    tag: 'DevTools'
  },
  {
    title: 'Intelligent Search Bar',
    desc: 'Omnai detects intent — search, navigate, or ask. Type a question and get an AI answer right in the URL bar without loading a search page. Multi-engine search queries Google, Stack Overflow, and AI simultaneously.',
    tag: 'Navigation'
  },
  {
    title: 'Browser Automation',
    desc: 'Record your actions and replay them as automations. Chain automations with AI decisions for intelligent web scraping, form filling, and monitoring. Non-technical users can automate workflows through natural language.',
    tag: 'Automation'
  },
  {
    title: 'Semantic Memory Engine',
    desc: 'Describe what you remember about a page ("that article about sleep and memory") and Omnai finds it. Ask "What was I researching last Tuesday?" and get a real answer. Proactive suggestions surface related resources without being asked.',
    tag: 'Search'
  },
  {
    title: 'Integrated Productivity Layer',
    desc: 'Focus Mode blocks distracting sites when you\'re in a work session. Reading List saves articles with AI summaries. Inline Translator preserves page formatting and context. Built-in note-taking layer with clip, annotate, and organize.',
    tag: 'Productivity'
  },
  {
    title: 'Data Broker Scanner',
    desc: 'Periodically scans the web to find where your email and name appear, and offers one-click opt-out links. AI reviews which sites have camera, mic, and location access and flags suspicious permissions.',
    tag: 'Privacy'
  },
  {
    title: 'Cross-Tab AI Collaboration',
    desc: 'Select multiple tabs and ask "What do all these articles agree on?" or "What are the key disagreements?" Omnai synthesizes information across your open sessions into structured summaries.',
    tag: 'Research'
  },
  {
    title: 'AI Cost Estimator',
    desc: 'Before executing any AI pipeline, Omnai shows the estimated API cost. Track your AI spending across sessions. Set budget limits so you never get a surprise bill from your model provider.',
    tag: 'Cost Control'
  },
]

const techHighlights = [
  { label: 'Architecture', value: 'Electron + Chromium' },
  { label: 'AI Layer', value: 'Isolated service module' },
  { label: 'Tab Engine', value: 'Separate BrowserView per tab' },
  { label: 'Local Storage', value: 'SQLite (better-sqlite3)' },
  { label: 'Extension Support', value: 'Designed from Day 1' },
  { label: 'Security', value: 'contextBridge isolation' },
]

const roadmapPhases = [
  {
    phase: 'Phase 1 — Core Product',
    timeline: 'Now',
    status: 'active',
    items: [
      'AI Tool Marketplace (default new tab)',
      'AI Orchestrator — pipeline builder and executor',
      'AI Chatbot sidebar — injected via preload.js',
      'Basic privacy features — tracker blocking, privacy score',
      'Built-in ad blocker with zero configuration'
    ]
  },
  {
    phase: 'Phase 2 — Power User Features',
    timeline: '3–6 months',
    status: 'upcoming',
    items: [
      'Cross-tab AI memory and session summaries',
      'AI Reading Mode with claim checker and synthesis',
      'Intelligent search bar with intent detection',
      'Developer tools AI layer (error explainer, network AI)',
      'Data Broker Scanner and Permission Auditor'
    ]
  },
  {
    phase: 'Phase 3 — Platform',
    timeline: '6–12 months',
    status: 'future',
    items: [
      'Cloud sync (after 1K+ active users)',
      'Browser automation builder with natural language',
      'Collaborative browsing and shared annotations',
      'Extension API for third-party developers',
      'Mobile companion app'
    ]
  }
]

export default function OmnaiDetail() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="omnai-detail-page">
      <SEO
        title="Omnai Browser — AI-Native Browser"
        description="Omnai is a next-generation AI-powered browser. AI Task Orchestration, Persistent Memory, Privacy Intelligence, and Developer Tools — built from the ground up."
        url="/products/omnai"
      />

      {/* Hero */}
      <section className="omnai-hero" id="omnai-hero">
        <div className="omnai-hero__bg" />
        <div className="container">
          <div className="omnai-hero__layout">
            <div className="omnai-hero__content reveal">
              <div className="omnai-hero__badge">
                <span className="omnai-hero__pulse" />
                In Active Development
              </div>
              <img src="/products/omnai/logo.png" alt="Omnai Logo" className="omnai-hero__logo" />
              <h1>Omnai <span className="gradient-text">Browser</span></h1>
              <p className="omnai-hero__tagline">
                Every major browser — Chrome, Edge, Firefox, Safari — was designed in the pre-AI era. They bolt AI on top of old architectures as an afterthought. Omnai is the first browser where AI is the foundation, not a sidebar.
              </p>
              <p className="omnai-hero__sub-desc">
                Built on Electron and Chromium with an isolated AI service layer, Omnai connects your favorite AI tools into automated pipelines, remembers your research across sessions, and gives you privacy intelligence no other browser offers.
              </p>
              <div className="omnai-hero__actions">
                <Link to="/contact" className="btn btn-glow">Join the Waitlist</Link>
                <a href="#features" className="btn omnai-hero__btn-outline">Explore Features</a>
              </div>
            </div>
            <div className="omnai-hero__visual reveal-right reveal-delay-2">
              <img src="/products/omnai/B1.png" alt="Omnai Browser Interface" className="omnai-hero__preview" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Banner */}
      <section className="omnai-stats-banner">
        <div className="container">
          <div className="omnai-stats-banner__grid">
            <div className="omnai-stats-banner__item reveal-scale reveal-delay-1">
              <strong>3x</strong><span>Faster than Chrome</span>
            </div>
            <div className="omnai-stats-banner__item reveal-scale reveal-delay-2">
              <strong>98%</strong><span>Ads Blocked</span>
            </div>
            <div className="omnai-stats-banner__item reveal-scale reveal-delay-3">
              <strong>0</strong><span>Data Collected</span>
            </div>
            <div className="omnai-stats-banner__item reveal-scale reveal-delay-4">
              <strong>50ms</strong><span>AI Response Time</span>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section className="omnai-gallery section" id="omnai-screenshots">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Preview</span>
            <h2>See Omnai in action</h2>
            <p>Real screenshots from the development build — not mockups, not concepts.</p>
          </div>
          <div className="omnai-gallery__grid">
            {screenshots.map((shot, i) => (
              <div key={i} className={`omnai-gallery__item reveal reveal-delay-${(i % 4) + 1}`}>
                <img src={shot.src} alt={shot.caption} loading="lazy" />
                <p className="omnai-gallery__caption">{shot.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="omnai-opportunity section" id="opportunity">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">The Opportunity</span>
            <h2>Why the world needs a <span className="gradient-text">new browser</span></h2>
          </div>
          <div className="omnai-opportunity__inner">
            <div className="omnai-opportunity__text reveal-left">
              <p>The browser is the most-used app on every device in the world. But it has seen almost zero fundamental innovation in 15 years. Chrome added a chatbot. Edge got a sidebar. That's not innovation — that's decoration.</p>
              <p>A 2024 survey by Andreessen Horowitz found that the #1 friction point for AI power users is switching between 5–10 different AI tools to complete a single project. No browser connects them. Until now.</p>
            </div>
            <div className="omnai-opportunity__stats reveal-right reveal-delay-2">
              <div className="omnai-opportunity__stat">
                <strong>5–10</strong>
                <span>AI tools the average power user juggles daily</span>
              </div>
              <div className="omnai-opportunity__stat">
                <strong>#1</strong>
                <span>Pain point: switching between disconnected AI tools</span>
              </div>
              <div className="omnai-opportunity__stat">
                <strong>0</strong>
                <span>Browsers that chain AI tools into automated pipelines</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="omnai-features section bg-off-white" id="features">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Capabilities</span>
            <h2>Features no browser has</h2>
            <p>Real pain points sourced from user research, developer forums, and AI productivity gaps. These aren't moonshots — they're gaps every user feels every day.</p>
          </div>
          <div className="omnai-features__grid">
            {coreFeatures.map((feat, i) => (
              <div key={i} className={`omnai-features__card ${feat.highlight ? 'omnai-features__card--highlight' : ''} reveal reveal-delay-${(i % 4) + 1}`}>
                <span className="omnai-features__tag">{feat.tag}</span>
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="omnai-tech section" id="architecture">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Under the Hood</span>
            <h2>Built for performance and security</h2>
            <p>Every architectural decision is made with speed, privacy, and extensibility in mind.</p>
          </div>
          <div className="omnai-tech__grid">
            {techHighlights.map((item, i) => (
              <div key={i} className={`omnai-tech__card reveal-scale reveal-delay-${(i % 4) + 1}`}>
                <span className="omnai-tech__label">{item.label}</span>
                <strong className="omnai-tech__value">{item.value}</strong>
              </div>
            ))}
          </div>
          <div className="omnai-tech__principles reveal reveal-delay-2">
            <div className="omnai-tech__principle">
              <h4>Local-First Storage</h4>
              <p>Zero latency. No network round trips. Your data stays on your machine. Privacy by default, not by policy. Everything works offline.</p>
            </div>
            <div className="omnai-tech__principle">
              <h4>Lazy-Loaded AI</h4>
              <p>AI services initialize only when first used, not on browser launch. Responses are cached aggressively. Background tasks throttle to idle CPU only.</p>
            </div>
            <div className="omnai-tech__principle">
              <h4>Cloud-Ready Architecture</h4>
              <p>Abstracted data layer designed so cloud sync is a 2-week migration, not a 6-month rewrite. When the time comes, Supabase + Cloudflare R2 is the stack.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="omnai-roadmap section bg-off-white" id="roadmap">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Roadmap</span>
            <h2>The path to launch</h2>
            <p>A pragmatic build order that maximizes learning while shipping real value.</p>
          </div>
          <div className="omnai-roadmap__timeline">
            {roadmapPhases.map((phase, i) => (
              <div key={i} className={`omnai-roadmap__phase omnai-roadmap__phase--${phase.status} reveal reveal-delay-${i + 1}`}>
                <div className="omnai-roadmap__phase-header">
                  <h3>{phase.phase}</h3>
                  <span className="omnai-roadmap__timeline-badge">{phase.timeline}</span>
                </div>
                <ul>
                  {phase.items.map((item, j) => (
                    <li key={j}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="omnai-cta" id="omnai-cta">
        <div className="container text-center">
          <img src="/products/omnai/logo.png" alt="" className="omnai-cta__logo reveal-scale" />
          <h2 className="reveal reveal-delay-1">The browser hasn't fundamentally changed in <span className="gradient-text">15 years.</span></h2>
          <p className="reveal reveal-delay-2">Omnai has a real chance to change that — not by adding more buttons, but by making the browser genuinely intelligent. The features on this page are not moonshots. They are gaps that every user feels every day.</p>
          <div className="reveal reveal-delay-3">
            <Link to="/contact" className="btn btn-glow">Join the Waitlist</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
