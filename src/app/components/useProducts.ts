"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  defaultProducts,
  normalizeProduct,
  slugify,
  type ProductInput,
  type Product,
  productStorageEvent,
  productStorageKey,
} from "../product-data";

type ProductMode = "local" | "supabase";
type MutationResult = {
  ok: boolean;
  message?: string;
};

type ProductsResponse = {
  mode?: ProductMode;
  products?: unknown[];
  error?: string;
};

function readProducts() {
  if (typeof window === "undefined") {
    return defaultProducts;
  }

  try {
    const stored = window.localStorage.getItem(productStorageKey);
    if (!stored) {
      return defaultProducts;
    }

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return defaultProducts;
    }

    return parsed.map(normalizeProduct).filter(Boolean) as Product[];
  } catch {
    return defaultProducts;
  }
}

function writeProducts(products: Product[]) {
  window.localStorage.setItem(productStorageKey, JSON.stringify(products));
  window.dispatchEvent(new Event(productStorageEvent));
}

function createProductId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `product-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function localProductFromInput(product: ProductInput): Product {
  const productId = createProductId();

  return {
    ...product,
    id: productId,
    slug: slugify(product.slug || `${product.title}-${productId.slice(-6)}`),
    createdAt: new Date().toISOString(),
    images: product.images || [],
  } as Product;
}

function isProduct(product: Product | null): product is Product {
  return product !== null;
}

async function readRemoteProducts(): Promise<{
  mode: ProductMode;
  products: Product[];
  message?: string;
}> {
  const response = await fetch("/api/products", {
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => ({}))) as ProductsResponse;

  if (!response.ok) {
    return {
      mode: "local",
      products: readProducts(),
      message: payload.error || "Could not load products.",
    };
  }

  if (payload.mode !== "supabase") {
    return {
      mode: "local",
      products: readProducts(),
    };
  }

  return {
    mode: "supabase",
    products: (payload.products || []).map(normalizeProduct).filter(isProduct),
  };
}

export function useProducts(initialProducts?: Product[]) {
  const hasInitialProducts = initialProducts !== undefined;
  const [products, setProducts] = useState<Product[]>(
    initialProducts || defaultProducts
  );
  const [loaded, setLoaded] = useState(hasInitialProducts);
  const [mode, setMode] = useState<ProductMode>(
    hasInitialProducts ? "supabase" : "local"
  );
  const [error, setError] = useState("");

  const sync = useCallback(async () => {
    setError("");

    try {
      const result = await readRemoteProducts();
      setMode(result.mode);
      setProducts(result.products);
      setError(result.message || "");
      setLoaded(true);
    } catch {
      setMode("local");
      setProducts(readProducts());
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    sync();

    const syncLocal = () => {
      if (mode === "local") {
        setProducts(readProducts());
      }
    };

    window.addEventListener("storage", syncLocal);
    window.addEventListener(productStorageEvent, syncLocal);

    return () => {
      window.removeEventListener("storage", syncLocal);
      window.removeEventListener(productStorageEvent, syncLocal);
    };
  }, [mode, sync]);

  const sortedProducts = useMemo(
    () =>
      [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [products]
  );

  const addProduct = useCallback(
    async (product: ProductInput): Promise<MutationResult> => {
      if (mode === "supabase") {
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(product),
        });
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
        };

        if (!response.ok) {
          return {
            ok: false,
            message: payload.error || "Could not add product.",
          };
        }

        await sync();
        return { ok: true };
      }

      const nextProduct = localProductFromInput(product);
      const nextProducts = [nextProduct, ...readProducts()];
      writeProducts(nextProducts);
      setProducts(nextProducts);
      return { ok: true };
    },
    [mode, sync]
  );

  const updateProduct = useCallback(
    async (
      productId: string,
      product: ProductInput
    ): Promise<MutationResult> => {
      if (mode === "supabase") {
        const response = await fetch(`/api/products/${productId}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(product),
        });
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
        };

        if (!response.ok) {
          return {
            ok: false,
            message: payload.error || "Could not update product.",
          };
        }

        await sync();
        return { ok: true };
      }

      const storedProducts = readProducts();
      const existingProduct = storedProducts.find(
        (item) => item.id === productId
      );

      if (!existingProduct) {
        return { ok: false, message: "Product not found." };
      }

      const nextProducts = storedProducts.map((item) =>
        item.id === productId
          ? {
              ...item,
              ...product,
              slug: item.slug,
              images: product.images || item.images,
            }
          : item
      );

      writeProducts(nextProducts);
      setProducts(nextProducts);
      return { ok: true };
    },
    [mode, sync]
  );

  const deleteProduct = useCallback(
    async (productId: string): Promise<MutationResult> => {
      if (mode === "supabase") {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });
        const payload = (await response.json().catch(() => ({}))) as {
          error?: string;
        };

        if (!response.ok) {
          return {
            ok: false,
            message: payload.error || "Could not delete product.",
          };
        }

        await sync();
        return { ok: true };
      }

      const nextProducts = readProducts().filter(
        (product) => product.id !== productId
      );
      writeProducts(nextProducts);
      setProducts(nextProducts);
      return { ok: true };
    },
    [mode, sync]
  );

  return {
    loaded,
    mode,
    error,
    products: sortedProducts,
    reloadProducts: sync,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
