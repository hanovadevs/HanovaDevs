import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import BuildingFeature from './BuildingFeature'

afterEach(cleanup)

describe('building feature', () => {
  it('uses brand-focused copy without publishing a location or headquarters claim', () => {
    render(<MemoryRouter><BuildingFeature /></MemoryRouter>)
    const section = screen.getByRole('region', { name: 'Room for ideas.Space to build.' })
    expect(section).toHaveTextContent('At HanovaDevs, our people give every idea its purpose.')
    expect(section).not.toHaveTextContent(/USA|premises|headquarters|New York|California|owned|concept/i)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('width', '1536')
    expect(image).toHaveAttribute('height', '1024')
    expect(image.getAttribute('srcset')).toContain('building-640.webp 640w')
    expect(image.getAttribute('srcset')).toContain('building-1536.webp 1536w')
    expect(screen.getByRole('link')).toHaveAttribute('href', '/about')
  })

  it('takes About visitors to the existing leadership section', () => {
    render(<MemoryRouter><BuildingFeature about /></MemoryRouter>)
    expect(screen.getByRole('link', { name: 'Meet the people behind the work' })).toHaveAttribute('href', '#leadership')
  })
})
