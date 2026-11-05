import { Link, useParams } from 'react-router-dom'
import SEO from '../../components/shared/SEO'
import ServiceVisual from '../../components/services/ServiceVisual'
import { ServiceProjectTypes, ServiceProblems, ServiceEngagements, ServicePreparation, ServiceMeasurement } from '../../components/services/ServiceBuyerGuide'
import ProjectCard from '../../components/projects/ProjectCard'
import { services, serviceById } from '../../data/services'
import { caseStudyById } from '../../data/caseStudies'
import { journalPosts } from '../../data/journal'
import { company } from '../../data/company'
import NotFound from '../errors/NotFound'
import '../../styles/WorkPages.css'
import './ServiceEditorial.css'
import './ServiceExperience.css'

function ServiceContent({ service }) {
  const path = `/services/${service.id}`
  const contact = `/contact?source=service&service=${encodeURIComponent(service.title)}`
  const related = service.cases.map(id => caseStudyById[id])
  const article = journalPosts.find(post => post.slug === service.journal)
  const hasGrowtechReview = ['web-design', 'software-development'].includes(service.id)
  return <div className={`service-editorial service-experience work-page work-tone--${service.tone}`}>
    <SEO title={service.title} description={service.description} url={path} image={service.experience.image} imageAlt={service.experience.imageAlt} faqList={service.faqs} mainEntity={{ '@id': `${company.url}${path}#service` }} breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Services', item: '/services' }, { name: service.title, item: path }]} schemaMarkup={{ '@type': 'Service', '@id': `${company.url}${path}#service`, name: service.title, serviceType: service.title, description: service.description, url: `${company.url}${path}`, provider: { '@id': `${company.url}/#organization` } }} />

    <section className="service-editorial-hero">
      <div className="service-hero-line" aria-hidden="true" />
      <div className="container">
        <nav className="work-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/services">Services</Link><span aria-hidden="true">/</span><span>{service.shortTitle}</span></nav>
        <div className="service-editorial-hero__grid">
          <div className="service-hero-copy"><p className="work-eyebrow">HanovaDevs / {service.category}</p><h1>{service.title}<span>.</span></h1><p className="service-editorial-hero__headline">{service.experience.promise}</p><p className="work-lead">{service.description}</p><div className="work-actions"><Link to={contact} className="btn btn-primary">Discuss your project ↗</Link><a href="#service-projects" className="work-text-link">Explore project types ↓</a></div></div>
          <ServiceVisual service={service} />
        </div>
        <div className="service-hero-foot"><span>01 / Understand the business</span><span>02 / Build with purpose</span><span>03 / Hand over with clarity</span></div>
      </div>
    </section>

    <nav className="work-jump-nav" aria-label="On this service page"><div className="container">{[['service-overview', 'Overview'], ['service-projects', 'Project types'], ['service-problems', 'Problems & solutions'], ['service-engagements', 'Ways to work together'], ['service-process', 'Process'], ['service-proof', 'Related work'], ['service-start', 'Getting started'], ['service-faq', 'FAQs']].map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</div></nav>

    <section className="work-section" id="service-overview"><div className="container service-overview-grid"><div><p className="work-eyebrow">Start with the right problem</p><h2>{service.headline}</h2><p className="work-body-lead">{service.overview}</p></div><aside className="service-fit"><span className="work-eyebrow">Is this the right fit?</span><ul>{service.fits.map((fit, index) => <li key={fit}><span>0{index + 1}</span>{fit}</li>)}</ul><p>Start with your goal. We’ll help define the right scope.</p></aside></div></section>

    <section id="service-scope" className="work-section service-scope"><div className="container"><div className="work-section-heading"><div><p className="work-eyebrow">What comes together</p><h2>Considered in detail.<br /><em>Connected by design.</em></h2></div><p>The right result needs more than one isolated deliverable. These workstreams help shape a coherent engagement.</p></div><div className="service-capabilities">{service.capabilities.map(([title, text], index) => <article key={title}><span className="service-card-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <ServiceProjectTypes service={service} contact={contact} />
    <ServiceProblems service={service} />
    <ServiceEngagements service={service} contact={contact} />

    <section className="work-section service-process" id="service-process"><div className="container"><div className="work-section-heading"><div><p className="work-eyebrow">From the first conversation to delivery</p><h2>Know what happens next.</h2></div><p>Review points make decisions visible. Scope, dependencies and feedback responsibilities shape the delivery plan.</p></div><ol className="service-process-list">{service.process.map(([title, text], index) => <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>

    <section className="work-section service-handover" id="service-handover"><div className="container"><div className="service-handover-grid"><div><p className="work-eyebrow">Designed to be useful after delivery</p><h2>A handover.<br /><em>Not a mystery.</em></h2><p>Know what you own, what your team can change and who is responsible for the next update. The proposal sets out files, access, documentation and support.</p><div className="service-stack">{service.stack.map(item => <span key={item}>{item}</span>)}</div><p className="work-small">Third-party fees and ongoing work are discussed separately.</p></div><div className="service-handover-sheet"><span className="work-eyebrow">Your scoped handover</span><ul>{service.deliverables.map((item, index) => <li key={item}><span aria-hidden="true">0{index + 1}</span>{item}</li>)}</ul><span className="service-sheet-footer">Defined in the proposal. Reviewed before handover.</span></div></div><div className="service-acceptance"><p className="work-eyebrow">Quality is part of the work</p><div className="service-quality">{service.quality.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div></div></section>

    <section className="work-section service-proof" id="service-proof"><div className="container"><div className="work-section-heading"><div><p className="work-eyebrow">See the thinking in practice</p><h2>{related.length ? 'The work, not just the words.' : 'Built here. Explained clearly.'}</h2></div><p>{service.proofNote || 'Explore the challenge, delivered interface and evidence behind the story. Each project has its own context and outcomes.'}</p></div>{related.length > 0 ? <div className="work-card-grid">{related.map(study => <ProjectCard key={study.id} study={study} compact />)}</div> : <article className="service-example"><div><span className="work-eyebrow">{service.example.label}</span><h3>{service.example.title}</h3><p>{service.example.text}</p><Link to={service.example.path} className="work-text-link">{service.id === 'ai-automation' ? 'Discuss an assistant project' : 'Explore the reference'} ↗</Link></div><div className="service-example-note"><span>Explore the implementation</span><p>In-house examples show an approach and its boundaries. Your scope and results will depend on your requirements and operating context.</p></div></article>}
      {hasGrowtechReview && <aside className="service-client-note"><span className="work-eyebrow">In the client’s words</span><blockquote>“What impressed us most was their ability to understand our business requirements and turn complex ideas into a clean, user-friendly, and functional system.”</blockquote><div><p><strong>Affan Mughal</strong><span>Founder, GrowTech Advertising</span></p><Link to="/reviews" className="work-text-link">Read the full client review ↗</Link></div></aside>}
    </div></section>

    <ServiceMeasurement service={service} />
    <ServicePreparation service={service} contact={contact} />

    <section className="work-section service-faq" id="service-faq"><div className="container service-faq-grid"><div><p className="work-eyebrow">Useful answers before we start</p><h2>Less uncertainty.<br /><em>A better first conversation.</em></h2><p>Have a question specific to your project? Tell us the context and we’ll discuss the next step.</p><Link to={contact} className="work-text-link">Ask the team ↗</Link></div><div className="work-faq-list">{service.faqs.map(faq => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</div></div></section>

    <section className="work-closing service-closing"><div className="container"><p className="work-eyebrow">Your next project starts with a conversation</p><h2>Bring us the challenge.<br /><em>Let’s make a clear plan.</em></h2><p>Tell us what you need to improve, what you have already tried and what matters most.</p><Link to={contact} className="btn btn-primary">Let’s discuss your project ↗</Link><div className="service-reading">{article && <Link to={`/journal/${article.slug}`}><span>Worth reading</span>{article.title} ↗</Link>}{service.planner && <Link to="/calculator"><span>Illustrative planning tool</span>Explore a project estimate ↗</Link>}<Link to={`/services/${services.find(item => item.id !== service.id && item.id !== 'branding').id}`}><span>A connected capability</span>Explore another service ↗</Link></div></div></section>
  </div>
}

export default function ServiceDetail() {
  const { id } = useParams()
  const service = Object.hasOwn(serviceById, id) ? serviceById[id] : null
  return service ? <ServiceContent key={id} service={service} /> : <NotFound />
}
