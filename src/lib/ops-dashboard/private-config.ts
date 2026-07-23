import type { ToolConfig } from "./types";

// SERVER-ONLY. The curated vendor configuration for the authenticated client
// control panel (private mode). This module maps the client's already-chosen
// tools onto the generic categories. It must ONLY be imported by server code
// behind the OTP session gate (see src/app/api/ops/config/route.ts) — never
// by a client component, so real vendor brands never enter the public bundle
// or public page source.
//
// Names, roles, and signup links are validated against the existing repo
// content (sql/seed_integrations.sql and the /api/ops/setup seed rows). Tools
// map to the most appropriate category without a forced one-to-one mapping:
// a category may hold more than one tool, and a tool may participate in more
// than one workflow.
//
// This is a fixture/preview configuration. Production persistence still lives
// in the Postgres integration_connections table (see schema.sql); wiring this
// fixture to that table per-tenant is the documented remaining backend step.

export function getCuratedToolConfig(): ToolConfig[] {
  return [
    {
      id: "cfg_victoria",
      provider: "victoria_ai",
      displayName: "Victoria AI",
      categoryId: "response",
      integrationKey: "booking_scheduling",
      role: "Booking & scheduling / front-desk response",
      status: "configured",
      enabled: true,
      capabilities: ["Answer & qualify inbound", "Offer real availability", "Book appointments"],
      workflowParticipation: ["missed-call-to-booking"],
      dataInputs: ["Inbound calls, forms, chat", "Calendar availability"],
      dataOutputs: ["Booked appointments", "Qualified intake records"],
      permissions: ["May book within published availability", "May not quote price or guarantee arrival"],
      approvalRequirements: ["Human owner for any customer commitment beyond a standard booking"],
      signupUrl: "https://www.versionseven.ai/pricing",
      changeHistory: [{ at: "2026-07-01T00:00:00-04:00", action: "configured", detail: "Activated as front-desk response tool." }],
    },
    {
      id: "cfg_ela",
      provider: "ela_ai",
      displayName: "Ela AI",
      categoryId: "workflow",
      integrationKey: "operations_admin",
      role: "Operations, administration & fulfillment",
      status: "configured",
      enabled: true,
      capabilities: ["Automate routine admin", "Coordinate fulfillment steps", "Draft internal handoffs"],
      workflowParticipation: ["missed-call-to-booking", "completed-job-to-proof"],
      dataInputs: ["Workflow tasks", "Status changes"],
      dataOutputs: ["Completed admin steps", "Handoff records"],
      permissions: ["Optional adapter — never the system of record", "No automation of judgment decisions"],
      approvalRequirements: ["Human checkpoint on any step that commits capacity or money"],
      signupUrl: "https://ela.ai",
      changeHistory: [{ at: "2026-07-01T00:00:00-04:00", action: "configured", detail: "Added as ops/admin assistant (optional adapter)." }],
    },
    {
      id: "cfg_caliope",
      provider: "caliope_ai",
      displayName: "Caliope AI",
      categoryId: "discovery_trust",
      integrationKey: "content_creation",
      role: "Content creation, attraction & trust building",
      status: "configured",
      enabled: true,
      capabilities: ["Draft service & proof content", "Prepare AI-readable structure", "Support discovery clarity"],
      workflowParticipation: ["completed-job-to-proof"],
      dataInputs: ["Approved facts & evidence", "Reviews"],
      dataOutputs: ["Draft content for approval", "Structured trust data"],
      permissions: ["Drafts only — nothing published without approval", "No fabricated proof"],
      approvalRequirements: ["Human approval before any public claim is published"],
      changeHistory: [{ at: "2026-07-01T00:00:00-04:00", action: "configured", detail: "Added as content/attraction tool." }],
    },
    {
      id: "cfg_aurameet",
      provider: "aurameet",
      displayName: "AuraMeet.live",
      categoryId: "recovery",
      integrationKey: "sales_call_intelligence",
      role: "Real-time sales-call analysis",
      status: "configured",
      enabled: true,
      capabilities: ["Analyze sales calls in real time", "Surface objections & next steps"],
      workflowParticipation: ["cold-estimate-to-recovery"],
      dataInputs: ["Sales-call audio / transcripts"],
      dataOutputs: ["Call summaries", "Suggested next steps for the human rep"],
      permissions: ["Analyze & suggest only", "Human decides all follow-up"],
      approvalRequirements: ["No customer contact triggered without a human owner"],
      signupUrl: "https://app.aura-app.ai",
      changeHistory: [{ at: "2026-07-01T00:00:00-04:00", action: "configured", detail: "Added as sales-call intelligence." }],
    },
    {
      id: "cfg_brevo",
      provider: "brevo",
      displayName: "Brevo",
      categoryId: "continuity",
      integrationKey: "marketing_crm",
      role: "CRM & multichannel marketing / sales communication",
      status: "configured",
      enabled: true,
      capabilities: ["Segmented email/SMS/WhatsApp", "CRM records", "Intake confirmations"],
      workflowParticipation: ["completed-job-to-proof", "cold-estimate-to-recovery"],
      dataInputs: ["Customer segments", "Service history", "Consent records"],
      dataOutputs: ["Outreach", "Confirmations", "Tracked interactions"],
      permissions: ["Opt-in communications only", "Respect unsubscribes"],
      approvalRequirements: ["No AI-generated send without a responsible human owner"],
      signupUrl: "https://www.brevo.com/pricing",
      changeHistory: [{ at: "2026-07-01T00:00:00-04:00", action: "configured", detail: "Core intake + continuity comms channel." }],
    },
    {
      id: "cfg_aura_sales",
      provider: "aura_app_ai",
      displayName: "Aura AI Sales Performance Platform",
      categoryId: "recovery",
      integrationKey: "sales_outreach",
      role: "Sales coaching, performance & commission intelligence",
      status: "configured",
      enabled: true,
      capabilities: ["Coach reps", "Track performance", "Commission intelligence"],
      workflowParticipation: ["cold-estimate-to-recovery"],
      dataInputs: ["Pipeline & call outcomes"],
      dataOutputs: ["Coaching insights", "Performance & commission reporting"],
      permissions: ["Advisory to humans", "No autonomous customer contact"],
      approvalRequirements: ["Human owner per opportunity"],
      signupUrl: "https://app.aura-app.ai",
      changeHistory: [{ at: "2026-07-01T00:00:00-04:00", action: "configured", detail: "Added once pipeline exists." }],
    },
    {
      id: "cfg_n8n",
      provider: "n8n",
      displayName: "n8n",
      categoryId: "ops_layer",
      integrationKey: "orchestration",
      role: "Visible agent & workflow automation (orchestration core)",
      status: "connected",
      enabled: true,
      capabilities: ["Event intake", "Identity resolution", "Policy gates", "System writes", "Exception routing"],
      workflowParticipation: ["missed-call-to-booking", "cold-estimate-to-recovery", "completed-job-to-proof"],
      dataInputs: ["Events from every category", "Approval decisions"],
      dataOutputs: ["Orchestrated actions", "Audit trail entries"],
      permissions: ["Orchestrates but never bypasses category approval rules"],
      approvalRequirements: ["Every automated action recorded to the proof ledger"],
      signupUrl: "https://n8n.io/pricing",
      changeHistory: [{ at: "2026-07-01T00:00:00-04:00", action: "connected", detail: "Wired as the orchestration core for the TradeOps layer." }],
    },
  ];
}
