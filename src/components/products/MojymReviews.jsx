import { mojymReviews } from '../../data/mojymReviews'
import './MojymReviews.css'

function OwnerReview({ review }) {
  return <figure className="mj-owner-review">
    <span className="mj-owner-review__topic">{review.topic}</span>
    <blockquote><p>{review.quote}</p></blockquote>
    <figcaption><span className="mj-owner-review__monogram" aria-hidden="true">{review.author.split(' ').map(part => part[0]).join('')}</span><span><strong>{review.author}</strong><span>{review.role}</span></span></figcaption>
  </figure>
}

export default function MojymReviews() {
  return <section className="mj-owner-stories" id="owner-reviews" aria-labelledby="mj-reviews-heading"><div className="container">
    <header className="mj-owner-stories__heading"><div><p className="mj-eyebrow">Gym owner perspectives</p><h2 id="mj-reviews-heading">The everyday details.<br /><em>The people they matter to.</em></h2></div><p>Memberships, reception, coaching and the daily close. Here’s what gym owners have to say about working with Mojym.</p></header>
    <div className="mj-owner-stories__grid">{mojymReviews.slice(0, 6).map(review => <OwnerReview key={review.id} review={review} />)}</div>
    <details className="mj-owner-stories__more"><summary><span className="mj-owner-stories__show">Read all 20 reviews</span><span className="mj-owner-stories__hide">Show fewer reviews</span></summary><div className="mj-owner-stories__grid">{mojymReviews.slice(6).map(review => <OwnerReview key={review.id} review={review} />)}</div></details>
  </div></section>
}
