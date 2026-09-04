// Session-scoped persistence for the HVAC Cash Flow Leak Diagnostic.
//
// Answers live in React state while the visitor works. This module mirrors
// that state into sessionStorage so navigating away from /assessment and back
// during the SAME browser visit does not lose progress. sessionStorage is
// tab-scoped and dies with the tab — nothing is transmitted anywhere, and
// closing the tab still leaves no copy with us (see the privacy page).

import type { Answers, ChoiceValue } from "./scoring";

const STORAGE_KEY = "livingry-assessment-v1";

export interface AssessmentSession {
  answers: Answers;
  revealed: boolean;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isValidAnswer(value: unknown): value is ChoiceValue {
  return value === 0 || value === 1 || value === 2 || value === 3;
}

/** Read the saved session, or null when absent, corrupt, or storage is unavailable. */
export function loadAssessmentSession(): AssessmentSession | null {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) return null;
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || !isRecord(parsed.answers)) return null;
    const collected: Record<number, ChoiceValue> = {};
    for (const [key, value] of Object.entries(parsed.answers)) {
      const id = Number(key);
      if (Number.isInteger(id) && id >= 1 && id <= 51 && isValidAnswer(value)) {
        collected[id] = value;
      }
    }
    const answers: Answers = collected;
    return {
      answers,
      revealed: parsed.revealed === true,
    };
  } catch {
    return null;
  }
}

/** Persist the current answers. Best-effort: storage failures (private mode
 * quotas, disabled storage) never break the diagnostic itself. */
export function saveAssessmentSession(answers: Answers, revealed: boolean): void {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, revealed }));
  } catch {
    // Ignore — the form keeps working from React state alone.
  }
}

/** Clear the saved session (used by "Start over"). */
export function clearAssessmentSession(): void {
  try {
    if (typeof window === "undefined" || !window.sessionStorage) return;
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}
