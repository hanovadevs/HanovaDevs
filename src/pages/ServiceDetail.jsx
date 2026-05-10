import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import './ServiceDetail.css'

const servicesData = {
  'web-design': {
    title: 'Web Design & Development',
    tagline: 'We build digital experiences that perform and convert.',
    heroImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&q=80',
    intro: 'Your website is the digital storefront of your business. We engineer lightning-fast, highly responsive, and visually stunning websites that capture attention and drive measurable growth. Using modern frameworks like React and Next.js, we ensure your site is secure, scalable, and built for the future.',
    features: [
      {
        title: 'Custom UI/UX Design',
        desc: 'Pixel-perfect, user-centric interfaces tailored to your brand identity.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
      },
      {
        title: 'High-Performance Frontend',
        desc: 'Optimized code splitting, caching, and server-side rendering for speed.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
      },
      {
        title: 'CMS Integration',
        desc: 'Seamless integration with Sanity, WordPress, or custom backends.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
      }
    ]
  },
  'social-media': {
    title: 'Social Media Marketing',
    tagline: 'Grow your brand organically and engage your community.',
    heroImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80',
    intro: 'Social media is more than just posting — it’s about starting conversations. We create data-driven content strategies that resonate with your target audience across Instagram, LinkedIn, TikTok, and Twitter. We turn passive scrollers into active brand advocates.',
    features: [
      {
        title: 'Content Strategy',
        desc: 'Comprehensive planning, ideation, and content calendars.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
      },
      {
        title: 'Community Management',
        desc: 'Active engagement, comment moderation, and brand voice consistency.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
      },
      {
        title: 'Analytics & Reporting',
        desc: 'Monthly insights, engagement metrics, and growth tracking.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
      }
    ]
  },
  'seo': {
    title: 'SEO & Performance Marketing',
    tagline: 'Rank higher, get found, and dominate search results.',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80',
    intro: 'Visibility is everything. Our SEO and performance marketing strategies are designed to put your business in front of the people actively searching for it. Through technical optimization, targeted keyword strategies, and high-quality backlinking, we ensure long-term organic growth.',
    features: [
      {
        title: 'Technical SEO',
        desc: 'Site speed optimization, schema markup, and mobile readiness.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
      },
      {
        title: 'Keyword Research',
        desc: 'Identifying high-intent keywords to drive qualified traffic.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
      },
      {
        title: 'Content Optimization',
        desc: 'Updating and structuring your content to align with search intent.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
      }
    ]
  },
  'branding': {
    title: 'Brand Identity & Strategy',
    tagline: 'Craft a memorable brand that tells your unique story.',
    heroImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=80',
    intro: 'A great brand is more than just a logo — it is the feeling people get when they interact with your business. We craft cohesive brand identities encompassing logos, typography, color palettes, and messaging strategies that stand out in crowded markets.',
    features: [
      {
        title: 'Logo & Visual Identity',
        desc: 'Timeless, versatile logos and complete brand asset guidelines.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
      },
      {
        title: 'Brand Voice & Messaging',
        desc: 'Defining how you speak to your audience for maximum impact.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
      },
      {
        title: 'Brand Guidelines',
        desc: 'Comprehensive rulebooks ensuring consistency everywhere.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
      }
    ]
  },
  'software-development': {
    title: 'Custom Software Development',
    tagline: 'Bespoke applications designed to scale your operations.',
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&q=80',
    intro: 'Off-the-shelf software rarely fits perfectly. We design and engineer bespoke web and mobile applications that solve your specific business challenges. From complex dashboards to native mobile apps, we build tools that make your business faster and more efficient.',
    features: [
      {
        title: 'Web Applications',
        desc: 'Scalable, secure, and intuitive web-based software solutions.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
      },
      {
        title: 'API Development',
        desc: 'Robust REST and GraphQL APIs to connect your digital ecosystem.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
      },
      {
        title: 'Cloud Architecture',
        desc: 'Reliable infrastructure deployment on AWS, Google Cloud, or Azure.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>
      }
    ]
  },
  'digital-advertising': {
    title: 'Digital Advertising',
    tagline: 'Maximize ROI with precision-targeted ad campaigns.',
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1600&q=80',
    intro: 'Stop wasting budget on ads that don\'t convert. Our digital advertising team creates high-converting campaigns across Google, Meta, TikTok, and LinkedIn. We constantly A/B test creatives and refine audiences to ensure every dollar you spend generates measurable return.',
    features: [
      {
        title: 'PPC Campaigns',
        desc: 'Google Ads management focusing on high-intent search queries.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
      },
      {
        title: 'Social Ads',
        desc: 'Engaging video and image ads on Meta, Instagram, and TikTok.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
      },
      {
        title: 'Conversion Optimization',
        desc: 'Landing page design and split testing to maximize ad performance.',
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
      }
    ]
  }
}

export default function ServiceDetail() {
  const { id } = useParams()
  const service = servicesData[id]

  useEffect(() => {
    window.scrollTo(0, 0)
    // Reveal animation trigger
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [id])

  if (!service) {
    return (
      <div className="service-not-found">
        <div className="container text-center" style={{ paddingTop: '200px', paddingBottom: '100px' }}>
          <h2>Service not found.</h2>
          <Link to="/services" className="btn btn-primary" style={{ marginTop: '2rem' }}>Back to Services</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="service-detail-page">
      {/* Hero Section */}
      <section className="service-detail__hero">
        <div className="service-detail__hero-bg">
          <img src={service.heroImage} alt={service.title} />
          <div className="service-detail__hero-overlay"></div>
        </div>
        <div className="container">
          <div className="service-detail__hero-content reveal">
            <Link to="/services" className="service-detail__back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
              All Services
            </Link>
            <h1>{service.title}</h1>
            <p>{service.tagline}</p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="service-detail__intro section">
        <div className="container">
          <div className="service-detail__intro-grid">
            <div className="service-detail__intro-text reveal">
              <span className="section-label">Overview</span>
              <h2>Driving results through <em>expert execution.</em></h2>
              <p className="lead">{service.intro}</p>
            </div>
            <div className="service-detail__intro-image reveal reveal-delay-1">
              <img src={service.heroImage} alt="Service Overview" className="service-detail__showcase-img" />
              <div className="service-detail__img-backdrop"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="service-detail__features section bg-off-white">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <h2>What We Offer</h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto' }}>
              Comprehensive solutions tailored to your specific business requirements.
            </p>
          </div>
          <div className="service-detail__features-grid">
            {service.features.map((feature, i) => (
              <div key={i} className={`service-detail__feature-card reveal reveal-delay-${i + 1}`}>
                <div className="service-detail__feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="service-detail__cta section">
        <div className="container text-center reveal">
          <h2>Ready to elevate your {service.title.toLowerCase()}?</h2>
          <p>Let's discuss how we can help your business grow.</p>
          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">Start a Project</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
