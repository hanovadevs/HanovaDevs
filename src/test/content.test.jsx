import { fireEvent, render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { company, clientProjects } from '../data/company'
import { journalPosts, retiredJournalSlugs } from '../data/journal'
import { newsArticles, newsUpdatedAt } from '../data/news'
import { publicRoutes } from '../data/routes'
import { canonicalUrl, organizationGraph, pageGraph } from '../lib/seo'
import { consentCookie, readConsent } from '../lib/consent'
import Reviews from '../pages/Reviews'
import About from '../pages/About'

const wrap = element => render(<HelmetProvider><MemoryRouter>{element}</MemoryRouter></HelmetProvider>)
describe('Company accuracy and discovery', () => {
  it('keeps the owner-provided identity and release facts consistent', () => {
    expect(company.founded).toBe('2022'); expect(company.founder.name).toBe('Ali Haider')
    expect(company.email).toBe('contact@hanovadevs.com')
    expect(company.products.eunoia.status).toBe('Available on Microsoft Store')
    expect(company.products.omnai.status).toBe('Launching soon')
    expect(clientProjects.map(project => project.owner)).toEqual(['Veli', 'Sara', 'Shahid Mahmood', 'Noor Fatima'])
    expect(clientProjects.every(project => project.quote === null && project.rating === null)).toBe(true)
  })
  it('uses clean path-only canonical URLs', () => {
    expect(canonicalUrl('/news/?query=AI#story')).toBe('https://hanovadevs.com/news')
    expect(canonicalUrl('https://example.com/about?tracking=yes')).toBe('https://hanovadevs.com/about')
    expect(canonicalUrl('/')).toBe('https://hanovadevs.com/')
  })
  it('does not fabricate ratings, street addresses or awards in structured data', () => {
    const graph = organizationGraph()
    expect(graph.find(item => item['@type'] === 'Organization').foundingDate).toBe('2022')
    expect(graph.find(item => item['@type'] === 'Person').name).toBe('Ali Haider')
    expect(JSON.stringify(graph)).not.toMatch(/aggregateRating|ratingValue|streetAddress|award|LocalBusiness/)
    expect(pageGraph({ url: canonicalUrl('/about'), title: 'About', description: 'Company', faqList: [{ question: 'Who?', answer: 'Ali Haider' }] })['@graph'].at(-1)['@type']).toBe('FAQPage')
  })
  it('publishes an original long-form company guide and a consistent public inventory', () => {
    const guide = journalPosts.find(post => post.slug === 'hanovadevs-software-company-guide')
    expect(guide.wordCount).toBeGreaterThan(3000)
    expect(guide.content).toContain('founded in 2022 by Ali Haider')
    expect(guide.content).not.toMatch(/<script|pravatar|client testimonial.*5 stars/i)
    expect(publicRoutes).toContain(`/journal/${guide.slug}`)
    expect(publicRoutes).toContain('/reviews')
    expect(publicRoutes.some(route => route.includes('admin') || route.includes('portal'))).toBe(false)
    expect(retiredJournalSlugs.every(slug => !publicRoutes.includes(`/journal/${slug}`))).toBe(true)
  })
  it('dates and links every news item and avoids future-dated publication', () => {
    expect(newsUpdatedAt).toBe('2026-10-13')
    expect(newsArticles.length).toBeGreaterThanOrEqual(7)
    for (const article of newsArticles) {
      expect(article.publishedAt <= newsUpdatedAt).toBe(true)
      expect(article.sourceUrl).toMatch(/^https:\/\//)
      expect(article.summary.length).toBeGreaterThan(0)
    }
  })
  it('renders the supplied founder portrait and official profile link', () => {
    wrap(<About />)
    expect(screen.getByAltText('Ali Haider, founder of HanovaDevs')).toHaveAttribute('src', '/people/ali-haider.webp')
    expect(screen.getByRole('link', { name: /explore ali/i })).toHaveAttribute('href', 'https://ali.hanovadevs.com')
  })
  it('offers filterable client stories without invented attributed reviews', () => {
    const { container } = wrap(<Reviews />)
    expect(container.querySelectorAll('.review-story')).toHaveLength(4)
    expect(container.querySelectorAll('blockquote')).toHaveLength(0)
    fireEvent.click(screen.getByRole('button', { name: 'Industrial business' }))
    expect(container.querySelectorAll('.review-story')).toHaveLength(1)
    expect(container.querySelector('.review-story')).toHaveTextContent('Shahid Mahmood')
    expect(screen.getByRole('button', { name: /email your review/i })).toBeInTheDocument()
  })
})
describe('Cookie preferences', () => {
  it('defaults absent, corrupt or obsolete preferences to no optional consent', () => {
    expect(readConsent()).toBeNull()
    expect(readConsent('hanova_consent=%notjson')).toBeNull()
    expect(readConsent(`hanova_consent=${encodeURIComponent(JSON.stringify({ version: 0, analytics: true }))}`)).toBeNull()
    expect(readConsent('hanova_consent=null')).toBeNull()
  })
  it('round-trips a secure first-party choice with a 180-day lifetime', () => {
    const cookie = consentCookie(false)
    expect(cookie).toContain('Max-Age=15552000'); expect(cookie).toContain('SameSite=Lax'); expect(cookie).toContain('Secure')
    expect(readConsent(cookie)).toEqual({ version: 1, analytics: false })
    expect(readConsent(consentCookie(true, false))).toEqual({ version: 1, analytics: true })
    expect(consentCookie(true, false)).not.toContain('Secure')
  })
})
