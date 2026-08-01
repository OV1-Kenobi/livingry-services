// Applicant confirmation email template for the Strategic Alliance funnel.
//
// The email is drafted at submission time but only SENT when an email
// provider is configured (Gmail connector, or SMTP env in a later pass).
// Keeping the template here means the send wiring is a one-adapter change
// and the copy is testable today.

import { ALLIANCE_REVIEW_CALENDAR_URL } from "@/lib/site";
import type { NormalizedApplication } from "./application-validation";

export type ApplicantConfirmation = {
  to: string;
  subject: string;
  text: string;
  calendarUrl: string;
};

export function buildApplicantConfirmation(app: NormalizedApplication): ApplicantConfirmation {
  const firstName = app.fullName.split(" ")[0] || app.fullName;

  const text = [
    `Hi ${firstName},`,
    ``,
    `Your Strategic Alliance application has been received — thank you for the detail you put into it. Your application ID is ${app.applicationId}.`,
    ``,
    `What happens next:`,
    ``,
    `1. Livingry reviews every application for market fit, leadership readiness, system access, customer-record quality, operational capacity, and current program capacity. An application is not an acceptance into the program.`,
    `2. If there is a fit and an open capacity slot, you will receive an invitation to a Strategic Alliance Review — a short call to confirm authority, data access, volume, and your internal operator before anything is promised.`,
    `3. If the fit looks right to you already, you may schedule your review directly here: ${ALLIANCE_REVIEW_CALENDAR_URL}`,
    ``,
    `A reminder on what comes after the review: every alliance begins with the AI Opportunity Blueprint. The diagnostic and findings call come first. The $799 findings report is your call — pay only if you want it in writing — and it credits in full toward a workflow launch scoped for ${app.company}. Weekly operational fees accrue through a four-week gate and are invoiced only when the shared proof ledger shows the system paying for itself.`,
    ``,
    `One request: please do not send passwords, customer lists, API keys, or financial-account information by email. If the review moves forward, we will request only the minimum required access after mutual fit is confirmed.`,
    ``,
    `If the fit isn't there, you will get a fast, honest answer rather than a slow maybe.`,
    ``,
    `— Michael Ovsen`,
    `Founder, Livingry Services`,
    `livingry.services`,
  ].join("\n");

  return {
    to: app.workEmail,
    subject: `Your Livingry Strategic Alliance application (${app.applicationId})`,
    text,
    calendarUrl: ALLIANCE_REVIEW_CALENDAR_URL,
  };
}
