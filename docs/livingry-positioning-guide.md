# Livingry Positioning Guide — Sealed Systems & Leakproof Operators

Internal reference for how Livingry talks about itself. Internal only — not a public
page. This guide sanitizes an aggressive raw marketing brief into language we can stand
behind: truthful, human-controlled, and free of fabricated proof. When the raw brief and
this guide disagree, **this guide wins**. When this guide and the Founding Five brief
(funnel behavior, claims, privacy, scope) disagree, **the Founding Five brief wins**.

---

## The Big Domino (the one belief)

> **A system that is unsealed cannot be scaled.**

The single belief the positioning is built around: systemic leakage — not a lack of leads,
a slow team, or a bad CRM — is the constraint on an established operation. Pouring more
traffic, tools, or automation into a workflow that already leaks multiplies the waste
instead of the result. Seal the workflow first; then scale the work.

This sentence is stored once, verbatim, as `sealedSystemPrinciple` in
`src/lib/hvac-founding-five/content.ts` and reused on the page and in tests so the wording
cannot drift. If it needs to change, change it there.

---

## Safe use of "leakproof operator" and "sealed system"

- **"Leakproof operator"** is an *aspirational operating identity* — a way of running a
  business that treats an unsealed workflow as the first thing to fix. Define it in plain
  terms the first time it appears on any surface.
- It is **not** a membership, a certification, a verified-customer status, a badge someone
  earns, or a club. Never tell an applicant they "joined the ranks," "joined a movement,"
  or were "welcomed" into anything. Submitting a form enrolls no one in anything.
- **"Sealed system" / "seal the workflow"** are descriptive metaphors for closing a
  specific handoff gap. They describe *one bounded workflow*, not a guarantee that the whole
  operation is airtight.
- **Trademark hygiene:** do not stack ™ on coined phrases or present unregistered marks as
  registered. Plain operational language comes first; any coined/category term comes second
  and sparingly. The public page uses no ™ clutter.

---

## Plain language first (translation table)

Lead with the plain operational meaning. The coined phrase, if used at all, is a shorthand —
never a substitute for a claim we can support.

| Coined / category shorthand | Plain operational language we actually promise |
|---|---|
| Intake layer | Every inquiry gets an accountable state and a clear next action. |
| Detection layer | Overdue, abandoned, or ownerless work becomes visible. |
| TradeOps context | Customer, job, asset, and policy context stays connected to the work. |
| Routing layer | Deterministic rules assign responsibility; AI may prepare recommendations; a person decides. |
| Escalation layer | Exceptions and unresolved commitments reach a responsible person. |
| Handoff layer | Technicians receive the approved information they need, when they need it. |
| Close layer | Payment, documentation, reviews, and appropriate follow-up are completed or explicitly excepted. |

The seven-part map is a **diagnostic tool for locating one leak**, not a checklist a single
pilot completes. A Founding Five pilot seals **one bounded workflow**, usually inside one or
two layers, and measures the result.

---

## Approved claims

- Livingry selects five established U.S. HVAC companies for a paid, founder-led, remote pilot.
- Each pilot diagnoses, redesigns, and implements **one bounded operational workflow**.
- AI may listen, classify, summarize, or draft; deterministic rules decide what happens next;
  people retain approval where the action is consequential.
- Results are measured before and after against an agreed baseline.
- The story may be told anonymously; no public testimonial is required.
- Livingry is independent and serves multiple niches over time (HVAC is the active focus).

## Prohibited claims (never in public copy)

- **Fabricated proof:** the "Dave" roofing story, "let's call him," `$64,000/month`,
  `30% → 92%`, `$5.2M`, `$3M`, `300 inquiries`, "ruptured gas tank," or any invented owner,
  revenue figure, or outcome. Use a clearly labeled *hypothetical* pattern instead.
- **Impossible absolutes:** "100% Intake Lock," universal "20-second" response, "physically
  impossible" queues, "perfect/optimal resource," "transaction finality," follow-up that
  "never terminates," "guaranteed close," guaranteed revenue.
- **Hostile framing:** calling a competitor's marketing spend "commercial malpractice."
- **Scope creep:** roofing outreach or roofing pages inside this funnel change; replacing the
  entire CRM/field-service stack; performing licensed HVAC work.
- **False scheduling:** telling an applicant an observation, assessment, or call "is
  scheduled." Scheduling access follows a *confirmed* observation.
- **Trademark clutter:** repeated ™ or presenting unreviewed marks as registered.

These are enforced by `PROHIBITED_PATTERNS`, `FABRICATION_PATTERNS`, `SCHEDULED_PATTERNS`,
and `CALENDAR_PATTERNS` in `content.ts`, scanned by the automated tests.

---

## How the seven-part map supports micro-audits

When researching a company's one externally observable workflow, walk the seven layers to
locate where earned value most likely leaks, then propose sealing the single highest-value
gap. The audit names the layer(s) in plain language, states the current handoff, the proposed
correction, the human approvals, exception handling, and how the result will be measured.
The audit is a hypothesis to confirm on a fit call — never a promise that all seven layers
will be rebuilt.
