import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { clientProjects, company } from '../data/company'
import './Reviews.css'

const filters = ['All work', ...new Set(clientProjects.map(project => project.category))]

export default function Reviews() {
  const [category, setCategory] = useState('All work')
  const [form, setForm] = useState({ name: '', project: clientProjects[0].id, rating: '', feedback: '' })
  const stories = useMemo(() => clientProjects.filter(project => category === 'All work' || project.category === category), [category])
  const edit = event => setForm(value => ({ ...value, [event.target.name]: event.target.value }))
  const emailReview = event => {
    event.preventDefault()
    const project = clientProjects.find(item => item.id === form.project)
    const body = `Name: ${form.name}\nProject: ${project.title}\nRating: ${form.rating || 'Not specified'}\n\n${form.feedback}\n\nPlease contact me to confirm attribution and publication permission.`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Client feedback: ${project.title}`)}&body=${encodeURIComponent(body)}`
  }
  return (
    <div className="reviews-page">
      <SEO title="Client Stories & Reviews — Real Projects, Clear Outcomes" description="Meet the clients behind EarthSync Essentials, Terra Sol Grounding, Crown Accumulators, and RAQS. Explore HanovaDevs project stories and share your experience." url="/reviews" pageType="CollectionPage" breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Client stories & reviews', item: '/reviews' }]} />
      <section className="reviews-hero"><div className="container reviews-hero__layout">
        <div><span className="reviews-eyebrow">Client stories & reviews</span><h1>Good work.<br /><em>Real partnerships.</em></h1><p>A closer look at the people and businesses behind our work. Different industries, shared care for the experience their customers receive.</p><a className="btn btn-primary" href="#client-stories">Explore the stories ↓</a></div>
        <aside className="reviews-people"><span className="reviews-eyebrow">The people behind the projects</span>{clientProjects.map(project => <div className="reviews-person" key={project.id}><span className="reviews-avatar" style={{ '--client-accent': project.accent }}>{project.initials}</span><div><strong>{project.owner}</strong><span>Owner · {project.title}</span></div><span className="reviews-person__arrow" aria-hidden="true">↗</span></div>)}<p>Four client relationships, each with a story of its own.</p></aside>
      </div></section>
      <section className="section container" id="client-stories"><div className="reviews-section-heading"><div><span className="reviews-eyebrow">Selected partnerships</span><h2>What we built together.</h2></div><Link to="/projects">View the portfolio ↗</Link></div>
        <div className="reviews-filters" role="group" aria-label="Filter client stories">{filters.map(filter => <button key={filter} aria-pressed={category === filter} className={category === filter ? 'is-active' : ''} onClick={() => setCategory(filter)}>{filter}</button>)}</div>
        <div className="reviews-grid" aria-live="polite">{stories.map(project => <article key={project.id} className="review-story" style={{ '--client-accent': project.accent }}>
          <Link to={`/projects/${project.id}`} className="review-story__image"><img src={project.image} width="800" height="556" loading="lazy" alt={`${project.title} website screenshot`} /><span>{project.category}</span></Link>
          <div className="review-story__body"><div className="reviews-person"><span className="reviews-avatar">{project.initials}</span><div><strong>{project.owner}</strong><span>Owner · {project.title}</span></div></div><h3>{project.title}</h3><p>{project.overview}</p>{project.quote && <blockquote>{project.quote}</blockquote>}<div className="review-story__outcome"><span>Project outcome</span><p>{project.result}</p></div><details><summary>Explore the project focus</summary><p>{project.challenge}</p><ul>{project.deliverables.map(item => <li key={item}>{item}</li>)}</ul></details><div className="review-story__links"><Link to={`/projects/${project.id}`}>Read the case study →</Link><a href={project.url} target="_blank" rel="noopener noreferrer">Visit website ↗</a></div></div>
        </article>)}</div>
        <p className="reviews-editorial-note">Client identities and project relationships are provided by HanovaDevs. These are project summaries; attributed reviews and measured results are published after approval.</p>
      </section>
      <section className="reviews-feedback section"><div className="container reviews-feedback__layout"><div><span className="reviews-eyebrow">Your experience matters</span><h2>Worked with us?<br /><em>Tell your story.</em></h2><p>Share what the collaboration was like, what we delivered, and what could be better. Specific, honest feedback is the most useful kind.</p><p>We confirm authorship and publication permission before featuring a review.</p><Link to="/contact">Need help with your project instead? →</Link></div>
        <form className="reviews-form" onSubmit={emailReview}><label>Your name<input name="name" autoComplete="name" value={form.name} onChange={edit} required maxLength="100" /></label><label>Project<select name="project" value={form.project} onChange={edit}>{clientProjects.map(project => <option value={project.id} key={project.id}>{project.title}</option>)}</select></label><fieldset><legend>Your rating <span>(optional)</span></legend><div className="reviews-rating">{[1,2,3,4,5].map(rating => <label key={rating}><input type="radio" name="rating" value={rating} checked={form.rating === String(rating)} onChange={edit} aria-label={`${rating} out of 5`} /><span aria-hidden="true">{rating} ★</span></label>)}</div></fieldset><label>Your feedback<textarea name="feedback" rows="5" value={form.feedback} onChange={edit} required minLength="20" maxLength="3000" placeholder="What did we work on, and how did the experience go?" /></label><button className="btn btn-primary" type="submit">Email your review ↗</button><p>Opens your email app with a draft addressed to <a href={`mailto:${company.email}`}>{company.email}</a>.</p></form>
      </div></section>
    </div>
  )
}
