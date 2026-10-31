# HanovaDevs website

Public company website built with React, Vite and route-level code splitting. The production build prerenders the public route inventory, SEO metadata, sitemap and a real 404 page. There is no admin panel, authentication system or database connection.

## Local setup

Use a current Node.js LTS release and npm. Run all commands from the repository root (on Windows, use `npm.cmd` if PowerShell blocks `npm`).

```sh
npm ci
npm run dev
```

Vite starts the website and the local Aria API middleware. Public content does not require database credentials. Keep local secrets in ignored environment files; never commit them or prefix server credentials with `VITE_`. The cleanup removed obsolete database/browser-login entries from local environment files while preserving unrelated settings.

## Folder guide

```text
api/                 Vercel API handlers (must stay at the root)
server/              Shared request guards and local API middleware
src/
  app/               Browser entry, application routes and SSR entry
  pages/             Pages grouped by feature: company, projects, products, etc.
  components/        Reusable UI grouped by responsibility
  data/              Reviewed company, team, project, service and editorial content
  hooks/             Shared React hooks
  lib/               SEO, consent, monitoring and program schema helpers
  styles/            Global and shared page styles
public/              Published, directly addressable assets and crawler files
assets/source/       Original image masters; not served or copied into dist
scripts/
  assets/            Image preparation and capture tools
  build/             HTML and sitemap prerendering
  checks/            Structure, SEO, responsive and production-browser checks
tests/
  unit/              Component, content and server-handler tests
  browser/           Playwright interaction and responsive tests
docs/                Content evidence, feature and deployment notes
```

Start with [the documentation index](docs/README.md) and [asset guidance](assets/README.md).

## Editing the site

- Edit approved facts and page content in `src/data/`. Project case studies and workflows have separate data registries.
- Routes live in `src/app/App.jsx`; public discovery routes live in `src/data/routes.js`. Update the SSR renderer and deployment routes when adding a page.
- Use published root-relative image paths, not paths inside `assets/source/`. Preserve exact filename casing for Linux deployments.
- Image scripts run from the root, for example `node scripts/assets/prepare-hira-portrait.mjs`. `npm run optimize:images` rebuilds the active product and brand WebPs; the production build prepares the hero and Stepsy variants automatically. Some optional generators require ignored local image masters.

## Validation and production build

```sh
npm run lint
npm test
npm run test:structure
npm run build
npm run test:seo
npm run preview -- --host 127.0.0.1 --port 4173
```

With preview running in a separate terminal, `npm run test:prerender` checks every public route with JavaScript disabled. `npm run test:mobile` runs browser suites against the local dev server. Run builds and browser suites sequentially on Windows to avoid generated-file watcher conflicts.

`dist/`, `dist-ssr/`, `artifacts/`, `test-results/` and `playwright-report/` are generated and ignored. They can be rebuilt; do not treat them as source.

## Contact, Aria and monitoring

- The contact page sends requests to FormSubmit for `contact@hanovadevs.com`. Mailbox activation and delivery must be checked separately; a mocked test is not proof of email delivery.
- Aria uses `/api/chat` and `/api/assistant-contact`. Its reviewed company knowledge is in `src/data/`; SMTP handoff runs server-side. Keep provider and SMTP credentials server-only. The assistant has a reviewed-answer fallback when the model provider is unavailable.
- `/api/report-error` accepts browser error reports into server logs. External alerting and retention are separate operational setup, not a configured monitoring service.
- The former admin pages and database client/schema are removed. Retired admin URLs resolve to the normal 404; there is no private shell to deploy. Remote database resources and historical data were not deleted.

See [deployment checks](docs/deployment/security-deployment.md) before publishing. No production deployment is performed by reorganizing this repository.
