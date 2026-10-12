import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Products from './Products'
import OmnaiDetail from './OmnaiDetail'
import EunoiaDetail from './EunoiaDetail'

describe('In-House Products — Powered by HanovaDevs', () => {
  it('renders Products hub with Powered by HanovaDevs branding', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <Products />
        </MemoryRouter>
      </HelmetProvider>
    )

    expect(container.querySelector('h1')).toHaveTextContent(/powered by hanovadevs/i)
    const poweredBadges = container.querySelectorAll('.cp-badge--powered')
    expect(poweredBadges.length).toBe(2)
  })

  it('renders Omnai Browser detail page with Powered by HanovaDevs badge', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <OmnaiDetail />
        </MemoryRouter>
      </HelmetProvider>
    )

    expect(container.querySelector('.od-hero__badge')).toHaveTextContent(/powered by hanovadevs/i)
    expect(container.querySelector('h1')).toHaveTextContent(/the browser, reimagined with ai/i)
  })

  it('renders Eunoia Desktop detail page with Powered by HanovaDevs badge', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter>
          <EunoiaDetail />
        </MemoryRouter>
      </HelmetProvider>
    )

    expect(container.querySelector('.ed-hero__badge')).toHaveTextContent(/powered by hanovadevs/i)
    expect(container.querySelector('h1')).toHaveTextContent(/your mind, beautifully organized/i)

    // Check all 10 thumbnails are present
    const thumbs = container.querySelectorAll('.ed-gallery__thumb')
    expect(thumbs.length).toBe(10)

    // Check Microsoft Store download link
    const downloadLinks = container.querySelectorAll('a[href="https://apps.microsoft.com/detail/9PJ36VD01Z4X"]')
    expect(downloadLinks.length).toBeGreaterThanOrEqual(1)
  })
})
