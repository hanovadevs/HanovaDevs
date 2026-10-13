import { cleanup, fireEvent, render, screen, within, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import StudentBuilderProgram from './StudentBuilderProgram'
import { studentBuilders, builderProgram, programFaqs, programBenefits } from '../data/studentBuilderProgram'
import { leadershipTeam } from '../data/leadership'
import { studentBuilderSchema } from '../lib/studentBuilderSchema'

afterEach(() => { cleanup(); vi.unstubAllGlobals() })
const renderProgram = () => render(<HelmetProvider><MemoryRouter><StudentBuilderProgram /></MemoryRouter></HelmetProvider>)
const roster = [
  ['HD-SB-001', 'Muhammad Bilal Raza', 'muhammad-bilal-raza-81921b388'],
  ['HD-SB-002', 'Muhammad Anas', 'anas-arshad-927885385'],
  ['HD-SB-003', 'Yusra Shahid', 'yusra-shahid-40a61725a'],
  ['HD-SB-004', 'Harish Ghafar', 'haris-ghafar'],
  ['HD-SB-005', 'Ayesha Fatima', 'ayesha-fatima-sehab'],
  ['HD-SB-006', 'Iffa Mateen', 'iffa-mateen-9353ab3a0'],
  ['HD-SB-007', 'Muhammad Waleed', 'muhammed-waleed-66961b412'],
  ['HD-SB-008', 'Wajiha Fatima', null],
  ['HD-SB-009', 'Mark Angelo', null],
  ['HD-SB-010', 'Abdul Haseeb', 'abdul-haseeb-956337294'],
  ['HD-SB-011', 'Hussain Aftab', 'hussain-aftab-ba572a386'],
  ['HD-SB-012', 'Hafiz Muhammad Burhan Sadiq', 'm-burhan-sadiq-b59aa9336'],
]

describe('Student Builder Program', () => {
  it('publishes the corrected twelve builders in ID order with only supplied LinkedIn links', () => {
    renderProgram()
    expect(studentBuilders).toHaveLength(12)
    expect(new Set(studentBuilders.map(builder => builder.id)).size).toBe(12)
    expect(studentBuilders.map(builder => [builder.id, builder.name])).toEqual(roster.map(([id, name]) => [id, name]))
    const builders = screen.getByRole('region', { name: 'Meet the student builders.' })
    const cards = within(builders).getAllByRole('article')
    expect(cards).toHaveLength(12)
    expect(builders).toHaveTextContent('12 people.')
    for (const [index, [id, name, slug]] of roster.entries()) {
      const card = cards[index]
      expect(card).toHaveAttribute('data-builder-id', id)
      expect(within(card).getByRole('heading', { name, exact: true })).toBeInTheDocument()
      expect(card).toHaveTextContent(`Participant ID: ${id}`)
      if (slug) expect(within(card).getByRole('link', { name: `View ${name} on LinkedIn` })).toHaveAttribute('href', `https://www.linkedin.com/in/${slug}/`)
      else expect(within(card).queryByRole('link')).not.toBeInTheDocument()
    }
    expect(builders.querySelectorAll('img')).toHaveLength(0)
    expect(within(builders).queryByRole('heading', { name: 'Muhammad Haroon Zafar' })).not.toBeInTheDocument()
    expect(JSON.stringify(studentBuilders)).not.toMatch(/@|email|university|rating/i)
  })

  it('reuses every approved mentor and gives their profiles working destinations', () => {
    renderProgram()
    const mentors = screen.getByRole('region', { name: /guided by the people/i })
    expect(within(mentors).getAllByRole('article')).toHaveLength(leadershipTeam.length)
    for (const member of leadershipTeam) expect(within(mentors).getByRole('link', { name: `Meet ${member.name}` })).toHaveAttribute('href', member.profile)
    expect(within(mentors).getByRole('img', { name: 'Faceless illustrated avatar for Noor Fatima' })).toBeInTheDocument()
  })

  it('keeps status, approximate duration and benefit claims accurate', () => {
    const { container } = renderProgram()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(container.querySelector('.sbp-status')).toHaveTextContent('In progress')
    expect(container.querySelector('.sbp-cohort')).toHaveTextContent('October–December 2026')
    expect(container.querySelector('.sbp-cohort')).toHaveTextContent('8-week virtual program')
    expect(programBenefits).toHaveLength(8)
    expect(programFaqs).toHaveLength(6)
    const prose = [...container.querySelectorAll('.sbp-section')].map(section => section.textContent).join(' ')
    expect(prose).not.toMatch(/@|guaranteed career|guaranteed investment|registration open|graduated|lorem ipsum/i)
    expect(container.querySelector('.sbp-recognition')).toHaveTextContent('not an issued certificate')
    expect(container.querySelectorAll('.sbp-photo img')).toHaveLength(3)
    expect(container.querySelectorAll('.sbp-photo figcaption, .sbp-mentor figcaption')).toHaveLength(0)
    expect(container.querySelectorAll('.sbp-faq details')).toHaveLength(6)
  })

  it('models the program without invented event dates, offers or accreditation', () => {
    const schema = studentBuilderSchema()
    expect(schema['@type']).toBe('EducationalOccupationalProgram')
    expect(schema.timeToComplete).toBe('P8W')
    expect(schema.educationalProgramMode).toBe('online')
    for (const property of ['startDate', 'endDate', 'offers', 'educationalCredentialAwarded', 'applicationDeadline']) expect(schema).not.toHaveProperty(property)
    expect(schema.url).toBe(builderProgram.url)
  })

  it('copies the canonical link and provides a manual fallback if clipboard access fails', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })
    renderProgram()
    fireEvent.click(screen.getByRole('button', { name: 'Copy program link' }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Program link copied.'))
    expect(writeText).toHaveBeenCalledWith(builderProgram.url)
    writeText.mockRejectedValueOnce(new Error('Clipboard unavailable'))
    fireEvent.click(screen.getByRole('button', { name: 'Copy program link' }))
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Program link to copy' })).toHaveValue(builderProgram.url))
  })
})
