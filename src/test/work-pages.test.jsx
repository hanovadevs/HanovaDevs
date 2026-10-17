import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ServiceDetail from '../pages/ServiceDetail'
import Projects from '../pages/Projects'
import CaseStudy from '../pages/CaseStudy'
import { services } from '../data/services'
import { caseStudies } from '../data/caseStudies'
import { publicRoutes } from '../data/routes'

afterEach(cleanup)
const route = path => render(<HelmetProvider><MemoryRouter initialEntries={[path]}><Routes><Route path="/services/:id" element={<ServiceDetail />} /><Route path="/projects" element={<Projects />} /><Route path="/projects/:id" element={<CaseStudy />} /></Routes></MemoryRouter></HelmetProvider>)

describe('Service journeys', () => {
  it.each(services)('renders a distinct, complete $title page', service => {
    const { container } = route(`/services/${service.id}`)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(service.title)
    expect(container.querySelectorAll('.service-capabilities article')).toHaveLength(4)
    expect(container.querySelectorAll('.service-process-list li')).toHaveLength(4)
    expect(container.querySelectorAll('.service-handover-sheet li')).toHaveLength(5)
    expect(container.querySelectorAll('.work-faq-list details')).toHaveLength(service.faqs.length)
    expect(container.querySelector('.service-visual')).toHaveClass(`service-visual--${service.id}`)
    expect(container.querySelector('main')?.textContent || container.textContent).not.toMatch(/Timeline Reduced by ~35%|exactly what we deliver|Scoped .* aligned with your project requirements/)
    const link = screen.getByRole('link', { name: /Discuss your project/ })
    const url = new URL(link.href)
    expect(url.searchParams.get('service')).toBe(service.title)
    expect(url.searchParams.get('source')).toBe('service')
    expect(container.textContent.length).toBeGreaterThan(6500)
  })
  it('supports keyboard selection of project scenarios', () => {
    route('/services/web-design')
    const tabs = screen.getAllByRole('tab')
    fireEvent.click(tabs[1])
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Keep what works.')
    fireEvent.keyDown(tabs[1], { key: 'ArrowRight' })
    expect(tabs[2]).toHaveFocus()
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
    fireEvent.keyDown(tabs[2], { key: 'Home' })
    expect(tabs[0]).toHaveFocus()
  })
  it.each(['missing-service', 'constructor', 'toString'])('renders a real not-found state for %s', id => {
    route(`/services/${id}`)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('doesn’t exist')
  })
})

describe('Case-study evidence and navigation', () => {
  it.each(caseStudies)('renders $title with public captures and bounded outcome claims', study => {
    const { container } = route(study.path)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(study.title)
    expect(screen.getByAltText(`${study.title} desktop homepage screenshot`)).toHaveAttribute('src', study.image)
    expect(screen.getByAltText(`${study.title} mobile homepage screenshot`)).toHaveAttribute('src', study.mobileImage)
    expect(container.querySelector('#case-evidence')).toHaveTextContent('No verified before-and-after revenue')
    expect(container.querySelectorAll('.case-observations article')).toHaveLength(2)
    expect(container.querySelectorAll('.case-deliverables li')).toHaveLength(4)
    expect(container.querySelector('time')).toHaveAttribute('datetime', '2026-10-17')
    expect(publicRoutes).toContain(study.path)
    const graph = JSON.parse(container.querySelector('script[type="application/ld+json"]').textContent)
    expect(graph['@graph'].some(item => item['@type'] === 'CreativeWork')).toBe(true)
    expect(JSON.stringify(graph)).not.toMatch(/aggregateRating|ratingValue|revenue|reviewRating/)
    expect(screen.getByRole('link', { name: /Discuss a similar project/ })).toHaveAttribute('href', expect.stringContaining('source=case-study'))
  })
  it('filters projects without losing clear case-study destinations', () => {
    const { container } = route('/projects')
    expect(container.querySelectorAll('.work-card')).toHaveLength(4)
    fireEvent.click(screen.getByRole('button', { name: 'Industrial business' }))
    expect(container.querySelectorAll('.work-card')).toHaveLength(1)
    expect(screen.getByRole('heading', { name: 'Crown Accumulators' })).toBeVisible()
    expect(screen.getByRole('status')).toHaveTextContent('1 case study')
    expect(screen.getByRole('link', { name: 'Read the case study' })).toHaveAttribute('href', '/projects/crown')
  })
  it.each(['missing-project', 'constructor'])('does not treat %s as a case study', id => {
    route(`/projects/${id}`)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('doesn’t exist')
  })
})
