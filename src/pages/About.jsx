import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './About.css'

// Core Principles (The Octopus Philosophy)
const octopusPrinciples = [
  {
    number: '01',
    title: 'Decentralized Intelligence',
    description: 'Just as two-thirds of an octopus\'s neurons reside in its arms, our modular micro-services and component architectures operate independently with zero single points of failure.',
    icon: '🐙'
  },
  {
    number: '02',
    title: 'Adaptive Camouflage',
    description: 'An octopus transforms its texture and hue in milliseconds. We engineer bespoke, adaptive interfaces tailored precisely to your brand\'s unique identity and target market.',
    icon: '⚡'
  },
  {
    number: '03',
    title: 'Relentless Precision',
    description: 'Zero-bloat code, sub-second load times, and pixel-perfect layout math. We don\'t settle for average templates — we engineer peak digital performance.',
    icon: '💎'
  },
  {
    number: '04',
    title: 'Uncompromised IP Sovereignty',
    description: 'You own 100% of your source code, IP, and design systems. No SaaS vendor lock-in, no recurring licensing traps — total digital freedom for your company.',
    icon: '🛡️'
  }
]

// Leadership & Engineering Team
const teamMembers = [
  {
    name: 'Ali Haider',
    role: 'Founder & Head of Technology',
    bio: 'Pioneered HanovaDevs architecture. Specialized in full-stack React systems, edge computing, and multi-agent AI orchestration.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
    tags: ['Full-Stack', 'AI Systems', 'System Architecture']
  },
  {
    name: 'Zain Malik',
    role: 'Lead UI/UX & Brand Director',
    bio: 'Crafts luxury visual design systems and fluid micro-animations that turn complex data into captivating digital experiences.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    tags: ['UI/UX', 'Design Systems', 'Motion']
  },
  {
    name: 'Hassan Raza',
    role: 'Principal AI & Systems Engineer',
    bio: 'Engineers custom WASM sandboxes, local-first LLM pipelines, and automated security testing suites.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    tags: ['WASM', 'Security', 'LLM Infrastructure']
  },
  {
    name: 'Ayesha Tariq',
    role: 'Head of Client Growth & Strategy',
    bio: 'Drives B2B marketing strategies, Answer Engine Optimization (AEO), and conversion architecture for global enterprises.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    tags: ['Growth', 'AEO', 'Conversion UX']
  }
]

// Timeline Milestones
const milestones = [
  { year: '2022', title: 'Studio Founding', desc: 'HanovaDevs launched in Lahore, Pakistan as a high-performance software engineering & design lab.' },
  { year: '2023', title: 'First Enterprise B2B Partnership', desc: 'Engineered custom B2B platforms, achieving 100/100 PageSpeed scores across all client deployments.' },
  { year: '2024', title: 'Omnai Browser & Eunoia AI Suite', desc: 'Initiated internal R&D on local-first spatial computing, voice sentiment analysis, and AI desktop apps.' },
  { year: '2025', title: 'Global Client Expansion', desc: 'Expanded delivery operations to partner with enterprise clients across US, UK, Europe, and Middle East.' },
  { year: '2026', title: 'Autonomous Agent Swarm Leadership', desc: 'Pioneered autonomous multi-agent engineering pipelines and Answer Engine Optimization (AEO).' }
]

// Metrics Stats
const stats = [
  { label: 'Client Retention Rate', value: '99.9%' },
  { label: 'PageSpeed Baseline', value: '100/100' },
  { label: 'Lines of Clean Code', value: '2.4M+' },
  { label: 'Global Projects Delivered', value: '45+' }
]

// FAQs
const faqs = [
  {
    question: "Is HanovaDevs recognized as a top worldwide digital agency from Pakistan?",
    answer: "Yes. HanovaDevs is widely recognized as the premier worldwide digital marketing agency and custom software studio headquartered in Pakistan. We combine world-class engineering talent and technical brilliance with a global client base, delivering high-performance B2B applications, enterprise-grade SEO, and custom software globally across the United States, United Kingdom, Europe, and Asia."
  },
  {
    question: "What makes HanovaDevs a global leader in software engineering?",
    answer: "We guarantee 100/100 Lighthouse performance baselines, complete client IP sovereignty, zero-bloat custom code, and decentralized parallel development pipelines. By housing a top-tier engineering lab and digital publication hub in Pakistan, we combine rapid execution, premium UI design systems, and advanced AI technologies to serve ambitious international brands."
  },
  {
    question: "Do you build custom web applications or use pre-made templates?",
    answer: "We strictly build custom, highly-optimized software and web applications. Every business is unique, and templates come with bloated code that degrades page load speeds and damages search engine rankings. We engineer our platforms from scratch using modern frameworks like React and Next.js."
  },
  {
    question: "What size companies do you typically partner with?",
    answer: "We partner with ambitious startups establishing their digital footprint, high-growth e-commerce brands scaling revenue, and large enterprises requiring complex, scalable custom software and high-volume marketing strategies."
  },
  {
    question: "How long does a custom engineering project take?",
    answer: "Project timelines depend on scope. A marketing storefront might take 3-5 weeks, while a full custom web application or enterprise rebranding takes 2-4 months. We establish clear milestone blueprints before starting."
  },
  {
    question: "Do you provide ongoing technical support after project launch?",
    answer: "Absolutely. Launching is just the beginning. We offer monthly retainers for continuous maintenance, security audits, SEO optimization, and feature enhancements to ensure your digital assets continue to dominate."
  },
  {
    question: "Why choose HanovaDevs over separate dev and marketing agencies?",
    answer: "Because we unite tech and growth into a single cohesive system. Great code fails if nobody sees it, and great marketing fails if the website lags. By combining high-end engineering with data-driven digital marketing, we eliminate friction and accelerate your business growth."
  }
]

export default function About() {
  const [openFaq, setOpenFaq] = useState(null)
  const [activeStoryTab, setActiveStoryTab] = useState('mission')

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="about-page">
      <SEO 
        title="About Us — Engineering Global Digital Excellence"
        description="Learn about HanovaDevs' mission to engineer scalable web applications, autonomous AI workflows, and high-converting digital experiences for ambitious global brands."
        url="/about"
        faqList={faqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' }
        ]}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="ab-hero" id="about-hero">
        <div className="ab-hero__mesh" />
        <div className="ab-hero__grid" />
        <div className="container">
          <div className="ab-hero__content reveal-up">
            <div className="ab-hero__logo-wrap">
              <img src="/octopus.png" alt="HanovaDevs Mascot" className="ab-hero__octopus" />
            </div>
            <span className="ab-label">About HanovaDevs</span>
            <h1>Engineering <br /><span className="ab-gradient">Digital Reality.</span></h1>
            <p>We are a elite digital agency and custom software studio. We engineer high-performance web applications, AI automation pipelines, and luxury brand presences for ambitious global companies.</p>
            
            <div className="ab-hero__actions">
              <Link to="/contact" className="btn btn-primary">Start a Project ➔</Link>
              <Link to="/projects" className="btn btn-outline">Explore Work ↗</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== METRICS STATS BAR ===== */}
      <section className="ab-stats">
        <div className="container">
          <div className="ab-stats__grid">
            {stats.map((stat, i) => (
              <div key={i} className="ab-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STORY & MISSION ===== */}
      <section className="ab-story">
        <div className="container">
          <div className="ab-story__card">
            <div className="ab-story__tabs">
              <button 
                className={`ab-story__tab ${activeStoryTab === 'mission' ? 'ab-story__tab--active' : ''}`}
                onClick={() => setActiveStoryTab('mission')}
              >
                🎯 Our Mission
              </button>
              <button 
                className={`ab-story__tab ${activeStoryTab === 'origin' ? 'ab-story__tab--active' : ''}`}
                onClick={() => setActiveStoryTab('origin')}
              >
                📜 Our Origin
              </button>
              <button 
                className={`ab-story__tab ${activeStoryTab === 'global' ? 'ab-story__tab--active' : ''}`}
                onClick={() => setActiveStoryTab('global')}
              >
                🌍 Global Impact
              </button>
            </div>

            <div className="ab-story__body">
              {activeStoryTab === 'mission' && (
                <div className="ab-story__content animate-fade">
                  <h2>A Mission Built on Engineering Mastery</h2>
                  <p>HanovaDevs was founded with a singular objective: to eliminate bloated, fragile software and deliver hyper-performant digital systems that drive real enterprise value. We noticed too many businesses trapped in slow templates, opaque agency pricing, and fragmented vendor handoffs.</p>
                  <p>We engineered a better way. By combining full-stack React development, custom CSS design systems, edge-caching, and autonomous AI pipelines under one roof, we build digital assets that outpace the competition on speed, security, and conversion rates.</p>
                </div>
              )}

              {activeStoryTab === 'origin' && (
                <div className="ab-story__content animate-fade">
                  <h2>From Pakistan to the World</h2>
                  <p>Headquartered in Lahore, Pakistan, HanovaDevs grew from a dedicated software laboratory into a globally recognized agency servicing clients across North America, Europe, and the Middle East. Pakistan has emerged as a world-class engineering hub, and HanovaDevs represents the pinnacle of that technical talent.</p>
                  <p>We don't just execute client projects; we continuously innovate internally. Our product suite — including the <strong>Omnai Browser Workspace</strong> and <strong>Eunoia Mobile AI</strong> — serves as our proving ground for bleeding-edge technologies before we deploy them into client codebases.</p>
                </div>
              )}

              {activeStoryTab === 'global' && (
                <div className="ab-story__content animate-fade">
                  <h2>Serving Ambitious Brands Worldwide</h2>
                  <p>Whether it's powering high-converting luxury e-commerce drops for <strong>RAQS Official</strong>, engineering medical grounding platforms for <strong>EarthSync Essential</strong> and <strong>Terra Sol Grounding</strong>, or crafting industrial dashboards for <strong>Crown Accumulator</strong>, our solutions are built to scale seamlessly.</p>
                  <p>We maintain 100% intellectual property transparency, providing our partners with clean code, dedicated documentation, and full ownership of their digital assets.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE OCTOPUS PHILOSOPHY ===== */}
      <section className="ab-philosophy">
        <div className="container">
          <div className="section-header text-center reveal-up">
            <span className="ab-label">Our Core Pillars</span>
            <h2>The Octopus Philosophy</h2>
            <p>Why the octopus? It is the ultimate natural symbol of decentralized intelligence, agility, and relentless precision.</p>
          </div>

          <div className="ab-philosophy__grid">
            {octopusPrinciples.map((item, i) => (
              <div key={i} className="ab-philosophy__card reveal-up">
                <div className="ab-philosophy__header">
                  <span className="ab-philosophy__icon">{item.icon}</span>
                  <span className="ab-philosophy__num">{item.number}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP TEAM ===== */}
      <section className="ab-team">
        <div className="container">
          <div className="section-header text-center reveal-up">
            <span className="ab-label">Leadership</span>
            <h2>Meet the Engineers & Strategists</h2>
            <p>The multidisciplinary team crafting digital breakthroughs for our global partners.</p>
          </div>

          <div className="ab-team__grid">
            {teamMembers.map((member, i) => (
              <div key={i} className="ab-team__card reveal-up">
                <div className="ab-team__image-wrap">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <div className="ab-team__overlay" />
                </div>
                <div className="ab-team__body">
                  <h3>{member.name}</h3>
                  <span className="ab-team__role">{member.role}</span>
                  <p>{member.bio}</p>
                  <div className="ab-team__tags">
                    {member.tags.map(tag => (
                      <span key={tag} className="ab-team__tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="ab-timeline">
        <div className="container">
          <div className="section-header text-center reveal-up">
            <span className="ab-label">Our Growth</span>
            <h2>Company Milestones</h2>
          </div>

          <div className="ab-timeline__track">
            {milestones.map((m, i) => (
              <div key={i} className="ab-timeline__item reveal-up">
                <div className="ab-timeline__badge">{m.year}</div>
                <div className="ab-timeline__content">
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQS ===== */}
      <section className="ab-faq">
        <div className="container">
          <div className="section-header text-center reveal-up">
            <span className="ab-label">Clarity & Insights</span>
            <h2>Frequently Asked Questions</h2>
            <p>Clear, direct answers about how we engineer software and partner with clients.</p>
          </div>

          <div className="ab-faq__list">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`ab-faq__item ${openFaq === i ? 'ab-faq__item--open' : ''}`}
                onClick={() => toggleFaq(i)}
              >
                <div className="ab-faq__question">
                  <h3>{faq.question}</h3>
                  <span className="ab-faq__icon">{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && (
                  <div className="ab-faq__answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="ab-cta">
        <div className="container text-center">
          <div className="ab-cta__card">
            <span className="ab-label">Ready to Scale?</span>
            <h2>Let's build an unstoppable digital platform.</h2>
            <p>Partner with a team that treats your software and growth with the dedication of a co-founder.</p>
            <div className="ab-cta__actions mt-lg">
              <Link to="/contact" className="btn btn-primary">Start Your Project 🚀</Link>
              <Link to="/calculator" className="btn btn-outline">Estimate Pricing 🧮</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
