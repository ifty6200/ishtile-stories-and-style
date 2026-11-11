import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export type CartLine = { productId: string; variantId: string; size: string; colour: string; quantity: number };
type Profile = { full_name: string; phone: string };
type StoreContextValue = {
  user: User | null;
  profile: Profile | null;
  cart: CartLine[];
  wishlist: string[];
  cartCount: number;
  subtotal: number;
  addToCart: (line: CartLine, name: string) => void;
  updateCart: (variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  toggleWishlist: (productId: string) => void;
  saveProfile: (profile: Profile) => Promise<void>;
  signOut: () => Promise<void>;
};

const StoreContext = createContext<StoreContextValue | null>(null);
const CART_KEY = "ishtile-cart-v1";
const WISHLIST_KEY = "ishtile-wishlist-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      const savedWishlist = localStorage.getItem(WISHLIST_KEY);
      if (savedCart) setCart(JSON.parse(savedCart) as CartLine[]);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist) as string[]);
    } catch {
      localStorage.removeItem(CART_KEY);
      localStorage.removeItem(WISHLIST_KEY);
    }
    setHydrated(true);

    let active = true;
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (active && data.user) await loadCustomerData(data.user);
    };
    void loadUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      const nextUser = session?.user ?? null;
      if (nextUser) window.setTimeout(() => void loadCustomerData(nextUser), 0);
      else {
        setUser(null);
        setProfile(null);
      }
    });
    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [cart, wishlist, hydrated]);

  async function loadCustomerData(currentUser: User) {
    setUser(currentUser);
    const [{ data: profileRow }, { data: savedCart }, { data: savedWishlist }] = await Promise.all([
      supabase.from("profiles").select("full_name, phone").eq("id", currentUser.id).maybeSingle(),
      supabase.from("carts").select("id, cart_items(product_id, variant_id, quantity, product_variants(size, colour))").eq("user_id", currentUser.id).maybeSingle(),
      supabase.from("wishlists").select("product_id").eq("user_id", currentUser.id),
    ]);
    if (profileRow) setProfile(profileRow);
    if (savedCart?.cart_items) {
      setCart(savedCart.cart_items.map((item) => {
        const variant = Array.isArray(item.product_variants) ? item.product_variants[0] : item.product_variants;
        return { productId: item.product_id, variantId: item.variant_id, size: variant?.size ?? "M", colour: variant?.colour ?? "Black", quantity: item.quantity };
      }));
    }
    if (savedWishlist) setWishlist(savedWishlist.map((item) => item.product_id));
  }

  async function syncCartLine(line: CartLine, quantity: number) {
    if (!user) return;
    const { data: savedCart, error: cartError } = await supabase.from("carts").upsert({ user_id: user.id }, { onConflict: "user_id" }).select("id").single();
    if (cartError || !savedCart) { toast.error("Your basket could not be saved."); return; }
    if (quantity < 1) {
      await supabase.from("cart_items").delete().eq("cart_id", savedCart.id).eq("variant_id", line.variantId);
      return;
    }
    const { error } = await supabase.from("cart_items").upsert({ cart_id: savedCart.id, product_id: line.productId, variant_id: line.variantId, quantity }, { onConflict: "cart_id,variant_id" });
    if (error) toast.error("Your basket could not be saved.");
  }

  function addToCart(line: CartLine, name: string) {
    setCart((current) => {
      const found = current.find((item) => item.variantId === line.variantId);
      const quantity = Math.min(99, (found?.quantity ?? 0) + line.quantity);
      void syncCartLine(line, quantity);
      return found ? current.map((item) => item.variantId === line.variantId ? { ...item, quantity } : item) : [...current, { ...line, quantity }];
    });
    toast.success(`${name} added to your bag`);
  }

  function updateCart(variantId: string, quantity: number) {
    const line = cart.find((item) => item.variantId === variantId);
    if (!line) return;
    const nextQuantity = Math.max(1, Math.min(99, quantity));
    setCart((current) => current.map((item) => item.variantId === variantId ? { ...item, quantity: nextQuantity } : item));
    void syncCartLine(line, nextQuantity);
  }

  function removeFromCart(variantId: string) {
    const line = cart.find((item) => item.variantId === variantId);
    setCart((current) => current.filter((item) => item.variantId !== variantId));
    if (line) void syncCartLine(line, 0);
  }

  async function toggleWishlist(productId: string) {
    const isSaved = wishlist.includes(productId);
    setWishlist((current) => isSaved ? current.filter((id) => id !== productId) : [...current, productId]);
    if (!user) return;
    const result = isSaved
      ? await supabase.from("wishlists").delete().eq("user_id", user.id).eq("product_id", productId)
      : await supabase.from("wishlists").insert({ user_id: user.id, product_id: productId });
    if (result.error) toast.error("Your wishlist could not be saved.");
  }

  async function saveProfile(nextProfile: Profile) {
    if (!user) throw new Error("Sign in to update your account.");
    const { error } = await supabase.from("profiles").update({ ...nextProfile, updated_at: new Date().toISOString() }).eq("id", user.id);
    if (error) throw error;
    setProfile(nextProfile);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setProfile(null);
    setCart([]);
    setWishlist([]);
  }

  const value = useMemo<StoreContextValue>(() => ({
    user, profile, cart, wishlist, cartCount: cart.reduce((sum, line) => sum + line.quantity, 0), subtotal: 0,
    addToCart, updateCart, removeFromCart, toggleWishlist, saveProfile, signOut,
  }), [user, profile, cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider.");
  return context;
}