// Founding Five Scorecard form model — the single sitewide intake for the
// Founding Five Strategic Alliance. All copy and field structure live here so the
// client form, server validation, tests, and (later) dashboards read from one
// source.
//
// Safeguards encoded here:
// - PII-minimal: free text only for name, company, and markets. Every other
//   answer is an enumerated selection.
// - No passwords, API tokens, customer lists, payment details, or sensitive
//   financial documents are ever requested.
// - Consent is versioned so stored evidence stays interpretable.

export const SCORECARD_VERSION = "hvac-scorecard-v1";

export const scorecardIntro = {
  leadIn:
    "Fifteen minutes about the leaks that cost you the most: missed calls, dropped estimates, past customers, and lost referrals.",
  reviewNote:
    "Every scorecard is read by a person. There is no public calendar and no bot triage — fit conversations follow only for qualified companies, after human review.",
  timeNote: "About 5 minutes to complete.",
  privacyNote:
    "Please do not submit customer records, passwords, API keys, financial account numbers, or confidential job files through this scorecard.",
  sections: [
    {
      n: 1,
      title: "Who is applying?",
      question: "Who will own this pilot on your side?",
      helper:
        "The named owner receives the fit-conversation invitation and stays accountable for the pilot on your side.",
      fields: [
        { kind: "text", id: "fullName", label: "Full name", required: true },
        { kind: "email", id: "workEmail", label: "Work email", required: true },
        { kind: "tel", id: "phone", label: "Mobile number", required: true },
        { kind: "text", id: "companyName", label: "Company name", required: true },
        {
          kind: "select",
          id: "role",
          label: "Your role",
          required: true,
          options: ["Owner", "President", "General Manager", "Operations Manager", "Other"],
        },
      ],
    },
    {
      n: 2,
      title: "Your market and scale",
      question: "Where do you operate, and how big is the operation?",
      helper: "The initial program is limited to U.S.-based HVAC/R companies in markets Livingry can support responsibly.",
      fields: [
        {
          kind: "text",
          id: "markets",
          label: "Primary city, state, and markets served",
          required: true,
        },
        {
          kind: "select",
          id: "teamSize",
          label: "Active field vehicles/teams",
          required: true,
          options: [
            "1–2 active field vehicles/teams",
            "3–5 active field vehicles/teams",
            "6–10 active field vehicles/teams",
            "11–20 active field vehicles/teams",
            "More than 20 active field vehicles/teams",
          ],
        },
      ],
    },
    {
      n: 3,
      title: "Where the leaks are",
      question: "Which two leaks are costing you the most attention or opportunity today?",
      helper: "The Done With You implementation includes Dropped Estimates, Dead Client Lists, and Lost Referrals & Reviews/Testimonials (plus minimal n8n spine). AI Voice Answering — telephony ingress (4th leak, $500 + vendor pass-through) is available as a standard add-on.",
      fields: [
        {
          kind: "rank",
          id: "primaryLeaks",
          label: "Your top two leaks",
          required: true,
          pick: 2,
          options: [
            "Missed calls or unworked inbound opportunities",
            "Estimates that are not followed up consistently",
            "Competitors winning the search answers our customers ask for",
            "Past customers who are not being reactivated",
            "A breakdown between tools, people, and records",
            "I am not yet sure",
          ],
        },
      ],
    },
    {
      n: 4,
      title: "Your stack and readiness",
      question: "What systems hold your records, and can they be measured?",
      helper: "We do not require a specific platform. We do require records that can be accessed, exported, or reliably reconciled.",
      fields: [
        {
          kind: "select",
          id: "fsm",
          label: "Field-service / CRM system",
          required: true,
          options: [
            "ServiceTitan",
            "Jobber",
            "Housecall Pro",
            "BuildOps",
            "FieldEdge",
            "Service Fusion",
            "Google Workspace / Microsoft 365",
            "Spreadsheets or paper-based process",
            "Other CRM/FSM",
            "I am not sure",
          ],
        },
        {
          kind: "select",
          id: "weeklyVolume",
          label: "Weekly calls + estimates combined",
          required: true,
          options: [
            "Under 10 per week",
            "10–25 per week",
            "26–50 per week",
            "51–100 per week",
            "More than 100 per week",
          ],
        },
        {
          kind: "select",
          id: "readiness",
          label: "Record readiness",
          required: true,
          options: [
            "Records and systems are ready",
            "Mostly ready — some cleanup needed",
            "Not sure what we can export",
          ],
        },
      ],
    },
  ],
} as const;

export type ScorecardField = (typeof scorecardIntro.sections)[number]["fields"][number];

export const scorecardSubmit = {
  button: "Apply for the Founding Five Strategic Alliance",
  microcopy:
    "Submission does not guarantee acceptance. Livingry reviews every scorecard by hand for U.S. market fit, leadership readiness, operational capacity, and record quality.",
  consentText:
    "I agree that Livingry Services may contact me about this scorecard. Submission does not enroll me in unrelated marketing messages.",
} as const;

export const scorecardConfirmation = {
  heading: "Your scorecard has been received.",
  body: "Livingry reviews every scorecard by hand — not by bot — for market fit, leadership readiness, data access, volume, capacity, and an accountable internal operator.",
  nextStep:
    "If the fit looks real, you will receive an invitation to a fit conversation by email. There is no public calendar. If it does not, you will get a fast, honest answer rather than a slow maybe.",
  whileYouWait:
    "While you wait, consider where your team currently loses visibility: the first response, the estimate follow-up, the search answers your market gets, or the handoff between the systems you already use.",
} as const;
