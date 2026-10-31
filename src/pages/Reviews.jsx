import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { company } from '../data/company'
import { caseStudies } from '../data/caseStudies'
import { clientStories, clientStoryFilters, createReviewEmail } from '../data/clientStories'
import { collectionGraph } from '../lib/seo'
import './Reviews.css'

export default function Reviews() {
  const [category, setCategory] = useState('All work')
  const [form, setForm] = useState({ name: '', project: caseStudies[0].id, rating: '', feedback: '' })
  const [draft, setDraft] = useState('')
  const stories = clientStories.filter(story => category === 'All work' || story.category === category)
  const edit = event => {
    setForm(value => ({ ...value, [event.target.name]: event.target.value }))
    setDraft('')
  }
  const prepareReview = event => {
    event.preventDefault()
    setDraft(createReviewEmail(form))
  }

  return <div className="reviews-page">
    <SEO title="Client Stories & Reviews" description="Meet the people behind HanovaDevs projects: Affan Mughal of GrowTech Advertising, Crown Accumulators, EarthSync, Terra Sol, RAQS and the Zozo platform."
      url="/reviews" pageType="CollectionPage" mainEntity={{ '@id': `${company.url}/reviews#collection` }}
      schemaMarkup={collectionGraph('/reviews', 'HanovaDevs client project stories', stories.flatMap(story => story.projects.map(project => ({ name: project.title, path: project.path }))))}
      breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Client stories & reviews', item: '/reviews' }]} />

    <section className="reviews-hero">
      <div className="reviews-hero__curve" aria-hidden="true" />
      <div className="container reviews-hero__inner">
        <span className="reviews-eyebrow">Client stories &amp; reviews</span>
        <h1>Different businesses.<br />{' '}<em>Work that connects.</em></h1>
        <p>The people, the context and the work we built together. Explore the story behind each website and business system.</p>
        <div className="reviews-hero__actions"><a className="btn btn-primary" href="#client-stories">Explore the stories <span aria-hidden="true">↓</span></a><a className="reviews-text-link" href="#share-experience">Share your experience</a></div>
        <div className="reviews-hero__index" aria-label="Client collection">
          <span>{String(clientStories.length).padStart(2, '0')} client stories</span><span>{String(caseStudies.length).padStart(2, '0')} project case studies</span><span>Websites, platforms &amp; custom CRMs</span>
        </div>
      </div>
    </section>

    <section className="reviews-collection section" id="client-stories">
      <div className="container">
        <div className="reviews-section-heading"><div><span className="reviews-eyebrow">A closer look</span><h2>Every partnership<br />{' '}<em>has its own shape.</em></h2></div><p>The work behind each relationship, with feedback in clients’ own words where supplied. Open a case study to explore the context and the delivered experience.</p></div>
        <div className="reviews-toolbar"><div className="reviews-filters" role="group" aria-label="Filter client stories">{clientStoryFilters.map(filter => <button key={filter} aria-pressed={category === filter} onClick={() => setCategory(filter)}>{filter}</button>)}</div><p role="status">{stories.length} {stories.length === 1 ? 'story' : 'stories'}</p></div>

        <div className="reviews-grid">
          <svg className="reviews-grid__thread" viewBox="0 0 1100 1800" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M280 0C1080 60 1060 530 550 580S-90 1120 550 1180 1120 1650 800 1800" /></svg>
          {stories.map(story => <article key={story.id} id={`story-${story.id}`} className={`review-story review-story--${story.tone}`}>
            <Link to={story.projects[0].path} className="review-story__image" aria-label={`Explore the ${story.title} story`}><img src={story.image} width="960" height="600" loading="lazy" alt={`${story.title} website screenshot`} /></Link>
            <div className="review-story__body">
              <span className="reviews-eyebrow">{story.category}</span>
              <h3>{story.title}</h3>
              {story.owner && <p className="review-story__person"><strong>{story.owner}</strong><span>{story.role}</span></p>}
              <p className="review-story__intro">{story.intro}</p>
              {story.review && <figure className="review-story__review">
                <div className="review-story__review-heading"><span>Client review</span><span aria-label={`${story.review.rating} out of 5`}>{story.review.rating} / 5</span></div>
                <blockquote><p>{story.review.excerpt}</p></blockquote>
                <figcaption>{story.owner} · {story.role}, {story.title}</figcaption>
                <details><summary>Read Affan’s full review <span aria-hidden="true">+</span></summary><h4>{story.review.title}</h4><blockquote>{story.review.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</blockquote></details>
              </figure>}
              {story.feedback && <aside className="review-story__feedback" aria-label={`${story.title} feedback summary`}><span>Feedback snapshot</span><p>{story.feedback}</p></aside>}
              <details className="review-story__detail"><summary>What we worked on <span aria-hidden="true">+</span></summary><p>{story.focus}</p><ul>{story.delivered.map(item => <li key={item}>{item}</li>)}</ul></details>
              <div className="review-story__projects"><span>{story.projects.length > 1 ? 'Explore the projects' : 'Inside the project'}</span>{story.projects.map(project => <Link key={project.id} to={project.path} aria-label={`${project.title} case study`}><span>{project.title}</span><span aria-hidden="true">↗</span></Link>)}</div>
              <a className="review-story__visit" href={story.projects[0].url} target="_blank" rel="noopener noreferrer">Visit website <span aria-hidden="true">↗</span></a>
            </div>
          </article>)}
        </div>
        <aside className="reviews-editorial-note"><span className="reviews-eyebrow">A note on the stories</span><p>Affan Mughal’s review and five-star rating were supplied for publication. Other feedback summaries are labelled as company-relayed, not direct quotations. Client comments reflect their experience, not an independent performance audit. We do not invent reviews or business-growth figures. Private CRMs are shown through portfolio screenshots, not public demos.</p><Link to="/projects" className="reviews-text-link">Explore the full project collection ↗</Link></aside>
      </div>
    </section>

    <section className="reviews-feedback section" id="share-experience">
      <div className="container reviews-feedback__layout">
        <div><span className="reviews-eyebrow">Your perspective, in your words</span><h2>Worked with us?<br />{' '}<em>Tell your story.</em></h2><p>What felt useful? What did we deliver? What could we improve? Specific, honest feedback helps the next collaboration.</p><p className="reviews-feedback__note">We confirm authorship and publication permission before featuring a review. Preparing a draft does not send or publish it.</p><Link className="reviews-text-link" to="/contact">Looking to start a project instead? ↗</Link></div>
        <form className="reviews-form" onSubmit={prepareReview}>
          <label>Your name<input name="name" autoComplete="name" value={form.name} onChange={edit} required maxLength="100" /></label>
          <label><span id="reviews-project-label">Project</span><select name="project" aria-labelledby="reviews-project-label" value={form.project} onChange={edit}>{caseStudies.map(project => <option value={project.id} key={project.id}>{project.title}</option>)}</select></label>
          <fieldset><legend>Your rating <span>(optional)</span></legend><div className="reviews-rating">{[1, 2, 3, 4, 5].map(rating => <label key={rating}><input type="radio" name="rating" value={rating} checked={form.rating === String(rating)} onChange={edit} aria-label={`${rating} out of 5`} /><span aria-hidden="true">{rating}</span></label>)}</div></fieldset>
          <label>Your feedback<textarea name="feedback" rows="5" value={form.feedback} onChange={edit} required minLength="20" maxLength="3000" placeholder="Tell us about your project and your experience working with us." /></label>
          <button className="btn btn-primary" type="submit">Prepare email draft</button>
          <p>Review the details, then open your email app to send to <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
          {draft && <div className="reviews-draft"><p role="status">Your draft is ready. It has not been sent.</p><a href={draft} className="reviews-text-link">Open email app <span aria-hidden="true">↗</span></a><small>If your device has no email app configured, send your feedback directly to {company.email}.</small></div>}
        </form>
      </div>
    </section>
  </div>
}
