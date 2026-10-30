import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import News from './News'
import { newsArticles, newsUpdatedAt } from '../data/news'
import { routeModifiedAt } from '../data/routes'

afterEach(() => { cleanup(); localStorage.clear() })
const show = () => render(<HelmetProvider><MemoryRouter><News /></MemoryRouter></HelmetProvider>)

describe('October 30 news briefing', () => {
  it('uses unique, dated primary-source stories in newest-first order', () => {
    expect(newsUpdatedAt).toBe('2026-10-30')
    expect(new Set(newsArticles.map(article => article.id)).size).toBe(newsArticles.length)
    expect(newsArticles.filter(article => article.publishedAt >= '2026-10-26')).toHaveLength(8)
    expect(newsArticles.map(article => article.publishedAt)).toEqual(newsArticles.map(article => article.publishedAt).sort().reverse())
    for (const article of newsArticles) {
      expect(article.publishedAt <= newsUpdatedAt).toBe(true)
      expect(new Date(article.publishedAt).toISOString().slice(0, 10)).toBe(article.publishedAt)
      expect(new URL(article.sourceUrl).protocol).toBe('https:')
      expect(['vercel.com', 'blog.google', 'developers.googleblog.com', 'github.blog', 'www.anthropic.com', 'www.hanovadevs.com', 'apps.microsoft.com']).toContain(new URL(article.sourceUrl).hostname)
    }
    expect(routeModifiedAt('/news')).toBe(newsUpdatedAt)
  })
  it('leads with current news while preserving dates on company updates', () => {
    const { container } = show()
    expect(container.querySelector('.nw2-lead h2')).toHaveTextContent(newsArticles[0].title)
    expect(screen.getByLabelText('Last editorial update October 30, 2026')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Digital Products', exact: true }))
    expect(container.querySelectorAll('time')).toHaveLength(2)
    for (const time of container.querySelectorAll('time')) expect(time).toHaveAttribute('datetime', '2026-10-13')
    const graph = JSON.parse(container.querySelector('script[type="application/ld+json"]').textContent)['@graph']
    expect(graph.find(node => node['@type'] === 'ItemList').numberOfItems).toBe(2)
    expect(graph.some(node => node['@type'] === 'NewsArticle')).toBe(false)
  })
  it('searches recent stories and opens a grounded quick read with editorial context', () => {
    show()
    fireEvent.change(screen.getByRole('searchbox', { name: 'Search news' }), { target: { value: 'Connected Apps' } })
    expect(screen.getByRole('heading', { name: 'Google previews a unified Connected Apps Platform' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Quick read', exact: true }))
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByRole('heading', { name: 'Why it matters' })).toBeInTheDocument()
    expect(within(dialog).getByText('HanovaDevs editorial perspective')).toBeInTheDocument()
    expect(within(dialog).getByRole('link', { name: /Read on Google/ })).toHaveAttribute('href', newsArticles.find(article => article.id === 'google-connected-apps-preview').sourceUrl)
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
