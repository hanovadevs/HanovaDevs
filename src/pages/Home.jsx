import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ProgramSpotlight from '../components/ProgramSpotlight'
import BuildingFeature from '../components/BuildingFeature'
import TrustLegalSection from '../components/TrustLegalSection'
import { journalPosts } from '../data/journal'
import { company, clientProjects } from '../data/company'
import { researchArticles } from '../data/research'
import './Home.css'

/* ─── DATA ─── */
const heroParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 37) % 100,
  top: (i * 61) % 100,
  size: (i % 4) + 1,
  duration: 10 + (i % 10),
  delay: i % 8,
}))

const serviceCards = [
  {
    id: 'ai-automation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 12L2.1 7.1" />
        <path d="M12 12l9.9 4.9" />
        <path d="M12 12V22" stroke="var(--royal-blue)" strokeWidth="2" />
        <path d="M17 5h.01M19 9h.01M14 8h.01" stroke="var(--royal-blue)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'AI Automation',
    desc: 'Intelligent website chatbots, smart calling assistants for booking calls automatically, and custom AI management systems to streamline operations.',
    features: ['AI Voice Agents', 'Website Chatbots', 'AI Management Portals'],
    featured: true
  },
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
    id: 'software-development',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Custom Software',
    desc: 'Scalable backend architectures, SaaS applications, and secure REST/GraphQL API systems built for high throughput.',
    features: ['Node / Python', 'PostgreSQL', 'Cloud Infrastructure']
  },
  {
    id: 'shopify-development',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    title: 'Shopify Development',
    desc: 'High-speed, conversion-engineered Shopify OS 2.0 stores, custom Liquid themes, and subscription checkouts.',
    features: ['Custom Liquid', 'Shopify OS 2.0', 'Klaviyo / Recharge']
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

const projects = clientProjects.map(project => ({ ...project, metric: `For ${project.owner}` }))

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

/* ─── COMPONENT ─── */
export default function Home() {
  const projectsScrollRef = useRef(null)

  const particles = heroParticles

  return (
    <div className="home-page">
      <SEO
        title="Custom Software, Web Development & AI Automation"
        description={company.description}
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
          <img
            src="/hero-glass-bg.webp"
            srcSet="/hero-glass-mobile.webp 768w, /hero-glass-bg.webp 1024w"
            sizes="100vw"
            width="1024"
            height="1024"
            fetchPriority="high"
            decoding="async"
            alt=""
            className="hero__glass-img"
          />
        </div>

        <div className="hero__content container">
          <div className="hero__text-panel">
            <h1 className="hero__headline">
              <span className="hero__headline-line">Web platforms and</span>
              <span className="hero__headline-line hero__headline-line--accent">growth systems.</span>
            </h1>
            <p className="hero__subheadline">
              We help ecommerce and service businesses launch faster, automate
              repetitive work, and turn more visitors into customers.
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

        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-hint">
          <span className="hero__scroll-label">Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* ===== MISSION STATEMENT ===== */}
      <ProgramSpotlight />
      <section className="mission-statement section">
        <div className="container">
          <div className="mission-statement__content reveal-up">
            <span className="section-label">Our Philosophy</span>
            <h2 className="mission-statement__text">
              Useful software connects <em>clear thinking</em>, thoughtful design and dependable engineering.
            </h2>
            <div className="mission-statement__author">
              <img src="/icon.png" alt="" width="24" height="24" />
              <span>The HanovaDevs approach</span>
            </div>
          </div>
        </div>
      </section>

      <BuildingFeature />

      {/* ===== ABOUT TEASER ===== */}
      <section className="about-teaser section" id="about-teaser">
        <div className="container">
          <div className="about-teaser__inner">
            <div className="about-teaser__visual reveal-left">
              <div className="about-teaser__img-stack">
                <img
                  src={company.founder.image}
                  alt="Ali Haider, founder of HanovaDevs"
                  className="about-teaser__img about-teaser__img--main"
                  loading="lazy"
                />
                <div className="about-teaser__floating-card">
                  <img src="/icon.png" alt="" width="32" height="32" />
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
                Founded in 2022 by Ali Haider, HanovaDevs designs and builds focused digital systems for ecommerce and service businesses. Strategy, interface design, engineering, automation, and launch support stay connected from the first workshop through delivery.
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
          <div className="services-teaser__header reveal">
            <div>
              <span className="section-label">What We Do</span>
              <h2>One partner for your <span className="gradient-text">digital growth.</span></h2>
            </div>
            <div className="services-teaser__intro">
              <p>Strategy, design, engineering, and acquisition—connected by one team and focused on outcomes.</p>
              <Link to="/services" className="services-teaser__all-link">
                Explore all services
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
          </div>
          <div className="services-teaser__grid">
            {serviceCards.map((card, i) => (
              <div key={i} className={`services-teaser__card card card-glass reveal reveal-delay-${(i % 4) + 1} ${card.featured ? 'services-teaser__card--featured' : ''}`}>
                <div className="services-teaser__card-top">
                  <span className="services-teaser__icon-wrap">{card.icon}</span>
                  <span className="services-teaser__number">0{i + 1}</span>
                </div>
                {card.featured && <span className="services-teaser__featured-label">Most requested</span>}
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
                  Explore service
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
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
                  <Link to="/reviews" className="featured-projects__link">
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

      {/* Testimonials return here only after client approval and verification. */}
      

      {/* ===== INDUSTRIES WE SERVE ===== */}
      <section className="industries-section section" id="industries">
        <div className="container">
          <div className="section-header reveal text-center" style={{ margin: '0 auto var(--space-xl)' }}>
            <span className="section-label">Expertise</span>
            <h2>Who we build for</h2>
          </div>
          <div className="industries__grid">
            {[
              'Ecommerce', 'Service Businesses', 'Fashion & Retail', 'Industrial Businesses', 'Software & Products', 'Founders & Teams'
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
              <div className="products-teaser__card card card-glass">
                <div className="products-teaser__badge products-teaser__badge--dev">Mobile product preview</div>
                <h3>Stepsy</h3>
                <p>A HanovaDevs mobile app project connecting everyday walking with planned points, partner discounts and rewards.</p>
                <Link to="/products/stepsy" className="btn btn-primary" style={{ marginTop: 'auto' }}>Explore the Stepsy story</Link>
              </div>
              <div className="products-teaser__card card card-glass reveal-right reveal-delay-1">
                <div className="products-teaser__badge products-teaser__badge--dev">
                  <span className="products-teaser__pulse" /> Launching soon
                </div>
                <h3>Omnai Browser</h3>
                <p>An AI-focused desktop browser, preparing for launch. Explore the development preview and product direction.</p>
                <Link to="/products" className="btn btn-ghost" style={{ marginTop: 'auto' }}>Learn More</Link>
              </div>
              <div className="products-teaser__card card card-glass reveal-right reveal-delay-2">
                <div className="products-teaser__badge products-teaser__badge--launch">
                  <span className="products-teaser__pulse products-teaser__pulse--green" /> Available on Microsoft Store
                </div>
                <h3>Eunoia</h3>
                <p>A desktop workspace for planning, notes, journaling and focused work. Now available on Microsoft Store.</p>
                <a href={company.products.eunoia.storeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 'auto' }}>Get Eunoia ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The primary process section above is the single source of process guidance. */}
      

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

      {/* Recognition is intentionally hidden until third-party evidence is available. */}
      

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

      {/* ===== TRUST & TRANSPARENCY (LEGAL SYSTEM) ===== */}
      <TrustLegalSection />

      {/* ===== FINAL CTA ===== */}
      <section className="final-cta" id="final-cta">
        <div className="final-cta__bg" />
        <div className="container text-center">
          <img src="/icon.png" alt="HanovaDevs" className="final-cta__icon reveal-scale" width="64" height="64" />
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
              <a href="mailto:contact@hanovadevs.com" className="final-cta__email">
                <strong>contact@hanovadevs.com</strong>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
