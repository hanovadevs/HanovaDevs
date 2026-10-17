# Case-study evidence

Reviewed 2026-10-17. Company-supplied client relationships and broad delivery context remain in `src/data/company.js`. Editorial case-study records are in `src/data/caseStudies.js`.

## Captures

Public homepages were opened in Chromium at desktop 1440 × 1000 and mobile 390 × 844. The original interface was allowed to render and animate; no client page text or styles were changed. A further homepage view was captured after scrolling. The resulting screenshots are local WebP files in `public/case-studies/`; 800px derivatives serve project cards.

- EarthSync Essentials: https://www.earthsyncessential.com — visible brand, product/information navigation, Explore Collection and shop entry points.
- Terra Sol Grounding: https://www.terrasolgrounding.com — visible product/science discovery actions and Buy on Amazon entry point.
- Crown Accumulators: https://www.crownaccumulator.com — visible corporate/product navigation, SOLO brand destination and quote-request actions.
- RAQS: https://www.raqsofficial.store — visible brand, collection, journal and customer-information destinations.

These are observations of presented interfaces, not a certification of every route or interaction. No enquiries, orders, payments, newsletter signups or other client-side writes were submitted. No checkout completion, email delivery or private analytics was verified. Client product, medical, certification, sales or rating claims appearing within an unedited screenshot are not independently verified by this review and are not adopted as HanovaDevs performance claims.

No supported before/after traffic, revenue, conversion or ROI measurements were supplied. Case studies explicitly distinguish delivered work and observed interface details from unverified business outcomes. Do not add performance metrics, quotes, awards, technologies or project dates without supporting evidence.

`node scripts/capture-case-studies.mjs` refreshes captures from the public sites and should be followed by visual inspection; it is not part of normal builds. Update the review date and observations only after reviewing the refreshed assets. The generator does not establish that a client site uses Shopify or any other particular implementation.
