# Service-page experience

Reviewed and implemented: 5 November 2026.

The six service detail pages and the services directory retain the existing navy/teal branding, with individual light colour washes, curved media frames, actual project screenshots and three supporting editorial photographs. Content is readable without JavaScript. Motion is progressive, uses transforms rather than hiding content, and is disabled for reduced-motion preferences.

## Content structure

Each service has five new buyer-focused modules:

1. Six possible project types, with practical formats and an enquiry link that carries the selected type into the contact form.
2. Ten distinct problems, each paired with a proposed approach and a way to validate the work. Native disclosures support keyboard interaction without a custom JavaScript accordion.
3. Three engagement options explaining a review, a scoped delivery or a focused improvement.
4. Four preparation inputs for a useful first conversation, with a reminder not to submit secrets or private records.
5. Three measurement stages separating a baseline, implementation checks and observed business impact.

Existing capabilities, scenarios, delivery steps, handover, related work and FAQs remain connected to that guidance. Repetitive quality and resource sections are consolidated into handover and closing areas. Project-type FAQs are visible and included in the existing factual FAQ schema. The sitemap review date changes only for the services directory and service detail pages.

Edit service-specific guidance in `src/data/serviceExperiences.js`; `src/data/services.js` attaches it to the shared service registry. Shared components are in `src/components/services/`. The page layout is in `ServiceDetail.jsx`, with its new styling in `ServiceExperience.css`.

## Evidence and images

- Web design: the delivered GrowTech website screenshot, with GrowTech and Zozo case studies.
- Shopify: the existing EarthSync commerce screenshot and the service's related portfolio context. Do not infer a specific platform implementation from an image alone.
- Custom software: the supplied GrowTech CRM screenshot; private client applications remain portfolio walkthroughs, not embedded demos.
- The Affan Mughal excerpt on the web/software pages comes from the owner's supplied review and links to the full review. No new quotes, ratings, clients, performance metrics or awards are invented.
- SEO, AI and branding use new illustrative editorial photographs, not purported photographs of HanovaDevs staff or client work. Alternative text identifies them as illustrative. No fake dashboard result or branded client artifact is generated.

The built-in `image_gen` tool created three images: `search-research`, `automation-workshop` and `identity-studio`. Original PNGs and the exact final prompt set are saved in [the source assets folder](../../assets/source/services/generation-prompts.json). Responsive 640px and 1280px WebPs are published under `public/services/`. The preparation script runs during the production build and can also be run directly:

```sh
node scripts/assets/prepare-service-assets.mjs
```

The generated photographs are supporting illustrations. Real project screenshots and case-study evidence remain separate. Business results require an actual baseline and observation; implementation is not a ranking, revenue or time-saving guarantee.

## Validation

Run `npm run lint`, `npm run test:structure`, `npm test -- --maxWorkers=2`, `npm run build` and `npm run test:seo`. Browser suites `work-pages.e2e.mjs` (service journey tests) and `service-experiences.e2e.mjs` cover images, layout, accessibility checks, native disclosures, scenario tabs and context-preserving enquiry links. Run the production prerender browser check against an isolated preview port after the build. Tests of enquiry prefill do not send real messages or prove inbox delivery.

No deployment, provider configuration, credential change or backend change is part of this update.
