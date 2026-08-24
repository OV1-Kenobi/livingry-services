import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero, Breadcrumbs } from "@/components/PageHero";
import { BreadcrumbLd } from "@/components/BreadcrumbLd";

export const metadata: Metadata = {
  title: "Privacy — Livingry Services",
  description: "How Livingry Services handles information collected from this website.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  const crumbs = [{ label: "Home", href: "/" }, { label: "Privacy", href: "/privacy" }];
  return (
    <>
      <BreadcrumbLd items={crumbs} />
      <Breadcrumbs items={crumbs} />
      <PageHero eyebrow="Legal" title="Privacy." lede="A plain-language description of what this site collects and what happens to it." />
      <section className="section-tight">
        <div className="narrow prose">
          <h2 className="serif">What this site collects</h2>
          <p>This site has three information surfaces. Here is exactly what each one does.</p>

          <p>
            <strong>The 17-point self-assessment (&ldquo;Diagnose My Cash Flow Leaks&rdquo;).</strong> Your answers are
            processed entirely in your browser. The results are computed and shown on the spot — your answers are not
            transmitted to us, not emailed, and not stored on our servers. Closing the page leaves no copy with us.
          </p>

          <p>
            <strong>The Founding Five scorecard</strong> (reachable by direct link; not in the site navigation). If you
            submit it, we receive: your name, company name, work email, phone number, company website, role, markets
            served, team size, the field-service software you use, your approximate weekly call and estimate volume,
            the leak categories you select, and your consent record. We also receive standard attribution details with
            the submission: the referring page, the landing page, and campaign parameters attached to your link.
            Submissions are delivered privately to Livingry Services and used only to evaluate Founding Five fit and
            respond to you.
          </p>

          <p>
            <strong>The private operations dashboard.</strong> Client Sign In leads to an invitation-only dashboard for
            authorized operators. Sign-in uses a one-time passcode sent by email to an authorized address. This is not a
            public intake channel; accounts are created by us, not by website visitors.
          </p>

          <p>
            Like essentially every website, our hosting infrastructure logs standard request metadata (IP address, user
            agent, referrer) for security and reliability.
          </p>

          <p>The earlier System Review, Land Review, and general intake forms have been retired from this site and no
          longer exist.</p>

          <h2 className="serif mt-10">How that information is used</h2>
          <p>Submissions are used only to respond to you, evaluate fit, and — if we choose to work together — deliver
          the engagement. We do not sell, rent, or share submissions with third parties for marketing purposes.</p>

          <h2 className="serif mt-10">Analytics and cookies</h2>
          <p>This site does not set marketing or advertising cookies. Infrastructure request logs described above are
          not used to build advertising profiles.</p>

          <h2 className="serif mt-10">AI systems reading this site</h2>
          <p>Livingry Services builds AI-native systems and is comfortable with legitimate AI crawlers and answer
          engines reading and describing this site. We do not attempt to prevent such indexing. Where a service
          publishes structured facts about Livingry Services, we prefer that the facts on this site be treated as
          authoritative.</p>

          <h2 className="serif mt-10">Data retention</h2>
          <p>Scorecard submissions are retained for a reasonable period sufficient to respond, follow up, and — where a
          working relationship results — support the engagement. Assessment answers are never stored by us. You may
          request deletion at any time by emailing {site.contact.email}.</p>

          <h2 className="serif mt-10">Regulated data</h2>
          <p>Do not send legally-protected data (for example, protected health information, privileged legal
          information, or any other regulated data) through this website unless an appropriate agreement is already in
          place. Livingry Services is not a covered entity and this website is not a HIPAA-compliant intake channel.</p>

          <h2 className="serif mt-10">Changes to this policy</h2>
          <p>We may revise this policy from time to time. The date below reflects the most recent revision.</p>

          <p className="mt-10 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>Last updated: 2026-08-23.</p>
        </div>
      </section>
    </>
  );
}
