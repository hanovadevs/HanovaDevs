import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SEO from '../components/SEO'
import { journalPosts } from '../data/journal'
import NotFound from './NotFound'
import './ServiceDetail_v2.css'

const servicesData = {
  'web-design': {
  "title": "Web Design & Development",
  "category": "Engineering",
  "tagline": "Clear content. Thoughtful design. Reliable delivery.",
  "intro": "We build business websites and web applications around your audience, content and goals. The scope connects interface design, responsive development, performance checks and handover.",
  "heroImage": "/news/product.svg",
  "features": [
    {
      "title": "Responsive interfaces",
      "desc": "Scoped responsive interfaces aligned with your project requirements."
    },
    {
      "title": "Content and CMS integration",
      "desc": "Scoped content and cms integration aligned with your project requirements."
    },
    {
      "title": "Performance and accessibility checks",
      "desc": "Scoped performance and accessibility checks aligned with your project requirements."
    }
  ],
  "technicalSpecs": [
    {
      "key": "Approach",
      "value": "React / Next.js / Vite"
    },
    {
      "key": "Implementation",
      "value": "Responsive CSS"
    },
    {
      "key": "Delivery",
      "value": "Testing and deployment"
    }
  ],
  "deliverables": [
    {
      "title": "Responsive interfaces",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Content and CMS integration",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Performance and accessibility checks",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Discover",
      "desc": "Understand the audience, workflow and constraints."
    },
    {
      "step": "02",
      "title": "Define",
      "desc": "Agree scope, responsibilities and acceptance criteria."
    },
    {
      "step": "03",
      "title": "Build",
      "desc": "Design and implement with review checkpoints."
    },
    {
      "step": "04",
      "title": "Validate",
      "desc": "Test the agreed paths and prepare the handover."
    }
  ],
  "blogs": [
    "future-of-web-dev"
  ],
  "advancements": [
    "React / Next.js / Vite",
    "Responsive CSS",
    "Testing and deployment"
  ],
  "relatedLinks": [
    {
      "title": "Explore all services",
      "path": "/services"
    },
    {
      "title": "Client project stories",
      "path": "/reviews"
    }
  ],
  "faqs": [
    {
      "question": "How do we start a project?",
      "answer": "Contact us with your goals and current constraints. We will discuss the scope, delivery approach, dependencies and next steps before work begins."
    },
    {
      "question": "Can you guarantee a score, ranking or business result?",
      "answer": "No. Outcomes depend on the scope and operating conditions. We agree suitable tests and measures, and report results with their context."
    },
    {
      "question": "What does handover include?",
      "answer": "Source access, documentation, accounts, licensing and support arrangements are specified in the proposal. Third-party subscriptions and future changes are discussed separately."
    }
  ]
},
  'shopify-development': {
  "title": "Shopify Store Development",
  "category": "Ecommerce",
  "tagline": "A storefront that makes your products easier to discover.",
  "intro": "We design and develop Shopify storefronts around your catalogue, brand and fulfilment needs. Theme work, app integrations and checkout-related changes are agreed against your plan and Shopify platform capabilities.",
  "heroImage": "/projects/earthsync.webp",
  "features": [
    {
      "title": "Storefront design",
      "desc": "Scoped storefront design aligned with your project requirements."
    },
    {
      "title": "Product and collection setup",
      "desc": "Scoped product and collection setup aligned with your project requirements."
    },
    {
      "title": "App and marketing integrations",
      "desc": "Scoped app and marketing integrations aligned with your project requirements."
    }
  ],
  "technicalSpecs": [
    {
      "key": "Approach",
      "value": "Shopify"
    },
    {
      "key": "Implementation",
      "value": "Liquid"
    },
    {
      "key": "Delivery",
      "value": "Catalogue and theme setup"
    }
  ],
  "deliverables": [
    {
      "title": "Storefront design",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Product and collection setup",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "App and marketing integrations",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Discover",
      "desc": "Understand the audience, workflow and constraints."
    },
    {
      "step": "02",
      "title": "Define",
      "desc": "Agree scope, responsibilities and acceptance criteria."
    },
    {
      "step": "03",
      "title": "Build",
      "desc": "Design and implement with review checkpoints."
    },
    {
      "step": "04",
      "title": "Validate",
      "desc": "Test the agreed paths and prepare the handover."
    }
  ],
  "blogs": [
    "custom-software-advantage"
  ],
  "advancements": [
    "Shopify",
    "Liquid",
    "Catalogue and theme setup"
  ],
  "relatedLinks": [
    {
      "title": "Explore all services",
      "path": "/services"
    },
    {
      "title": "Client project stories",
      "path": "/reviews"
    }
  ],
  "faqs": [
    {
      "question": "How do we start a project?",
      "answer": "Contact us with your goals and current constraints. We will discuss the scope, delivery approach, dependencies and next steps before work begins."
    },
    {
      "question": "Can you guarantee a score, ranking or business result?",
      "answer": "No. Outcomes depend on the scope and operating conditions. We agree suitable tests and measures, and report results with their context."
    },
    {
      "question": "What does handover include?",
      "answer": "Source access, documentation, accounts, licensing and support arrangements are specified in the proposal. Third-party subscriptions and future changes are discussed separately."
    }
  ]
},
  'software-development': {
  "title": "Custom Software Development",
  "category": "Engineering",
  "tagline": "Software shaped around the way your business works.",
  "intro": "We build custom applications and integrations for business workflows. Discovery defines users, permissions, information and acceptance criteria so that delivery can be tested against a clear scope.",
  "heroImage": "/news/infrastructure.svg",
  "features": [
    {
      "title": "Application and API development",
      "desc": "Scoped application and api development aligned with your project requirements."
    },
    {
      "title": "Roles and workflow design",
      "desc": "Scoped roles and workflow design aligned with your project requirements."
    },
    {
      "title": "Testing and handover",
      "desc": "Scoped testing and handover aligned with your project requirements."
    }
  ],
  "technicalSpecs": [
    {
      "key": "Approach",
      "value": "Node.js / Python"
    },
    {
      "key": "Implementation",
      "value": "PostgreSQL"
    },
    {
      "key": "Delivery",
      "value": "APIs and deployment"
    }
  ],
  "deliverables": [
    {
      "title": "Application and API development",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Roles and workflow design",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Testing and handover",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Discover",
      "desc": "Understand the audience, workflow and constraints."
    },
    {
      "step": "02",
      "title": "Define",
      "desc": "Agree scope, responsibilities and acceptance criteria."
    },
    {
      "step": "03",
      "title": "Build",
      "desc": "Design and implement with review checkpoints."
    },
    {
      "step": "04",
      "title": "Validate",
      "desc": "Test the agreed paths and prepare the handover."
    }
  ],
  "blogs": [
    "custom-software-advantage"
  ],
  "advancements": [
    "Node.js / Python",
    "PostgreSQL",
    "APIs and deployment"
  ],
  "relatedLinks": [
    {
      "title": "Explore all services",
      "path": "/services"
    },
    {
      "title": "Client project stories",
      "path": "/reviews"
    }
  ],
  "faqs": [
    {
      "question": "How do we start a project?",
      "answer": "Contact us with your goals and current constraints. We will discuss the scope, delivery approach, dependencies and next steps before work begins."
    },
    {
      "question": "Can you guarantee a score, ranking or business result?",
      "answer": "No. Outcomes depend on the scope and operating conditions. We agree suitable tests and measures, and report results with their context."
    },
    {
      "question": "What does handover include?",
      "answer": "Source access, documentation, accounts, licensing and support arrangements are specified in the proposal. Third-party subscriptions and future changes are discussed separately."
    }
  ]
},
  'seo': {
  "title": "SEO & Analytics",
  "category": "Discoverability",
  "tagline": "Help people find useful answers about your business.",
  "intro": "We improve technical discoverability, page content and measurement. SEO, AEO and GEO work starts with accurate information and crawlable pages. Search rankings, AI citations and revenue results are not guaranteed.",
  "heroImage": "/news/research.svg",
  "features": [
    {
      "title": "Technical and content audits",
      "desc": "Scoped technical and content audits aligned with your project requirements."
    },
    {
      "title": "Metadata and structured data",
      "desc": "Scoped metadata and structured data aligned with your project requirements."
    },
    {
      "title": "Search and performance reporting",
      "desc": "Scoped search and performance reporting aligned with your project requirements."
    }
  ],
  "technicalSpecs": [
    {
      "key": "Approach",
      "value": "Search Console"
    },
    {
      "key": "Implementation",
      "value": "Canonical URLs and sitemaps"
    },
    {
      "key": "Delivery",
      "value": "Consent-aware measurement"
    }
  ],
  "deliverables": [
    {
      "title": "Technical and content audits",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Metadata and structured data",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Search and performance reporting",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Discover",
      "desc": "Understand the audience, workflow and constraints."
    },
    {
      "step": "02",
      "title": "Define",
      "desc": "Agree scope, responsibilities and acceptance criteria."
    },
    {
      "step": "03",
      "title": "Build",
      "desc": "Design and implement with review checkpoints."
    },
    {
      "step": "04",
      "title": "Validate",
      "desc": "Test the agreed paths and prepare the handover."
    }
  ],
  "blogs": [
    "seo-trap-2026"
  ],
  "advancements": [
    "Search Console",
    "Canonical URLs and sitemaps",
    "Consent-aware measurement"
  ],
  "relatedLinks": [
    {
      "title": "Explore all services",
      "path": "/services"
    },
    {
      "title": "Client project stories",
      "path": "/reviews"
    }
  ],
  "faqs": [
    {
      "question": "How do we start a project?",
      "answer": "Contact us with your goals and current constraints. We will discuss the scope, delivery approach, dependencies and next steps before work begins."
    },
    {
      "question": "Can you guarantee a score, ranking or business result?",
      "answer": "No. Outcomes depend on the scope and operating conditions. We agree suitable tests and measures, and report results with their context."
    },
    {
      "question": "What does handover include?",
      "answer": "Source access, documentation, accounts, licensing and support arrangements are specified in the proposal. Third-party subscriptions and future changes are discussed separately."
    }
  ]
},
  'ai-automation': {
  "title": "AI Automation & Assistants",
  "category": "Automation",
  "tagline": "Give repetitive work a clearer, more useful workflow.",
  "intro": "We develop scoped AI assistants and automation workflows over agreed information and integrations. Tool permissions, human review and evaluation are defined before an automated system is used for important business actions.",
  "heroImage": "/news/ai.svg",
  "features": [
    {
      "title": "Website and knowledge assistants",
      "desc": "Scoped website and knowledge assistants aligned with your project requirements."
    },
    {
      "title": "Workflow integrations",
      "desc": "Scoped workflow integrations aligned with your project requirements."
    },
    {
      "title": "Evaluation and human-review paths",
      "desc": "Scoped evaluation and human-review paths aligned with your project requirements."
    }
  ],
  "technicalSpecs": [
    {
      "key": "Approach",
      "value": "Model and API integrations"
    },
    {
      "key": "Implementation",
      "value": "Retrieval over approved sources"
    },
    {
      "key": "Delivery",
      "value": "Workflow automation"
    }
  ],
  "deliverables": [
    {
      "title": "Website and knowledge assistants",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Workflow integrations",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Evaluation and human-review paths",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Discover",
      "desc": "Understand the audience, workflow and constraints."
    },
    {
      "step": "02",
      "title": "Define",
      "desc": "Agree scope, responsibilities and acceptance criteria."
    },
    {
      "step": "03",
      "title": "Build",
      "desc": "Design and implement with review checkpoints."
    },
    {
      "step": "04",
      "title": "Validate",
      "desc": "Test the agreed paths and prepare the handover."
    }
  ],
  "blogs": [
    "ai-privacy-first"
  ],
  "advancements": [
    "Model and API integrations",
    "Retrieval over approved sources",
    "Workflow automation"
  ],
  "relatedLinks": [
    {
      "title": "Explore all services",
      "path": "/services"
    },
    {
      "title": "Client project stories",
      "path": "/reviews"
    }
  ],
  "faqs": [
    {
      "question": "How do we start a project?",
      "answer": "Contact us with your goals and current constraints. We will discuss the scope, delivery approach, dependencies and next steps before work begins."
    },
    {
      "question": "Can you guarantee a score, ranking or business result?",
      "answer": "No. Outcomes depend on the scope and operating conditions. We agree suitable tests and measures, and report results with their context."
    },
    {
      "question": "What does handover include?",
      "answer": "Source access, documentation, accounts, licensing and support arrangements are specified in the proposal. Third-party subscriptions and future changes are discussed separately."
    }
  ]
},
  'branding': {
  "title": "Brand Identity & Strategy",
  "category": "Design",
  "tagline": "A visual identity that feels like your business.",
  "intro": "We develop logos, typography, colours and practical brand assets around your audience and positioning. The deliverables and usage rights are agreed in the proposal, with a consistent system for digital and print touchpoints.",
  "heroImage": "/news/business.svg",
  "features": [
    {
      "title": "Logo and identity design",
      "desc": "Scoped logo and identity design aligned with your project requirements."
    },
    {
      "title": "Typography and colour systems",
      "desc": "Scoped typography and colour systems aligned with your project requirements."
    },
    {
      "title": "Brand guidance and asset kits",
      "desc": "Scoped brand guidance and asset kits aligned with your project requirements."
    }
  ],
  "technicalSpecs": [
    {
      "key": "Approach",
      "value": "Visual identity"
    },
    {
      "key": "Implementation",
      "value": "Design systems"
    },
    {
      "key": "Delivery",
      "value": "Asset handover"
    }
  ],
  "deliverables": [
    {
      "title": "Logo and identity design",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Typography and colour systems",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    },
    {
      "title": "Brand guidance and asset kits",
      "desc": "Requirements, acceptance conditions and handover are agreed in the project proposal."
    }
  ],
  "process": [
    {
      "step": "01",
      "title": "Discover",
      "desc": "Understand the audience, workflow and constraints."
    },
    {
      "step": "02",
      "title": "Define",
      "desc": "Agree scope, responsibilities and acceptance criteria."
    },
    {
      "step": "03",
      "title": "Build",
      "desc": "Design and implement with review checkpoints."
    },
    {
      "step": "04",
      "title": "Validate",
      "desc": "Test the agreed paths and prepare the handover."
    }
  ],
  "blogs": [
    "octopus-philosophy"
  ],
  "advancements": [
    "Visual identity",
    "Design systems",
    "Asset handover"
  ],
  "relatedLinks": [
    {
      "title": "Explore all services",
      "path": "/services"
    },
    {
      "title": "Client project stories",
      "path": "/reviews"
    }
  ],
  "faqs": [
    {
      "question": "How do we start a project?",
      "answer": "Contact us with your goals and current constraints. We will discuss the scope, delivery approach, dependencies and next steps before work begins."
    },
    {
      "question": "Can you guarantee a score, ranking or business result?",
      "answer": "No. Outcomes depend on the scope and operating conditions. We agree suitable tests and measures, and report results with their context."
    },
    {
      "question": "What does handover include?",
      "answer": "Source access, documentation, accounts, licensing and support arrangements are specified in the proposal. Third-party subscriptions and future changes are discussed separately."
    }
  ]
},
}

export default function ServiceDetail() {
  const { id } = useParams()
  const service = servicesData[id]
  const relatedPosts = service ? journalPosts.filter(p => service.blogs.includes(p.slug)) : []
  const [activeFaq, setActiveFaq] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!service) return <NotFound />

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  // Generate Answer Engine Optimization (AEO) JSON-LD for this specific service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "Organization",
      "name": "HanovaDevs"
    },
    "description": service.intro,
    "offers": {
      "@type": "Offer",
      "description": service.tagline
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Service Features",
      "itemListElement": service.features.map((feat, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feat.title,
          "description": feat.desc
        },
        "position": index + 1
      }))
    }
  }

  return (
    <div className="service-detail-page">
      <SEO 
        title={service.title} 
        description={service.intro.substring(0, 160) + '...'}
        url={`/services/${id}`}
        schemaMarkup={serviceSchema}
        faqList={service.faqs}
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Services', item: '/services' },
          { name: service.title, item: `/services/${id}` }
        ]}
      />
      
      {/* Hero Section */}
      <section className="service-detail__hero">
        <div className="service-detail__hero-bg">
          <img src={service.heroImage} alt={service.title} />
          <div className="service-detail__hero-overlay"></div>
        </div>
        <div className="container">
          <div className="service-detail__hero-content reveal">
            <div className="service-detail__breadcrumbs">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/services">Services</Link>
              <span>/</span>
              <span className="current">{service.category}</span>
            </div>
            <span className="service-detail__tag card-glass">{service.category}</span>
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
              
              <div className="service-detail__specs-table reveal reveal-delay-1">
                <h3>Technical Specifications</h3>
                <div className="specs-grid">
                  {service.technicalSpecs.map((spec, i) => (
                    <div key={i} className="spec-item">
                      <span className="spec-label">{spec.key}</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="service-detail__intro-image reveal reveal-right reveal-delay-1">
              <img src={service.heroImage} alt="Service Overview" className="service-detail__showcase-img" />
              <div className="service-detail__img-backdrop"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Checklist Section (NEW) */}
      <section className="service-detail__deliverables section bg-off-white">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
            <span className="section-label">Scope of Work</span>
            <h2>Granular <em>Deliverables Checklist</em></h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Every package is engineered with clear checklists and milestones. Here is exactly what we deliver.
            </p>
          </div>
          
          <div className="deliverables-grid">
            {service.deliverables.map((item, i) => (
              <div key={i} className={`deliverable-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="deliverable-check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div className="deliverable-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio/Showcase Gallery Section */}
      {service.gallery && (
        <section className="service-detail__gallery section">
          <div className="container">
            <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
              <span className="section-label">Design Gallery</span>
              <h2>Our <em>Creative Showcase</em></h2>
              <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
                Take a look at some of our recent logo design, branding systems, and premium packaging work.
              </p>
            </div>
            
            <div className="service-detail__gallery-grid">
              {service.gallery.map((item, i) => (
                <div key={i} className={`service-detail__gallery-card reveal reveal-delay-${(i % 3) + 1}`}>
                  <div className="gallery-card__image-wrapper">
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="gallery-card__category">{item.category}</span>
                  </div>
                  <div className="gallery-card__info">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="service-detail__process section">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <span className="section-label">Workflow</span>
            <h2>Our <em>Process</em></h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto' }}>
              A systematic approach to engineering excellence and creative growth.
            </p>
          </div>
          <div className="service-detail__process-grid">
            {service.process.map((p, i) => (
              <div key={i} className={`service-detail__process-card reveal reveal-delay-${i + 1}`}>
                <div className="service-detail__process-step">{p.step}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                {i < service.process.length - 1 && <div className="process-path" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-off-white"><div className="container"><span className="section-label">Our work</span><h2>Explore client project stories.</h2><p>See the business context and delivered experience. Numerical outcomes are published only with supporting measurements.</p><Link to="/reviews" className="btn btn-primary mt-lg">View client stories</Link></div></section>

      {/* Features Section */}
      <section className="service-detail__features section bg-off-white">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
            <h2>What We Offer</h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
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

          <div className="service-detail__advancements-wrap reveal">
            <div className="service-detail__advancements">
              <h3>Advanced Capabilities</h3>
              <ul>
                {service.advancements.map((adv, i) => (
                  <li key={i}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="service-detail__related">
              <h3>Related Services</h3>
              <div className="service-detail__related-links">
                {service.relatedLinks.map((link, i) => (
                  <Link key={i} to={link.path} className="service-detail__r-link hoverable">
                    {link.title}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Collapsible FAQ Accordion Section (NEW) */}
      <section className="service-detail__faq section">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <span className="section-label">FAQ</span>
            <h2>Frequently Asked <em>Questions</em></h2>
            <p style={{ color: 'var(--blue-grey)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
              Have questions about our operations? Here are direct answers to our most common operational inquiries.
            </p>
          </div>
          
          <div className="jn-faq-accordion reveal">
            {service.faqs.map((faq, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className={`jn-faq-item ${isOpen ? 'active' : ''}`}>
                  <button 
                    className="jn-faq-trigger" 
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                  >
                    <span className="jn-faq-question">{faq.question}</span>
                    <span className="jn-faq-icon-wrap">
                      <svg 
                        className="jn-faq-icon" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" className="line-vertical"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </span>
                  </button>
                  <div className="jn-faq-content" hidden={!isOpen} style={{ maxHeight: isOpen ? 'none' : '0' }}>
                    <div className="jn-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Insights (Blog Links) */}
      {relatedPosts.length > 0 && (
        <section className="service-detail__insights section bg-off-white">
          <div className="container">
            <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
              <span className="section-label">Resources</span>
              <h2>Related <em>Guides</em></h2>
            </div>
            <div className="service-detail__insights-grid">
              {relatedPosts.map((post, i) => (
                <Link to={`/journal/${post.slug}`} key={i} className="service-detail__insight-card reveal reveal-delay-1">
                  <div className="insight-card__image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="insight-card__content">
                    <h3>{post.title}</h3>
                    <div className="insight-card__link">Read Article <span>→</span></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* ===== INTERACTIVE CALCULATOR PROMO ===== */}
      <section className="calc-promo-section section bg-off-white" style={{ borderTop: '1px solid #f1f5f9' }}>
        <div className="container">
          <div className="calc-promo-grid">
            <div className="calc-promo-content reveal">
              <span className="section-label">Interactive Planner</span>
              <h2>Project Your <span className="gradient-text">{service.title}</span> Budget</h2>
              <p>
                Want a granular cost and timeline estimate for your {service.title.toLowerCase()} project? 
                Adjust technical stacks, features, and delivery speeds in our interactive calculator to get an instant scope sheet.
              </p>
              <Link to="/calculator" className="btn btn-primary" style={{ display: 'inline-flex', gap: '0.5rem', textDecoration: 'none' }}>
                Estimate {service.title} Cost 🚀
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
            
            <div className="calc-promo-preview reveal reveal-right reveal-delay-1">
              <div className="calc-preview-card">
                <div className="calc-preview-header">
                  <span className="calc-preview-title">Scope Calculator</span>
                  <span className="calc-preview-badge">Live</span>
                </div>
                <div className="calc-preview-body">
                  <div className="calc-preview-row">
                    <span className="calc-preview-label">Estimated Delivery Speed</span>
                    <div className="calc-preview-slider-track">
                      <div className="calc-preview-slider-fill" style={{ width: '85%' }}></div>
                      <div className="calc-preview-slider-thumb" style={{ left: '85%' }}></div>
                    </div>
                  </div>
                  <div className="calc-preview-results">
                    <span className="calc-preview-result-val">⚡ Expedited Sprints</span>
                    <span className="calc-preview-result-lbl">Timeline Reduced by ~35%</span>
                  </div>
                  <Link to="/calculator" className="calc-preview-btn">
                    Configure Scope
                  </Link>
                </div>
              </div>
            </div>
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
