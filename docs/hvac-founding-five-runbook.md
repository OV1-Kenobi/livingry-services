# HVAC Founding Five — Internal Runbook

Operational reference for the `/hvac/founding-five` acquisition funnel. Internal only — not a public page. Nothing here contains secrets; production credentials are supplied via environment variables at deploy time and must never be committed or pasted into chat.

---

## What the funnel is

A diagnostic-first funnel to recruit five paid US HVAC pilot clients. The single primary conversion is **"Request a Private Workflow Review"** (the form at `#request-review`). There is **no public calendar anywhere in this funnel** — qualified companies receive a private workflow observation before any fit call is offered.

- Public page: `src/app/hvac/founding-five/page.tsx`
- Copy source of truth: `src/lib/hvac-founding-five/content.ts`
- API endpoint: `POST /api/hvac-founding-five` (`src/app/api/hvac-founding-five/route.ts`)

---

## Request lifecycle (12 states)

Defined in `src/lib/hvac-founding-five/types.ts`.

```
new_request → researching → audit_prepared → audit_sent →
fit_call_invited → fit_call_scheduled → qualified → proposal_sent →
pilot_won | pilot_lost | disqualified
(nurture is a holding state off the main path)
```

Terminal states: `pilot_won`, `pilot_lost`, `disqualified`. Every non-terminal ("active") record must carry a **next action**, an **owner**, and a **due timestamp** — enforced by `isActiveState()` and by the pipeline, which stamps new records with `next_action = "Research one externally observable workflow and prepare a micro-audit"` and a due date 48h out.

Repeat submissions (same normalized email + company domain) are **never silently dropped**. `recordDuplicate` increments `submission_count`, refreshes the record, and sets a `Review repeat request` next action so an owner actions it.

---

## Environment variables

All integrations are **server-only** and **gated** — if a variable is unset, a deterministic no-op adapter runs so the funnel works end-to-end in staging without production credentials.

| Variable | Required? | Purpose |
|---|---|---|
| `DATABASE_URL` | Recommended | Postgres persistence. If unset, an in-memory store is used (per-process; staging only) and a warning is logged. |
| `SHOW_HVAC_PILOT_PRICE` | Optional | `"true"` reveals the gated $3,500 pricing copy. Defaults hidden. |
| `BREVO_API_KEY` | Optional | Enables contact/lifecycle sync to Brevo. Unset → no-op. |
| `BREVO_LIST_ID` | Optional | Numeric Brevo list to add contacts to. |
| `N8N_WEBHOOK_URL` | Optional | Enables opportunity routing to n8n. Unset → no-op. Only non-sensitive routing fields are sent. |
| `N8N_WEBHOOK_TOKEN` | Optional | Sent as `x-webhook-token` if set. |
| `RESEND_API_KEY` | Optional | Enables applicant acknowledgement + owner alert email via Resend. Unset → console notifier. |
| `HVAC_FF_FROM` | Optional | From address for emails. Default `Livingry Services <noreply@livingry.services>`. |
| `HVAC_FF_OWNER_TO` | Optional | Owner alert recipient. Default `ov@livingry.services`. |

No secret or PII is ever written to logs, URLs, or analytics payloads. Analytics payloads are guarded by `assertNoPii()`.

---

## Database migration

Apply `sql/migrations/0002_hvac_founding_five.sql` to create `hvac_founding_five_requests` (12-state check constraint, unique `dedupe_key`, `submission_count`, `metadata_json`, consent evidence).

**Rollback:** `drop table hvac_founding_five_requests;` (also noted at the bottom of the migration file). This is destructive — confirm before running against any shared database.

---

## Staging verification (no production credentials)

1. `npm install`
2. `npx tsc --noEmit` — typecheck clean.
3. `node --import tsx --test tests/hvac-founding-five*.test.ts` — funnel tests pass.
4. `npm run build` — production build succeeds.
5. `npm run dev` and open `/hvac/founding-five`:
   - Submit the form with valid data → success state renders, no calendar shown.
   - Server logs show `[hvac-analytics]` events and `[hvac-ff] applicant-ack (no email provider)` / owner-alert lines (console notifier path) when Resend is not configured.
   - Submit again with the same email + website → server returns `{ ok: true, duplicate: true }`; the record is not duplicated.
   - Submit with the honeypot field filled → `{ ok: true }` with no record created.

---

## Security posture

- **CSRF:** same-origin `Origin`/`Referer` check appropriate to a public, cookie-less endpoint.
- **Rate limiting:** in-memory, 5 requests/hour per client IP (per server instance). Swap in a shared store for horizontally scaled deployments.
- **Spam:** hidden honeypot field returns success without creating a record.
- **Errors:** internal error detail is never leaked to the client (generic 500 with a support email).

---

## Rollback guidance

The feature is additive and behind its own route/table. To disable without reverting code, remove the nav entry and homepage link (or gate them), and stop advertising the URL; the page itself has no destructive side effects. To fully remove, revert the feature branch/PR and drop the table (see migration rollback above).
