"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, PackagePlus, Pause, Play } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { useProducts } from "./useProducts";

const slideshowDelayMs = 7000;

export function ProductShowcase() {
  const { loaded, products } = useProducts();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const visibleProducts = useMemo(() => products.slice(0, 8), [products]);
  const activeProduct = visibleProducts[activeIndex];

  useEffect(() => {
    if (activeIndex >= visibleProducts.length && visibleProducts.length > 0) {
      setActiveIndex(0);
    }
  }, [activeIndex, visibleProducts.length]);

  useEffect(() => {
    if (visibleProducts.length < 2 || isPaused) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % visibleProducts.length);
    }, slideshowDelayMs);

    return () => window.clearTimeout(timer);
  }, [activeIndex, visibleProducts.length, isPaused]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        move(1); // Swiped left -> next
      } else {
        move(-1); // Swiped right -> prev
      }
    }
    touchStartX.current = null;
  };

  return (
    <section id="catalog" className="relative overflow-hidden bg-emerald-50/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 ring-1 ring-emerald-300/60">
              Live Showcase
            </div>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl">
              Featured Products
            </h2>
          </div>
          <div>
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-emerald-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              <span>View Full Catalog</span>
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>

        {!loaded ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <ProductCardSkeleton />
            <div className="hidden h-96 rounded-xl bg-white p-5 shadow-sm ring-1 ring-emerald-100 lg:block animate-shimmer" />
          </div>
        ) : activeProduct ? (
          <div
            className="grid gap-6 lg:grid-cols-[1fr_360px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              key={activeProduct.id}
              className="product-slide-enter min-w-0"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <ProductCard product={activeProduct} />
            </div>

            <aside className="flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm ring-1 ring-emerald-100/80">
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-emerald-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-900">
                      Product {activeIndex + 1} of {visibleProducts.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPaused(!isPaused)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-emerald-700 hover:bg-emerald-50"
                      aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
                      title={isPaused ? "Resume autoplay" : "Pause autoplay"}
                    >
                      {isPaused ? <Play size={13} /> : <Pause size={13} />}
                    </button>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => move(-1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 text-emerald-900 transition hover:bg-emerald-50 active:scale-95"
                      aria-label="Previous product"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(1)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 text-emerald-900 transition hover:bg-emerald-50 active:scale-95"
                      aria-label="Next product"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                {visibleProducts.length > 1 && (
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-emerald-100">
                    <span
                      key={`${activeProduct.id}-${isPaused ? "paused" : "running"}`}
                      className={`product-slide-progress block h-full bg-emerald-700 ${isPaused ? "opacity-40" : ""}`}
                      style={{
                        animationDuration: `${slideshowDelayMs}ms`,
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                    />
                  </div>
                )}

                <div className="mt-4 grid max-h-[340px] gap-2 overflow-y-auto pr-1">
                  {visibleProducts.map((product, index) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-xs font-bold uppercase tracking-wider transition-all ${
                        index === activeIndex
                          ? "bg-emerald-700 text-white shadow-sm"
                          : "bg-emerald-50/70 text-slate-800 hover:bg-emerald-100"
                      }`}
                    >
                      <span className="truncate">{product.title}</span>
                      {index === activeIndex && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-emerald-100 text-center text-xs font-semibold text-slate-500">
                Swipe or select to inspect products
              </div>
            </aside>
          </div>
        ) : (
          <div className="rounded-xl bg-white p-8 text-center ring-1 ring-emerald-100">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <PackagePlus size={28} />
            </div>
            <h3 className="mt-4 text-lg font-black uppercase tracking-tight text-slate-950">
              No products found in catalog
            </h3>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Products added via the Admin Portal will automatically appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
