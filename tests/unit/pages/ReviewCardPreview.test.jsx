import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import ReviewCardPreview from '../../../src/pages/design/ReviewCardPreview'
import ReviewCard from '../../../src/components/reviews/ReviewCard'
import ReviewSpotlight from '../../../src/components/reviews/ReviewSpotlight'
import { reviewSamples } from '../../../src/pages/design/reviewSamples'
import { approvedReviews } from '../../../src/data/approvedReviews'
import { clientStories } from '../../../src/data/clientStories'

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals() })
const show = component => render(<HelmetProvider><MemoryRouter>{component}</MemoryRouter></HelmetProvider>)

describe('Review card studio', () => {
  it('holds twenty unique user-supplied drafts without ratings or publication approval', () => {
    expect(reviewSamples).toHaveLength(20)
    expect(new Set(reviewSamples.map(review => review.quote)).size).toBe(20)
    expect(new Set(reviewSamples.map(review => review.id)).size).toBe(20)
    for (const review of reviewSamples) {
      expect(review).toMatchObject({ sample: true, approvedForPublication: false, company: '', role: 'Unverified draft attribution' })
      expect(review.author).toBeTruthy()
      expect(review.rating).toBeUndefined()
    }
    expect(approvedReviews).toHaveLength(1)
    expect(approvedReviews[0]).toMatchObject({ author: 'Affan Mughal', sample: false, rating: 5, quote: clientStories[0].review.excerpt })
  })
  it('labels every sample even if a rating is mistakenly supplied', () => {
    show(<ReviewCard review={{ ...reviewSamples[0], rating: 5 }} showFullReview />)
    expect(screen.getByText('Sample review · Draft copy')).toBeInTheDocument()
    expect(screen.getByText(/Not a client endorsement/)).toBeInTheDocument()
    expect(screen.queryByLabelText('5 out of 5')).not.toBeInTheDocument()
    expect(screen.queryByText(/full review/)).not.toBeInTheDocument()
  })
  it('filters, edits locally and retains edited text when the filter changes', () => {
    const { container } = show(<ReviewCardPreview />)
    expect(container.querySelectorAll('.testimonial-card[data-sample=true]')).toHaveLength(20)
    fireEvent.click(screen.getByRole('button', { name: 'Communication', exact: true }))
    expect(container.querySelectorAll('.testimonial-card')).toHaveLength(6)
    fireEvent.click(screen.getByText('Edit sample 01'))
    fireEvent.change(screen.getByLabelText('Draft text for sample 01'), { target: { value: 'Replacement draft to discuss with a client.' } })
    expect(container.querySelector('blockquote')).toHaveTextContent('Replacement draft to discuss with a client.')
    fireEvent.click(screen.getByRole('button', { name: 'Partnership', exact: true }))
    fireEvent.click(screen.getByRole('button', { name: 'All samples' }))
    expect(container.querySelector('blockquote')).toHaveTextContent('Replacement draft to discuss with a client.')
    expect(container.querySelectorAll('[data-sample=true]')).toHaveLength(20)
  })
  it('exports all drafts with explicit unapproved status and current edits', async () => {
    let blob
    vi.stubGlobal('URL', class extends URL {
      static createObjectURL(value) { blob = value; return 'blob:review-drafts' }
      static revokeObjectURL() {}
    })
    vi.stubGlobal('Blob', class { constructor(parts) { this.parts = parts } })
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    show(<ReviewCardPreview />)
    fireEvent.change(screen.getByLabelText('Draft text for sample 01'), { target: { value: 'Edited draft, not an endorsement.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Download all 20 drafts' }))
    const data = JSON.parse(blob.parts.join(''))
    expect(data.notice).toContain('NOT CLIENT ENDORSEMENTS')
    expect(data.reviews).toHaveLength(20)
    expect(data.reviews[0].quote).toBe('Edited draft, not an endorsement.')
    expect(data.reviews.every(review => review.sample && !review.approvedForPublication)).toBe(true)
    expect(screen.getByText('Draft download prepared. Nothing has been published.')).toBeInTheDocument()
  })
  it('uses only the genuine review in the public spotlight', () => {
    const { container } = show(<ReviewSpotlight />)
    expect(container.querySelectorAll('figure')).toHaveLength(1)
    expect(container.querySelector('[data-sample]')).toBeNull()
    expect(container.querySelector('blockquote')).toHaveTextContent(clientStories[0].review.excerpt)
    expect(screen.getByRole('link', { name: 'Read the complete review →' })).toHaveAttribute('href', '/reviews#story-growtech')
  })
})
