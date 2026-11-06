import { journalPosts, retiredJournalSlugs } from './journal.js'
import { leadershipTeam } from './leadership.js'
import { services } from './services.js'
import { caseStudies } from './caseStudies.js'
import { projectWorkflows } from './projectWorkflows.js'
import { newsUpdatedAt } from './news.js'
import { clientStoriesUpdatedAt } from './clientStories.js'
import { servicesReviewedAt } from './serviceExperiences.js'

export const serviceIds = services.map(service => service.id)
export const publicRoutes = [
  '/', '/services', '/about', '/student-builder-program', ...leadershipTeam.map(member => member.profile), '/projects', '/reviews', '/products', '/products/eunoia', '/products/omnai', '/products/stepsy',
  '/products/eunoia/privacy', '/contact', '/calculator', '/journal', '/research', '/news', '/stack', ...caseStudies.map(study => study.path), ...projectWorkflows.map(workflow => workflow.path),
  '/privacy-policy', '/terms-of-service', ...serviceIds.map(id => `/services/${id}`),
  ...journalPosts.map(post => `/journal/${post.slug}`),
]
export const routeModifiedAt = route => {
  if (route === '/news') return newsUpdatedAt
  if (route === '/reviews') return clientStoriesUpdatedAt
  if (route === '/services' || route.startsWith('/services/')) return servicesReviewedAt
  if (route === '/' || route === '/projects') return '2026-11-06'
  if (route.startsWith('/projects/')) return caseStudies.find(study => study.path === route)?.modifiedAt || '2026-10-30'
  if (route.startsWith('/journal/')) return journalPosts.find(post => route === `/journal/${post.slug}`)?.modifiedAt || null
  return route === '/contact' ? '2026-10-17' : null
}
export const legacyRedirects = [
  ['/privacy', '/privacy-policy'], ['/terms', '/terms-of-service'], ['/blog', '/journal'],
  ...journalPosts.map(post => [`/blog/${post.slug}`, `/journal/${post.slug}`]),
  ...retiredJournalSlugs.flatMap(slug => [[`/journal/${slug}`, '/journal'], [`/blog/${slug}`, '/journal']]),
]
