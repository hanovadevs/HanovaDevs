# Search and answer-engine readiness — 30 October 2026

## Implemented

- All seven project cards use the large editorial layout. Compact related-project cards remain compact. Responsive screenshot sources, readable labels and direct case-study links are retained.
- Preferred origin is `https://www.hanovadevs.com`, matching the live apex-to-www redirect observed during this review. Canonicals, Open Graph URLs, organization/person entities, product/program references, legal website references, robots, discovery files and generated sitemaps align to this origin. Ali's separate personal website is unchanged.
- The homepage explicitly describes the software-development agency and custom CRM offering. Six visible questions and answers use the same source as FAQ structured data. All seven case studies are linked from the homepage; unsupported measurable-results wording was removed.
- Project and service directory pages have ItemList entities matching the visible destinations. Individual service pages identify their Service entity. Primary page images and social-image descriptions are included in route metadata.
- The company guide includes relevant website/CRM examples and workflow links. Its original publication date remains intact; the expanded guide has a visible updated date matching its metadata and sitemap date.
- The build prerenders the public route inventory with unique titles/descriptions, canonicals, structured data and meaningful content. The sitemap includes portfolio images using Google's image-sitemap namespace. The former admin routes are removed and return the normal HTTP 404; no private shell is built or indexed.
- Regression checks cover canonical consistency, visible/schema agreement, direct project links, complete image files, portfolio image sitemap entries and unsupported-rating exclusions.

## After deployment

1. Verify `https://www.hanovadevs.com/sitemap.xml` returns XML directly. Confirm the preferred origin in the deployed canonical, robots and sitemap, not just the local source.
2. In a verified Search Console Domain property or matching www URL-prefix property, submit that sitemap and inspect the homepage, project collection, six services and main company guide. No Search Console submission or indexing request was performed by this implementation.
3. The live apex redirect returned HTTP 307 during this review. Consider a permanent 301/308 primary-domain redirect in hosting settings. No DNS, domain or Vercel account settings were changed here.
4. Monitor indexing, Google-selected canonicals, query impressions/clicks and real enquiry quality. Compare before/after periods rather than treating a code change as evidence of improved ranking.
5. Continue publishing genuine project evidence and approved client feedback. Do not add fabricated quotations, reviews, awards, addresses, rankings or performance metrics. Maintain product availability accurately.

## Boundaries

This implementation does not establish a number-one global ranking, guarantee indexing or control Google's descriptions. FAQ markup is not a promise of FAQ rich-result eligibility. `llms.txt` is a supplemental discovery resource, not a requirement for Google AI Overviews or AI Mode. No hidden instructions, keyword stuffing or fake independent endorsements were added.

Primary guidance reviewed:

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
- https://developers.google.com/search/docs/appearance/ai-features
