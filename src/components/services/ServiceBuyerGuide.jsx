import { Link } from 'react-router-dom'
import ServiceScenarios from './ServiceScenarios'

const number = index => String(index + 1).padStart(2, '0')

export function ServiceProjectTypes({ service, contact }) {
  return <section className="work-section service-project-types" id="service-projects" aria-labelledby="service-projects-title"><div className="container">
    <div className="work-section-heading"><div><p className="work-eyebrow">What could we make together?</p><h2 id="service-projects-title">A service is a starting point.<br /><em>Here’s what it can become.</em></h2></div><p>Find the kind of project you have in mind. These are possible engagement types; the brief decides the exact deliverables.</p></div>
    <div className="service-project-grid">{service.experience.projects.map(([title, description, formats], index) => <article key={title} className="service-project-type"><div><span className="service-project-type__number">{number(index)}</span><span className="service-project-type__rule" aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p><p className="service-project-type__formats">{formats}</p><Link to={`${contact}&details=${encodeURIComponent(`Project type: ${title}`)}`}>Discuss this project type <span aria-hidden="true">↗</span></Link></article>)}</div>
    <div className="service-scenarios-intro"><h3>Where are you starting from?</h3><p>Choose the situation closest to yours to see how the work can begin.</p></div><ServiceScenarios scenarios={service.scenarios} />
  </div></section>
}

export function ServiceProblems({ service }) {
  return <section className="work-section service-problems" id="service-problems" aria-labelledby="service-problems-title"><div className="container service-problems__layout">
    <div className="service-problems__intro"><p className="work-eyebrow">10 familiar challenges / practical responses</p><h2 id="service-problems-title">Sound familiar?<br /><em>Let’s work through it.</em></h2><p>See how we would approach the problem—and what we would check before calling the work complete.</p><a href="#service-engagements" className="work-text-link">Find the right level of help ↓</a><span className="service-problems__index" aria-hidden="true">01—10</span></div>
    <div className="service-problem-list">{service.experience.problems.map(([problem, solution, validation], index) => <details className="service-problem" key={problem} name={`service-problems-${service.id}`} open={index === 0}>
      <summary><span className="service-problem__number">{number(index)}</span><h3>{problem}</h3><span className="service-problem__toggle" aria-hidden="true">+</span></summary><div className="service-problem__answer"><div><h4>Our approach</h4><p>{solution}</p></div><div><h4>How we check it</h4><p>{validation}</p></div></div>
    </details>)}</div>
  </div></section>
}

export function ServiceEngagements({ service, contact }) {
  const image = `/services/${service.experience.editorial}`
  return <section className="work-section service-engagements" id="service-engagements" aria-labelledby="service-engagements-title"><div className="container">
    <div className="service-engagements__intro"><figure><img src={`${image}-1280.webp`} srcSet={`${image}-640.webp 640w, ${image}-1280.webp 1280w`} sizes="(max-width: 760px) 92vw, 48vw" width="1280" height="853" alt={service.experience.editorialAlt} loading="lazy" decoding="async" /></figure><div><p className="work-eyebrow">A scope that fits the situation</p><h2 id="service-engagements-title">The right level of help.<br /><em>A purposeful next step.</em></h2><p>You may need an independent review, a defined build or a focused improvement. Start with the work that matters now, with responsibilities and boundaries agreed.</p><Link to={contact} className="work-text-link">Talk through the options ↗</Link></div></div>
    <div className="service-engagement-grid">{service.experience.engagements.map(([title, description, items], index) => <article key={title}><span className="work-eyebrow">Engagement / {number(index)}</span><h3>{title}</h3><p>{description}</p><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div>
  </div></section>
}

export function ServicePreparation({ service, contact }) {
  return <section className="work-section service-preparation" id="service-start" aria-labelledby="service-start-title"><div className="container service-preparation__layout"><div><p className="work-eyebrow">You do not need a perfect brief</p><h2 id="service-start-title">Bring the context.<br /><em>We’ll help shape the plan.</em></h2><p>A few useful inputs make the first conversation more specific. If something is missing, we can identify it together.</p><Link to={contact} className="btn btn-primary">Share your brief ↗</Link><p className="service-preparation__privacy">Use redacted examples where needed. Don’t send passwords or private customer records in an enquiry.</p></div><ol className="service-preparation-list">{service.experience.preparation.map(([title, text], index) => <li key={title}><span>{number(index)}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>
}

export function ServiceMeasurement({ service }) {
  return <section className="work-section service-measurement" id="service-measurement" aria-labelledby="service-measurement-title"><div className="container"><div className="work-section-heading"><div><p className="work-eyebrow">Evidence instead of empty promises</p><h2 id="service-measurement-title">Define what better means.<br /><em>Then check the work.</em></h2></div><p>A finished deliverable and a business result are different things. We agree what can be tested directly and what needs observation after release.</p></div><ol className="service-measurement-grid">{service.experience.measurement.map(([title, text], index) => <li key={title}><span className="service-measurement__step">{number(index)}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></div></section>
}
