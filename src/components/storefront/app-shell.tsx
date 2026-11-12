import { useState, type ReactNode } from "react";
import { MotionShell } from "@/components/storefront/motion-shell";
import { SiteHeader } from "@/components/storefront/site-header";
import { CartDrawer } from "@/components/storefront/cart-drawer";

export function AppShell({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <MotionShell>
      <SiteHeader onCartClick={() => setCartOpen(true)} />
      {children}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </MotionShell>
  );
}
