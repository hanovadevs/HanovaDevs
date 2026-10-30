import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import { canonicalUrl, collectionGraph, organizationGraph } from '../lib/seo'
import { homeAnswers } from '../data/homeAnswers'
import { caseStudies } from '../data/caseStudies'
import { company } from '../data/company'
import { journalPosts } from '../data/journal'
import { routeModifiedAt } from '../data/routes'

afterEach(cleanup)
const wrap = element => render(<HelmetProvider><MemoryRouter>{element}</MemoryRouter></HelmetProvider>)

describe('Evidence-led SEO and project discovery', () => {
  it('uses the live preferred www host without tracking queries', () => {
    expect(company.url).toBe('https://www.hanovadevs.com')
    expect(canonicalUrl('https://hanovadevs.com/projects/?source=google#work')).toBe(`${company.url}/projects`)
    for (const entity of organizationGraph().filter(node => ['Organization', 'WebSite'].includes(node['@type']))) expect(new URL(entity.url).origin).toBe(company.url)
  })
  it('publishes matching human-readable and structured homepage answers', () => {
    const { container } = wrap(<Home />)
    expect(container.querySelector('.hero__scroll-hint')).toBeNull()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Better websites. Smarter software.')
    expect(container.querySelector('.hero__text-panel img')).toBeNull()
    expect(container.querySelector('.hero__glass-bg')).toBeNull()
    expect(container.querySelector('.hero__visual img')).toHaveAttribute('src', '/hero-scene-1774.webp')
    const faqs = container.querySelectorAll('.home-answers details')
    expect(faqs).toHaveLength(homeAnswers.length)
    for (const item of homeAnswers) expect(container.querySelector('.home-answers')).toHaveTextContent(item.answer)
    for (const study of caseStudies) expect(screen.getByRole('link', { name: `Read the ${study.title} case study` })).toHaveAttribute('href', study.path)
    const graph = JSON.parse(container.querySelector('script[type="application/ld+json"]').textContent)['@graph']
    expect(graph.find(node => node['@type'] === 'FAQPage').mainEntity.map(item => item.acceptedAnswer.text)).toEqual(homeAnswers.map(item => item.answer))
    expect(container.textContent).not.toContain('Delivering measurable results')
  })
  it('gives every project an equal full-width presentation and a corresponding list entry', () => {
    const { container } = wrap(<Projects />)
    expect(container.querySelectorAll('.work-card--featured')).toHaveLength(caseStudies.length)
    expect([...container.querySelectorAll('.work-card__edition')].map(node => node.textContent)).toEqual(caseStudies.map(study => `Selected work / ${study.edition}${study.adminOnly ? 'Admin-only application' : 'Public website'}`))
    const graph = collectionGraph('/projects', 'Projects', caseStudies.map(study => ({ name: study.title, path: study.path })))
    expect(graph.itemListElement.map(item => item.url)).toEqual(caseStudies.map(study => `${company.url}${study.path}`))
    expect(JSON.stringify(graph)).not.toMatch(/ratingValue|aggregateRating|award/)
  })
  it('updates the expanded guide without rewriting its original publication date', () => {
    const guide = journalPosts.find(post => post.slug === 'hanovadevs-software-company-guide')
    expect(guide.publishedAt).toBe('2026-10-13')
    expect(guide.modifiedAt).toBe('2026-10-30')
    expect(guide.content).toContain('/projects/growtech-crm/planning')
    expect(routeModifiedAt(`/journal/${guide.slug}`)).toBe(guide.modifiedAt)
  })
})
