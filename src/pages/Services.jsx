import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import './Services.css'

const services = [
  {
    id: 'web-design',
    title: 'Web Design & Development',
    tagline: 'Fast, Responsive, Scalable',
    desc: 'We build beautiful, high-performance websites that convert visitors into customers.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    large: true,
    techStack: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Lighthouse']
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    tagline: 'Grow your brand organically',
    desc: 'Engage your audience across every platform with content that resonates.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    techStack: ['Instagram', 'LinkedIn', 'TikTok', 'Buffer', 'Canva Pro']
  },
  {
    id: 'seo',
    title: 'SEO & Performance Marketing',
    tagline: 'Rank higher, get found',
    desc: 'Data-driven SEO strategies that put you on page one and keep you there.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    techStack: ['GA4', 'GSC', 'SEMrush', 'Schema JSON-LD', 'Ahrefs']
  },
  {
    id: 'branding',
    title: 'Brand Identity & Strategy',
    tagline: 'Logos, positioning, messaging',
    desc: 'Craft a brand identity that stands out and tells your story with clarity.',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    large: true,
    techStack: ['Logo Design', 'Typography', 'Style Guides', 'Brand Voice', 'Asset Kits']
  },
  {
    id: 'software-development',
    title: 'Custom Software Development',
    tagline: 'Apps, tools, automation',
    desc: 'Bespoke software solutions designed to solve your toughest business challenges.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    techStack: ['Node.js', 'Python', 'Rust', 'PostgreSQL', 'Docker', 'AWS']
  },
  {
    id: 'digital-advertising',
    title: 'Digital Advertising',
    tagline: 'Facebook, Google, TikTok Ads',
    desc: 'Precision-targeted ad campaigns that maximize ROI across all platforms.',
    image: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=800&q=80',
    techStack: ['Google Ads', 'Meta Ads', 'TikTok Ads', 'Conversations API', 'GTM']
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design Services',
    tagline: 'Logos, Packaging, Marketing Assets',
    desc: 'Stunning visual identities and print-ready designs that make your brand unforgettable.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    large: true,
    techStack: ['Adobe Suite', 'Figma', 'Illustrator', 'Photoshop', 'After Effects']
  },
  {
    id: 'ai-automation',
    title: 'AI Automation & Business Bots',
    tagline: 'Smarter ops, less manual work',
    desc: 'Custom AI-powered tools and bots that streamline operations and amplify efficiency.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    large: true,
    techStack: ['GPT-4o', 'LangChain', 'Python', 'TensorFlow', 'Zapier', 'n8n']
  },
]

export default function Services() {
  return (
    <div className="services-page">
      <SEO 
        title="Our Services — HanovaDevs"
        description="Explore HanovaDevs' premium digital services, from web design and scalable custom software to enterprise-grade SEO and social media marketing."
        url="/services"
      />
      
      {/* Cinematic Hero */}
      <section className="services-hero" id="services-hero">
        <div className="services-hero__bg-image" />
        <div className="services-hero__glow-1" />
        <div className="services-hero__glow-2" />
        <div className="services-hero__grid-bg" />
        <div className="container">
          <div className="services-hero__content reveal">
            <span className="section-label services-hero__label">Capabilities</span>
            <h1>Engineering <br /><span className="gradient-text">Value.</span></h1>
            <p>End-to-end custom software development and data-driven marketing engineered to scale operations and compound business growth.</p>
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
                  
                  {/* Tech stack tags */}
                  <div className="services-bento__tech-tags">
                    {service.techStack.map(tag => (
                      <span key={tag} className="services-bento__tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Methodology / Why HanovaDevs */}
      <section className="services-why section bg-off-white" id="why-hanovadevs">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
            <span className="section-label">Our Standards</span>
            <h2>Why ambitious brands <span className="gradient-text">partner with us</span></h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>We combine technical rigor with design excellence to eliminate scaling friction.</p>
          </div>
          
          <div className="methodology-bento">
            <div className="methodology-card methodology-card--large reveal-up">
              <span className="methodology-icon">⚡</span>
              <h3>Performance-First Engineering</h3>
              <p>We target 100/100 Lighthouse performance metrics as our coding baseline. By engineering server-side rendered frameworks, optimizing queries, and eliminating blocking client-side JavaScript, we build applications that load instantly and convert passively.</p>
            </div>
            
            <div className="methodology-card reveal-up reveal-delay-1">
              <span className="methodology-icon">🎯</span>
              <h3>Data-Driven Marketing</h3>
              <p>No assumptions. We map keyword clusters, ad campaigns, and visual assets directly based on verified consumer search behavior and predictive conversion metrics.</p>
            </div>
            
            <div className="methodology-card reveal-up reveal-delay-2">
              <span className="methodology-icon">🛡️</span>
              <h3>IP Sovereignty</h3>
              <p>You own 100% of your source code and design tokens. We build clean, highly-documented codebases on cloud providers, completely eliminating licensing fees and vendor locks.</p>
            </div>
            
            <div className="methodology-card methodology-card--large reveal-up reveal-delay-3">
              <span className="methodology-icon">🐙</span>
              <h3>Multidisciplinary Cephalopod Execution</h3>
              <p>Inspired by our decentralized mascot, our engineering limbs solve problems in parallel. Visual design, backend scaling, and conversion optimization are planned and launched as a single cohesive network rather than siloed steps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta section" id="services-cta">
        <div className="container text-center">
          <h2 className="reveal">Need a custom solution?</h2>
          <p className="reveal reveal-delay-1" style={{ maxWidth: 480, margin: '0 auto var(--space-lg)', color: 'var(--blue-grey)' }}>
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
