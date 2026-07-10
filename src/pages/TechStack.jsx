import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './TechStack.css'

// Premium curated tech stack dataset
const TECH_DATA = [
  // --- FRONTEND ---
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    role: 'Core Library',
    level: 5,
    exp: '5+ Years',
    projects: ['Omnai', 'Eunoia', 'Terra Sol'],
    desc: 'Our primary building block for creating interactive, state-driven user interfaces. Highly optimized using concurrent features, custom hooks, and memoized selector patterns.',
    percent: 98,
    icon: '⚛️'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    role: 'React Framework',
    level: 5,
    exp: '4+ Years',
    projects: ['Nexus Health', 'Hanova Hub'],
    desc: 'The framework of choice for production-grade React apps, leveraging App Router, Server Components, and edge routing for blistering loading speeds.',
    percent: 95,
    icon: '🌐'
  },
  {
    id: 'vite',
    name: 'Vite',
    category: 'frontend',
    role: 'Build Tooling',
    level: 5,
    exp: '3+ Years',
    projects: ['All Projects'],
    desc: 'Next-generation front-end tool that provides an extremely fast dev environment and optimal production bundle sizes using Rollup treeshaking.',
    percent: 97,
    icon: '⚡'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    role: 'Utility Styling',
    level: 5,
    exp: '4+ Years',
    projects: ['Eunoia', 'Terra Sol'],
    desc: 'Utility-first CSS framework used to build beautiful, responsive custom interfaces rapidly with zero runtime bloat and custom design tokens.',
    percent: 96,
    icon: '🎨'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    role: 'Type Safety',
    level: 5,
    exp: '4+ Years',
    projects: ['Omnai', 'Nexus Health'],
    desc: 'Provides static typing and robust developer experience for our large scale, mission-critical application codebases, preventing runtime bugs.',
    percent: 92,
    icon: '📘'
  },
  {
    id: 'threejs',
    name: 'Three.js',
    category: 'frontend',
    role: '3D Graphics',
    level: 4,
    exp: '2+ Years',
    projects: ['Omnai', '3D Hero'],
    desc: 'Web-based 3D graphics engine used to build immersive, interactive WebGL landscapes and custom math-based particle effects.',
    percent: 80,
    icon: '📐'
  },

  // --- BACKEND ---
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    role: 'Runtime Environment',
    level: 5,
    exp: '5+ Years',
    projects: ['Nexus Health', 'Omnai API'],
    desc: 'V8-powered asynchronous JavaScript runtime for high-throughput API endpoints, microservices, and server-side logic scaling.',
    percent: 95,
    icon: '🟢'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    role: 'Automation & Data',
    level: 5,
    exp: '5+ Years',
    projects: ['Quantum Lab', 'Scraper Bots'],
    desc: 'The backbone of our machine learning workflows, automation scripts, and high-performance background worker queues.',
    percent: 90,
    icon: '🐍'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    role: 'Relational DB',
    level: 5,
    exp: '5+ Years',
    projects: ['All Core Databases'],
    desc: 'Enterprise-grade relational database optimized with complex query indexing, stored procedures, and full-text search.',
    percent: 94,
    icon: '🐘'
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'backend',
    role: 'In-Memory Storage',
    level: 4,
    exp: '4+ Years',
    projects: ['Session Cache', 'Websocket Hub'],
    desc: 'Ultra-fast key-value store utilized for database query caching, real-time message queuing, and user session management.',
    percent: 88,
    icon: '🔴'
  },
  {
    id: 'rust',
    name: 'Rust',
    category: 'backend',
    role: 'Systems & Performance',
    level: 4,
    exp: '2+ Years',
    projects: ['Omnai Core'],
    desc: 'High-performance systems language deployed for memory-safe utilities, WASM compilation, and CPU-heavy operations.',
    percent: 82,
    icon: '🦀'
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'backend',
    role: 'API Architecture',
    level: 4,
    exp: '3+ Years',
    projects: ['Nexus Health'],
    desc: 'Flexible query language for APIs that empowers clients to request exactly the data they need, reducing network payload sizes.',
    percent: 85,
    icon: '⬢'
  },

  // --- CLOUD & DEVOPS ---
  {
    id: 'aws',
    name: 'AWS',
    category: 'cloud',
    role: 'Cloud Platform',
    level: 5,
    exp: '5+ Years',
    projects: ['All Enterprise Projects'],
    desc: 'Amazon Web Services infrastructure including EC2, S3, RDS, ECS, Lambda, and IAM for secure, distributed cloud architectures.',
    percent: 91,
    icon: '☁️'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    role: 'Containerization',
    level: 5,
    exp: '4+ Years',
    projects: ['All Microservices'],
    desc: 'Containerization platform to build, ship, and run consistent application environments from local development to production.',
    percent: 93,
    icon: '🐳'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'cloud',
    role: 'Deployment & Edge',
    level: 5,
    exp: '4+ Years',
    projects: ['HanovaDevs', 'Client Portfolios'],
    desc: 'Our primary deployment platform for frontend frameworks, optimizing global content delivery networks and edge function execution.',
    percent: 98,
    icon: '▲'
  },
  {
    id: 'githubactions',
    name: 'GitHub Actions',
    category: 'cloud',
    role: 'CI/CD Orchestration',
    level: 5,
    exp: '4+ Years',
    projects: ['Internal Workflows'],
    desc: 'Automated continuous integration and deployment pipelines validating test suites and building container images.',
    percent: 94,
    icon: '🤖'
  },

  // --- AI & DATA SCIENCE ---
  {
    id: 'openai',
    name: 'OpenAI / Anthropic',
    category: 'ai',
    role: 'LLM Orchestration',
    level: 5,
    exp: '3+ Years',
    projects: ['Omnai AI', 'Hanova Copilot'],
    desc: 'Integration of advanced frontier models (GPT-4, Claude 3.5) into custom business workflows, using tailored prompt schemas and fine-tuning.',
    percent: 96,
    icon: '🧠'
  },
  {
    id: 'langchain',
    name: 'LangChain',
    category: 'ai',
    role: 'AI Agent Framework',
    level: 4,
    exp: '2+ Years',
    projects: ['RAG Engine'],
    desc: 'Stateful agent frameworks orchestrating chains of model prompts, vector storage lookups, and third-party API tool calls.',
    percent: 87,
    icon: '🦜'
  },
  {
    id: 'pinecone',
    name: 'Pinecone',
    category: 'ai',
    role: 'Vector Database',
    level: 4,
    exp: '2+ Years',
    projects: ['Semantic Search'],
    desc: 'High-performance vector database utilized for semantic document search, context retrieval, and long-term agent memory storage.',
    percent: 85,
    icon: '🌲'
  },

  // --- DESIGN & BRAND ---
  {
    id: 'figma',
    name: 'Figma',
    category: 'design',
    role: 'UI/UX Design',
    level: 5,
    exp: '5+ Years',
    projects: ['All Interfaces'],
    desc: 'Collaborative interface design tool used for low-fidelity wireframing, high-fidelity mockups, design library systems, and interactive prototyping.',
    percent: 97,
    icon: '🎨'
  },
  {
    id: 'adobe',
    name: 'Adobe Creative Suite',
    category: 'design',
    role: 'Visual Branding',
    level: 5,
    exp: '5+ Years',
    projects: ['Style Guides'],
    desc: 'Photoshop, Illustrator, and After Effects utilized for vector asset creation, photo manipulation, and custom micro-animations.',
    percent: 92,
    icon: '🖌️'
  },
  {
    id: 'spline',
    name: 'Spline',
    category: 'design',
    role: '3D Design Tool',
    level: 4,
    exp: '2+ Years',
    projects: ['Omnai Hub'],
    desc: 'Real-time collaborative 3D design software used to export rich WebGL scenes directly into React applications with smooth interactions.',
    percent: 84,
    icon: '🌀'
  },

  // --- GROWTH & ANALYTICS ---
  {
    id: 'ga4',
    name: 'Google Analytics 4',
    category: 'marketing',
    role: 'User Tracking',
    level: 5,
    exp: '5+ Years',
    projects: ['All Clients'],
    desc: 'Industry-standard user behavior analysis, tracking custom conversion events, traffic acquisition channels, and user retention metrics.',
    percent: 95,
    icon: '📊'
  },
  {
    id: 'semrush',
    name: 'SEMrush',
    category: 'marketing',
    role: 'Search Marketing',
    level: 5,
    exp: '5+ Years',
    projects: ['SEO Campaigns'],
    desc: 'Enterprise marketing intelligence platform used for competitive analysis, keyword research, backlink profiling, and search share tracking.',
    percent: 93,
    icon: '🔍'
  },
  {
    id: 'gtm',
    name: 'Google Tag Manager',
    category: 'marketing',
    role: 'Tag Orchestration',
    level: 5,
    exp: '4+ Years',
    projects: ['Analytics Setup'],
    desc: 'Dynamic code snippet manager allowing us to deploy and update tracking pixels and scripts without manual application redeployments.',
    percent: 96,
    icon: '🏷️'
  }
]

// Category metadata
const CATEGORIES = [
  { id: 'all', label: 'All Stack', icon: '⚡' },
  { id: 'frontend', label: 'Frontend', icon: '⚛️', cssClass: 'frontend' },
  { id: 'backend', label: 'Backend', icon: '🟢', cssClass: 'backend' },
  { id: 'cloud', label: 'Cloud & DevOps', icon: '☁️', cssClass: 'cloud' },
  { id: 'ai', label: 'AI & Data', icon: '🧠', cssClass: 'ai' },
  { id: 'design', label: 'Design & UX', icon: '🎨', cssClass: 'design' },
  { id: 'marketing', label: 'Growth Marketing', icon: '📊', cssClass: 'marketing' }
]

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [openCards, setOpenCards] = useState({})

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const total = TECH_DATA.length
    const avgExp = Math.round(TECH_DATA.reduce((sum, item) => sum + item.percent, 0) / total)
    const projectsPowered = 100
    const activeYears = 5
    return { total, avgExp, projectsPowered, activeYears }
  }, [])

  // Filter tech stack items
  const filteredData = useMemo(() => {
    return TECH_DATA.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.projects.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  // Count items per category helper
  const getCategoryCount = (catId) => {
    if (catId === 'all') return TECH_DATA.length
    return TECH_DATA.filter(item => item.category === catId).length
  }

  // Card toggle handlers
  const toggleCard = (id) => {
    setOpenCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const expandAll = () => {
    const nextState = {}
    filteredData.forEach(item => {
      nextState[item.id] = true
    })
    setOpenCards(nextState)
  }

  const collapseAll = () => {
    setOpenCards({})
  }

  // Helper to group filtered data by category if activeCategory is 'all'
  const groupedData = useMemo(() => {
    if (activeCategory !== 'all') {
      return { [activeCategory]: filteredData }
    }
    
    // Group by standard order
    const groups = {}
    TECH_DATA.forEach(item => {
      if (filteredData.some(f => f.id === item.id)) {
        if (!groups[item.category]) groups[item.category] = []
        groups[item.category].push(item)
      }
    })
    return groups
  }, [filteredData, activeCategory])

  return (
    <div className="stack-page">
      <SEO 
        title="Our Tech Stack — HanovaDevs"
        description="Explore the interactive developer and marketer arsenal powering HanovaDevs. Browse our frontend, backend, cloud, design, AI, and growth marketing technologies."
        url="/stack"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Tech Stack', item: '/stack' }
        ]}
      />

      {/* Futuristic Orbit Hero */}
      <section className="ts-hero">
        <div className="ts-hero__orbits">
          <div className="ts-orbit ts-orbit--1">
            <div className="ts-orbit__dot" />
          </div>
          <div className="ts-orbit ts-orbit--2">
            <div className="ts-orbit__dot" />
          </div>
          <div className="ts-orbit ts-orbit--3">
            <div className="ts-orbit__dot" />
          </div>
        </div>
        <div className="ts-hero__particles" />

        <div className="container ts-hero__content reveal">
          <span className="ts-label">
            <span className="ts-filter-icon">⚡</span> The Arsenal
          </span>
          <h1>Our Technology <br /><span className="ts-gradient">Digital DNA.</span></h1>
          <p>
            An interactive visualization of the high-performance languages, enterprise frameworks, 
            and precision marketing analytics we deploy to compound your digital growth.
          </p>

          {/* Stats strip */}
          <div className="ts-stats">
            <div className="ts-stat">
              <span className="ts-stat__number">{stats.total}+</span>
              <span className="ts-stat__label">Active Technologies</span>
            </div>
            <div className="ts-stat">
              <span className="ts-stat__number">{stats.avgExp}%</span>
              <span className="ts-stat__label">Average Expertise</span>
            </div>
            <div className="ts-stat">
              <span className="ts-stat__number">{stats.projectsPowered}+</span>
              <span className="ts-stat__label">Projects Powered</span>
            </div>
            <div className="ts-stat">
              <span className="ts-stat__number">{stats.activeYears}+ Years</span>
              <span className="ts-stat__label">Operational Rigor</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Interactive Filters & Search */}
      <section className="ts-filters">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {/* Horizontal pills */}
            <div className="ts-filters__bar" style={{ flexGrow: 1, margin: 0 }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`ts-filter-btn ${activeCategory === cat.id ? 'ts-filter-btn--active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    // Reset single open cards when changing category to avoid clutter
                    setOpenCards({})
                  }}
                >
                  <span className="ts-filter-icon">{cat.icon}</span>
                  {cat.label}
                  <span className="ts-filter-count">{getCategoryCount(cat.id)}</span>
                </button>
              ))}
            </div>

            {/* In-page global controls & Search */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              width: '100%',
              maxWidth: '350px'
            }}>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type="text"
                  placeholder="Search technology, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem 0.5rem 2.2rem',
                    fontSize: '0.75rem',
                    color: '#fff',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '100px',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)'
                    e.target.style.boxShadow = '0 0 12px rgba(99, 102, 241, 0.15)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.3)',
                  pointerEvents: 'none'
                }}>🔍</span>
              </div>
            </div>
          </div>

          {/* Quick global states */}
          {filteredData.length > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.5rem',
              marginTop: '-0.25rem'
            }}>
              <button 
                onClick={expandAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(99, 102, 241, 0.8)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(99, 102, 241, 0.8)'}
              >
                Expand All
              </button>
              <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '0.62rem' }}>|</span>
              <button 
                onClick={collapseAll}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.3)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#fff'}
                onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.3)'}
              >
                Collapse All
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Main Tech Grid Section */}
      <section className="ts-grid-section">
        <div className="container">
          {filteredData.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '6rem 0',
              color: '#64748b'
            }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>📡</span>
              <h4>No matching technologies found</h4>
              <p style={{ fontSize: '0.8rem', maxWidth: '300px', margin: '0.5rem auto 0' }}>
                Try adjusting your search filters or browse other categories.
              </p>
            </div>
          ) : (
            CATEGORIES.filter(cat => cat.id !== 'all' && groupedData[cat.id]).map(cat => {
              const items = groupedData[cat.id]
              return (
                <div key={cat.id} className="ts-category-group reveal">
                  <div className="ts-category-header">
                    <div className="ts-category-icon" style={{
                      background: `var(--ts-accent-bg)`,
                      border: `1px solid var(--ts-accent-border)`,
                      color: `var(--ts-accent)`
                    }}>
                      {cat.icon}
                    </div>
                    <h2>{cat.label}</h2>
                    <span>{items.length} Node{items.length > 1 ? 's' : ''} Active</span>
                  </div>

                  <div className="ts-tech-grid">
                    {items.map(tech => {
                      const isOpen = !!openCards[tech.id]
                      return (
                        <div
                          key={tech.id}
                          className="ts-card"
                          data-category={tech.category}
                          onClick={() => toggleCard(tech.id)}
                        >
                          <div className="ts-card__top">
                            <div className="ts-card__icon">
                              {tech.icon}
                            </div>
                            <div className="ts-card__level" title={`Expertise Level: ${tech.level}/5`}>
                              {[1, 2, 3, 4, 5].map(dot => (
                                <span
                                  key={dot}
                                  className={`ts-card__level-dot ${dot <= tech.level ? 'ts-card__level-dot--filled' : ''}`}
                                />
                              ))}
                            </div>
                          </div>

                          <h3 className="ts-card__name">{tech.name}</h3>
                          <span className="ts-card__role">{tech.role}</span>

                          {/* Expandable detailed drawer */}
                          <div className={`ts-card__detail ${isOpen ? 'ts-card__detail--open' : ''}`}>
                            <div className="ts-card__detail-inner">
                              <p className="ts-card__desc">{tech.desc}</p>
                              
                              <div className="ts-card__meta-row">
                                <span className="ts-card__exp">EXP: {tech.exp}</span>
                                <div className="ts-card__projects">
                                  {tech.projects.slice(0, 2).map((proj, i) => (
                                    <span key={i} className="ts-card__project-tag">
                                      {proj}
                                    </span>
                                  ))}
                                  {tech.projects.length > 2 && (
                                    <span className="ts-card__project-tag" title={tech.projects.slice(2).join(', ')}>
                                      +{tech.projects.length - 2}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="ts-card__bar-wrap">
                                <div className="ts-card__bar-label">
                                  <span>Expertise Quotient</span>
                                  <span>{tech.percent}%</span>
                                </div>
                                <div className="ts-card__bar">
                                  <div 
                                    className="ts-card__bar-fill"
                                    style={{ width: isOpen ? `${tech.percent}%` : '0%' }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </section>

      {/* Brand Engineering Philosophy */}
      <section className="ts-philosophy section">
        <div className="container">
          <blockquote>
            "Clean code is not enough. We build server architectures that load with zero blocking latency, 
            and write custom design systems that feel organic to touch. The stack is simply our brush; 
            the user's compounding growth is our canvas."
          </blockquote>
          <cite>HanovaDevs Engineering Council</cite>
        </div>
      </section>

      {/* Interactive CTA */}
      <section className="ts-cta">
        <div className="container">
          <div className="ts-cta__card reveal">
            <h3>Need a custom stack engineered?</h3>
            <p>
              Whether you need scalable cloud architectures, high-converting React interfaces, or 
              highly-orchestrated AI agent pipelines, we possess the weapons to build it.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', gap: '0.5rem' }}>
              Launch Your Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
