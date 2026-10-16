import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import LeadershipTeam from './LeadershipTeam'

afterEach(cleanup)

describe('Leadership cards', () => {
  it('pairs every supplied name with the correct leadership title', () => {
    render(<LeadershipTeam />)
    for (const [name, role] of [['Ali Haider', 'Founder & CEO'], ['Hira Maqsood', 'Co-founder & COO'], ['Noor Fatima', 'CMO & Business Analyst'], ['Faizan Javed', 'CTO']]) {
      const card = screen.getByRole('article', { name })
      expect(within(card).getByRole('heading', { level: 3 })).toHaveTextContent(name)
      expect(within(card).getByText(role, { exact: true })).toBeInTheDocument()
    }
    expect(screen.getByRole('link', { name: 'Meet Hira Maqsood' })).toHaveAttribute('href', '/team/hira-maqsood')
  })

  it('uses all four supplied portraits with descriptive alt text', () => {
    const { container } = render(<LeadershipTeam />)
    expect(container.querySelectorAll('img')).toHaveLength(4)
    expect(screen.getByAltText(/hira maqsood/i)).toHaveAttribute('src', '/people/hira-maqsood.webp')
    expect(screen.getByAltText(/faizan javed/i)).toHaveAttribute('src', '/people/faizan-javed.webp')
    expect(screen.getByAltText(/ali haider/i)).toHaveAttribute('src', '/people/ali-haider.webp')
    expect(screen.getByRole('img', { name: 'Noor Fatima, CMO and Business Analyst at HanovaDevs' })).toHaveAttribute('src', '/people/noor-fatima.webp')
    expect(screen.getByAltText(/noor fatima/i)).toHaveAttribute('srcset', '/people/noor-fatima-480.webp 480w, /people/noor-fatima.webp 800w')
    expect(screen.queryByText('AI-generated illustration')).not.toBeInTheDocument()
    expect(container.querySelectorAll('svg, i, [class*="icon"]')).toHaveLength(0)
    expect(screen.getByRole('link', { name: 'Explore Ali’s profile' })).toHaveAttribute('href', 'https://ali.hanovadevs.com')
  })
})
