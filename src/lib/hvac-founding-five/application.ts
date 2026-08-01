// Strategic Alliance application form model — all copy and field structure
// sourced from the approved Livingry HVAC/R Strategic Alliance Application
// document. The form renderer, validation, tests, and (later) the
// submission pipeline all read from this single source.
//
// Safeguards encoded here:
// - No passwords, API tokens, customer lists, payment details, or sensitive
//   financial documents are ever requested.
// - Consent is versioned so stored evidence stays interpretable.
// - The privacy note is part of the form intro, not buried in a footer.

export const APPLICATION_VERSION = "hvac-alliance-application-v1";

export const applicationIntro = {
  purpose:
    "This is an application for a limited, hands-on Strategic Alliance — not a request for a generic software demo. Livingry is accepting a limited number of U.S.-based HVAC/R partners and reviews every application for market fit, leadership readiness, operational capacity, and the ability to produce honest proof of results.",
  timeNote: "About 5 minutes to complete.",
  nextStep:
    "If there is a fit and an active capacity slot, Livingry will invite you to a Strategic Alliance Review. Submission does not guarantee acceptance.",
  leadIn:
    "Your next recovered job may already be in a missed call, an open estimate, your past-customer list, or an unrequested referral. Livingry builds and operates a Revenue Continuity System around those opportunities.",
  termsNote:
    "Founding Five partners begin with the AI Opportunity Blueprint: a diagnostic and findings call first, then a $799 findings report — credited in full toward a workflow launch scoped for your company — with ongoing operational fees billed only after recovered revenue has covered them.",
  privacyNote:
    "Please do not submit customer records, passwords, API keys, financial account numbers, or confidential job files through this application. We will request only the minimum required information after mutual fit is confirmed.",
} as const;

export type ApplicationField =
  | {
      kind: "text" | "email" | "tel" | "url" | "textarea";
      id: string;
      label: string;
      required: boolean;
      helper?: string;
    }
  | {
      kind: "select";
      id: string;
      label: string;
      required: boolean;
      options: string[];
      helper?: string;
    }
  | {
      kind: "multi";
      id: string;
      label: string;
      required: boolean;
      options: string[];
      helper?: string;
    }
  | {
      kind: "rank";
      id: string;
      label: string;
      required: boolean;
      options: string[];
      pick: number;
      helper?: string;
    }
  | {
      kind: "grid";
      id: string;
      label: string;
      required: boolean;
      rows: { id: string; label: string; options: string[] }[];
      helper?: string;
    }
  | {
      kind: "checkboxes";
      id: string;
      label: string;
      required: boolean;
      options: string[];
      helper?: string;
    };

export const applicationSections: {
  n: number;
  title: string;
  question: string;
  helper?: string;
  fields: ApplicationField[];
}[] = [
  {
    n: 1,
    title: "Who is applying?",
    question:
      "Who will be responsible for evaluating and sponsoring this Strategic Alliance?",
    fields: [
      { kind: "text", id: "full_name", label: "Full name", required: true },
      { kind: "email", id: "work_email", label: "Work email", required: true },
      { kind: "tel", id: "mobile", label: "Mobile number", required: true },
      { kind: "text", id: "company", label: "Company name", required: true },
      { kind: "url", id: "website", label: "Website", required: true },
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
    title: "Is your company a U.S.-based HVAC/R operator?",
    question:
      "Is your company headquartered and actively operating in the United States? If yes, list your primary city, state, and the markets you serve.",
    helper:
      "Livingry's initial Strategic Alliance program is limited to U.S.-based HVAC/R companies in markets we can support responsibly.",
    fields: [
      {
        kind: "select",
        id: "us_based",
        label: "U.S.-headquartered and operating",
        required: true,
        options: ["Yes", "No"],
      },
      {
        kind: "text",
        id: "markets",
        label: "Primary city, state, and markets served",
        required: true,
      },
    ],
  },
  {
    n: 3,
    title: "What kind of HVAC/R work do you perform?",
    question: "Which work best represents your current operation?",
    fields: [
      {
        kind: "multi",
        id: "work_types",
        label: "Work types",
        required: true,
        options: [
          "Residential service and repair",
          "Residential replacement/install",
          "Light-commercial HVAC/R",
          "Commercial HVAC/R",
          "Refrigeration",
          "Maintenance agreements",
          "Other",
        ],
      },
      { kind: "text", id: "work_types_other", label: "Other (optional)", required: false },
    ],
  },
  {
    n: 4,
    title: "What is your current operating scale?",
    question:
      "Approximately how many active service vehicles or equivalent field teams do you operate today?",
    helper:
      "The initial program is generally designed for established companies with enough recurring opportunity volume to measure results, while still supporting owner-led implementation.",
    fields: [
      {
        kind: "select",
        id: "scale",
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
    n: 5,
    title: "Which leak is most visible right now?",
    question:
      "Which two of these are costing your company the most attention or opportunity today?",
    helper:
      "The full Revenue Continuity System addresses missed calls, estimate follow-up, old-customer reactivation, and referrals. Your answer helps us understand where to begin — not which parts of the system you receive.",
    fields: [
      {
        kind: "rank",
        id: "visible_leaks",
        label: "Your top two",
        required: true,
        pick: 2,
        options: [
          "Missed calls or unworked inbound leads",
          "Estimates that are not followed up consistently",
          "Past customers who are not being reactivated",
          "Satisfied customers who are not asked for referrals",
          "A breakdown between tools, people, and records",
          "I am not yet sure",
        ],
      },
      { kind: "text", id: "leaks_comment", label: "Comment (optional)", required: false },
    ],
  },
  {
    n: 6,
    title: "What systems currently hold your operational records?",
    question:
      "Where do you currently track calls or leads, estimates, customers, jobs, invoices, and refunds?",
    helper:
      "We do not require a specific platform. We do require records that can be accessed, exported, or reliably reconciled.",
    fields: [
      {
        kind: "multi",
        id: "systems",
        label: "Systems of record",
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
      { kind: "text", id: "systems_other", label: "Other (optional)", required: false },
    ],
  },
  {
    n: 7,
    title: "Do you have the opportunity volume and records to measure recovery?",
    question:
      "Can your company identify the opportunities and paid outcomes needed to establish a fair before-and-after baseline?",
    fields: [
      {
        kind: "grid",
        id: "record_readiness",
        label: "Record readiness",
        required: true,
        rows: [
          {
            id: "inbound_volume",
            label: "Inbound calls/leads",
            options: [
              "Consistent weekly volume",
              "Some volume but inconsistent",
              "Not sure",
            ],
          },
          {
            id: "open_estimates",
            label: "Open estimates",
            options: [
              "We can identify them",
              "We may be able to identify them",
              "We cannot currently identify them",
            ],
          },
          {
            id: "past_customers",
            label: "Past-customer history",
            options: [
              "Exportable list available",
              "Available but needs cleanup",
              "Not readily available",
            ],
          },
          {
            id: "paid_invoices",
            label: "Completed jobs and paid invoices",
            options: [
              "Recorded in a system",
              "Partially recorded",
              "Not reliably recorded",
            ],
          },
        ],
      },
    ],
  },
  {
    n: 8,
    title: "Can your company serve recovered work and support the operating process?",
    question:
      "The system can recover opportunity only if your team has room to serve it and someone owns the operational handoffs. Is that true today?",
    fields: [
      {
        kind: "select",
        id: "capacity",
        label: "Capacity to accept additional qualified appointments or jobs in the next 60–90 days",
        required: true,
        options: ["Yes", "No", "Need to discuss"],
      },
      {
        kind: "select",
        id: "ops_owner",
        label: "A named office or operations owner who can resolve workflow exceptions within one business day",
        required: true,
        options: ["Yes", "No", "Need to discuss"],
      },
      {
        kind: "select",
        id: "status_hygiene",
        label: "Your team can update job, estimate, booking, invoice, and refund status consistently",
        required: true,
        options: ["Yes", "No", "Need to discuss"],
      },
      { kind: "text", id: "capacity_note", label: "Context (optional)", required: false },
    ],
  },
  {
    n: 9,
    title: "Are you prepared for the Strategic Alliance operating commitments?",
    question:
      "Are you prepared to participate as an operating partner, not merely purchase a software subscription?",
    fields: [
      {
        kind: "checkboxes",
        id: "commitments",
        label: "Required acknowledgments",
        required: true,
        options: [
          "We understand that Livingry operates a managed Revenue Continuity System; it is not a one-time AI installation.",
          "We are willing to provide agreed system access or exports for leads, estimates, customers, jobs, invoices, refunds, and workflow reconciliation.",
          "We will designate an authorized operational owner and finance/reconciliation contact.",
          "We will pay direct third-party software, messaging, telephony, and usage costs associated with our approved configuration.",
          "We understand that the $799 findings-report payment is non-refundable and that the workflow-launch scope is priced separately after the findings review.",
          "We understand that any performance guarantee uses a defined proof ledger, client operating obligations, and attributable paid revenue — not general revenue claims or profit promises.",
        ],
      },
    ],
  },
  {
    n: 10,
    title: "Why now — and what would make this alliance worthwhile?",
    question:
      "In a few sentences, describe the operational change you most need in the next 90 days. What would make this Strategic Alliance clearly worthwhile for your company?",
    helper:
      "Be specific. For example: “We lose after-hours calls,” “our estimates age without ownership,” “we have thousands of past customers but no reactivation process,” or “our technicians do good work but referrals are random.”",
    fields: [
      {
        kind: "textarea",
        id: "ninety_day_outcome",
        label: "Your 90-day outcome",
        required: true,
      },
    ],
  },
];

export const applicationSubmit = {
  button: "Apply for a Strategic Alliance Review",
  microcopy:
    "Submission does not guarantee acceptance. Livingry reviews applications for U.S. market fit, leadership readiness, operational capacity, source-record quality, and available program capacity.",
  consentText:
    "I agree that Livingry Services may contact me about this application. Submission does not enroll me in unrelated marketing messages.",
  consentVersion: "hvac-alliance-consent-v1",
} as const;

export const applicationConfirmation = {
  heading: "Your application is received.",
  body: "Livingry reviews each application for market fit, leadership readiness, system access, customer-record quality, operational capacity, and current program capacity. An application is not an acceptance into the program.",
  nextStep:
    "If there is a fit and a current capacity slot, we will invite you to a Strategic Alliance Review. Please do not send passwords, customer lists, API keys, or financial-account information by email.",
  whileYouWait:
    "While you wait, consider where your team currently loses visibility: the first response, the estimate follow-up, the relationship after a completed job, or the handoff between the systems you already use.",
} as const;

// Internal review aid — the score is a guide, never an automated decision.
export const reviewRubric = {
  categories: [
    "U.S. market and support fit",
    "Leadership authority",
    "Opportunity volume",
    "Record quality",
    "Capacity and execution",
    "Four-workflow fit",
    "Commercial readiness",
    "Collaboration and expectations",
  ],
  bands: [
    { min: 13, max: 16, outcome: "Invite to Strategic Alliance Review" },
    { min: 9, max: 12, outcome: "Clarify by email or short qualification call" },
    { min: 0, max: 8, outcome: "Decline respectfully or waitlist" },
  ],
} as const;
