import "server-only";

import { cache } from "react";
import {
  productRowToProduct,
  type Product,
  type ProductRow,
} from "../product-data";
import { getSupabaseAdmin } from "./supabase";

export type ProductsQueryResult =
  | { status: "ok"; products: Product[] }
  | { status: "unavailable"; products: [] };

export type ProductQueryResult =
  | { status: "ok"; product: Product | null }
  | { status: "unavailable"; product: null };

export const getServerProducts = cache(
  async (): Promise<ProductsQueryResult> => {
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return { status: "unavailable", products: [] };
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        return { status: "unavailable", products: [] };
      }

      const products = ((data || []) as ProductRow[])
        .map(productRowToProduct)
        .filter((product): product is Product => product !== null);

      return { status: "ok", products };
    } catch {
      return { status: "unavailable", products: [] };
    }
  }
);

export const getServerProductBySlug = cache(
  async (slug: string): Promise<ProductQueryResult> => {
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return { status: "unavailable", product: null };
    }

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        return { status: "unavailable", product: null };
      }

      return {
        status: "ok",
        product: data ? productRowToProduct(data as ProductRow) : null,
      };
    } catch {
      return { status: "unavailable", product: null };
    }
  }
);
