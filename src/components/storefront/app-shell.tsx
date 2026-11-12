import type { ReactNode } from "react";
import { MotionShell } from "@/components/storefront/motion-shell";

export function AppShell({ children }: { children: ReactNode }) {
  return <MotionShell>{children}</MotionShell>;
}
