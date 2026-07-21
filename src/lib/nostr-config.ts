// Nostr configuration for the TradeOps demo dashboard's OTP login gate.
//
// KEY MANAGEMENT / OPSEC NOTES (read before touching this file):
// 1. The OTP-sending private key (nsec) lives ONLY in the server-side env var
//    DASHBOARD_OTP_SENDER_NSEC. It is never hardcoded, never logged, never
//    sent to the client, and never written to disk outside the environment
//    variable store (e.g. Vercel's encrypted env storage).
// 2. This is a throwaway/demo signing identity — generate a fresh keypair
//    for it, do not reuse any identity that holds funds or real reputation.
// 3. The recipient npub/nprofile below is intentionally public — it is the
//    destination address for OTP delivery, not a secret.
// 4. Relay selection is client-configurable via a non-sensitive cookie; it
//    carries no key material, only relay URL preferences.

export type RelayOption = {
  id: string;
  label: string;
  url: string;
  operator: string;
  note: string;
};

export const DEFAULT_RELAYS: RelayOption[] = [
  { id: "damus", label: "Damus", url: "wss://relay.damus.io", operator: "Damus (Casarin)", note: "Default relay bundled with the Damus iOS client. Free, high-traffic, no signup." },
  { id: "primal", label: "Primal", url: "wss://relay.primal.net", operator: "Primal", note: "Default relay bundled with the Primal client. Free, no signup." },
  { id: "nos_lol", label: "nos.lol (Amethyst default)", url: "wss://nos.lol", operator: "nos.lol", note: "Amethyst is a client, not a relay operator — nos.lol is one of its standard bundled free public relays." },
];

export const OTP_RECIPIENT_NPROFILE =
  process.env.DASHBOARD_OTP_NPROFILE ||
  "nprofile1qyt8wumn8ghj7un9d3shjtnwdaehgu3wvfskueqqyqqz3uf0sdv6kwpt39t44dtg8q80y2hmsv4krtk49mh56njn9swxwcktjmk";

export const RELAY_COOKIE = "tradeops_relay_prefs";
export const SESSION_COOKIE = "tradeops_dashboard_session";
