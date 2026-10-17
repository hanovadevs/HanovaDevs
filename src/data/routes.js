import { journalPosts, retiredJournalSlugs } from './journal.js'
import { leadershipTeam } from './leadership.js'
import { services } from './services.js'
import { caseStudies } from './caseStudies.js'

export const serviceIds = services.map(service => service.id)
export const publicRoutes = [
  '/', '/services', '/about', '/student-builder-program', ...leadershipTeam.map(member => member.profile), '/projects', '/reviews', '/products', '/products/eunoia', '/products/omnai', '/products/stepsy',
  '/products/eunoia/privacy', '/contact', '/calculator', '/journal', '/research', '/news', '/stack', ...caseStudies.map(study => study.path),
  '/privacy-policy', '/terms-of-service', ...serviceIds.map(id => `/services/${id}`),
  ...journalPosts.map(post => `/journal/${post.slug}`),
]
export const routeModifiedAt = route => ['/services', '/projects', '/reviews', '/contact'].includes(route) || route.startsWith('/services/') || route.startsWith('/projects/') ? '2026-10-17' : null
export const legacyRedirects = [
  ['/privacy', '/privacy-policy'], ['/terms', '/terms-of-service'], ['/blog', '/journal'],
  ...journalPosts.map(post => [`/blog/${post.slug}`, `/journal/${post.slug}`]),
  ...retiredJournalSlugs.flatMap(slug => [[`/journal/${slug}`, '/journal'], [`/blog/${slug}`, '/journal']]),
]
