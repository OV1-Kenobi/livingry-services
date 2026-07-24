// Best-effort in-memory rate limiter (per server instance). Sufficient as a
// privacy-respecting bot control for a low-volume, founder-reviewed funnel;
// documented as per-instance so a horizontally scaled deployment can swap in a
// shared store later without changing call sites.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  opts: { limit?: number; windowMs?: number; now?: number } = {},
): { allowed: boolean; retryAfterSec: number } {
  const limit = opts.limit ?? 5;
  const windowMs = opts.windowMs ?? 60 * 60 * 1000; // 5 per hour per key
  const now = opts.now ?? Date.now();
  const b = buckets.get(key);
  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (b.count >= limit) {
    return { allowed: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

// Exposed for tests.
export function __resetRateLimits() {
  buckets.clear();
}
