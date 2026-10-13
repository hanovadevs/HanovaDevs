import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { clientProjects } from '../data/company'
import './Projects.css'
import './CompanyPages.css'

export default function Projects() {
  return (
    <div className="projects-page">
      <SEO title="Client Projects — Software, Ecommerce & Business Websites" description="Explore HanovaDevs client projects for EarthSync Essentials, Terra Sol Grounding, Crown Accumulators, and RAQS." url="/projects" pageType="CollectionPage" breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Projects', item: '/projects' }]} />
      <section className="pj-hero"><div className="pj-hero__bg" /><div className="container"><div className="pj-hero__content"><span className="pj-label">Selected client work</span><h1>Different businesses.<br /><span className="pj-gradient">Purposeful digital work.</span></h1><p>Explore the brands we work with and the customer-facing experiences built around them.</p><Link to="/reviews" className="btn btn-primary mt-lg">Client stories & reviews →</Link></div></div></section>
      <div className="pj-showcases">{clientProjects.map((project, index) => <section id={project.id} key={project.id} className={`pj-case pj-case--${project.theme}`}><div className="container"><div className={`pj-case__layout ${index % 2 ? 'pj-case__layout--reverse' : ''}`}>
        <div className="pj-case__text"><span className="pj-case__category">{project.category}</span><h2>{project.title}</h2><p className="project-owner">Client: {project.owner} · Owner of {project.title}</p><p className="pj-case__overview">{project.overview}</p><div className="pj-case__details"><div className="pj-case__detail-block"><h4>The focus</h4><p>{project.challenge}</p></div><div className="pj-case__detail-block"><h4>The experience</h4><p>{project.solution}</p></div></div><div className="project-deliverables">{project.deliverables.map(item => <span key={item}>{item}</span>)}</div><a href={project.url} target="_blank" rel="noopener noreferrer" className="btn pj-btn">Visit project website ↗</a></div>
        <div className="pj-case__visual"><a href={project.url} target="_blank" rel="noopener noreferrer" className="pj-frame-link"><div className="pj-frame"><div className="pj-frame__header"><div className="pj-frame__dots"><span/><span/><span/></div><span className="pj-frame__url">{new URL(project.url).hostname}</span></div><img src={project.image} alt={`${project.title} website project`} className="pj-frame__img" loading="lazy" width="1200" height="800" /></div></a></div>
      </div></div></section>)}</div>
      <section className="pj-cta section"><div className="container text-center"><h2>A project with your business in mind.</h2><p>Let’s discuss the audience, workflow, and experience you need.</p><Link to="/contact" className="btn btn-primary mt-lg">Start your project</Link></div></section>
    </div>
  )
}
