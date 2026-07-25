"use client";

import { useEffect, useState } from "react";

type RelayOption = { id: string; label: string; url: string; operator: string; note: string };

export function DashboardLoginGate({ onUnlocked }: { onUnlocked: () => void }) {
  const [stage, setStage] = useState<"idle" | "sent">("idle");
  const [sessionKey, setSessionKey] = useState<string>("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [relayOptions, setRelayOptions] = useState<RelayOption[]>([]);
  const [selectedRelays, setSelectedRelays] = useState<string[]>([]);
  const [showRelaySettings, setShowRelaySettings] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard-auth/relays")
      .then((r) => r.json())
      .then((d) => { setRelayOptions(d.options || []); setSelectedRelays(d.selected || []); })
      .catch(() => {});
  }, []);

  async function saveRelaySelection(next: string[]) {
    setSelectedRelays(next);
    await fetch("/api/dashboard-auth/relays", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ selected: next }) }).catch(() => {});
  }

  function toggleRelay(id: string) {
    const next = selectedRelays.includes(id) ? selectedRelays.filter((r) => r !== id) : [...selectedRelays, id];
    if (next.length === 0) return;
    saveRelaySelection(next);
  }

  async function sendCode() {
    setBusy(true); setError(null); setInfo(null);
    try {
      const res = await fetch("/api/dashboard-auth/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionKey }) });
      const data = await res.json();
      if (!res.ok || !data.ok) { setError(data.error || "Could not send OTP."); setBusy(false); return; }
      setSessionKey(data.sessionKey);
      setStage("sent");
      setInfo(`Sent to the configured npub over ${data.relaysSucceeded}/${data.relaysAttempted.length} relays.`);
    } catch { setError("Network error sending OTP."); } finally { setBusy(false); }
  }

  async function verifyCode() {
    setBusy(true); setError(null);
    try {
      const res = await fetch("/api/dashboard-auth/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionKey, code }) });
      const data = await res.json();
      if (!res.ok || !data.ok) { setError(data.error || "Incorrect code."); setBusy(false); return; }
      onUnlocked();
    } catch { setError("Network error verifying code."); } finally { setBusy(false); }
  }

  return (
    <div className="section">
      <div className="container max-w-2xl">
        <div className="eyebrow">Livingry Ops · Client workspace</div>
        <h1 className="serif mt-4" style={{ fontSize: "var(--step-3)" }}>Sign in to your tailored Ops dashboard</h1>
        <p className="mt-3" style={{ color: "var(--ink-2)" }}>
          Authenticated clients access their configured tools, workflows, approvals, and
          operational data here. Access is gated by a one-time code delivered as a NIP-04
          encrypted direct message to your configured npub over the relays below.
        </p>
        <div className="card mt-8">
          {stage === "idle" && (
            <>
              <p style={{ color: "var(--ink-2)" }}>Click below to publish an encrypted OTP DM to the operator npub over the selected relays. Retrieve the code from that Nostr inbox and enter it here.</p>
              <button className="btn btn-primary mt-5" onClick={sendCode} disabled={busy}>{busy ? "Sending…" : "Send OTP via Nostr"} <span aria-hidden>→</span></button>
            </>
          )}
          {stage === "sent" && (
            <>
              <label className="block mt-1 mb-2 text-[0.85rem]" style={{ color: "var(--ink-2)" }}>Enter the 6-digit code sent to the configured npub</label>
              <input value={code} onChange={(e) => setCode(e.target.value)} maxLength={6} inputMode="numeric" className="w-full" style={{ border: "1px solid var(--rule)", borderRadius: "6px", padding: "0.7rem 0.9rem", fontSize: "1.1rem", letterSpacing: "0.2em" }} placeholder="••••••" />
              <div className="flex gap-3 mt-4">
                <button className="btn btn-primary" onClick={verifyCode} disabled={busy || code.length < 6}>{busy ? "Verifying…" : "Verify & enter dashboard"}</button>
                <button className="btn btn-ghost" onClick={sendCode} disabled={busy}>Resend code</button>
              </div>
            </>
          )}
          {error && <p className="mt-4 text-[0.85rem]" style={{ color: "#b23b3b" }}>{error}</p>}
          {info && !error && <p className="mt-4 text-[0.85rem]" style={{ color: "var(--ink-3)" }}>{info}</p>}
        </div>
        <div className="mt-6">
          <button className="btn btn-ghost" style={{ paddingInline: 0 }} onClick={() => setShowRelaySettings((s) => !s)}>{showRelaySettings ? "Hide relay settings" : "Relay settings"} <span aria-hidden>{showRelaySettings ? "▲" : "▼"}</span></button>
          {showRelaySettings && (
            <div className="card mt-4">
              <div className="rule-label">Configurable OTP delivery relays</div>
              <p className="text-[0.85rem] mb-4" style={{ color: "var(--ink-3)" }}>Choose which free public relays carry the OTP direct message. This preference is saved to your browser and used on your next login.</p>
              <div className="grid gap-3">
                {relayOptions.map((r) => (
                  <label key={r.id} className="flex items-start gap-3" style={{ cursor: "pointer" }}>
                    <input type="checkbox" checked={selectedRelays.includes(r.id)} onChange={() => toggleRelay(r.id)} className="mt-1" />
                    <span>
                      <span style={{ color: "var(--ink)" }}>{r.label}</span>{" "}
                      <span className="mono text-[0.72rem]" style={{ color: "var(--ink-3)" }}>{r.url}</span>
                      <br />
                      <span className="text-[0.78rem]" style={{ color: "var(--ink-3)" }}>{r.note}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
