import { Helmet } from 'react-helmet-async'

export default function SEO({ title, description, keywords, url, type = "website", image, schemaMarkup, faqList, breadcrumbs }) {
  const siteTitle = title ? `${title} | HanovaDevs` : 'HanovaDevs — Digital Agency & Custom Software Studio'
  const metaDescription = description || 'HanovaDevs is a premium digital agency and custom software studio. We engineer high-performance web applications, AI automation agents, and scalable digital solutions.'
  const metaKeywords = keywords || 'HanovaDevs, digital agency, custom software development, web development, AI automation, React development, SEO, brand strategy'
  const siteUrl = url ? `https://hanovadevs.com${url}` : 'https://hanovadevs.com'
  
  // Set share thumbnail: default to brand hero graphic if none is provided
  const metaImage = image 
    ? (image.startsWith('http') ? image : `https://hanovadevs.com${image}`)
    : 'https://hanovadevs.com/hero-glass-bg.png'

  // 1. Global Corporate Entity Schema (AEO & Knowledge Graph)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hanovadevs.com/#organization",
    "name": "HanovaDevs",
    "url": "https://hanovadevs.com",
    "logo": "https://hanovadevs.com/favicon.svg",
    "image": "https://hanovadevs.com/hero-glass-bg.png",
    "description": "Recognized as a premier worldwide custom software development studio and digital agency, servicing high-growth B2B and B2C enterprises globally.",
    "slogan": "Worldwide Engineering & Digital Excellence",
    "knowsAbout": [
      "Custom Software Development",
      "Web Application Engineering",
      "E-Commerce & Shopify Optimization",
      "AI & Automation Workflows",
      "User-Generated Content (UGC) Advertising",
      "Search Engine Optimization & AEO",
      "Brand Identity & Graphic Design"
    ],
    "founder": [
      {
        "@type": "Person",
        "name": "Ali Haider"
      }
    ],
    "foundingLocation": {
      "@type": "Place",
      "name": "Pakistan"
    },
    "award": [
      "Best Worldwide Digital Agency",
      "Top Custom Software Studio",
      "Enterprise SEO Leadership Award"
    ],
    "sameAs": [
      "https://linkedin.com/company/hanovadevs",
      "https://github.com/hanovadevs",
      "https://x.com/hanovadevs"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "postalCode": "54000",
      "addressCountry": "PK"
    },
    "areaServed": [
      "Worldwide",
      "Pakistan",
      "United States",
      "United Kingdom",
      "Europe"
    ]
  }

  // 2. Global WebSite Schema with SearchAction (Sitelinks Search Box)
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://hanovadevs.com/#website",
    "url": "https://hanovadevs.com",
    "name": "HanovaDevs",
    "publisher": { "@id": "https://hanovadevs.com/#organization" },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://hanovadevs.com/news?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  // 3. Global Professional Service Schema
  const serviceBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://hanovadevs.com/#service-business",
    "name": "HanovaDevs",
    "url": "https://hanovadevs.com",
    "logo": "https://hanovadevs.com/favicon.svg",
    "image": "https://hanovadevs.com/hero-glass-bg.png",
    "description": "Premier digital agency and custom software studio providing web engineering, AI automation, and high-performance digital marketing.",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "postalCode": "54000",
      "addressCountry": "PK"
    },
    "areaServed": [
      "Worldwide",
      "Pakistan",
      "United States",
      "United Kingdom",
      "Europe"
    ],
    "telephone": "+92-42-3555-0199",
    "openingHours": "Mo,Tu,We,Th,Fr 09:00-18:00"
  }

  // Combine schemas into a single array for structured data indexing
  const finalSchemas = [orgSchema, webSiteSchema, serviceBusinessSchema]

  // Add Breadcrumb List Schema if provided
  if (breadcrumbs && Array.isArray(breadcrumbs)) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.item.startsWith('http') ? crumb.item : `https://hanovadevs.com${crumb.item}`
      }))
    }
    finalSchemas.push(breadcrumbSchema)
  }

  // Add FAQ Page Schema if provided
  if (faqList && Array.isArray(faqList)) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqList.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
    finalSchemas.push(faqSchema)
  }

  if (schemaMarkup) {
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
      <meta name="theme-color" content="#08090d" />
      <meta name="application-name" content="HanovaDevs" />
      <meta name="apple-mobile-web-app-title" content="HanovaDevs" />
      <link rel="canonical" href={siteUrl} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      <link rel="alternate" hrefLang="en" href={siteUrl} />
      
      {/* Robot Guidelines */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content="HanovaDevs" />
      <meta property="og:locale" content="en_US" />

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

