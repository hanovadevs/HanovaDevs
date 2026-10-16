import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import StepsyDetail from './StepsyDetail'
import { stepsy, stepsyScenes, stepsyFaqs } from '../data/stepsy'

afterEach(cleanup)
const showPage = () => render(<HelmetProvider><MemoryRouter><StepsyDetail /></MemoryRouter></HelmetProvider>)

describe('Stepsy product preview', () => {
  it('presents five complete chapters using the supplied artwork, with no invented launch or reward promises', () => {
    const { container } = showPage()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Every step.More possibility.')
    expect(container.querySelectorAll('.stepsy-scene')).toHaveLength(5)
    expect(container.querySelectorAll('.stepsy-scene img')).toHaveLength(5)
    for (const scene of stepsyScenes) {
      const chapter = screen.getByRole('article', { name: scene.title })
      expect(within(chapter).getByRole('img')).toHaveAttribute('src', `/media/stepsy/${scene.image}-1122.webp`)
      expect(within(chapter).getByRole('img')).toHaveAttribute('width', '1122')
      expect(chapter).toHaveTextContent(scene.detail)
      expect(screen.getByRole('navigation', { name: 'Stepsy story chapters' }).querySelector(`a[href="#stepsy-${scene.id}"]`)).toBeInTheDocument()
    }
    expect(container.querySelectorAll('.stepsy-faq details')).toHaveLength(stepsyFaqs.length)
    const prose = [...container.querySelectorAll('section')].map(section => section.textContent).join(' ')
    expect(prose).toContain('Pakistan is the intended first market')
    expect(prose).toContain('not live deals or signed merchant partnerships')
    expect(prose).not.toMatch(/download now|available on the app store|guaranteed savings|cash withdrawal|earn cash|US\$80|DigitalOcean/i)
    expect(container.querySelectorAll('a[href*="apps.apple.com"], a[href*="play.google.com"]')).toHaveLength(0)
    expect(screen.getByRole('link', { name: 'Visit stepsyapp.com' })).toHaveAttribute('href', stepsy.website)
  })

  it('provides a reversible still-view control without hiding the chapter content', () => {
    showPage()
    fireEvent.click(screen.getByRole('button', { name: 'Use still view' }))
    expect(screen.getByRole('button', { name: 'Use animated view' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('article')).toHaveLength(10)
    fireEvent.click(screen.getByRole('button', { name: 'Use animated view' }))
    expect(screen.getByRole('button', { name: 'Use still view' })).toHaveAttribute('aria-pressed', 'false')
  })
})
