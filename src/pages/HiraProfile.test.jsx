import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { afterEach, describe, expect, it } from 'vitest'
import HiraProfile from './HiraProfile'
import { company } from '../data/company'
import { organizationGraph, pageGraph } from '../lib/seo'

afterEach(cleanup)

describe('Hira Maqsood company profile', () => {
  it('identifies her role, planning strengths and supplied portrait without invented credentials', () => {
    const { container } = render(<HelmetProvider><MemoryRouter><HiraProfile /></MemoryRouter></HelmetProvider>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hira Maqsood')
    expect(screen.getByText('Co-founder & Chief Operating Officer', { exact: true })).toBeInTheDocument()
    expect(screen.getByAltText(/Hira Maqsood/)).toHaveAttribute('src', '/people/hira-maqsood.webp')
    for (const name of ['Original ideas', 'Strategic planning', 'Operations & delivery']) expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Meet the full leadership team.' })).toHaveAttribute('href', '/about#leadership')
    expect(container.textContent).not.toMatch(/best in the world|March 2026|University|BSCS|award-winning/i)
  })

  it('links both founders to the organization without inventing a co-founder start date', () => {
    const graph = organizationGraph()
    const organization = graph.find(node => node['@type'] === 'Organization')
    const hira = graph.find(node => node.name === 'Hira Maqsood')
    expect(organization.founder).toEqual([{ '@id': `${company.founder.url}/#person` }, { '@id': `${company.coFounder.url}#person` }])
    expect(hira.jobTitle).toBe('Co-founder & Chief Operating Officer')
    expect(hira.knowsAbout).toContain('Strategic planning')
    expect(hira.worksFor['@id']).toBe(organization['@id'])
    expect(hira).not.toHaveProperty('startDate')
    expect(hira).not.toHaveProperty('alumniOf')
  })

  it('uses a single stable Person entity as the main entity of her ProfilePage', () => {
    const graph = pageGraph({ url: company.coFounder.url, title: 'Hira Maqsood', description: company.coFounder.description, pageType: 'ProfilePage', mainEntity: { '@id': `${company.coFounder.url}#person` } })['@graph']
    const profile = graph.find(node => node['@type'] === 'ProfilePage')
    const person = graph.filter(node => node['@id'] === profile.mainEntity['@id'])
    expect(person).toHaveLength(1)
    expect(person[0].name).toBe('Hira Maqsood')
    expect(person[0].mainEntityOfPage['@id']).toBe(profile['@id'])
    expect(profile.about).toEqual(profile.mainEntity)
  })
})
