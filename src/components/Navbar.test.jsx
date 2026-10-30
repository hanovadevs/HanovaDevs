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
  it('keeps closed resources hidden and opens the first link with ArrowDown', async () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    const button = screen.getByRole('button', { name: 'Insights' })
    const panel = document.getElementById('insights-menu')
    expect(panel).toHaveAttribute('hidden')
    expect(panel).toHaveAttribute('inert')
    fireEvent.keyDown(button, { key: 'ArrowDown' })
    await waitFor(() => expect(panel.querySelector('a')).toHaveFocus())
    expect(panel).not.toHaveAttribute('inert')
    fireEvent.pointerDown(document.body)
    expect(panel).toHaveAttribute('hidden')
  })
  it('closes resources when keyboard focus leaves the disclosure', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    const button = screen.getByRole('button', { name: 'Insights' })
    fireEvent.click(button)
    fireEvent.blur(button, { relatedTarget: screen.getAllByRole('link', { name: 'Get a Quote' })[0] })
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
  it.each(['/projects/growtech-crm/planning', '/services/software-development', '/products/stepsy'])('marks the parent navigation for %s', path => {
    const { container } = render(<MemoryRouter initialEntries={[path]}><Navbar /></MemoryRouter>)
    expect(container.querySelector('.navbar__nav [aria-current="page"]')).toHaveAttribute('href', `/${path.split('/')[1]}`)
  })

  it.each([
    ['/about', true], ['/products', false], ['/projects', false], ['/journal/future-of-web-dev', true],
    ['/services', false], ['/services/web-design', false], ['/news', true],
    ['/services/shopify-development', false], ['/services/software-development', false],
    ['/services/seo', false], ['/services/ai-automation', false], ['/services/branding', false], ['/projects/crown', false],
    ['/', false], ['/reviews', false], ['/stack', false], ['/products/eunoia', false],
    ['/products/omnai', false], ['/products/eunoia/privacy', false], ['/privacy-policy', false],
  ])('matches the header theme to the hero on %s', (path, dark) => {
    const { container } = render(<MemoryRouter initialEntries={[path]}><Navbar /></MemoryRouter>)
    expect(container.querySelector('header').classList.contains('navbar--dark')).toBe(dark)
    expect(container.querySelector('.navbar__inverse-mark')).toHaveAttribute('src', '/agency-logo-white.webp')
    expect(container.querySelector('.navbar__inverse-name')).toHaveTextContent('HanovaDevs')
    expect(screen.getByRole('link', { name: 'HanovaDevs Home' })).toHaveAttribute('href', '/')
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
