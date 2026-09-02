import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import PrivacyPolicy from './PrivacyPolicy'
import TermsOfService from './TermsOfService'
import TrustLegalSection from '../components/TrustLegalSection'

describe('Legal Pages System', () => {
  it('renders Privacy Policy with hero and key sections', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <PrivacyPolicy />
        </MemoryRouter>
      </HelmetProvider>
    )

    expect(screen.getByRole('heading', { level: 1, name: /privacy policy/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /introduction/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /information we collect/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ai-powered features & assistant interactions/i })).toBeInTheDocument()
  })

  it('renders Terms of Service with hero and key clauses', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <TermsOfService />
        </MemoryRouter>
      </HelmetProvider>
    )

    expect(screen.getByRole('heading', { level: 1, name: /terms of service/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /acceptance of terms/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /100% remote operations, digital delivery & remote work policy/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /proposals, quotations & project estimator disclaimer/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /intellectual property rights/i })).toBeInTheDocument()
  })

  it('renders Trust & Transparency section on homepage with working links', () => {
    const { container } = render(
      <MemoryRouter>
        <TrustLegalSection />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: /built on trust\. backed by clarity\./i })).toBeInTheDocument()
    
    const privacyLink = container.querySelector('a[href="/privacy-policy"]')
    expect(privacyLink).toBeInTheDocument()
    expect(privacyLink).toHaveTextContent(/read privacy policy/i)

    const termsLink = container.querySelector('a[href="/terms-of-service"]')
    expect(termsLink).toBeInTheDocument()
    expect(termsLink).toHaveTextContent(/read terms of service/i)
  })
})
