import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ProjectCard from '../components/ProjectCard'
import { caseStudies } from '../data/caseStudies'
import './WorkPages.css'

export default function Projects() {
  const [filter, setFilter] = useState('All projects')
  const studies = caseStudies.filter(study => filter === 'All projects' || (filter === 'Commerce & brands' ? study.id !== 'crown' : study.id === 'crown'))
  return <div className="work-page work-index">
    <SEO title="Client Case Studies — Websites, Commerce & Business" description="Explore HanovaDevs case studies for EarthSync Essentials, Terra Sol Grounding, Crown Accumulators and RAQS: context, delivered work and actual website captures." url="/projects" pageType="CollectionPage" breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Projects', item: '/projects' }]} />
    <section className="work-index-hero"><div className="work-hero-curve" aria-hidden="true" /><div className="container"><p className="work-eyebrow">Selected client work</p><h1>Behind the interface,<br /><em>a business problem.</em></h1><p>A closer look at the context, the work delivered and the customer-facing experiences around it. Real website captures. Outcomes kept in perspective.</p><div className="work-actions"><a href="#case-studies" className="btn btn-primary">Explore the case studies ↓</a><Link to="/contact" className="work-text-link">Bring us your brief ↗</Link></div><div className="work-index-note"><span>01 / Understand the problem</span><span>02 / See the work</span><span>03 / Review the evidence</span></div></div></section>
    <section className="work-section" id="case-studies"><div className="container"><div className="work-filter-bar"><div role="group" aria-label="Filter case studies">{['All projects', 'Commerce & brands', 'Industrial business'].map(item => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div><p role="status">{studies.length} case {studies.length === 1 ? 'study' : 'studies'}</p></div><div className="work-card-grid work-card-grid--index">{studies.map(study => <ProjectCard key={study.id} study={study} />)}</div><aside className="work-evidence-note"><span className="work-eyebrow">What the evidence means</span><p>These stories combine company-supplied project context with public website captures reviewed on 17 October 2026. Captures document an interface—not conversion rates, revenue or a full functional audit. Quantified business outcomes are published only with supporting evidence.</p></aside></div></section>
    <section className="work-closing"><div className="container"><p className="work-eyebrow">Your context comes first</p><h2>A different business.<br /><em>A project shaped around it.</em></h2><p>Tell us what needs to work better, who it is for and where you want to go next.</p><div className="work-actions"><Link to="/contact" className="btn btn-primary">Discuss a project ↗</Link><Link to="/services" className="work-text-link">Explore our services ↗</Link></div></div></section>
  </div>
}
