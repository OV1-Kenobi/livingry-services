import { getCredentials } from "@/lib/dashboard-data";

const credentialLabel: Record<string, string> = {
  EPA_608_universal: "EPA 608 — Universal",
  EPA_608_type_i: "EPA 608 — Type I",
  EPA_608_type_ii: "EPA 608 — Type II",
  EPA_608_type_iii: "EPA 608 — Type III",
  state_license: "State / local license",
  manufacturer_cert: "Manufacturer certification",
};

export default function IdentityRegistryPage() {
  const credentials = getCredentials();
  return (
    <>
      <div className="rule-label">Credential registry · Nostr-backed identity</div>
      <p className="mb-8" style={{ color: "var(--ink-2)", maxWidth: "48rem" }}>
        Every technician identity carries an optional Nostr public key (npub) and NIP-05
        identifier. Credential exceptions in the HVAC Dispatch Gate check a{" "}
        <strong>NIP-26 delegation token</strong>, not a database flag — so a certification
        can be verified, scoped, and revoked cryptographically instead of trusted from a
        single vendor's record.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {credentials.map((c) => (
          <div key={c.id} className="card">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h3 className="serif" style={{ fontSize: "var(--step-1)" }}>{c.employeeName}</h3>
              <span className={`pill ${c.nostr.verified ? "pill-active" : "pill-future"}`}>
                {c.nostr.verified ? "Verified" : "Pending verification"}
              </span>
            </div>
            <p className="mt-3 text-[0.92rem]" style={{ color: "var(--ink-2)" }}>{credentialLabel[c.credentialType]}</p>
            <p className="mt-2 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>Source: {c.verificationSource} · Verified {c.verifiedAt}</p>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--rule)" }}>
              <div className="mono text-[0.75rem]" style={{ color: "var(--ink-3)" }}>npub</div>
              <div className="mono text-[0.85rem] break-all" style={{ color: "var(--ink)" }}>{c.nostr.npub}</div>
              {c.nostr.nip05 && (
                <>
                  <div className="mono text-[0.75rem] mt-2" style={{ color: "var(--ink-3)" }}>NIP-05</div>
                  <div className="mono text-[0.85rem]" style={{ color: "var(--ink)" }}>{c.nostr.nip05}</div>
                </>
              )}
              {c.nostr.delegationScope && (
                <>
                  <div className="mono text-[0.75rem] mt-2" style={{ color: "var(--ink-3)" }}>NIP-26 delegation scope</div>
                  <div className="mono text-[0.85rem]" style={{ color: "var(--ink)" }}>{c.nostr.delegationScope}</div>
                </>
              )}
            </div>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--rule)" }}>
              <div className="rule-label" style={{ marginBottom: "0.5rem" }}>Job-type permissions</div>
              <div className="flex flex-wrap gap-2">
                {c.jobTypePermissions.map((p) => (
                  <span key={p} className="mono text-[0.72rem]" style={{ padding: "0.2rem 0.55rem", border: "1px solid var(--rule)", borderRadius: "999px", color: "var(--ink-2)" }}>
                    {p.replaceAll("_", " ")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>
        HVAC-101 Credential Gate rule: if a job opens the refrigerant circuit, dispatch
        checks Section 608 classification. Missing or unverified delegation blocks
        auto-dispatch and escalates to the Exception Desk. Apprentices require a named,
        currently-verified supervising technician on the same job.
      </p>
    </>
  );
}
