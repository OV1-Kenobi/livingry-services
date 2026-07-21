// Nostr configuration for the TradeOps demo dashboard's OTP login gate.
//
// KEY MANAGEMENT / OPSEC MODEL:
// Every OTP send generates a brand-new, single-use Nostr keypair on the
// server, uses it to sign exactly one encrypted DM, and then discards it.
// No sender key is ever persisted to an environment variable, database, or
// disk — it exists only in process memory for the duration of one request
// and is zeroed immediately after signing. This means:
//   - No Vercel/env configuration is required to enable OTP login.
//   - Each OTP message is signed by a different, throwaway identity that
//     has no reputation, no history, and no reuse across requests.
//   - There is nothing long-lived to leak, rotate, or revoke for this flow.
// The RECIPIENT npub/nprofile below is intentionally public — it is the
// fixed destination address for OTP delivery, not a secret.

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
