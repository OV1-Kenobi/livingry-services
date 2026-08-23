// Standard service levels and base pricing — canonical copy per the 2026-08-11
// plan §7 and the consolidated offer decision. Base prices are published
// openly; the pricing-disclosure rule forbids hiding an approved standard price
// behind a call, application, or contact gate.

export interface ServiceLevel {
  id: string;
  name: string;
  shortName: string;
  priceLine: string;
  bestFor: string;
  includes: string[];
  responsibility: string;
  priceDetail: string | null;
}

export const diyPrice = "$649";

export const serviceLevels: ServiceLevel[] = [
  {
    id: "diy",
    name: "Do It Yourself (DIY)",
    shortName: "DIY",
    priceLine: "$649 one time",
    bestFor:
      "A capable internal team that wants the assessment, plan, branded operating layer, and implementation guidance but will perform the implementation itself.",
    includes: [
      "Assessment and curation plan",
      "Company-branded Livingry Ops web app on a subdomain of the client's own domain",
      "Agentic-search assessment and optimization plan",
      "Lead Readiness and Local Demand Intelligence package — Conversion Readiness, Past-Customer Campaign Intelligence, Competitor Offer Monitoring, and Service-Area Demand Map",
      "Planning and setup guidance",
      "Curated subcontractors named as referrals only",
    ],
    responsibility:
      "The client's team implements. This is not an automation implementation.",
    priceDetail: "$649 one time",
  },
  {
    id: "dwy",
    name: "Done With You (DWY)",
    shortName: "DWY",
    priceLine: "$2,500 total",
    bestFor:
      "An operator who wants Livingry Services to act as general contractor over implementation while the owner remains involved in decisions, testing, and approval.",
    includes: [
      "Everything in Do It Yourself",
      "Two standard leak systems — Dropped Estimates and Dead Client Lists",
      "The client's trained, forked, branded Company Operating System Agent on the client's own infrastructure",
      "Implementation coordination by Livingry Services over curated subcontractors",
      "Live owner exit-testing meeting",
      "Delivery target of 1\u20134 weeks",
      "Two weeks of post-delivery support — unlimited asynchronous questions and answers, plus up to three hours per week live with screen sharing",
    ],
    responsibility:
      "The owner remains involved in decisions, testing, and approval; Livingry Services coordinates implementation.",
    priceDetail: "$1,249 at signing \u00b7 $1,251 when the system passes exit testing",
  },
  {
    id: "dfy",
    name: "Done For You (DFY)",
    shortName: "DFY",
    priceLine: "Active management after baseline setup",
    bestFor:
      "An accepted operator who wants Livingry Services to manage the approved systems after the Done With You implementation establishes the operating baseline.",
    includes: [
      "Management of the approved leak systems after the Done With You baseline is established",
      "Weekly tracking of collected revenue against the Done With You baseline",
      "Performance-triggered billing with retroactive payment at the week-four assessment, per the terms below",
      "52-week exclusivity period begins once the threshold is met",
    ],
    responsibility:
      "A prospect cannot skip directly to Done For You: the Done With You phase establishes the collected-revenue baseline and leak-category tracking that active management requires.",
    priceDetail:
      "$2,500 to start \u00b7 $2,500 final performance-trigger payment \u00b7 $1,000 per week after the approved threshold mechanics trigger",
  },
];

export const dwyAddOns = [
  { name: "Missed Calls & Slow Response", price: "$500" },
  { name: "Lost Referrals & Reviews", price: "$500" },
] as const;

export const dfyFoundingFive = {
  priceLine: "$1,250 to start \u00b7 $1,250 final performance-trigger payment \u00b7 $500 per week after the approved threshold mechanics trigger",
  note: "Current Founding Five pricing, shown openly alongside standard reference pricing.",
} as const;

export const dfyMechanics = [
  "Collected revenue is tracked weekly against the Done With You baseline.",
  "Supporting indicators explain why revenue moved but do not trigger billing.",
  "The current trigger is 10 times collected revenue relative to baseline. This is an offer mechanic, not a result promise, benchmark, or guarantee.",
  "At the week-four assessment: if the threshold is met, the final payment and weekly fees are billed retroactively and the 52-week exclusivity period begins. If the threshold is not met and both parties extend, work continues unbilled under the same terms. If the threshold is not met and there is no extension, the engagement ends at the initial payment with no further obligation.",
] as const;

export const pricingDisclosure = [
  "The three standard choices and base prices are published openly.",
  "Approved standard add-ons are published with their prices.",
  "Custom and \u00e0-la-carte items are quoted separately per engagement.",
  "A sales call may clarify fit and scope; it should not reveal a previously hidden standard price.",
] as const;

export const customItemNote =
  "Custom work, self-hosting, and \u00e0-la-carte additions may be quoted separately after the standard choices and base prices are visible. Self-hosting in particular is quoted per engagement \u2014 no standard range is published or invented.";