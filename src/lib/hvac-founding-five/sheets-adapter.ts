// Google Sheets adapter for the alliance application pipeline.
//
// Writes one row to the "Livingry Strategic Alliance Applications" Sheet
// (Applications tab) per validated submission. Gated on env credentials:
//   ALLIANCE_SHEET_ID              — the spreadsheet ID
//   GOOGLE_SERVICE_ACCOUNT_EMAIL   — service account client_email
//   GOOGLE_SERVICE_ACCOUNT_KEY     — service account private_key (PEM, \n-escaped)
// When credentials are absent the adapter is a deterministic no-op so the
// funnel runs end-to-end in staging without production secrets.
// Zero external dependencies: RS256 JWT via Node crypto. Never logs PII
// or secrets.

import { createSign } from "node:crypto";
import type { NormalizedApplication } from "./application-validation";
import { toSheetRow } from "./application-validation";

export const ALLIANCE_SHEET_ID_DEFAULT = "1HOTQBtMHWqkEAule_SUItFsNNyn-2BoBEclFUnqpEOo";

export type SheetAppendOutcome =
  | { attempted: false; ok: true; note: string }
  | { attempted: true; ok: boolean; note: string };

interface SheetsConfig {
  sheetId: string;
  clientEmail: string;
  privateKey: string;
}

export function sheetsConfigFromEnv(env: NodeJS.ProcessEnv = process.env): SheetsConfig | null {
  const clientEmail = env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!clientEmail || !privateKey) return null;
  return {
    sheetId: env.ALLIANCE_SHEET_ID || ALLIANCE_SHEET_ID_DEFAULT,
    clientEmail,
    privateKey: privateKey.replace(/\\n/g, "\n"),
  };
}

function b64url(input: string | Buffer): string {
  return Buffer.from(input).toString("base64url");
}

function signJwt(cfg: SheetsConfig): string {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: cfg.clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(cfg.privateKey).toString("base64url");
  return `${header}.${claims}.${signature}`;
}

async function accessToken(cfg: SheetsConfig): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signJwt(cfg),
    }),
    signal: AbortSignal.timeout(10000), // 10s timeout for token exchange
  });
  if (!res.ok) throw new Error(`token exchange failed: ${res.status}`);
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("token exchange returned no access_token");
  return data.access_token;
}

export async function appendApplicationRow(
  app: NormalizedApplication,
  cfg: SheetsConfig | null = sheetsConfigFromEnv(),
): Promise<SheetAppendOutcome> {
  if (!cfg) {
    return { attempted: false, ok: true, note: "sheets credentials not configured — no-op (staging)" };
  }

  const token = await accessToken(cfg);
  const range = encodeURIComponent("Applications!A1");
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${cfg.sheetId}/values/${range}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ majorDimension: "ROWS", values: [toSheetRow(app)] }),
    signal: AbortSignal.timeout(15000), // 15s timeout for sheet append
  });

  if (!res.ok) {
    // Do not include the response body — it can echo submitted values.
    return { attempted: true, ok: false, note: `sheets append failed: ${res.status}` };
  }
  return { attempted: true, ok: true, note: "row appended" };
}
