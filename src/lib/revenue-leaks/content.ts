// The four observable revenue leaks — canonical copy per the 2026-08-11
// Revenue Clarity & Capture plan (§5, §6, §8). The same records drive the
// homepage cards, the /revenue-leaks hub, and the four leak landing pages so
// labels never drift between surfaces.
//
// Claim discipline: field situations are concrete and generic. No fabricated
// metrics, benchmarks, or client outcomes. Evidence is labelled per the
// site-wide claim taxonomy (Founder Experience / Verified Fact / Strategic
// Opinion / Requires Verification).

export interface RevenueLeak {
  slug: string;
  name: string;
  shortName: string;
  /** The plan's canonical diagnostic question for this leak (§6). */
  diagnosticQuestion: string;
  /** The field situation — the operational story before any technology. */
  fieldSituation: string;
  /** Where opportunity, information, ownership, or approval stops connecting. */
  continuityBreak: string;
  /** The single belief shift that matters for this leak. */
  beliefShift: string;
  /** Labelled basis for the claim on this page. */
  evidenceBasis: string;
  /** One check the owner can run today with their own records. */
  practicalCheck: string;
  /** Contextual action per plan §3. */
  actionLabel: string;
}

export const revenueLeaks: RevenueLeak[] = [
  {
    slug: "missed-calls",
    name: "Missed Calls & Slow Response",
    shortName: "Missed calls",
    diagnosticQuestion:
      "If nobody answers, do the caller, reason, urgency, and next step remain visible to the person responsible?",
    fieldSituation:
      "A call rings when everyone is on another line or the office is closed. Whoever called wanted something specific — a repair, a quote, a price — and that detail lives for the few seconds of the ring, then it is gone. The job still gets booked eventually, or it does not, and nobody can say which calls were lost or what they were worth.",
    continuityBreak:
      "The caller's identity, reason, urgency, and requested next step exist only in the moment of the call unless something captures them and hands them to a named person.",
    beliefShift:
      "The problem is rarely that the phone does not ring. It is that the information and responsibility attached to a ring do not survive the handoff from phone to person.",
    evidenceBasis:
      "Founder Experience and Strategic Opinion: observed office routing and after-hours response patterns in trade businesses.",
    practicalCheck:
      "Find out what actually happens to tonight's missed calls: name the person responsible, the record where the caller's reason lands, and the time window in which someone responds.",
    actionLabel: "Check My Missed-Call Leak",
  },
  {
    slug: "dropped-estimates",
    name: "Dropped Estimates",
    shortName: "Dropped estimates",
    diagnosticQuestion:
      "Which open estimates have no next date, named owner, or record of what the customer is waiting on?",
    fieldSituation:
      "A technician writes up a proposal, hands it over, and the customer says they will think about it. Weeks later nobody can say whether that number is still alive — who was going to follow up, when, and what the customer was waiting to hear. A stack of quiet estimates accumulates while the shop buys more leads to replace them.",
    continuityBreak:
      "Once a proposal goes out, the estimate's next action, owner, and customer context stop being connected to anything that moves it forward.",
    beliefShift:
      "The fix is not more estimates. It is that every open estimate has one named owner, one next date, and a known reason the customer is still deciding.",
    evidenceBasis:
      "Founder Experience and Strategic Opinion: commercial heat-loss measurement and estimate work in residential contracting.",
    practicalCheck:
      "Open your estimate list and flag every job without a next contact date or a named owner — that list is the backlog that is being managed by memory today.",
    actionLabel: "Check My Estimate Leak",
  },
  {
    slug: "dead-client-lists",
    name: "Dead Client Lists",
    shortName: "Past customers",
    diagnosticQuestion:
      "Is the service history usable, and is there a defined reason and time to contact the customer again?",
    fieldSituation:
      "Every completed install leaves behind a customer who already said yes, already paid, and already trusts the company. Their equipment, service history, and next-maintenance date sit somewhere in the records. Nothing connects that record to a defined reason to call back, so the customer hears from a competitor first — or never hears from anyone again.",
    continuityBreak:
      "The completed-job history exists, but nothing turns installed equipment, service dates, and contact permission into a defined next contact.",
    beliefShift:
      "The best prospect list a shop has is the customers who already chose it — if the record of what they bought and when it needs attention can actually be queried.",
    evidenceBasis:
      "Founder Experience and Strategic Opinion: seasonal demand patterns and maintenance records in HVAC/R service work.",
    practicalCheck:
      "Try to pull, in one pass, every customer whose equipment is due for maintenance this month — if that list takes longer than a minute to build, the list is the leak.",
    actionLabel: "Check My Customer-List Leak",
  },
  {
    slug: "lost-referrals-reviews",
    name: "Lost Referrals, Reviews & Testimonials",
    shortName: "Referrals, reviews & testimonials",
    diagnosticQuestion:
      "After the invoice is paid, who captures the photos, feedback, review request, testimonial permission, and referral opportunity?",
    fieldSituation:
      "A crew finishes a hard job and does it well. The customer is happy, the invoice gets paid — and that is where the value stops. Nobody captures the photos, asks for the review, records the feedback, requests permission for a testimonial, or asks who else the customer knows. The goodwill evaporates with the invoice, and the shop's next customer comes from another paid lead.",
    continuityBreak:
      "A completed job produces no defined capture step for proof, feedback, review, or referral permission — so the easiest marketing the company will ever earn goes uncollected.",
    beliefShift:
      "A good job nobody is asked to talk about is a quieter engine than a decent job the company learns to ask about consistently.",
    evidenceBasis:
      "Founder Experience and Strategic Opinion: post-job proof, review, and referral capture patterns in trade work.",
    practicalCheck:
      "Reconstruct what happened after your last three completed jobs: was there any defined step that captured proof, asked for a review, or requested permission to use the results?",
    actionLabel: "Check My Referral and Review Leak",
  },
];

export const revenueContinuityDefinition =
  "Revenue & Data Continuity means the opportunity, the information needed to act on it, the responsible person, the approval point, and the record of what happened stay connected from one handoff to the next.";

export const revenueContinuityHeading = "Revenue & Data Continuity";

export const canonicalPositioningLine =
  "Livingry Services helps established HVAC/R companies work the calls, estimates, past customers, and referrals they already paid to create\u2014while keeping people accountable for consequential decisions.";