import type { Metadata } from "next";
import DashboardShell from "./DashboardShell";

// Server-owned layout for the PRIVATE authenticated dashboard surface.
// The noindex contract is enforced here so every /dashboard/* route
// inherits it (client pages cannot export metadata). This surface stays
// out of the public build: not in nav, footer, or sitemap; disallowed in
// robots.ts; and every data route behind server-side session verification.
export const metadata: Metadata = {
  title: "Livingry Ops · Client workspace",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
