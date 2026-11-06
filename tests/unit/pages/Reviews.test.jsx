import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import Reviews from '../../../src/pages/reviews/Reviews'
import { clientStories, clientStoriesUpdatedAt, createReviewEmail } from '../../../src/data/clientStories'
import { caseStudies } from '../../../src/data/caseStudies'
import { routeModifiedAt } from '../../../src/data/routes'

afterEach(cleanup)
const show = () => render(<HelmetProvider><MemoryRouter><Reviews /></MemoryRouter></HelmetProvider>)

describe('Client story collection', () => {
  it('covers every case study once, with known client identities and no invented Zozo owner', () => {
    const ids = clientStories.flatMap(story => story.projectIds)
    expect([...ids].sort()).toEqual(caseStudies.map(study => study.id).sort())
    expect(new Set(ids).size).toBe(ids.length)
    expect(clientStories.find(story => story.id === 'growtech')).toMatchObject({ owner: 'Affan Mughal', role: 'Founder' })
    expect(clientStories.find(story => story.id === 'zozo').owner).toBeNull()
    expect(routeModifiedAt('/reviews')).toBe(clientStoriesUpdatedAt)
  })
  it('renders every project story and collection metadata instead of fabricated review ratings', () => {
    const { container } = show()
    expect(container.querySelectorAll('.review-story')).toHaveLength(clientStories.length)
    expect(container.querySelectorAll('.review-story:not(#story-growtech) blockquote')).toHaveLength(0)
    expect(container.querySelector('#story-growtech blockquote')).toHaveTextContent('We had an excellent experience')
    const graph = JSON.parse(container.querySelector('script[type="application/ld+json"]').textContent)['@graph']
    expect(graph.find(node => node['@type'] === 'ItemList').numberOfItems).toBe(caseStudies.length)
    expect(JSON.stringify(graph)).not.toMatch(/aggregateRating|reviewRating|ratingValue|"@type":"Review"/)
    for (const study of caseStudies) expect(screen.getByRole('link', { name: `${study.title} case study`, exact: true })).toHaveAttribute('href', study.path)
  })
  it('filters GrowTech as one founder-led relationship with both website and CRM destinations', () => {
    show()
    fireEvent.click(screen.getByRole('button', { name: 'Agency & operations' }))
    expect(screen.getByRole('status')).toHaveTextContent('1 story')
    const story = screen.getByRole('article')
    expect(story).toHaveTextContent('Affan Mughal')
    expect(story).toHaveTextContent('Founder')
    expect(within(story).getByRole('link', { name: 'GrowTech Advertising CRM case study' })).toHaveAttribute('href', '/projects/growtech-crm')
    expect(within(story).getByLabelText('5 out of 5')).toHaveTextContent('5 / 5')
    fireEvent.click(within(story).getByText('Read Affan’s full review'))
    const full = story.querySelector('.review-story__review details')
    expect(full).toHaveAttribute('open')
    for (const paragraph of clientStories[0].review.paragraphs) expect(full).toHaveTextContent(paragraph)
    fireEvent.click(screen.getByRole('button', { name: 'Discovery platforms' }))
    fireEvent.click(screen.getByText('What we worked on'))
    expect(screen.getByRole('article')).toHaveTextContent('not an ecommerce checkout')
  })
  it('prepares an honest email handoff and clears an outdated draft when edited', () => {
    show()
    fireEvent.change(screen.getByLabelText('Your name', { exact: true }), { target: { value: 'A client & reviewer' } })
    fireEvent.change(screen.getByLabelText('Project', { exact: true }), { target: { value: 'growtech-crm' } })
    fireEvent.click(screen.getByRole('radio', { name: '4 out of 5' }))
    fireEvent.change(screen.getByLabelText('Your feedback'), { target: { value: 'A specific account of the planning and handover experience.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Prepare email draft' }))
    expect(screen.getByText('Your draft is ready. It has not been sent.')).toBeInTheDocument()
    const url = new URL(screen.getByRole('link', { name: 'Open email app' }).href)
    expect(url.pathname).toBe('contact@hanovadevs.com')
    expect(url.searchParams.get('body')).toContain('Name: A client & reviewer')
    expect(url.searchParams.get('body')).toContain('Rating: 4')
    expect(url.searchParams.get('subject')).toBe('Client feedback: GrowTech Advertising CRM')
    fireEvent.change(screen.getByLabelText('Project', { exact: true }), { target: { value: 'zozo' } })
    expect(screen.queryByRole('link', { name: 'Open email app' })).toBeNull()
    expect(() => createReviewEmail({ project: 'constructor' })).toThrow('Choose a listed project')
  })
})
