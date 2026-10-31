# Aria assistant

Aria uses `src/data/assistantKnowledge.js`, composed from the shared company, leadership, program and product records. Update those records when a role or release status changes. Server instructions do not accept client-supplied company directives, calendars or availability claims.

## Runtime

- Use Node.js 22 or newer (required by the installed AI SDK).
- `ANTHROPIC_API_KEY`: server-only, existing direct Anthropic account. Never use a `VITE_` prefix.
- `ANTHROPIC_MODEL`: optional server-only model override. The default is `claude-sonnet-5-5`, checked against Anthropic's published model catalog on 2026-10-17. Check model access for the deployment account before release.
- Contact handoff reuses the existing SMTP credentials: `EMAIL_USER`, `EMAIL_PASS`. Optional `EMAIL_HOST` / `EMAIL_PORT` override the existing Gmail/465 defaults for another SMTP host. Port 465 uses implicit TLS; other SMTP ports require STARTTLS.
- Deploy the `api/chat.js` and `api/assistant-contact.js` functions with the site. `npm run dev` uses a server-only middleware to run the same handlers locally, loading only the allowed Aria/SMTP env names. Restart development after changing credentials. Explicit process environment values take precedence. Vite preview is static-only; use a deployed preview for production API validation.
- Do not overwrite local env files to configure this feature. Configure the matching server variables securely in the deployment environment; redeploy after changes.

## Behaviour

The chat API bounds message count, text length, output tokens, request time and retries. Missing provider credentials, network failures and provider errors fall back to clearly labelled reviewed site answers. No live browsing or private admin/database access is enabled. Model-generated text is rendered without HTML or arbitrary clickable model-generated URLs. Related page links are selected from reviewed records only.

Visitors can stop a response, restart the conversation or move to a human enquiry. The contact form preserves a failed draft, requires explicit contact consent, and includes recent conversation excerpts only on opt-in. Calculator enquiries remain editable, illustrative planning estimates.

Contact requests go only to `contact@hanovadevs.com`, with the visitor's address as Reply-To. They are not calendar bookings, newsletter subscriptions or promises of a meeting link. Success means the configured SMTP server accepted the company recipient; it does not prove inbox placement or a human reply. Provider errors and visitor messages are not logged. SMTP failures do not create a local-only record disguised as a delivered enquiry.

Chats are kept in component memory, not automatically persisted to localStorage or the company database. Anthropic processing/retention depends on the account terms. Sent enquiries may be retained in company email for follow-up.

Both endpoints reject cross-origin browser requests and have a best-effort per-instance rate limiter; this is not deployment-wide bot protection. Configure platform-level rate limits and budget alerts for a public launch. Do not treat the in-memory limiter as a global quota or protection against all spam.

## Checks

`npm test -- --maxWorkers=1` covers reviewed knowledge, follow-up retrieval, API validation, SDK/provider HTTP compatibility, contact consent, fixed-recipient delivery and failures. Playwright's `tests/browser/assistant.e2e.mjs` covers six viewports, accessible controls, source navigation, offline fallback, stop/reset races, calculator handoff and failed-draft preservation. Provider and email writes are controlled fixtures in these tests; they do not prove live provider access or email delivery. Verify a deployed preview with a consented test enquiry before publishing.
