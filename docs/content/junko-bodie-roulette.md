# Junko Bodie Roulette portfolio entry

Added 6 November 2026 at `/projects/junko-bodie-roulette`. HanovaDevs supplied the delivery attribution; interface descriptions come from the public homepage, `/roulette-simulator`, `/roulette-odds-calculator` and `/blog`.

## Presentation and scope

- Listed in Projects, homepage featured work and client project stories. A story is not a review: no owner quotation, rating or business-performance result is added.
- The dedicated case study uses the existing curved, gold-toned portfolio layout, four keyboard-operable screenshot tabs, four visible FAQs and a prefilled contact handoff.
- Clearly identified as an adult (21+) educational, virtual-chip simulator. It is not presented as real-money wagering or an opportunity to win money or prizes.
- Public calculator controls and guide destinations are documented. No membership, payment, private-account, random-number or security audit is claimed.
- The route registry automatically supplies the prerendered page, canonical metadata, XML sitemap, image sitemap and discovery files. The original review dates on other case studies are retained.

## Assets

`scripts/assets/capture-junko-project.mjs` captures only public GET pages. Original PNGs live in `assets/source/projects/junko-bodie-roulette/`; optimized WebP captures live in `public/case-studies/`. The project card is 800px wide; desktop captures are 1600×1000. A 390×844 mobile calculator capture is also shown, without implying a private simulator session was tested. The cover uses the public calculator, not the homepage.

Chromium encountered intermittent SSL protocol errors loading the site's assets; the homepage hero also failed to render reliably. The public calculator and guide pages rendered successfully, so those are used in the portfolio instead. An attempted public-asset network replay did not resolve the homepage rendering and was removed. The screenshot script does not alter the website's markup or design, and rejects an unstyled page rather than publishing it.

Capture commands overwrite only this project's named capture assets. Re-run deliberately when updating the portfolio, review the images visually, and update evidence dates if the website has changed.

## Verification

Unit tests cover registry links, real asset paths, unique edition numbers, truthful positioning, dynamic capture dates, the gallery and FAQs. The Junko browser journey checks portfolio discovery, all gallery images, keyboard operation, mobile overflow, automated accessibility checks and the prefilled contact enquiry. No form is submitted or external account accessed.
