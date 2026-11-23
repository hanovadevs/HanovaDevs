import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import MojymDetail from '../../../src/pages/products/MojymDetail'
import MojymGuide from '../../../src/pages/products/MojymGuide'
import { organizationGraph } from '../../../src/lib/seo'
import { publicRoutes } from '../../../src/data/routes'
import { mojym } from '../../../src/data/mojym'
import { mojymGuide } from '../../../src/data/mojymGuide'

afterEach(cleanup)
const show = Component => render(<HelmetProvider><MemoryRouter><Component /></MemoryRouter></HelmetProvider>)
describe('Mojym and leadership publication', () => {
  it('uses the owner-confirmed completion status consistently', () => {
    expect(mojym.status).toBe('Complete product')
    expect(mojymGuide).not.toMatch(/still being developed|remain unfinished/)
    expect(mojym.faqs.some(faq => /reports and CSV/.test(faq.question))).toBe(true)
    expect(mojymGuide).toContain('CSV import/export')
  })
  it('links the product, walkthrough and guide without inventing payment collection', () => {
    show(MojymDetail)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('A clearer way')
    expect(screen.getByRole('link', { name: /Sign in to Mojym/ })).toHaveAttribute('href', 'https://mojym.hanovadevs.com')
    fireEvent.click(screen.getByRole('button', { name: 'A connected timetable' }))
    expect(screen.getByAltText('Mojym: A connected timetable')).toHaveAttribute('src', '/products/mojym/classes.webp')
    expect(screen.getByText(/It records payments already received/)).toBeInTheDocument()
  })
  it('keeps the complete guide searchable and linked to its sections', () => {
    const { container } = show(MojymGuide)
    const links = container.querySelectorAll('nav a[href^="#"]')
    expect(links.length).toBeGreaterThan(12)
    for (const link of links) expect(container.querySelector(link.getAttribute('href'))).not.toBeNull()
    expect(screen.getByRole('heading', { name: 'Reset a forgotten password' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Platform administration for Hanova operators' })).toBeInTheDocument()
    expect(publicRoutes).toContain('/products/mojym/how-to-use')
  })
  it('identifies Noor as co-founder in the organization and person graph', () => {
    const graph = organizationGraph()
    expect(graph[0].founder).toContainEqual({ '@id': 'https://www.hanovadevs.com/team/noor-fatima#person' })
    expect(graph.find(node => node.name === 'Noor Fatima').jobTitle).toMatch(/Co-founder/)
  })
})
