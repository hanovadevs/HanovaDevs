import { useState } from 'react'
import SEO from '../../components/shared/SEO'
import ReviewCard from '../../components/reviews/ReviewCard'
import { reviewSamples } from './reviewSamples'
import './ReviewCardPreview.css'

const categories = ['All samples', ...new Set(reviewSamples.map(review => review.category))]

export default function ReviewCardPreview() {
  const [category, setCategory] = useState('All samples')
  const [drafts, setDrafts] = useState(reviewSamples)
  const [exported, setExported] = useState(false)
  const visible = drafts.filter(review => category === 'All samples' || review.category === category)
  const edit = (id, quote) => {
    setDrafts(items => items.map(item => item.id === id ? { ...item, quote } : item))
    setExported(false)
  }
  const download = () => {
    const data = { notice: 'SAMPLE REVIEW DRAFTS — NOT CLIENT ENDORSEMENTS. Obtain actual feedback and permission before publication.', reviews: drafts }
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'hanovadevs-review-drafts.json'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setExported(true)
  }
  return <div className="review-lab">
    <SEO title="Review Card Design Preview" description="Local development preview of sample review cards. Not client endorsements." url="/design/reviews" noIndex />
    <section className="container review-lab__intro">
      <p className="review-lab__eyebrow">Development-only design studio</p>
      <h1>Good words.<br /><em>Thoughtfully framed.</em></h1>
      <p>20 sample review cards using your supplied names and wording. These remain unverified draft testimonials, not established client feedback, and are excluded from the production website.</p>
      <aside className="review-lab__notice"><strong>Replace, confirm, then publish.</strong><p>Confirm each person’s actual feedback, identity and permission before publication. These draft names are not verified clients. No star ratings or performance figures are added. Editing here does not approve or publish anything.</p></aside>
      <div className="review-lab__tools"><button type="button" onClick={download}>Download all 20 drafts</button><p>Your edits last until this page is refreshed. Download to keep them.</p></div>
      {exported && <p role="status">Draft download prepared. Nothing has been published.</p>}
    </section>
    <section className="container review-lab__collection" aria-labelledby="review-lab-heading">
      <h2 id="review-lab-heading">The sample collection</h2>
      <div className="review-lab__filters" role="group" aria-label="Filter review samples">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <p role="status" className="review-lab__count">{visible.length} sample cards · Not published</p>
      <div className="review-lab__grid">{visible.map(review => <article key={review.id} className="review-lab__item" aria-labelledby={`${review.id}-title`}>
        <div className="review-lab__caption"><span>{review.id.replace('sample-', '')} / Draft</span><h3 id={`${review.id}-title`}>{review.title}</h3></div>
        <ReviewCard review={review} />
        <details className="review-lab__editor"><summary>Edit sample {review.id.slice(-2)}</summary><label htmlFor={`${review.id}-copy`}>Draft text for sample {review.id.slice(-2)}</label><textarea id={`${review.id}-copy`} rows="6" value={review.quote} maxLength={2000} onChange={event => edit(review.id, event.target.value)} /><p>Sample label stays visible. This editor is not connected to the public review collection.</p></details>
      </article>)}</div>
    </section>
  </div>
}
