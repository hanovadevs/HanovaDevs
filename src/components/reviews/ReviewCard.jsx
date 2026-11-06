import './ReviewCard.css'

/** No ratings or people are inferred. Samples must remain explicitly labelled. */
export default function ReviewCard({ review, showFullReview = false, className = '' }) {
  const initials = review.sample ? 'DRAFT' : review.author.split(' ').map(word => word[0]).slice(0, 2).join('')
  return <figure className={`testimonial-card testimonial-card--${review.tone || 'mint'} ${className}`} data-sample={review.sample ? 'true' : undefined}>
    <div className="testimonial-card__top">
      <span>{review.sample ? 'Sample review · Draft copy' : 'Client’s own words'}</span>
      {!review.sample && review.rating != null && <span className="testimonial-card__rating" aria-label={`${review.rating} out of 5`}>{review.rating} / 5</span>}
    </div>
    <p className="testimonial-card__category">{review.category}</p>
    <blockquote><p>{review.quote}</p></blockquote>
    <figcaption className="testimonial-card__person">
      <span className="testimonial-card__initials" aria-hidden="true">{initials}</span>
      <span><strong>{review.author}</strong><span>{review.role}{review.company && ` · ${review.company}`}</span></span>
    </figcaption>
    {review.sample && <p className="testimonial-card__disclaimer">Not a client endorsement. Replace with approved feedback before publication.</p>}
    {showFullReview && !review.sample && review.paragraphs?.length > 0 && <details className="testimonial-card__full">
      <summary>Read {review.author.split(' ')[0]}’s full review</summary>
      <h4>{review.title}</h4>
      <blockquote>{review.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</blockquote>
    </details>}
  </figure>
}
