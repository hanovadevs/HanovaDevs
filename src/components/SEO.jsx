import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, keywords, url, type = "website", image, schemaMarkup }) {
  const siteTitle = title ? `${title} | HanovaDevs` : 'HanovaDevs — Digital Agency & Custom Software Studio'
  const metaDescription = description || 'HanovaDevs is a premium digital marketing agency and custom software development studio. We engineer scalable web applications and high-converting marketing campaigns.'
  const metaKeywords = keywords || 'HanovaDevs, digital marketing agency, custom software development, web design, SEO, brand strategy'
  const siteUrl = url ? `https://hanovadevs.com${url}` : 'https://hanovadevs.com'
  
  // Set share thumbnail: default to brand hero graphic if none is provided
  const metaImage = image 
    ? (image.startsWith('http') ? image : `https://hanovadevs.com${image}`)
    : 'https://hanovadevs.com/hero-glass-bg.png'

  // Global Corporate Entity Schema (AEO & Knowledge Graph)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hanovadevs.com/#organization",
    "name": "HanovaDevs",
    "url": "https://hanovadevs.com",
    "logo": "https://hanovadevs.com/favicon.svg",
    "image": "https://hanovadevs.com/hero-glass-bg.png",
    "description": "Premium digital marketing agency and custom software development studio engineering high-performance web applications and brand ecosystems.",
    "sameAs": [
      "https://linkedin.com/company/hanovadevs",
      "https://github.com/hanovadevs",
      "https://x.com/hanovadevs"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "addressCountry": "US"
    }
  }

  // Global Professional Service Schema (Crucial for Local & Enterprise Agency rankings)
  const serviceBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://hanovadevs.com/#service-business",
    "name": "HanovaDevs",
    "url": "https://hanovadevs.com",
    "logo": "https://hanovadevs.com/favicon.svg",
    "image": "https://hanovadevs.com/hero-glass-bg.png",
    "description": "Bespoke web design, full-scale custom software development, enterprise SEO, and digital marketing services.",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94107",
      "addressCountry": "US"
    },
    "telephone": "+1-415-555-0199",
    "openingHours": "Mo,Tu,We,Th,Fr 09:00-18:00"
  }

  // Combine schemas into a single array for perfect knowledge graph crawling
  const finalSchemas = [orgSchema, serviceBusinessSchema]
  if (schemaMarkup) {
    // If it's an array, append all; otherwise append single
    if (Array.isArray(schemaMarkup)) {
      finalSchemas.push(...schemaMarkup)
    } else {
      finalSchemas.push(schemaMarkup)
    }
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={siteUrl} />
      
      {/* Robot Guidelines */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="HanovaDevs" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content="@hanovadevs" />
      <meta name="twitter:creator" content="@hanovadevs" />

      {/* Combined Schema.org JSON-LD Script Injection */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchemas)}
      </script>
    </Helmet>
  )
}
