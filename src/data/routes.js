import { journalPosts, retiredJournalSlugs } from './journal.js'
import { leadershipTeam } from './leadership.js'

export const serviceIds = ['web-design', 'shopify-development', 'software-development', 'seo', 'ai-automation', 'branding']
export const publicRoutes = [
  '/', '/services', '/about', '/student-builder-program', ...leadershipTeam.map(member => member.profile), '/projects', '/reviews', '/products', '/products/eunoia', '/products/omnai', '/products/stepsy',
  '/products/eunoia/privacy', '/contact', '/calculator', '/journal', '/research', '/news', '/stack',
  '/privacy-policy', '/terms-of-service', ...serviceIds.map(id => `/services/${id}`),
  ...journalPosts.map(post => `/journal/${post.slug}`),
]
export const legacyRedirects = [
  ['/privacy', '/privacy-policy'], ['/terms', '/terms-of-service'], ['/blog', '/journal'],
  ...journalPosts.map(post => [`/blog/${post.slug}`, `/journal/${post.slug}`]),
  ...retiredJournalSlugs.flatMap(slug => [[`/journal/${slug}`, '/journal'], [`/blog/${slug}`, '/journal']]),
]
