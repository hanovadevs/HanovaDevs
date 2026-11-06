# Client review drafts — not approved for publication

## Review-card studio — 6 November 2026

Run `npm.cmd run dev`, then open `http://localhost:5173/design/reviews` (use the port Vite prints if different). This development-only page holds the 20 names and draft reviews supplied by the company owner after requesting invented reviews. They are unverified sample attributions, not established client endorsements; each card retains its sample label and has no rating. It is not an authenticated/admin page. It is not linked in public navigation, is marked noindex/nofollow, and Vite removes its module and fixtures from production. The built site returns a real 404 at this path.

- Filter by theme, open **Edit sample**, and replace the draft text to preview it immediately. Edits are memory-only and disappear on refresh.
- **Download all 20 drafts** exports every card, including edited/filtered-out ones, as JSON. Every record remains `sample: true` and `approvedForPublication: false`. Downloading does not publish or save into the repo.
- Editable source: `src/pages/design/reviewSamples.js`. Replace wording with actual feedback; a proposed draft can be sent to a client for correction and express approval, but is not itself evidence of their experience.
- Public cards use `src/components/reviews/ReviewCard.jsx`. The homepage spotlight and Reviews page use the same typography, curved shapes and source attribution. `src/data/approvedReviews.js` derives only the existing supplied review from `clientStories.js`. Repeated placements of Affan’s review are excerpts from **one review**, not multiple independent reviews.
- To publish a new review, first obtain the real wording, exact attribution and permission. Add the approved feedback to the corresponding story in `clientStories.js` (or explicitly extend the public registry for a new client), retaining its approval evidence separately. Do not import the design fixture module into any public page or registry. Do not infer a rating from positive wording.

After `npm.cmd run build`, run `npm.cmd run test:reviews:production`. Optionally pass a local production-preview base URL to also check the 404: `npm.cmd run test:reviews:production -- http://127.0.0.1:42877`. Unit and browser tests cover draft labels, filtering, live edits, export flags, mobile layout, keyboard operation and approved-review attribution.

## Live-page refresh — 31 October 2026

The reviews page now groups eight case studies into six client stories. The company owner confirmed Affan Mughal as GrowTech Advertising’s Founder, then supplied his complete five-star review for publication. The GrowTech card publishes that review’s excerpt and full text, with paragraph formatting preserved and the original emphasis markers removed. His praise is attributed opinion, not an independently measured productivity result. No Review or AggregateRating schema is added to the agency’s self-hosted client page. Crown’s website and CRM share another story with a labelled, company-relayed positive feedback summary, not an invented quotation. Zozo is included as a discovery/comparison platform with no invented owner name. All six stories link to the actual case studies. The feedback form prepares a mailto draft; it does not send mail or publish reviews automatically.

The Veli, Sara, Shahid Mahmood and Noor Fatima drafts below are suggested wording only, written at the company owner's request. They are not actual client statements, verified reviews, or evidence of results. None of these drafts is published on the website. Send each draft to the named client for correction and express approval before attributing it publicly. Do not add a star rating or performance figure without a source. Affan’s separately supplied review is not one of these drafts.

## Veli — EarthSync Essentials

Draft for Veli to review: “HanovaDevs helped give EarthSync Essentials a clear and welcoming online presence. The visual direction feels connected to our brand, and the product presentation gives customers a straightforward way to explore what we offer. I appreciate the care that went into bringing the experience together.”

Confirm: the work performed, whether this reflects Veli's experience, publication permission, and any edits. Suggested project evidence: approved storefront screenshots and a live URL. No conversion or revenue result is asserted.

## Sara — Terra Sol Grounding

Draft for Sara to review: “Our goal was an online experience that made Terra Sol easy to understand and explore. HanovaDevs brought the brand presentation and product information together in a thoughtful way. The result gives us a focused digital home for our grounding products.”

Confirm: Sara's wording, actual scope, permission, and which delivery artifacts can be shown. Any measured outcome needs its baseline, dates and source.

## Shahid Mahmood — Crown Accumulators

Draft for Shahid Mahmood to review: “We wanted Crown Accumulators to be presented with clarity and professionalism online. HanovaDevs helped organize the business information into an experience customers can explore and use to reach us. The attention to our company's presentation was valuable.”

Confirm: delivery scope, live website availability, wording and permission. Do not infer new enquiries, sales increases or uptime from website delivery.

## Noor Fatima — RAQS

Draft for Noor Fatima to review: “RAQS needed a digital experience with a strong identity and a clear focus on the collection. HanovaDevs helped bring those elements together into a storefront that feels connected to the brand. The balance between visual character and product discovery is something I value.”

Confirm: brand-owner approval, actual scope, attribution and publication permission. Do not infer order or customer growth.

## Publication checklist

- Obtain the client's own feedback or a corrected, explicitly approved version of a draft.
- Retain the approval and date; agree the exact public name and project association.
- Publish quoted text only when it represents that client's actual experience.
- Keep numerical outcomes separate, with a baseline, period, measurement source and relevant context.
- The website currently publishes project stories. No fabricated stars, headshots, quotes or aggregate review schema is included.
