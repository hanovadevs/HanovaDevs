# Responsive verification

Install dependencies with `npm install` and the test browser with `npx playwright install chromium`.

`npm run test:mobile` starts or reuses the local Vite server. It checks the hero, navigation and keyboard focus, news search and bookmarks, product gallery selection, estimator updates, form font sizes, and chat panel bounds at 320, 390, 430, 820, 844 (landscape), and 1440 pixels. The desktop-only menu case is skipped because desktop uses inline navigation.

For the full layout audit, start `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort`, then run `npm run test:responsive` in another terminal. This checks 26 routes at ten widths from 320 to 1920 pixels, including all six services, product detail pages, journal articles, legal documents, the 404 page, and the portal sign-in screen. It checks document overflow, content extending beyond the viewport, clipped headings, and browser exceptions. Authenticated portal screens are outside this public-page audit.

The audit writes its report and selected screenshots to `artifacts/responsive/`; browser interaction failures produce traces in `test-results/`. These generated folders are ignored by Git.

Optional PowerShell overrides:

```powershell
$env:RESPONSIVE_WIDTHS = '600,640,900,1120,1121'
$env:RESPONSIVE_ROUTES = '/,/news,/contact,/products/eunoia'
$env:RESPONSIVE_MOTION = 'normal'
npm.cmd run test:responsive
```

`RESPONSIVE_BASE_URL` can point the audit at a preview deployment. Browser tests use Chromium viewport and touch emulation; this does not replace testing on physical iOS and Android devices.

`node scripts/optimize-images.js --brand-only` regenerates the responsive WebP logos and hero backgrounds from the original PNGs. Originals are retained.
