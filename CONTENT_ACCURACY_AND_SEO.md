# Content and discovery handover

Reviewed: October 13, 2026.

## Sources of company facts

The company owner supplied the 2022 founding year, Ali Haider's identity and portrait, the founder URL, Eunoia's Microsoft Store release status, Omnai's upcoming launch, and these project relationships: Veli / EarthSync Essentials, Sara / Terra Sol Grounding, Shahid Mahmood / Crown Accumulators, Noor Fatima / RAQS. These are owner-attested facts, not an independent company-size or performance audit. The founder website and Store listing were not independently fetched successfully during this audit. Check the links and package details before release.

Public content uses a shared registry in `src/data/company.js`. The public portfolio is curated from that registry rather than unreviewed database copy. Admin portfolio content must pass the same evidence review before it is reintroduced to public pages.

Removed: invented product reviews and article comments, unsupported portfolio metrics, speculative future-news claims, fake office/support coverage, fake stock-team identity, unsubstantiated proficiency scores, and blanket Lighthouse, accessibility, SOC 2 and business-result guarantees. Service copy now describes scope and validation rather than a universal outcome. Aria's incorrect product and client descriptions were corrected. Existing estimator values remain illustrative, not quotes or measured ROI.

The review page contains project stories and qualitative delivery outcomes. Draft testimonials are in `CLIENT_REVIEW_DRAFTS.md`, not in the public site. No client quote or rating should be published without actual feedback and attribution approval. Company-controlled reviews do not establish eligibility for Google Organization review stars: https://developers.google.com/search/docs/appearance/structured-data/review-snippet

## News and research

The briefing includes company product-status updates and source-linked industry news reviewed October 13, 2026. Product update dates are editorial publication dates, not invented release dates. Industry sources are original Microsoft, Google and Anthropic announcements, linked on each card. The research library links original arXiv papers, W3C accessibility guidance and Google Web Vitals guidance. News is editorially curated, not an automatically updating feed.

## Technical discovery

The production build generates 31 public HTML routes, route-specific titles/descriptions/canonicals/social metadata, factual Organization/Person/WebSite graphs, visible FAQ data and article metadata. The sitemap is generated from the same route inventory. Public HTML includes readable content without JavaScript. Unknown URLs get a generated noindex 404; old blog paths and retired speculative articles redirect to appropriate journal destinations. Admin content is not prerendered or included in the sitemap.

`llms.txt` is a factual source map. It is not a Google submission mechanism or a ranking signal guarantee. SEO/AEO/GEO work cannot instruct Google or an answer engine to rank a company first. Follow Google's standard guidance: https://developers.google.com/search/docs/appearance/ai-features

## Cookies and analytics

Optional Google Tag Manager, Vercel Web Analytics and Speed Insights are blocked until analytics consent. Advertising consent remains denied. The first-party preference lasts 180 days. Footer settings allow changes; revocation clears known first-party Google cookies and reloads to stop active scripts. News-saving and portal authentication storage are functional storage, not advertising profiles.

Before deployment, inspect GTM-WNB5ZMNL in the Google dashboard. Ensure every analytics tag requires analytics consent and no advertising or custom tracking tag bypasses its consent checks. The local code cannot audit or change a remotely managed container. A legal reviewer should approve the privacy notice for the business's actual providers, processing and jurisdictions; this change is not a legal compliance certification.

## Release checklist

1. Run `npm run lint`, `npm test`, `npm run build`, `npm run test:seo`, and browser tests.
2. Deploy through the existing approved Vercel workflow. This content task did not deploy production or change Supabase policies.
3. Check production routes, 308 redirects and unknown-path HTTP 404 responses. Verify the API routes still function.
4. Verify control of `hanovadevs.com` in Google Search Console and submit `https://hanovadevs.com/sitemap.xml`. Inspect the homepage, About, product, review and company-guide URLs; request indexing where appropriate.
5. Verify consent behavior against the actual production GTM container and Vercel integrations.
6. Confirm client publication permission and any measured results before adding reviews.
7. Maintain source dates and product status when news or releases change. Refresh sitemap lastmod only when content changes materially.

No search ranking, indexing time, company size, client revenue result or certification is guaranteed.
