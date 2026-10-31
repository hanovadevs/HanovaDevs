# Deployment checklist

## Current architecture

This is a public, prerendered React website with three server API handlers: chat, assistant contact and error reporting. The admin dashboard, browser database client, database schemas and admin-only email handler have been removed. No database configuration is required. Historical remote resources and stored data are not deleted by this change.

1. Run lint, unit tests, structure checks, the production build and SEO checks from the repository root. Check the preview with JavaScript disabled and exercise public navigation in a browser.
2. Keep `api/` at the repository root. Deploy `dist/` using the existing Vercel configuration; do not publish source masters, environment files, test output or the external cleanup backup.
3. Confirm `/admin` and `/hanova-portal-2026` return HTTP 404 with the normal not-found page. No hidden dashboard should be built, rewritten or indexed. The removed `/api/send-email` endpoint must not accept requests.
4. Keep the model-provider key and SMTP password server-only. Never use a `VITE_` prefix for secrets. Rotate credentials that were previously exposed in deployed browser code; removing code does not revoke a credential.
5. Remove obsolete database and former browser-login variables from the hosting provider's Development, Preview and Production configuration when no other application uses them. Private local environment files are preserved by the repository cleanup, but these variables are no longer consumed. Do not delete a shared remote database or account without a separate decision and backup.
6. Configure the existing chat provider and SMTP environment settings for Aria. Test accepted, rejected and unavailable handoffs. A server accepting mail is not proof of inbox arrival: perform a deliberate delivery check with the mailbox owner before launch.
7. Verify FormSubmit activation for `contact@hanovadevs.com` and perform a deliberate public-contact delivery check. Never treat local simulated success as proof that an enquiry arrived.
8. Configure and verify the existing error-reporting destination before describing monitoring as operational. Keep user messages and private credentials out of logs.
9. Review generated HTML and browser requests for secret leakage. Confirm cookies/analytics respect consent and private routes remain absent from sitemap and discovery files.
10. Deploy only through an explicitly approved publishing workflow. Recheck HTTP status codes, assets, public contact and Aria on the deployed URL.
