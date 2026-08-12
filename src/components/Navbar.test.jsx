import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'

describe('Navbar keyboard behavior', () => {
  it('closes the Insights menu with Escape', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    const insights = screen.getByRole('button', { name: /insights/i })
    fireEvent.click(insights)
    expect(insights).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(insights).toHaveAttribute('aria-expanded', 'false')
  })
})
