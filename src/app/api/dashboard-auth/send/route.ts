import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SimplePool, finalizeEvent, getPublicKey, nip04, nip19 } from "nostr-tools";
import { DEFAULT_RELAYS, OTP_RECIPIENT_NPROFILE, RELAY_COOKIE } from "@/lib/nostr-config";
import { generateOtp } from "@/lib/otp-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function ensureWebSocketPolyfill() {
  if (typeof (globalThis as any).WebSocket === "undefined") {
    const wsModule = await import("ws");
    (globalThis as any).WebSocket = wsModule.default as unknown as typeof WebSocket;
  }
}

function resolveRecipientPubkey(): { pubkey: string; hintRelays: string[] } {
  const decoded = nip19.decode(OTP_RECIPIENT_NPROFILE);
  if (decoded.type === "nprofile") return { pubkey: decoded.data.pubkey, hintRelays: decoded.data.relays || [] };
  if (decoded.type === "npub") return { pubkey: decoded.data as string, hintRelays: [] };
  throw new Error("DASHBOARD_OTP_NPROFILE must be a valid nprofile or npub");
}

async function getConfiguredRelayUrls(): Promise<string[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(RELAY_COOKIE)?.value;
  if (raw) {
    try {
      const ids: string[] = JSON.parse(raw);
      const urls = ids.map((id) => DEFAULT_RELAYS.find((r) => r.id === id)?.url).filter((u): u is string => Boolean(u));
      if (urls.length) return urls;
    } catch {}
  }
  return DEFAULT_RELAYS.map((r) => r.url);
}

export async function POST(req: Request) {
  const hasSenderKey = Boolean(process.env.DASHBOARD_OTP_SENDER_NSEC);
  if (!hasSenderKey) {
    return NextResponse.json(
      { ok: false, error: "Server is not configured with a demo OTP sending key (DASHBOARD_OTP_SENDER_NSEC). Set this as an encrypted environment variable — never hardcode it — to enable Nostr OTP login." },
      { status: 503 },
    );
  }
  try {
    await ensureWebSocketPolyfill();
    const decodedSk = nip19.decode(process.env.DASHBOARD_OTP_SENDER_NSEC as string);
    if (decodedSk.type !== "nsec") throw new Error("DASHBOARD_OTP_SENDER_NSEC must be a valid nsec-encoded key");
    const senderSecretKey = decodedSk.data as Uint8Array;

    const { pubkey: recipientPubkey, hintRelays } = resolveRecipientPubkey();
    const relayUrls = Array.from(new Set([...(await getConfiguredRelayUrls()), ...hintRelays]));

    const body = await req.json().catch(() => ({}));
    const sessionKey = typeof body.sessionKey === "string" && body.sessionKey.length > 0 ? body.sessionKey : crypto.randomUUID();

    const code = generateOtp(sessionKey);
    const plaintext = `Livingry TradeOps demo dashboard login code: ${code}\n\nThis code expires in 5 minutes. If you did not request this, ignore this message.`;
    const ciphertext = await nip04.encrypt(senderSecretKey, recipientPubkey, plaintext);
    const senderPubkey = getPublicKey(senderSecretKey);

    const event = finalizeEvent(
      { kind: 4, created_at: Math.floor(Date.now() / 1000), tags: [["p", recipientPubkey]], content: ciphertext },
      senderSecretKey,
    );

    senderSecretKey.fill(0);

    const pool = new SimplePool();
    const results = await Promise.allSettled(pool.publish(relayUrls, event));
    pool.close(relayUrls);
    const succeeded = results.filter((r) => r.status === "fulfilled").length;

    return NextResponse.json({ ok: succeeded > 0, sessionKey, relaysAttempted: relayUrls, relaysSucceeded: succeeded, senderPubkey, eventId: event.id });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Unknown error sending OTP" }, { status: 500 });
  }
}
