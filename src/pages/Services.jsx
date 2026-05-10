import { Link } from 'react-router-dom'
import './Services.css'

const services = [
  {
    id: 'web-design',
    title: 'Web Design & Development',
    tagline: 'Fast, Responsive, Scalable',
    desc: 'We build beautiful, high-performance websites that convert visitors into customers.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    large: true,
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    tagline: 'Grow your brand organically',
    desc: 'Engage your audience across every platform with content that resonates.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  },
  {
    id: 'seo',
    title: 'SEO & Performance Marketing',
    tagline: 'Rank higher, get found',
    desc: 'Data-driven SEO strategies that put you on page one and keep you there.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 'branding',
    title: 'Brand Identity & Strategy',
    tagline: 'Logos, positioning, messaging',
    desc: 'Craft a brand identity that stands out and tells your story with clarity.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    large: true,
  },
  {
    id: 'software-development',
    title: 'Custom Software Development',
    tagline: 'Apps, tools, automation',
    desc: 'Bespoke software solutions designed to solve your toughest business challenges.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  },
  {
    id: 'digital-advertising',
    title: 'Digital Advertising',
    tagline: 'Facebook, Google, TikTok Ads',
    desc: 'Precision-targeted ad campaigns that maximize ROI across all platforms.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80',
  },
]

export default function Services() {
  return (
    <div className="services-page">
      {/* Hero */}
      <section className="services-hero" id="services-hero">
        <div className="container">
          <div className="services-hero__content reveal">
            <span className="section-label">Our Services</span>
            <h1>What we <span className="gradient-text">bring to the table.</span></h1>
            <p>End-to-end digital solutions tailored to your business goals.</p>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="services-grid-section section" id="services-grid">
        <div className="container">
          <div className="services-bento">
            {services.map((service, i) => (
              <Link 
                to={`/services/${service.id}`}
                key={i}
                className={`services-bento__card hoverable reveal reveal-delay-${(i % 4) + 1} ${service.large ? 'services-bento__card--large' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="services-bento__bg">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="services-bento__gradient" />
                </div>
                <div className="services-bento__content">
                  <span className="services-bento__tagline">{service.tagline}</span>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why HanovaDevs */}
      <section className="services-why section bg-off-white" id="why-hanovadevs">
        <div className="container">
          <div className="services-why__inner">
            <div className="services-why__text reveal">
              <span className="section-label">Why HanovaDevs</span>
              <h2>Smart Strategies <span className="text-royal">+</span> Creative Execution <span className="text-royal">=</span> <span className="gradient-text">Real Growth</span></h2>
              <p>
                We don't do cookie-cutter. Every strategy is built from scratch — informed by data, shaped by creativity, and focused on measurable outcomes. Our team merges technical expertise with design thinking to deliver solutions that actually move the needle.
              </p>
            </div>
            <div className="services-why__stats reveal reveal-delay-2">
              <div className="services-why__stat">
                <span className="services-why__stat-num">40+</span>
                <span className="services-why__stat-label">Projects delivered</span>
              </div>
              <div className="services-why__stat">
                <span className="services-why__stat-num">5x</span>
                <span className="services-why__stat-label">Avg ROI increase</span>
              </div>
              <div className="services-why__stat">
                <span className="services-why__stat-num">98%</span>
                <span className="services-why__stat-label">Client satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta section" id="services-cta">
        <div className="container text-center">
          <h2 className="reveal">Need a custom solution?</h2>
          <p className="reveal reveal-delay-1" style={{ maxWidth: 480, margin: '0 auto var(--space-lg)' }}>
            Tell us about your project and we'll craft the perfect digital strategy.
          </p>
          <Link to="/contact" className="btn btn-primary reveal reveal-delay-2">
            Get Started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
