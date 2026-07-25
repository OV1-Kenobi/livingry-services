import type { ConnectionStatus, SystemHealth } from "@/lib/ops-dashboard/types";

export const healthColor: Record<SystemHealth["status"], string> = {
  ok: "var(--forest)",
  watch: "var(--copper)",
  critical: "#b23b3b",
};

export const statusColor: Record<ConnectionStatus, string> = {
  connected: "var(--forest)",
  configured: "var(--moss)",
  not_configured: "var(--ink-3)",
  error: "#b23b3b",
  disabled: "var(--ink-3)",
};

export const statusLabel: Record<ConnectionStatus, string> = {
  connected: "Connected",
  configured: "Configured",
  not_configured: "Not configured",
  error: "Error",
  disabled: "Disabled",
};

// Minimum 44px touch target for interactive controls (WCAG AA).
export const tapTarget: React.CSSProperties = { minHeight: "44px", minWidth: "44px" };
