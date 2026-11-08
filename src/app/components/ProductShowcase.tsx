"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, PackagePlus, Pause, Play, Sparkles } from "lucide-react";
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
        move(1);
      } else {
        move(-1);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section id="catalog" className="relative overflow-hidden bg-canvas-50/70 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-white px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-800 shadow-sm">
              <Sparkles size={13} className="text-brass-600" aria-hidden />
              <span>Live Showcase</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-forest-950 sm:text-4xl">
              Featured Fabric Innovations
            </h2>
            <p className="mt-2 text-sm font-normal text-slate-600">
              Explore our highest-demand UV shade netting, vinyl tarpaulins, and custom canvas products.
            </p>
          </div>
          <div>
            <Link
              href="/products"
              className="group inline-flex h-11 items-center justify-between gap-3 rounded-full bg-forest-900 pl-5 pr-2 text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
            >
              <span>View Full Catalog</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight size={13} aria-hidden />
              </span>
            </Link>
          </div>
        </div>

        {!loaded ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <ProductCardSkeleton />
            <div className="hidden h-96 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest-100 lg:block animate-shimmer" />
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

            <aside className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100 doppelrand-card">
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-forest-100/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-forest-950">
                      Item {activeIndex + 1} <span className="text-slate-400 font-normal">of</span> {visibleProducts.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPaused(!isPaused)}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-forest-700 hover:bg-forest-50 transition-colors"
                      aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
                      title={isPaused ? "Resume autoplay" : "Pause autoplay"}
                    >
                      {isPaused ? <Play size={12} /> : <Pause size={12} />}
                    </button>
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => move(-1)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-forest-200 text-forest-900 transition hover:bg-forest-50 active:scale-95"
                      aria-label="Previous product"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(1)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-forest-200 text-forest-900 transition hover:bg-forest-50 active:scale-95"
                      aria-label="Next product"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {visibleProducts.length > 1 && (
                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-forest-100/80">
                    <span
                      key={`${activeProduct.id}-${isPaused ? "paused" : "running"}`}
                      className={`product-slide-progress block h-full bg-brass-500 ${isPaused ? "opacity-40" : ""}`}
                      style={{
                        animationDuration: `${slideshowDelayMs}ms`,
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                    />
                  </div>
                )}

                <div className="mt-4 grid max-h-[340px] gap-1.5 overflow-y-auto pr-1">
                  {visibleProducts.map((product, index) => (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-all ${
                        index === activeIndex
                          ? "bg-forest-900 text-white shadow-sm"
                          : "bg-canvas-50 text-slate-700 hover:bg-forest-50 hover:text-forest-950"
                      }`}
                    >
                      <span className="truncate">{product.title}</span>
                      {index === activeIndex && (
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brass-400 ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-forest-100/80 pt-4 text-center text-xs font-medium text-slate-400">
                Swipe or select to inspect products
              </div>
            </aside>
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-forest-100 doppelrand-card">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest-50 text-forest-700">
              <PackagePlus size={26} />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
              No products found in catalog
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Products added via the Admin Portal will automatically appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
