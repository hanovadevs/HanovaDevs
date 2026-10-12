import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Navbar from './Navbar'

describe('Navbar keyboard behavior', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })))
  })
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })
  it('closes the Insights menu with Escape', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    const insights = screen.getByRole('button', { name: /insights/i })
    fireEvent.click(insights)
    expect(insights).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(insights).toHaveAttribute('aria-expanded', 'false')
  })

  it('keeps a closed menu inert, restores focus with Escape, and unlocks scrolling', async () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    const toggle = screen.getByRole('button', { name: 'Open menu' })
    const menu = document.getElementById('mobile-navigation')
    expect(menu).toHaveAttribute('inert')
    fireEvent.click(toggle)
    expect(menu).not.toHaveAttribute('inert')
    await waitFor(() => expect(menu.querySelector('a')).toHaveFocus())
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(menu).toHaveAttribute('inert')
    expect(toggle).toHaveFocus()
    expect(document.body.style.overflow).toBe('')
  })
})
