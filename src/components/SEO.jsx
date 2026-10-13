import { Helmet } from 'react-helmet-async'
import { company } from '../data/company'
import { canonicalUrl, pageGraph } from '../lib/seo'

export default function SEO({ title, description, url, type = 'website', image, schemaMarkup, faqList, breadcrumbs, noIndex = false, pageType, publishedAt, modifiedAt, mainEntity }) {
  const cleanTitle = title?.replace(/\s*[|—–-]\s*HanovaDevs.*$/i, '')
  const siteTitle = cleanTitle ? `${cleanTitle} | HanovaDevs` : 'HanovaDevs | Custom Software, Web Development & AI Automation'
  const metaDescription = description || company.description
  const siteUrl = canonicalUrl(url)
  const metaImage = image ? new URL(image, company.url).href : `${company.url}/og-image.jpg`
  const schema = pageGraph({ url: siteUrl, title: siteTitle, description: metaDescription, pageType, breadcrumbs, faqList, schemaMarkup, mainEntity })
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="author" content="HanovaDevs" />
      <meta name="theme-color" content="#071A2B" />
      <meta name="application-name" content="HanovaDevs" />
      <link rel="canonical" href={siteUrl} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={cleanTitle || 'HanovaDevs software company'} />
      <meta property="og:site_name" content="HanovaDevs" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {modifiedAt && <meta property="article:modified_time" content={modifiedAt} />}
      <script type="application/ld+json">{JSON.stringify(schema).replace(/</g, '\\u003c')}</script>
    </Helmet>
  )
}
