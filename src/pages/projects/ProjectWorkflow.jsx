import { Link, useParams } from 'react-router-dom'
import SEO from '../../components/shared/SEO'
import { caseStudyById } from '../../data/caseStudies'
import { projectWorkflows, workflowsFor } from '../../data/projectWorkflows'
import NotFound from '../errors/NotFound'
import '../../styles/WorkPages.css'

export default function ProjectWorkflow() {
  const { id, moduleId } = useParams()
  const study = Object.hasOwn(caseStudyById, id) ? caseStudyById[id] : null
  const workflow = projectWorkflows.find(item => item.projectId === id && item.id === moduleId)
  if (!study || !workflow) return <NotFound />
  const contact = `/contact?source=case-study&service=${encodeURIComponent('A custom CRM project')}&details=${encodeURIComponent(`I’d like to discuss ${workflow.title.toLowerCase()}, inspired by the ${study.title} project.`)}`
  return <div className={`work-page project-workflow work-feature--${study.tone}`}>
    <SEO title={`${workflow.title} — ${study.title}`} description={workflow.intro} url={workflow.path} image={workflow.image} imageAlt={`${study.title}: ${workflow.title}`} faqList={workflow.faqs.map(([question, answer]) => ({ question, answer }))} breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Projects', item: '/projects' }, { name: study.title, item: study.path }, { name: workflow.title, item: workflow.path }]} />
    <section className="case-study-hero"><div className="work-hero-curve" aria-hidden="true" /><div className="container">
      <nav className="work-breadcrumbs" aria-label="Breadcrumb"><Link to={study.path}>{study.title}</Link><span aria-hidden="true">/</span><span>Workflow story</span></nav>
      <p className="work-eyebrow">{workflow.eyebrow}</p><h1>{workflow.title}</h1><p className="work-lead">{workflow.intro}</p><p className="work-access-note">Admin-only application · Company-supplied interface preview</p>
      <nav className="workflow-switcher" aria-label="Project workflows">{workflowsFor(id).map(item => <Link key={item.id} to={item.path} aria-current={item.id === moduleId ? 'page' : undefined}>{item.title}</Link>)}</nav>
      <figure className="workflow-hero-figure"><a href={workflow.image} target="_blank" rel="noopener noreferrer" aria-label={`Open full screenshot: ${workflow.title}`}><img src={workflow.image} width="1600" height="780" alt={`${workflow.title} screenshot supplied by HanovaDevs`} fetchPriority="high" /></a><figcaption>{workflow.caption} Open the image for a full-size view.</figcaption></figure>
    </div></section>
    <section className="work-section"><div className="container case-story-grid"><div><p className="work-eyebrow">The design context</p><h2>Built around<br /><em>the work at hand.</em></h2></div><p className="work-body-lead">{workflow.context}</p></div></section>
    <section className="work-section workflow-details"><div className="container"><p className="work-eyebrow">Reading the interface</p><h2>The details<br /><em>that connect the experience.</em></h2><div className="workflow-detail-grid">{workflow.details.map(([title, text], index) => <article key={title}><span className="work-eyebrow">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="work-section"><div className="container"><p className="work-eyebrow">The intended journey</p><h2>A clearer path<br /><em>through the task.</em></h2><ol className="workflow-sequence">{workflow.sequence.map(step => <li key={step}>{step}</li>)}</ol><aside className="work-evidence-note"><p>This is an editorial walkthrough based on the supplied screenshot, not a live product demo or a test of the underlying workflow. No performance, security or business-outcome certification is implied.</p></aside></div></section>
    <section className="work-section case-evidence"><div className="container"><p className="work-eyebrow">A few useful distinctions</p><h2>About this walkthrough.</h2><div className="work-faq-list">{workflow.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><Link to={study.path} className="work-text-link">Back to the full {study.title} case study ↗</Link></div></section>
    <section className="work-closing"><div className="container"><p className="work-eyebrow">A system shaped around your work</p><h2>Your workflows.<br /><em>Thoughtfully connected.</em></h2><p>Tell us where your existing tools create friction and what a clearer working day would look like.</p><Link to={contact} className="btn btn-primary">Discuss a similar workflow ↗</Link></div></section>
  </div>
}
