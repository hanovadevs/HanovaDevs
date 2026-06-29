import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { journalPosts } from './Journal'
import { researchArticles } from './Research'
import './Home.css'

/* ─── DATA ─── */
const stats = [
  {
    number: '40+',
    label: 'Projects Delivered',
    desc: 'Custom solutions deployed globally.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
  },
  {
    number: '98%',
    label: 'Client Satisfaction',
    desc: 'Long-term partnerships built on trust.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" /></svg>
  },
  {
    number: '3+',
    label: 'Products Launched',
    desc: 'In-house innovations scaling fast.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  },
  {
    number: '∞',
    label: 'Global Reach',
    desc: 'Impacting businesses worldwide.',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
  },
]

const serviceCards = [
  {
    id: 'web-design',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" /><path d="M12 17v4" />
        <path d="M7 10l3 3 7-7" stroke="var(--royal-blue)" strokeWidth="2" />
      </svg>
    ),
    title: 'Web Design & Dev',
    desc: 'Lightning-fast, responsive, and beautiful websites built with modern frameworks and pixel-perfect attention to detail.',
    features: ['React / Next.js', 'Responsive Design', 'CMS Integration']
  },
  {
    id: 'digital-advertising',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: 'Digital Marketing',
    desc: 'Data-driven campaigns across Google Ads, Meta, and LinkedIn that convert traffic into loyal customers.',
    features: ['Google Ads', 'Social Media', 'Content Strategy']
  },
  {
    id: 'seo',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M11 8v6" /><path d="M8 11h6" />
      </svg>
    ),
    title: 'SEO & Analytics',
    desc: 'Rank higher with precision SEO, keyword research, and deep analytics dashboards that reveal growth opportunities.',
    features: ['Technical SEO', 'Keyword Research', 'Reporting']
  },
  {
    id: 'branding',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Brand Identity',
    desc: 'Craft a memorable brand from logo to color palette to voice — everything your business needs to stand out.',
    features: ['Logo Design', 'Style Guides', 'Brand Voice']
  },
]

const projects = [
  {
    title: 'RAQS Official',
    category: 'Luxury E-Commerce',
    metric: 'Elite UX',
    image: '/projects/raqs.png',
    url: 'https://www.raqsofficial.store'
  },
  {
    title: 'EarthSync Essential',
    category: 'E-Commerce & Wellness',
    metric: '+45% Conv.',
    image: '/projects/earthsync.png',
    url: 'https://www.earthsyncessential.com'
  },
  {
    title: 'Terra Sol Grounding',
    category: 'E-Commerce & Wellness',
    metric: '20+ Studies',
    image: '/projects/terrasol.png',
    url: 'https://www.terrasolgrounding.com'
  },
  {
    title: 'Nexus Health',
    category: 'Telemedicine SaaS',
    metric: '99.9% Uptime',
    image: '/projects/nexus.png',
    url: 'https://www.nexushealth.io'
  },
  {
    title: 'Crown Accumulator',
    category: 'Industrial B2B Portfolio',
    metric: '3x B2B Leads',
    image: '/projects/crown.png',
    url: 'https://www.crownaccumulator.com'
  },
  {
    title: 'Lumière Paris',
    category: 'Luxury Fashion',
    metric: '+32% AOV',
    image: '/projects/lumiere.png',
    url: 'https://www.lumiere-paris.fr'
  }
]

const processSteps = [
  {
    num: '01', title: 'Discovery',
    desc: 'We learn your goals, audience, and competitive landscape through in-depth strategic workshops.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    )
  },
  {
    num: '02', title: 'Strategy',
    desc: 'A roadmap is crafted with milestones, KPIs, and a clear timeline to deliver maximum impact.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    )
  },
  {
    num: '03', title: 'Design & Build',
    desc: 'Our designers and engineers work in sprints, sharing progress at every stage for your feedback.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" />
      </svg>
    )
  },
  {
    num: '04', title: 'Launch & Scale',
    desc: 'We deploy, monitor performance, and iterate continuously to help you grow beyond launch day.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    )
  },
]

const testimonials = [
  {
    quote: "Honestly, we were skeptical at first because we've been burned by agencies before. But the HanovaDevs team actually listened to what we needed. They rebuilt our app from scratch and the difference in speed is insane. Highly recommend them.",
    author: 'Michael Rivera',
    role: 'CEO, TechVault',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
  },
  {
    quote: "Working with them was super smooth. They didn't just give us a cookie-cutter site; they took the time to understand our messy backend and integrated everything perfectly. Our sales team loves the new lead flow.",
    author: 'Lisa Chen',
    role: 'Head of Marketing, FinEdge',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face'
  },
  {
    quote: "Man, these guys know their stuff when it comes to SEO and design. We barely had any traffic before, and within a few months of their campaign, our organic leads literally tripled. Really glad we partnered with them.",
    author: 'James Okafor',
    role: 'Founder, GreenGrow',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face'
  },
]

/* ─── COMPONENT ─── */
export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [particles, setParticles] = useState([])
  const projectsScrollRef = useRef(null)

  // Initialize particles
  useEffect(() => {
    const p = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 10
    }))
    setParticles(p)
  }, [])

  // Testimonial auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home-page">
      <SEO
        title="Digital Marketing Agency & Custom Software Studio"
        description="HanovaDevs engineers scalable web applications, executes high-converting digital marketing campaigns, and builds powerful brand identities to drive your business growth."
        url=""
      />
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero__particles">
          {particles.map(p => (
            <div
              key={p.id}
              className="hero__particle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`
              }}
            />
          ))}
        </div>

        {/* Glass crystal background */}
        <div className="hero__glass-bg">
          <img src="/hero-glass-bg.png" alt="" className="hero__glass-img" />
        </div>

        <div className="hero__content container">
          <div className="hero__text-panel">
            <h1 className="hero__headline">
              <span className="hero__headline-line">Engineering</span>
              <span className="hero__headline-line hero__headline-line--accent">the Future.</span>
            </h1>
            <p className="hero__subheadline">
              We design, develop, and market digital products that drive
              measurable growth for ambitious businesses worldwide.
            </p>
            <div className="hero__cta-row">
              <Link to="/contact" className="btn btn-primary btn--hero">
                Start a Project
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
              <Link to="/projects" className="btn btn-outline btn--hero">
                View Our Work
              </Link>
            </div>
          </div>

          {/* Hero social proof strip */}
          <div className="hero__proof">
            <div className="hero__proof-avatars">
              {[
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face',
              ].map((src, i) => (
                <img key={i} src={src} alt="" className="hero__proof-avatar" />
              ))}
            </div>
            <span className="hero__proof-text">
              Trusted by <strong>40+</strong> companies worldwide
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-hint">
          <span className="hero__scroll-label">Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ===== CLIENT LOGOS MARQUEE ===== */}
      <section className="client-marquee" id="client-marquee">
        <div className="container">
          <span className="client-marquee__label">Trusted by ambitious brands</span>
        </div>
        <div className="client-marquee__track">
          <div className="client-marquee__inner">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="client-marquee__set">
                {['EarthSync Essential', 'Terra Sol Grounding', 'Crown Accumulator', 'Nexus Health', 'Lumière Paris', 'AeroSpace Dynamics'].map((name, i) => (
                  <div key={`${setIndex}-${i}`} className="client-marquee__item">
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION STATEMENT ===== */}
      <section className="mission-statement section">
        <div className="container">
          <div className="mission-statement__content reveal-up">
            <span className="section-label">Our Philosophy</span>
            <h2 className="mission-statement__text">
              "We believe that great software is more than just code — it's the <em>invisible bridge</em> between human ambition and digital reality."
            </h2>
            <div className="mission-statement__author">
              <img src="/octopus.png" alt="" width="24" height="24" />
              <span>HanovaDevs Leadership</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section className="stats-section" id="stats">
        <div className="container">
          <div className="stats-section__header reveal">
            <span className="section-label">Our Impact</span>
            <h2>Proven results, <em>measurable growth.</em></h2>
          </div>
          <div className="stats__grid">
            {stats.map((stat, i) => (
              <div key={i} className={`stats__card reveal-scale reveal-delay-${i + 1}`}>
                <div className="stats__icon">{stat.icon}</div>
                <div className="stats__number">{stat.number}</div>
                <div className="stats__content">
                  <h4 className="stats__label">{stat.label}</h4>
                  <p className="stats__desc">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT TEASER ===== */}
      <section className="about-teaser section" id="about-teaser">
        <div className="container">
          <div className="about-teaser__inner">
            <div className="about-teaser__visual reveal-left">
              <div className="about-teaser__img-stack">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop"
                  alt="HanovaDevs team collaboration"
                  className="about-teaser__img about-teaser__img--main"
                  loading="lazy"
                />
                <div className="about-teaser__floating-card">
                  <img src="/octopus.png" alt="" width="32" height="32" />
                  <div>
                    <strong>HanovaDevs</strong>
                    <span>Est. 2022</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-teaser__content reveal-right reveal-delay-2">
              <span className="section-label">Who We Are</span>
              <h2>A studio built on <span className="gradient-text">craft & ambition.</span></h2>
              <p>
                We're a full-service digital agency and software studio. We don't just design websites — we engineer digital ecosystems that compound growth. From two founders to a team of designers, developers, and strategists, our mission remains the same: bridge businesses and the digital world.
              </p>
              <div className="about-teaser__badges">
                <div className="about-teaser__badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                  Results-Driven
                </div>
                <div className="about-teaser__badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                  Agile Process
                </div>
                <div className="about-teaser__badge">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  Remote-First
                </div>
              </div>
              <Link to="/about" className="btn btn-ghost">
                Our Story
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services-teaser section bg-off-white" id="services-teaser">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">What We Do</span>
            <h2>Services built for growth</h2>
            <p>From strategy to execution, we deliver end-to-end digital solutions that move the needle.</p>
          </div>
          <div className="services-teaser__grid">
            {serviceCards.map((card, i) => (
              <div key={i} className={`services-teaser__card card card-glass reveal reveal-delay-${(i % 4) + 1}`}>
                <span className="services-teaser__icon-wrap">{card.icon}</span>
                <h3 className="services-teaser__title">{card.title}</h3>
                <p className="services-teaser__desc">{card.desc}</p>
                <ul className="services-teaser__features">
                  {card.features.map((f, j) => (
                    <li key={j}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={`/services/${card.id}`} className="services-teaser__link hoverable">
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GLOBAL NETWORK ===== */}
      <section className="global-network section">
        <div className="container">
          <div className="global-network__inner">
            <div className="global-network__text reveal-left">
              <span className="section-label">Network</span>
              <h2>Global Reach, <span className="gradient-text">Local Impact.</span></h2>
              <p>Our engineers and strategists operate across 4 continents, providing 24/7 support and localized market expertise.</p>
              <div className="global-network__cities">
                {['New York', 'London', 'Dubai', 'Singapore', 'Lagos', 'Berlin'].map((city, i) => (
                  <span key={i} className="city-tag">{city}</span>
                ))}
              </div>
            </div>
            <div className="global-network__map reveal-right">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80" alt="World Map" className="global-map-img" />
              <div className="map-point map-point--ny" />
              <div className="map-point map-point--london" />
              <div className="map-point map-point--dubai" />
              <div className="map-point map-point--singapore" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR PROCESS ===== */}
      <section className="process section" id="process">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">How We Work</span>
            <h2>Our proven process</h2>
            <p>A structured, transparent approach that keeps you in the loop from day one.</p>
          </div>
          <div className="process__grid">
            {processSteps.map((step, i) => (
              <div key={i} className={`process__step reveal reveal-delay-${i + 1}`}>
                <div className="process__step-header">
                  <span className="process__step-num">{step.num}</span>
                  <span className="process__step-icon">{step.icon}</span>
                </div>
                <h4 className="process__step-title">{step.title}</h4>
                <p>{step.desc}</p>
                {i < processSteps.length - 1 && <div className="process__connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="featured-projects section bg-off-white" id="featured-projects">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Our Work</span>
            <h2>Featured projects</h2>
            <p>Delivering measurable results for ambitious brands.</p>
          </div>
        </div>
        <div className="featured-projects__scroll" ref={projectsScrollRef}>
          <div className="featured-projects__track">
            {projects.map((project, i) => (
              <div key={i} className="featured-projects__card hoverable">
                <div className="featured-projects__img-wrap">
                  <img src={project.image} alt={project.title} loading="lazy" />
                  <div className="featured-projects__overlay">
                    <span className="featured-projects__metric-badge">{project.metric}</span>
                  </div>
                </div>
                <div className="featured-projects__info">
                  <span className="featured-projects__tag">{project.category}</span>
                  <h4>{project.title}</h4>
                  <Link to="/projects" className="featured-projects__link">
                    View Case Study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container" style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
          <Link to="/projects" className="btn btn-ghost reveal">
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </Link>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials section" id="testimonials">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Testimonials</span>
            <h2>What our clients say</h2>
          </div>
          <div className="testimonials__carousel reveal reveal-delay-1">
            <div className="testimonials__card">
              <svg className="testimonials__quote-icon" width="40" height="40" viewBox="0 0 24 24" fill="rgba(var(--royal-blue-rgb), 0.1)"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.689 11 13.186 11 15c0 1.933-1.567 3.5-3.5 3.5-1.248 0-2.349-.63-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.689 21 13.186 21 15c0 1.933-1.567 3.5-3.5 3.5-1.248 0-2.349-.63-2.917-1.179z" /></svg>
              <blockquote className="testimonials__text">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              <div className="testimonials__author">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].author}
                  className="testimonials__avatar"
                />
                <div>
                  <strong>{testimonials[activeTestimonial].author}</strong>
                  <span>{testimonials[activeTestimonial].role}</span>
                </div>
              </div>
            </div>
            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${i === activeTestimonial ? 'testimonials__dot--active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="industries-section section" id="industries">
        <div className="container">
          <div className="section-header reveal text-center" style={{ margin: '0 auto var(--space-xl)' }}>
            <span className="section-label">Expertise</span>
            <h2>Industries we serve</h2>
          </div>
          <div className="industries__grid">
            {[
              'Healthcare', 'FinTech', 'E-Commerce',
              'SaaS & Tech', 'Real Estate', 'Logistics',
              'Education & EdTech', 'Hospitality', 'Manufacturing',
              'Entertainment', 'Automotive', 'Web3 & Crypto'
            ].map((industry, i) => (
              <div key={i} className={`industries__card reveal-scale reveal-delay-${i % 6}`}>
                <h4>{industry}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS TEASER ===== */}
      <section className="products-teaser section bg-off-white" id="products-teaser">
        <div className="container">
          <div className="products-teaser__inner">
            <div className="products-teaser__text reveal-left">
              <span className="section-label">Our Products</span>
              <h2>We don't just build for clients. <span className="gradient-text">We build for the world.</span></h2>
              <p>Beyond agency work, we're creating our own tools — products we wish existed, designed to push the boundaries of what's possible.</p>
            </div>
            <div className="products-teaser__cards">
              <div className="products-teaser__card card card-glass reveal-right reveal-delay-1">
                <div className="products-teaser__badge products-teaser__badge--dev">
                  <span className="products-teaser__pulse" /> In Development
                </div>
                <h3>Omnai Browser</h3>
                <p>A next-generation AI-powered browser built for the modern web. Smart tabs, native AI chat, and blazing-fast performance.</p>
                <Link to="/products" className="btn btn-ghost" style={{ marginTop: 'auto' }}>Learn More</Link>
              </div>
              <div className="products-teaser__card card card-glass reveal-right reveal-delay-2">
                <div className="products-teaser__badge products-teaser__badge--launch">
                  <span className="products-teaser__pulse products-teaser__pulse--green" /> Ready to Launch
                </div>
                <h3>Eunoia</h3>
                <p>Your personal AI desktop assistant — think, organize, and execute at peak performance with beautiful design.</p>
                <Link to="/products" className="btn btn-primary" style={{ marginTop: 'auto' }}>Join Waitlist</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS SECTION ===== */}
      <section className="home-process section" id="process">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <span className="section-label">Our Philosophy</span>
            <h2>The Engineering <span className="gradient-text">Mindset</span></h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto' }}>
              We follow a rigorous, data-driven methodology to ensure every line of code serves your business objectives.
            </p>
          </div>
          <div className="home-process__grid">
            {[
              { step: '01', title: 'Strategic Discovery', desc: 'We audit your current state and map out a precise roadmap to your goals.' },
              { step: '02', title: 'Iterative Engineering', desc: 'Agile development cycles with continuous feedback and transparency.' },
              { step: '03', title: 'Quality Assurance', desc: 'Rigorous stress testing for performance, security, and accessibility.' },
              { step: '04', title: 'Global Scale', desc: 'Deployment on high-availability cloud infrastructure for worldwide reach.' }
            ].map((p, i) => (
              <div key={i} className={`home-process__card reveal-up reveal-delay-${i}`}>
                <div className="home-process__step">{p.step}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECH STACK SECTION ===== */}
      <section className="home-tech section bg-white">
        <div className="container">
          <div className="home-tech__inner">
            <div className="home-tech__text reveal-left">
              <span className="section-label">Tech Stack</span>
              <h2>Powered by the <br /><span className="gradient-text">Best in Class</span></h2>
              <p>We use the most robust and modern technologies to build software that is future-proof.</p>
              <div className="home-tech__list">
                {['Next.js', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'TensorFlow', 'Electron', 'TypeScript'].map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            <div className="home-tech__visual reveal-right">
              <div className="tech-grid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                  <div key={i} className="tech-grid__item" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RECENT INSIGHTS SECTION ===== */}
      <section className="home-insights section bg-off-white">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <span className="section-label">The Journal</span>
            <h2>Latest from our <span className="gradient-text">Journal</span></h2>
          </div>
          <div className="home-insights__grid">
            {journalPosts.slice(0, 3).map((post, i) => (
              <Link to={`/journal/${post.slug}`} key={i} className={`home-insights__card reveal-up reveal-delay-${i}`}>
                <div className="insights-card__image">
                  <img src={post.image} alt={post.title} />
                  <div className="insights-card__category">{post.category}</div>
                </div>
                <div className="insights-card__content">
                  <span className="insights-card__date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <div className="insights-card__link">Read More <span>→</span></div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center reveal" style={{ marginTop: '3rem' }}>
            <Link to="/journal" className="btn btn-ghost">View All Articles</Link>
          </div>
        </div>
      </section>

      {/* ===== RESEARCH PREVIEW ===== */}
      <section className="home-research section">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <span className="section-label">Research Hub</span>
            <h2>Curated <span className="gradient-text">Knowledge</span></h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto' }}>Industry-leading research and technical papers, annotated by our engineering team.</p>
          </div>
          <div className="home-research__grid">
            {researchArticles.slice(0, 3).map((article, i) => (
              <Link to="/research" key={article.id} className={`home-research__card reveal-up reveal-delay-${i}`}>
                <div className="home-research__image">
                  <img src={article.image} alt={article.title} loading="lazy" />
                  <div className="home-research__source">{article.source}</div>
                </div>
                <div className="home-research__content">
                  <span className="home-research__category">{article.category}</span>
                  <h4>{article.title}</h4>
                  <span className="home-research__readtime">{article.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center reveal" style={{ marginTop: '3rem' }}>
            <Link to="/research" className="btn btn-ghost">Explore All Research</Link>
          </div>
        </div>
      </section>

      {/* ===== AWARDS & RECOGNITION ===== */}
      <section className="home-awards section bg-off-white">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
            <span className="section-label">Recognition</span>
            <h2>Built with <span className="gradient-text">Excellence</span></h2>
          </div>
          <div className="home-awards__grid reveal-up">
            {[
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                    <path d="M12 2a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" />
                  </svg>
                ), 
                title: 'Top Web Agency', 
                sub: '2025 Digital Awards' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ), 
                title: '99.9% Uptime', 
                sub: 'Infrastructure SLA' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ), 
                title: 'SOC 2 Practices', 
                sub: 'Security Compliant' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                ), 
                title: 'Global Delivery', 
                sub: '4 Continents' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ), 
                title: '5-Star Reviews', 
                sub: 'Client Satisfaction' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                ), 
                title: '40+ Launches', 
                sub: 'Successful Deployments' 
              }
            ].map((award, i) => (
              <div key={i} className="home-awards__card">
                <span className="home-awards__icon">{award.icon}</span>
                <strong>{award.title}</strong>
                <span>{award.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE CALCULATOR PROMO ===== */}
      <section className="calc-promo-section section bg-off-white">
        <div className="container">
          <div className="calc-promo-grid">
            <div className="calc-promo-content reveal">
              <span className="section-label">Interactive Tool</span>
              <h2>Project Your <span className="gradient-text">ROI & Budgets</span> Instantly</h2>
              <p>
                Configure project scopes, page counts, or marketing ad spends in real-time. 
                Our interactive engine computes custom budget ranges and potential revenue lifts 
                backed by our performance benchmarks.
              </p>
              <Link to="/calculator" className="btn btn-primary" style={{ display: 'inline-flex', gap: '0.5rem', textDecoration: 'none' }}>
                Launch Calculator & Estimator
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
            
            <div className="calc-promo-preview reveal reveal-right reveal-delay-1">
              <div className="calc-preview-card">
                <div className="calc-preview-header">
                  <span className="calc-preview-title">Budget Projector</span>
                  <span className="calc-preview-badge">Interactive</span>
                </div>
                <div className="calc-preview-body">
                  <div className="calc-preview-row">
                    <span className="calc-preview-label">Project Complexity</span>
                    <div className="calc-preview-slider-track">
                      <div className="calc-preview-slider-fill" style={{ width: '75%' }}></div>
                      <div className="calc-preview-slider-thumb" style={{ left: '75%' }}></div>
                    </div>
                  </div>
                  <div className="calc-preview-results">
                    <span className="calc-preview-result-val">$1,800 – $4,200</span>
                    <span className="calc-preview-result-lbl">Estimated Investment</span>
                  </div>
                  <Link to="/calculator" className="calc-preview-btn">
                    Run Scopes 🚀
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta" id="final-cta">
        <div className="final-cta__bg" />
        <div className="container text-center">
          <img src="/octopus.png" alt="" className="final-cta__icon reveal-scale" />
          <h2 className="final-cta__headline reveal reveal-delay-1">Ready to go digital?</h2>
          <p className="final-cta__sub reveal reveal-delay-2">
            Let's turn your vision into a digital reality. No jargon, just results.
          </p>
          <div className="final-cta__actions reveal reveal-delay-3">
            <Link to="/contact" className="btn btn-glow final-cta__btn">
              Let's Talk
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
            <div className="final-cta__contact-info">
              <a href="mailto:hanovadevs@gmail.com" className="final-cta__email">
                <strong>hanovadevs@gmail.com</strong>
              </a>
              <span className="divider">|</span>
              <a href="tel:+19177355385" className="final-cta__email">
                <strong>+1 (917) 735-5385</strong>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
