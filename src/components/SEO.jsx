import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, keywords, url, type = "website", schemaMarkup }) {
  const siteTitle = title ? `${title} | HanovaDevs` : 'HanovaDevs — Digital Agency & Custom Software Studio'
  const metaDescription = description || 'HanovaDevs is a premium digital marketing agency and custom software development studio. We engineer scalable web applications and high-converting marketing campaigns.'
  const metaKeywords = keywords || 'HanovaDevs, digital marketing agency, custom software development, web design, SEO, brand strategy'
  const siteUrl = url ? `https://hanovadevs.com${url}` : 'https://hanovadevs.com'

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />

      {/* Twitter */}
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={metaDescription} />

      {/* Dynamic JSON-LD Schema (AEO Optimization) */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  )
}
