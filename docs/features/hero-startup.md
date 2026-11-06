# Stable homepage startup

## Cause and fix — 6 November 2026

The production homepage is prerendered, but the client previously called `createRoot` immediately while `Home` was still a lazy import. That replaced the visible hero with the route-loading fallback. Under artificial script delays, the headline disappeared for approximately 0.75 seconds. Its delayed CSS entrance then dimmed and translated already-visible content, replaying when React mounted it.

`src/app/startup.js` now waits for the homepage module and its CSS before mounting the client. `App` receives the resolved homepage component so its initial render cannot suspend on that route. Until then, prerendered content and metadata remain untouched. Other route entry points retain their existing lazy loading; the homepage is not added to every page's initial bundle. This is a coordinated client mount, not a migration to React hydration.

The assistant has its own null-fallback Suspense boundary so its chunk cannot interrupt the page. If the homepage chunk fails, the static page remains visible and the existing error monitor receives a `homepage-startup` event. Ordinary links still work as full-page navigations in that fallback; the page is not claimed to be interactive until mounting succeeds.

Hero headline lines, supporting paragraph and actions no longer have delayed entrance animations. The centered background layout, copy, colours, typeface, responsive sizing and button styles are unchanged. External font delivery remains unchanged: this fix addresses the reproduced loading fallback and animation restart, not a promise that no webfont can ever swap.

## Regression checks

Run `npm.cmd run build`, then `npm.cmd run test:hero:startup`.

The production check starts and closes its own local preview. It samples every animation frame for three seconds on cold loads and reloads at 320, 390, 820 and 1440px, with both normal and reduced motion. Main, homepage and assistant scripts are deliberately delayed. After the hero first appears, the check requires continuous text/actions, full opacity, no transforms/entrance animations and unchanged vertical positions. It also checks metadata, overflow, console errors and a functional Projects filter after navigating from the hero. A separate failed-homepage-chunk scenario verifies static content and metadata retention plus error reporting.

Fonts are blocked in this timing regression to isolate the two diagnosed causes. Existing responsive/browser checks cover the design with ordinary page loading. Unit tests cover deferred mounting, failure and preservation of route-level splitting.
