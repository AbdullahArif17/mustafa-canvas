"use client";

import { useMemo, useState } from "react";
import { PackagePlus } from "lucide-react";
import { type ProductKind } from "../product-data";
import { ProductCard } from "./ProductCard";
import { useProducts } from "./useProducts";

type FilterKind = "all" | ProductKind;

export function ProductsCatalog() {
  const { loaded, products } = useProducts();
  const [filter, setFilter] = useState<FilterKind>("all");

  const filteredProducts = useMemo(() => {
    if (filter === "all") {
      return products;
    }

    return products.filter((product) => product.kind === filter);
  }, [filter, products]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
              Products
            </p>
            <h1 className="mt-2 text-4xl font-black uppercase tracking-normal text-slate-950 sm:text-5xl">
              All Products
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            {(["all", "net", "plastic", "other"] as FilterKind[]).map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => setFilter(kind)}
                className={`h-11 rounded-md px-4 text-sm font-bold uppercase tracking-normal ${
                  filter === kind
                    ? "bg-emerald-700 text-white"
                    : "border border-emerald-200 text-emerald-900 hover:bg-emerald-50"
                }`}
              >
                {kind}
              </button>
            ))}
          </div>
        </div>

        {!loaded ? (
          <div className="rounded-md bg-emerald-50 p-6 text-sm font-bold text-slate-700">
            Loading products...
          </div>
        ) : filteredProducts.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-md bg-emerald-50 p-6">
            <div className="flex items-start gap-4">
              <PackagePlus className="mt-1 shrink-0 text-emerald-700" />
              <div>
                <h2 className="text-lg font-black uppercase tracking-normal text-slate-950">
                  No products found
                </h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
