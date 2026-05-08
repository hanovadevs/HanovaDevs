import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ParticleMesh from '../components/ParticleMesh'
import './Home.css'

/* ─── DATA ─── */
const services = [
  'Web Design', 'SEO', 'Digital Marketing', 'Custom Software',
  'Brand Strategy', 'Performance Marketing', 'UI/UX Design',
  'Social Media', 'App Development', 'Data Analytics'
]

const stats = [
  { number: '40+', label: 'Projects Delivered' },
  { number: '98%', label: 'Client Satisfaction' },
  { number: '3+', label: 'Products Launched' },
  { number: '∞', label: 'Global Reach' },
]

const serviceCards = [
  {
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
    title: 'TechVault Dashboard',
    category: 'Web Design',
    metric: '+230% Traffic',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
  },
  {
    title: 'GreenGrow Campaign',
    category: 'Marketing',
    metric: '4.2x ROI',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop'
  },
  {
    title: 'FinEdge Rebrand',
    category: 'Branding',
    metric: '98% Approval',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop'
  },
  {
    title: 'MediCore App',
    category: 'Software',
    metric: '15K Users',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
  },
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
    quote: "HanovaDevs transformed our online presence completely. Traffic grew 230% in the first quarter and conversions followed.",
    author: 'Michael Rivera',
    role: 'CEO, TechVault',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face'
  },
  {
    quote: "The team delivered our rebrand ahead of schedule with incredible attention to detail. Genuinely world-class work.",
    author: 'Lisa Chen',
    role: 'Head of Marketing, FinEdge',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face'
  },
  {
    quote: "We went from zero digital presence to a fully optimized marketing machine. Best investment we ever made.",
    author: 'James Okafor',
    role: 'Founder, GreenGrow',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face'
  },
]

/* ─── COMPONENT ─── */
export default function Home() {
  const [heroRevealed, setHeroRevealed] = useState(false)
  const [logoDrawn, setLogoDrawn] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const projectsScrollRef = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => setLogoDrawn(true), 300)
    const t2 = setTimeout(() => setHeroRevealed(true), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
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
      {/* ===== HERO ===== */}
      <section className={`hero ${heroRevealed ? 'hero--revealed' : ''}`} id="hero">
        <div className="hero__overlay" />
        <ParticleMesh />
        <div className="hero__bg-image" />

        <div className="hero__content container">
          <div className={`hero__logo-reveal ${logoDrawn ? 'drawn' : ''}`}>
            <img
              src="/octopus.png"
              alt="HanovaDevs octopus logo"
              className="hero__octopus-img"
            />
          </div>

          <h1 className="hero__headline">
            <span className="hero__headline-word">Engineering</span>{' '}
            <span className="hero__headline-word">the</span>{' '}
            <span className="hero__headline-word hero__headline-word--accent">Future.</span>
          </h1>
          <p className="hero__subheadline">
            We design, develop, and market digital products that drive measurable growth for ambitious businesses worldwide.
          </p>
          <div className="hero__cta-row">
            <Link to="/contact" className="btn btn-primary btn--hero">
              Start a Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link to="/projects" className="btn btn-ghost btn--hero">
              View Our Work
            </Link>
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

        <div className="hero__scroll-hint">
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee-strip" id="services-marquee">
        <div className="marquee-track">
          {[...services, ...services, ...services].map((s, i) => (
            <span key={i} className="marquee-item">
              {s} <span className="marquee-dot">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== STATS BANNER ===== */}
      <section className="stats-strip" id="stats">
        <div className="container">
          <div className="stats__grid">
            {stats.map((stat, i) => (
              <div key={i} className={`stats__item reveal reveal-delay-${i + 1}`}>
                <span className="stats__number">{stat.number}</span>
                <span className="stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT TEASER ===== */}
      <section className="about-teaser section" id="about-teaser">
        <div className="container">
          <div className="about-teaser__inner">
            <div className="about-teaser__visual reveal">
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
            <div className="about-teaser__content reveal reveal-delay-2">
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--royal-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="services-teaser__link">
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            ))}
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
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container" style={{ marginTop: 'var(--space-lg)', textAlign: 'center' }}>
          <Link to="/projects" className="btn btn-ghost reveal">
            View All Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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
              <svg className="testimonials__quote-icon" width="40" height="40" viewBox="0 0 24 24" fill="rgba(var(--royal-blue-rgb), 0.1)"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.689 11 13.186 11 15c0 1.933-1.567 3.5-3.5 3.5-1.248 0-2.349-.63-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.689 21 13.186 21 15c0 1.933-1.567 3.5-3.5 3.5-1.248 0-2.349-.63-2.917-1.179z"/></svg>
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

      {/* ===== PRODUCTS TEASER ===== */}
      <section className="products-teaser section bg-off-white" id="products-teaser">
        <div className="container">
          <div className="products-teaser__inner">
            <div className="products-teaser__text reveal">
              <span className="section-label">Our Products</span>
              <h2>We don't just build for clients. <span className="gradient-text">We build for the world.</span></h2>
              <p>Beyond agency work, we're creating our own tools — products we wish existed, designed to push the boundaries of what's possible.</p>
            </div>
            <div className="products-teaser__cards">
              <div className="products-teaser__card card card-glass reveal reveal-delay-1">
                <div className="products-teaser__badge products-teaser__badge--dev">
                  <span className="products-teaser__pulse" /> In Development
                </div>
                <h3>Omnai Browser</h3>
                <p>A next-generation AI-powered browser built for the modern web. Smart tabs, native AI chat, and blazing-fast performance.</p>
                <Link to="/products" className="btn btn-ghost" style={{marginTop: 'auto'}}>Learn More</Link>
              </div>
              <div className="products-teaser__card card card-glass reveal reveal-delay-2">
                <div className="products-teaser__badge products-teaser__badge--launch">
                  <span className="products-teaser__pulse products-teaser__pulse--green" /> Ready to Launch
                </div>
                <h3>Eunoia</h3>
                <p>Your personal AI desktop assistant — think, organize, and execute at peak performance with beautiful design.</p>
                <Link to="/products" className="btn btn-primary" style={{marginTop: 'auto'}}>Join Waitlist</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta" id="final-cta">
        <div className="final-cta__bg" />
        <div className="container text-center">
          <img src="/octopus.png" alt="" className="final-cta__icon reveal" />
          <h2 className="final-cta__headline reveal reveal-delay-1">Ready to go digital?</h2>
          <p className="final-cta__sub reveal reveal-delay-2">
            Let's turn your vision into a digital reality. No jargon, just results.
          </p>
          <div className="final-cta__actions reveal reveal-delay-3">
            <Link to="/contact" className="btn btn-glow final-cta__btn">
              Let's Talk
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <a href="mailto:hello@hanovadevs.com" className="final-cta__email">
              or email us at <strong>hello@hanovadevs.com</strong>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
