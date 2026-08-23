"use client";

import { useEffect, useState } from "react";

type Connection = {
  id: string;
  category: string;
  provider: string;
  display_name: string;
  status: string;
  billing_status: string;
  monthly_cost_cents: number | null;
  trial_length_days: number | null;
  signup_url: string | null;
  notes: string | null;
  has_credentials: boolean;
};

type CategoryGroup = { category: string; connections: Connection[] };

const CATEGORY_LABEL: Record<string, string> = {
  booking_scheduling: "Booking & Scheduling",
  operations_admin: "Operations / Admin Fulfillment",
  content_creation: "Content Creation",
  sales_call_intelligence: "Sales Call Intelligence",
  marketing_crm: "Marketing & CRM Communications",
  sales_outreach: "Sales Outreach & Performance",
  orchestration: "Orchestration (n8n core)",
};

const BILLING_LABEL: Record<string, string> = {
  delay_trial: "Trial delayed (pre-revenue)",
  trial_active: "Trial active",
  subscribed: "Subscribed",
  cancelled: "Cancelled",
};

function money(cents: number | null) {
  if (cents === null) return "—";
  return `$${(cents / 100).toFixed(2)}/mo`;
}

export default function IntegrationsPage() {
  const [groups, setGroups] = useState<CategoryGroup[]>([]);
  const [provisioned, setProvisioned] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");

  useEffect(() => {
    load();
  }, []);

  // The tenant is ALWAYS derived server-side from the authenticated session
  // (never from localStorage or any client input) — the API ignores any
  // client-supplied tenant id.
  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/ops/integrations`);
      if (res.status === 503) {
        setProvisioned(false);
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error(await res.text());
      setProvisioned(true);
      const data = await res.json();
      setGroups(data.categories);
    } catch (e: any) {
      setError(e.message || "Failed to load integrations");
    } finally {
      setLoading(false);
    }
  }

  async function runSetup() {
    const secret = window.prompt(
      "Enter SETUP_SECRET (server env var) to initialize schema and seed the 7 tool categories:"
    );
    if (!secret) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ops/setup", {
        method: "POST",
        headers: { "x-setup-secret": secret },
      });
      if (!res.ok) throw new Error(await res.text());
      await load();
    } catch (e: any) {
      setError(e.message || "Setup failed");
      setLoading(false);
    }
  }

  async function updateBillingStatus(id: string, billing_status: string) {
    await fetch(`/api/ops/integrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ billing_status }),
    });
    load();
  }

  async function saveCredential(id: string) {
    if (!apiKeyInput) return;
    await fetch(`/api/ops/integrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKeyInput }),
    });
    setApiKeyInput("");
    setEditing(null);
    load();
  }

  if (!provisioned) {
    return (
      <div className="card">
        <div className="rule-label">Integrations Setup</div>
        <p style={{ color: "var(--ink-2)" }} className="mt-3">
          No tenant initialized yet. Run one-time setup to create the Postgres
          schema and pre-fill the 7 outsourced tool categories from your AI
          toolbox (Victoria AI, Ela AI, Caliope AI, Aurameet.live, Brevo,
          Aura-app.ai, n8n).
        </p>
        <button className="btn btn-primary mt-4" onClick={runSetup}>
          Run setup
        </button>
        {error && <p className="mt-3" style={{ color: "#b23b3b" }}>{error}</p>}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <div className="rule-label">Outsourced Tool Credentials</div>
        <p style={{ color: "var(--ink-2)", maxWidth: "42rem" }} className="mt-2">
          Configure credentials per provider. Trials for tools not needed for
          marketing, sales, or intake are marked{" "}
          <strong>Trial delayed</strong> until the first paying client signs —
          change billing status here when you&apos;re ready to activate.
          Credentials are encrypted at rest (AES-256-GCM) and never displayed
          in plaintext after saving.
        </p>
      </div>

      {loading && <p style={{ color: "var(--ink-3)" }}>Loading…</p>}
      {error && <p style={{ color: "#b23b3b" }}>{error}</p>}

      {groups.map((group) => (
        <div key={group.category} className="mb-8">
          <h2 className="serif mb-3" style={{ fontSize: "var(--step-1)" }}>
            {CATEGORY_LABEL[group.category] || group.category}
          </h2>
          <div className="grid gap-0">
            {group.connections.map((c, i) => (
              <div
                key={c.id}
                className="py-4 flex items-start justify-between gap-4 flex-wrap"
                style={{ borderTop: i === 0 ? "1px solid var(--ink)" : "1px solid var(--rule)" }}
              >
                <div style={{ maxWidth: "38rem" }}>
                  <div className="flex items-center gap-2">
                    <h3 className="serif" style={{ fontSize: "1rem" }}>{c.display_name}</h3>
                    <span className={`pill ${c.has_credentials ? "pill-active" : "pill-next"}`}>
                      {c.has_credentials ? "configured" : "not configured"}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.85rem]" style={{ color: "var(--ink-2)" }}>
                    {money(c.monthly_cost_cents)}
                    {c.trial_length_days ? ` · ${c.trial_length_days}-day trial` : ""}
                    {c.signup_url && (
                      <>
                        {" · "}
                        <a href={c.signup_url} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>
                          signup
                        </a>
                      </>
                    )}
                  </p>
                  {c.notes && (
                    <p className="mt-1 text-[0.8rem]" style={{ color: "var(--ink-3)" }}>{c.notes}</p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <select
                    value={c.billing_status}
                    onChange={(e) => updateBillingStatus(c.id, e.target.value)}
                    style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.35rem 0.6rem", fontSize: "0.8rem" }}
                  >
                    <option value="delay_trial">Trial delayed</option>
                    <option value="trial_active">Trial active</option>
                    <option value="subscribed">Subscribed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {editing === c.id ? (
                    <div className="flex gap-2">
                      <input
                        type="password"
                        placeholder="API key / secret"
                        value={apiKeyInput}
                        onChange={(e) => setApiKeyInput(e.target.value)}
                        style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.35rem 0.6rem", fontSize: "0.8rem" }}
                      />
                      <button className="btn btn-primary" style={{ fontSize: "0.75rem", paddingBlock: "0.3rem" }} onClick={() => saveCredential(c.id)}>
                        Save
                      </button>
                      <button className="btn btn-ghost" style={{ fontSize: "0.75rem", paddingBlock: "0.3rem" }} onClick={() => setEditing(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button className="btn btn-secondary" style={{ fontSize: "0.75rem", paddingBlock: "0.3rem" }} onClick={() => setEditing(c.id)}>
                      Set credential
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
