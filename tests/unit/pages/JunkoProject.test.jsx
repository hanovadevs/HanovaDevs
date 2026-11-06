import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CaseStudy from '../../../src/pages/projects/CaseStudy'
import { caseStudyById, caseStudies } from '../../../src/data/caseStudies'
import { clientStories } from '../../../src/data/clientStories'
import { publicRoutes, routeModifiedAt } from '../../../src/data/routes'
import { existsSync } from 'node:fs'

afterEach(cleanup)
const project = caseStudyById['junko-bodie-roulette']
describe('Junko Bodie Roulette portfolio project', () => {
  it('connects one delivered project to public discovery without inventing a testimonial', () => {
    expect(project.url).toBe('https://junkobodieroulette.com/')
    expect(publicRoutes).toContain(project.path)
    expect(routeModifiedAt(project.path)).toBe('2026-11-06')
    expect(new Set(caseStudies.map(study => study.edition)).size).toBe(caseStudies.length)
    const story = clientStories.find(story => story.id === project.id)
    expect(story.projectIds).toEqual([project.id])
    expect(story.review).toBeUndefined()
    expect(story.owner).toBeNull()
    for (const image of [project.image, project.cardImage, ...project.showcase.map(view => view.image)]) expect(existsSync(`public${image}`)).toBe(true)
  })
  it('presents real captures, useful FAQs, correct dates and keyboard-operable gallery', () => {
    const { container } = render(<HelmetProvider><MemoryRouter initialEntries={[project.path]}><Routes><Route path="/projects/:id" element={<CaseStudy />} /></Routes></MemoryRouter></HelmetProvider>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(project.title)
    expect(container.querySelector('.work-lead')).toHaveTextContent('no real-money wagering')
    expect(container.querySelector('time')).toHaveTextContent('6 November 2026')
    expect(screen.queryByText(/Inside Zozo/)).not.toBeInTheDocument()
    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(3)
    fireEvent.click(tabs[1])
    expect(within(screen.getByRole('tabpanel')).getByRole('img')).toHaveAttribute('src', '/case-studies/junko-bodie-roulette-calculator.webp')
    fireEvent.keyDown(tabs[1], { key: 'End' })
    expect(tabs[2]).toHaveFocus()
    expect(container.querySelectorAll('#case-questions details')).toHaveLength(4)
    expect(container.querySelectorAll('blockquote, iframe')).toHaveLength(0)
    const json = JSON.parse(container.querySelector('script[type="application/ld+json"]').textContent)['@graph']
    expect(json.find(node => node['@type'] === 'FAQPage').mainEntity).toHaveLength(4)
  })
})
