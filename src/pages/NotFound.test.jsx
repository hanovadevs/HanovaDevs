import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import axe from 'axe-core'
import NotFound from './NotFound'

describe('NotFound', () => {
  it('offers a route home', () => {
    render(
      <HelmetProvider>
        <MemoryRouter><NotFound /></MemoryRouter>
      </HelmetProvider>
    )
    expect(screen.getByRole('heading', { name: /page doesn’t exist/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /return home/i })).toHaveAttribute('href', '/')
  })

  it('has no automated accessibility violations', async () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter><NotFound /></MemoryRouter>
      </HelmetProvider>
    )
    const results = await axe.run(container)
    expect(results.violations).toEqual([])
  })
})
