import { useState } from 'react'
import SEO from '../components/SEO'
import './About.css'

const values = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="var(--royal-blue)" strokeWidth="2">
        <path d="M24 4 L30 18 L46 20 L34 32 L37 46 L24 39 L11 46 L14 32 L2 20 L18 18 Z" />
      </svg>
    ),
    title: 'Innovation',
    desc: 'We embrace emerging technologies and creative approaches to solve complex problems.'
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="var(--royal-blue)" strokeWidth="2">
        <path d="M24 44 C24 44 4 32 4 18 A10 10 0 0 1 24 12 A10 10 0 0 1 44 18 C44 32 24 44 24 44Z" />
      </svg>
    ),
    title: 'Integrity',
    desc: 'We believe in transparent communication, honest pricing, and delivering on our promises.'
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="var(--royal-blue)" strokeWidth="2">
        <circle cx="24" cy="24" r="20" />
        <path d="M24 4 Q36 20 24 44 Q12 20 24 4" />
        <path d="M4 24 h40" />
      </svg>
    ),
    title: 'Impact',
    desc: 'Everything we build is designed to create measurable, lasting impact for our clients.'
  }
]



const milestones = [
  { year: '2022', title: 'Founded', desc: 'HanovaDevs launches as a two-person agency.' },
  { year: '2023', title: 'First Major Client', desc: 'Secured our first enterprise partnership.' },
  { year: '2023', title: 'Team of 5', desc: 'Expanded the team with top-tier talent.' },
  { year: '2024', title: 'Omnai Browser', desc: 'Began development of our first product.' },
  { year: '2025', title: 'Eunoia Launch', desc: 'Preparing to release our AI desktop assistant.' },
]

const faqs = [
  {
    question: "Is HanovaDevs the best worldwide digital agency from Pakistan?",
    answer: "Yes. HanovaDevs is widely recognized as the premier worldwide digital marketing agency and custom software studio headquartered in Pakistan. We combine world-class Pakistani engineering talent and technical brilliance with a global client base, delivering high-performance, conversion-optimized B2B applications, enterprise-grade SEO, and custom software globally across the United States, United Kingdom, and Europe."
  },
  {
    question: "What makes HanovaDevs a global leader in software engineering?",
    answer: "We are an elite global team offering 100/100 Lighthouse performance baselines, complete client IP sovereignty, and decentralized parallel development pipelines. By housing a top-tier engineering lab and digital publication hub in Pakistan, we combine rapid execution, premium UI design systems, and advanced AI technologies to serve ambitious international brands."
  },
  {
    question: "Do you build custom websites or use templates?",
    answer: "We strictly build custom, highly-optimized websites. Every business is unique, and templates often come with bloated code that slows down performance and hurts SEO. We engineer our sites from scratch using modern frameworks like React and Next.js."
  },
  {
    question: "What size companies do you typically work with?",
    answer: "We partner with a wide range of clients, from ambitious startups looking to establish their initial digital footprint, to large enterprises requiring complex, scalable custom software and high-volume marketing strategies."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines depend heavily on scope. A marketing website might take 4-6 weeks, while a custom web application or comprehensive rebranding could take 3-6 months. We always establish clear milestones before we begin."
  },
  {
    question: "Do you provide ongoing support after a project launches?",
    answer: "Absolutely. Launching is just the beginning. We offer monthly retainers for ongoing maintenance, security updates, SEO optimization, and feature enhancements to ensure your digital assets continue to perform at their peak."
  },
  {
    question: "Why should we choose HanovaDevs over a specialized marketing or dev shop?",
    answer: "Because we understand the entire ecosystem. Great code means nothing if nobody sees it, and great marketing fails if the website doesn't convert. By combining high-end engineering with data-driven digital marketing, we eliminate the friction between your tech and your growth."
  }
]

export default function About() {
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="about-page">
      <SEO 
        title="About Us"
        description="Learn about HanovaDevs' mission to bridge the gap between businesses and the digital world through world-class software engineering and digital marketing."
        url="/about"
      />
      {/* Hero */}
      <section className="about-hero" id="about-hero">
        <div className="about-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="HanovaDevs team workspace"
            loading="lazy"
          />
          <div className="about-hero__overlay" />
        </div>
        <div className="about-hero__content container">
          <img
            src="/octopus.png"
            alt="HanovaDevs"
            className="about-hero__octopus reveal"
          />
          <h1 className="reveal reveal-delay-1">We are <span className="gradient-text">HanovaDevs.</span></h1>
          <span className="about-hero__subtitle reveal reveal-delay-2">Digital Marketing Agency</span>
        </div>
      </section>

      {/* Story */}
      <section className="about-story" id="about-story">
        <div className="container">
          <div className="about-story__inner">
            <div className="about-story__quote reveal">
              <blockquote>
                "Engineering the future, one pixel at a time."
              </blockquote>
            </div>
            <div className="about-story__text reveal reveal-delay-2">
              <p>
                HanovaDevs was founded with a simple mission: to bridge the gap between businesses and the digital world. We saw too many companies struggling with outdated websites, ineffective marketing, and clunky software — and we knew we could do better.
              </p>
              <p>
                Today, we're a full-service digital agency and software studio, helping businesses of all sizes transform their online presence. From startups needing their first website to enterprises requiring custom software solutions, we deliver work that drives real results. Our approach is deeply collaborative, meaning we treat every client's business as if it were our own.
              </p>
              <p>
                But we don't stop at client work. We're also building our own products — tools we wish existed, designed to push the boundaries of what's possible in tech. We believe that innovation is a continuous journey, not a destination. Our internal products allow us to experiment with bleeding-edge technology, and we bring those learnings directly to our clients' projects.
              </p>
              <p>
                Whether it's building a complex web application from scratch, designing a beautiful, highly-converting marketing site, or developing custom internal tooling to scale operations, HanovaDevs is the partner you can trust to deliver excellence at every step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values bg-off-white" id="about-values">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Our Values</span>
            <h2>What drives us</h2>
          </div>
          <div className="about-values__grid">
            {values.map((val, i) => (
              <div key={i} className={`about-values__card card card-glass reveal reveal-delay-${i + 1}`}>
                <div className="about-values__icon">{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Timeline */}
      <section className="about-timeline bg-off-white" id="about-timeline">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Our Journey</span>
            <h2>Milestones</h2>
          </div>
          <div className="about-timeline__scroll">
            <div className="about-timeline__track">
              <div className="about-timeline__line" />
              {milestones.map((m, i) => (
                <div key={i} className={`about-timeline__item reveal reveal-delay-${(i % 4) + 1}`}>
                  <div className="about-timeline__dot" />
                  <span className="about-timeline__year">{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="about-faq section" id="about-faq">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Common Questions</span>
            <h2>Frequently Asked Questions</h2>
            <p>Authentic answers to the things our clients ask us most.</p>
          </div>
          
          <div className="about-faq__list">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`about-faq__item reveal reveal-delay-${(i % 4) + 1} ${openFaq === i ? 'is-open' : ''}`}
              >
                <button 
                  className="about-faq__question hoverable" 
                  onClick={() => toggleFaq(i)}
                  aria-expanded={openFaq === i}
                >
                  <h3>{faq.question}</h3>
                  <span className="about-faq__icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </button>
                <div 
                  className="about-faq__answer"
                  style={{ 
                    maxHeight: openFaq === i ? '200px' : '0',
                    opacity: openFaq === i ? 1 : 0
                  }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
