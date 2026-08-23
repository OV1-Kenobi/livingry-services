import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
	finalizeEvent,
	generateSecretKey,
	getPublicKey,
	nip04,
	nip19,
	SimplePool,
} from "nostr-tools";
import { rateLimit } from "@/lib/hvac-founding-five/rate-limit";
import {
	DEFAULT_RELAYS,
	OTP_RECIPIENT_NPROFILE,
	RELAY_COOKIE,
} from "@/lib/nostr-config";
import { generateOtp } from "@/lib/otp-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// OPSEC: this route generates a brand-new, single-use Nostr keypair for
// every OTP request. The secret key never leaves this function, is never
// written to an env var, database, or log, and is explicitly zeroed from
// memory immediately after it signs the one encrypted DM below. There is
// no persistent sender identity for this flow — nothing to configure in
// Vercel, nothing to rotate, nothing to revoke.

async function ensureWebSocketPolyfill() {
	if (typeof (globalThis as any).WebSocket === "undefined") {
		const wsModule = await import("ws");
		(globalThis as any).WebSocket =
			wsModule.default as unknown as typeof WebSocket;
	}
}

function resolveRecipientPubkey(): { pubkey: string; hintRelays: string[] } {
	const decoded = nip19.decode(OTP_RECIPIENT_NPROFILE);
	if (decoded.type === "nprofile")
		return {
			pubkey: decoded.data.pubkey,
			hintRelays: decoded.data.relays || [],
		};
	if (decoded.type === "npub")
		return { pubkey: decoded.data as string, hintRelays: [] };
	throw new Error("DASHBOARD_OTP_NPROFILE must be a valid nprofile or npub");
}

async function getConfiguredRelayUrls(): Promise<string[]> {
	const cookieStore = await cookies();
	const raw = cookieStore.get(RELAY_COOKIE)?.value;
	if (raw) {
		try {
			const ids: string[] = JSON.parse(raw);
			const urls = ids
				.map((id) => DEFAULT_RELAYS.find((r) => r.id === id)?.url)
				.filter((u): u is string => Boolean(u));
			if (urls.length) return urls;
		} catch {}
	}
	return DEFAULT_RELAYS.map((r) => r.url);
}

// Per-IP send budget, first check in the handler so refusal happens before any
// key material is generated or any relay contact attempted (SEC-2026-007).
function clientIp(req: Request): string {
	const forwarded = req.headers.get("x-forwarded-for");
	return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

export async function POST(req: Request) {
	// IP-keyed send limit (SEC-2026-007): 5 OTP sends per hour per client,
	// reusing the shared per-instance limiter (same semantics as land-review).
	const rl = rateLimit(`send-otp:${clientIp(req)}`);
	if (!rl.allowed) {
		return NextResponse.json(
			{ ok: false, error: "Too many requests. Please try again later." },
			{ status: 429, headers: { "retry-after": String(rl.retryAfterSec) } },
		);
	}

	try {
		await ensureWebSocketPolyfill();

		const senderSecretKey = generateSecretKey();
		const senderPubkey = getPublicKey(senderSecretKey);

		const { pubkey: recipientPubkey, hintRelays } = resolveRecipientPubkey();
		const relayUrls = Array.from(
			new Set([...(await getConfiguredRelayUrls()), ...hintRelays]),
		);

		const body = await req.json().catch(() => ({}));
		const sessionKey =
			typeof body.sessionKey === "string" && body.sessionKey.length > 0
				? body.sessionKey
				: crypto.randomUUID();

		const code = generateOtp(sessionKey);
		const plaintext = `Livingry Ops client dashboard login code: ${code}\n\nThis code expires in 5 minutes. It was sent from a single-use, throwaway Nostr identity (${senderPubkey.slice(0, 12)}…) generated only for this message. If you did not request this, ignore it.`;

		const ciphertext = await nip04.encrypt(
			senderSecretKey,
			recipientPubkey,
			plaintext,
		);

		const event = finalizeEvent(
			{
				kind: 4,
				created_at: Math.floor(Date.now() / 1000),
				tags: [["p", recipientPubkey]],
				content: ciphertext,
			},
			senderSecretKey,
		);

		senderSecretKey.fill(0);

		const pool = new SimplePool();
		const results = await Promise.allSettled(pool.publish(relayUrls, event));
		pool.close(relayUrls);
		const succeeded = results.filter((r) => r.status === "fulfilled").length;

		return NextResponse.json({
			ok: succeeded > 0,
			sessionKey,
			relaysAttempted: relayUrls,
			relaysSucceeded: succeeded,
			senderPubkey,
			eventId: event.id,
		});
	} catch (err) {
		return NextResponse.json(
			{
				ok: false,
				error: err instanceof Error ? err.message : "Unknown error sending OTP",
			},
			{ status: 500 },
		);
	}
}
