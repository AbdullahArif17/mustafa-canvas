"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, PackagePlus } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useProducts } from "./useProducts";

export function ProductShowcase() {
  const { loaded, products } = useProducts();
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleProducts = useMemo(() => products.slice(0, 8), [products]);
  const activeProduct = visibleProducts[activeIndex];

  useEffect(() => {
    if (activeIndex >= visibleProducts.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, visibleProducts.length]);

  useEffect(() => {
    if (visibleProducts.length < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % visibleProducts.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [visibleProducts.length]);

  const move = (direction: -1 | 1) => {
    if (!visibleProducts.length) {
      return;
    }

    setActiveIndex((index) => {
      const nextIndex = index + direction;
      if (nextIndex < 0) {
        return visibleProducts.length - 1;
      }

      return nextIndex % visibleProducts.length;
    });
  };

  return (
    <section id="catalog" className="bg-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
              Product Catalog
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-normal text-slate-950 sm:text-4xl">
              Latest Products
            </h2>
          </div>
          <div>
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-700 px-5 text-sm font-bold uppercase tracking-normal text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              View All
            </Link>
          </div>
        </div>

        {!loaded ? (
          <div className="rounded-md bg-white p-6 text-sm font-bold text-slate-700 ring-1 ring-emerald-100">
            Loading products...
          </div>
        ) : activeProduct ? (
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <ProductCard product={activeProduct} />

            <aside className="rounded-md bg-white p-5 shadow-sm ring-1 ring-emerald-100">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black uppercase tracking-normal text-emerald-800">
                  Slideshow
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => move(-1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-emerald-200 text-emerald-900 hover:bg-emerald-50"
                    aria-label="Previous product"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-emerald-200 text-emerald-900 hover:bg-emerald-50"
                    aria-label="Next product"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {visibleProducts.map((product, index) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-md px-4 py-3 text-left text-sm font-bold transition ${
                      index === activeIndex
                        ? "bg-emerald-700 text-white"
                        : "bg-emerald-50 text-slate-900 hover:bg-emerald-100"
                    }`}
                  >
                    {product.title}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        ) : (
          <div className="rounded-md bg-white p-6 ring-1 ring-emerald-100">
            <div className="flex items-start gap-4">
              <PackagePlus className="mt-1 shrink-0 text-emerald-700" />
              <div>
                <h3 className="text-lg font-black uppercase tracking-normal text-slate-950">
                  Catalog is empty
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
