import type { ReactNode } from "react";
import { MotionShell } from "@/components/storefront/motion-shell";
import { SiteHeader } from "@/components/storefront/site-header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <MotionShell>
      <SiteHeader />
      {children}
    </MotionShell>
  );
}
