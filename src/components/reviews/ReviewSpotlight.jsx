import { Link } from 'react-router-dom'
import { approvedReviews } from '../../data/approvedReviews'
import ReviewCard from './ReviewCard'

export default function ReviewSpotlight() {
  const review = approvedReviews.find(item => item.id === 'growtech')
  if (!review) return null
  return <section className="review-spotlight section" aria-labelledby="review-spotlight-title">
    <div className="container review-spotlight__layout">
      <div className="review-spotlight__intro"><span className="section-label">From the client’s perspective</span><h2 id="review-spotlight-title">The work matters.<br />So does the experience.</h2><p>A company website and a custom agency platform for GrowTech Advertising. Here’s an excerpt from founder Affan Mughal’s review of that collaboration.</p><Link to="/reviews#story-growtech">Read the complete review →</Link></div>
      <ReviewCard review={{ ...review, tone: 'navy' }} />
    </div>
  </section>
}
