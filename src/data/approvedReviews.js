import { clientStories } from './clientStories'

// Only supplied, publication-approved feedback belongs here. Never import samples.
export const approvedReviews = clientStories.filter(story => story.review).map(story => ({
  id: story.id,
  author: story.owner,
  role: story.role,
  company: story.title,
  category: story.delivered.join(' · '),
  quote: story.review.excerpt,
  title: story.review.title,
  paragraphs: story.review.paragraphs,
  rating: story.review.rating,
  tone: 'mint',
  sample: false,
}))
