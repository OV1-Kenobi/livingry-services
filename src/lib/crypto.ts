import crypto from "crypto";

// AES-256-GCM envelope encryption for third-party tool credentials
// (API keys, OAuth tokens, webhook secrets) stored in
// integration_connections. Master key comes from CREDENTIALS_ENC_KEY,
// a 32-byte value, base64-encoded, generated once per deployment and
// kept OUT of source control (see .env.example). This keeps raw secrets
// out of the database even if the DB is compromised or exported.

function getKey(): Buffer {
  const raw = process.env.CREDENTIALS_ENC_KEY;
  if (!raw) {
    throw new Error(
      "CREDENTIALS_ENC_KEY is not set. Generate one with: openssl rand -base64 32"
    );
  }
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error("CREDENTIALS_ENC_KEY must decode to exactly 32 bytes.");
  }
  return key;
}

export interface EncryptedPayload {
  ciphertext: string; // base64
  iv: string; // base64
  tag: string; // base64
}

export function encryptSecret(plaintext: string): EncryptedPayload {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return {
    ciphertext: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
  };
}

export function decryptSecret(payload: EncryptedPayload): string {
  const key = getKey();
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(payload.iv, "base64")
  );
  decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, "base64")),
    decipher.final(),
  ]);
  return plaintext.toString("utf8");
}

// Masks a secret for display in the UI, e.g. "sk_live_••••••••wxyz"
export function maskSecret(plaintext: string): string {
  if (plaintext.length <= 4) return "••••";
  return "••••••••" + plaintext.slice(-4);
}
