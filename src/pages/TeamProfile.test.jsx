import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { afterEach, describe, expect, it } from 'vitest'
import TeamProfile from './TeamProfile'
import { leadershipProfiles, leadershipFaqs } from '../data/leadershipProfiles'
import { organizationGraph, pageGraph } from '../lib/seo'
import { publicRoutes } from '../data/routes'

afterEach(cleanup)

const renderProfile = path => render(<HelmetProvider><MemoryRouter initialEntries={[path]}><Routes><Route path="/team/:id" element={<TeamProfile />} /></Routes></MemoryRouter></HelmetProvider>)

describe('Leadership profiles', () => {
  it.each(leadershipProfiles)('renders $name with seven role-specific FAQs and correct imagery', member => {
    const { container } = renderProfile(member.profile)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(member.name)
    expect(screen.getByText(member.jobTitle, { exact: true })).toBeInTheDocument()
    expect(container.querySelector('.leader-profile__portrait img')).toHaveAttribute('src', member.image)
    expect(container.querySelectorAll('.leader-profile__answers details')).toHaveLength(7)
    expect(leadershipFaqs(member)).toHaveLength(7)
    expect(container.querySelectorAll('.leader-profile__team-link')).toHaveLength(3)
    expect(publicRoutes).toContain(member.profile)
    expect(container.textContent).not.toMatch(/award-winning|million clients|March 2026|BSCS|University/)
  })

  it.each(leadershipProfiles)('links $name to one consistent Person entity and profile page', member => {
    const graph = pageGraph({ url: `https://hanovadevs.com${member.profile}`, title: member.name, description: member.description, pageType: 'ProfilePage', mainEntity: { '@id': member.entityId } })['@graph']
    const person = graph.filter(node => node['@id'] === member.entityId)
    expect(person).toHaveLength(1)
    expect(person[0].jobTitle).toBe(member.jobTitle)
    expect(person[0].mainEntityOfPage['@id']).toBe(`https://hanovadevs.com${member.profile}#webpage`)
    expect(graph.find(node => node['@type'] === 'ProfilePage').mainEntity['@id']).toBe(member.entityId)
  })

  it('uses Noor’s supplied portrait and both roles in her profile and search metadata', () => {
    renderProfile('/team/noor-fatima')
    expect(screen.queryByText('AI-generated illustration · not a photograph')).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Noor Fatima, CMO and Business Analyst at HanovaDevs' })).toHaveAttribute('src', '/people/noor-fatima.webp')
    expect(organizationGraph().find(node => node.name === 'Noor Fatima')).toMatchObject({ image: 'https://hanovadevs.com/people/noor-fatima.webp', jobTitle: 'Chief Marketing Officer & Business Analyst' })
    expect(screen.getByText('Chief Marketing Officer & Business Analyst', { exact: true })).toBeInTheDocument()
    expect(screen.getByText('What does Noor’s business-analysis role involve?')).toBeInTheDocument()
    expect(screen.queryByText('Is the image on Noor Fatima’s profile a photograph?')).not.toBeInTheDocument()
  })

  it('keeps the founder’s supplied personal website linked', () => {
    renderProfile('/team/ali-haider')
    expect(screen.getByRole('link', { name: 'Visit Ali’s personal website' })).toHaveAttribute('href', 'https://ali.hanovadevs.com')
  })

  it('returns the real 404 for an unknown team member', () => {
    renderProfile('/team/not-a-person')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('doesn’t exist')
  })
})
