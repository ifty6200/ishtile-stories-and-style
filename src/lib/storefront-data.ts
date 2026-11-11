import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo_text: string;
  cover_image: string;
  description: string;
};

export type Product = {
  id: string;
  brand_id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  material: string;
  care_instructions: string;
  image_url: string;
  featured: boolean;
  brands: Brand | Brand[] | null;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  size: string;
  colour: string;
  sku: string;
  stock_quantity: number;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_image: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  cover_image: string;
  content: string;
  published_at: string;
};

export const formatPrice = (amount: number) => `৳${amount.toLocaleString("en-BD")}`;

export function getProductBrand(product: Product): Brand | null {
  return Array.isArray(product.brands) ? (product.brands[0] ?? null) : product.brands;
}

export function useProducts() {
  return useQuery({
    queryKey: ["catalog", "products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*, brands(id, name, slug, logo_text, cover_image, description)")
        .eq("status", "active")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ["catalog", "brands"],
    queryFn: async (): Promise<Brand[]> => {
      const { data, error } = await supabase.from("brands").select("*").eq("status", "active").order("name");
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}

export function useCollections() {
  return useQuery({
    queryKey: ["catalog", "collections"],
    queryFn: async (): Promise<Collection[]> => {
      const { data, error } = await supabase.from("collections").select("*").eq("status", "active").order("name");
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}

export function useArticles() {
  return useQuery({
    queryKey: ["catalog", "articles"],
    queryFn: async (): Promise<Article[]> => {
      const { data, error } = await supabase.from("editorial_articles").select("*").eq("status", "published").order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
}