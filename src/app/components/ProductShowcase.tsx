"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Package,
  PackagePlus,
  Palette,
  Pause,
  Phone,
  Play,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  Weight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  productKindLabel,
  productMainImage,
  productSpecs,
} from "../product-data";
import { contactNumbers } from "../seo";
import { useProducts } from "./useProducts";

const slideshowDelayMs = 7000;

export function ProductShowcase() {
  const { loaded, products } = useProducts();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const visibleProducts = useMemo(() => products.slice(0, 8), [products]);
  const activeProduct = visibleProducts[activeIndex];

  // Reset selected image index when switching products
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [activeIndex]);

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

  const activeImage =
    activeProduct?.images[selectedImageIndex] ||
    (activeProduct ? productMainImage(activeProduct) : undefined);

  const primaryPhone = contactNumbers[0]?.display || "0310-8117857";
  const primaryWhatsapp = contactNumbers[0]?.whatsapp || "923108117857";

  return (
    <section id="catalog" className="relative overflow-hidden bg-canvas-50/70 py-12 sm:py-20 lg:py-24 border-y border-forest-100/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-white px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-800 shadow-sm">
              <Sparkles size={13} className="text-brass-600" aria-hidden />
              <span>Live Showcase</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">
              Featured Fabric Innovations
            </h2>
            <p className="mt-2 text-sm font-normal text-slate-600 max-w-2xl">
              Explore our highest-demand UV shade netting, authentic Haripur nets, waterproof canvas, and master rolls.
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

        {/* Loading Skeletons */}
        {!loaded ? (
          <div className="rounded-3xl border border-forest-100/80 bg-white p-6 sm:p-8 lg:p-10 shadow-sm animate-shimmer">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 aspect-[4/3] rounded-2xl bg-canvas-100/60" />
              <div className="lg:col-span-5 space-y-4">
                <div className="h-6 w-32 rounded-full bg-canvas-100" />
                <div className="h-10 w-3/4 rounded-xl bg-canvas-100" />
                <div className="h-20 w-full rounded-xl bg-canvas-100" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-16 rounded-xl bg-canvas-100" />
                  <div className="h-16 rounded-xl bg-canvas-100" />
                </div>
              </div>
            </div>
          </div>
        ) : activeProduct ? (
          /* Active Featured Product Stage */
          <div
            className="rounded-2xl sm:rounded-3xl border border-forest-100/80 bg-white p-4 sm:p-8 lg:p-10 shadow-sm transition-all duration-300 hover:shadow-md"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Left Column: Product Photography Display (7 cols on lg) */}
              <div className="lg:col-span-7 space-y-4 min-w-0">
                <div className="group/stage relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-2xl bg-canvas-100/50 shadow-inner">
                  {activeImage ? (
                    <img
                      src={activeImage.url}
                      alt={activeImage.alt || activeProduct.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/stage:scale-103"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-forest-900/5 text-slate-400">
                      <Package size={48} />
                    </div>
                  )}

                  {/* Floating Status Badges */}
                  <div className="absolute left-3.5 top-3.5 flex flex-wrap items-center gap-2 sm:left-4 sm:top-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-950/85 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur shadow-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-brass-400" />
                      {productKindLabel(activeProduct.kind)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-forest-950 backdrop-blur shadow-md border border-forest-100/80">
                      Wholesale Master Rolls
                    </span>
                  </div>

                  {/* Gradient shadow scrim at bottom */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-forest-950/20 to-transparent" />
                </div>

                {/* Gallery Thumbnails (if multiple images exist for this product) */}
                {activeProduct.images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
                    {activeProduct.images.map((img, idx) => (
                      <button
                        key={`${img.url}-${idx}`}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative h-14 w-16 sm:h-16 sm:w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                          selectedImageIndex === idx
                            ? "border-forest-700 ring-2 ring-forest-700/20 scale-[1.02]"
                            : "border-transparent opacity-65 hover:opacity-100"
                        }`}
                        title={img.alt || `View image ${idx + 1}`}
                      >
                        <img
                          src={img.url}
                          alt={img.alt || activeProduct.title}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Structured Specs & Commercial Actions (5 cols on lg) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6 min-w-0">
                <div>
                  {/* Category Eyebrow & Live Color Swatch */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 border border-forest-200/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-forest-800">
                      <Sparkles size={11} className="text-brass-600" />
                      <span>Featured Product</span>
                    </span>

                    {activeProduct.color && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span>Color:</span>
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-forest-200 shadow-sm"
                          style={{ backgroundColor: activeProduct.color }}
                          title={`Color: ${activeProduct.color}`}
                        />
                        <span className="font-semibold text-slate-700">{activeProduct.color}</span>
                      </div>
                    )}
                  </div>

                  {/* Product Title */}
                  <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-forest-950 sm:text-3xl">
                    <Link
                      href={`/products/${activeProduct.slug}`}
                      className="transition-colors hover:text-forest-700"
                    >
                      {activeProduct.title}
                    </Link>
                  </h3>

                  {/* Product Description */}
                  <p className="mt-3 text-xs sm:text-sm font-normal leading-relaxed text-slate-600 line-clamp-3">
                    {activeProduct.description}
                  </p>

                  {/* 2x2 Specifications Grid */}
                  <div className="mt-5 grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl border border-forest-100/90 bg-canvas-50/70 p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-forest-700">
                        <Building2 size={12} />
                        <span>Origin / Mill</span>
                      </div>
                      <p className="mt-1 text-xs font-bold text-slate-900 truncate">
                        {activeProduct.company || "Haripur / Karachi"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-forest-100/90 bg-canvas-50/70 p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-forest-700">
                        <Ruler size={12} />
                        <span>Dimensions</span>
                      </div>
                      <p className="mt-1 text-xs font-bold text-slate-900 truncate">
                        {activeProduct.lengthFeet || activeProduct.widthFeet
                          ? `${activeProduct.lengthFeet || "Standard"} ft × ${activeProduct.widthFeet || "Standard"} ft`
                          : "50m & 100m Rolls"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-forest-100/90 bg-canvas-50/70 p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-forest-700">
                        <Weight size={12} />
                        <span>Density & Weight</span>
                      </div>
                      <p className="mt-1 text-xs font-bold text-slate-900 truncate">
                        {activeProduct.weight || "Heavy Tensile Knot"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-forest-100/90 bg-canvas-50/70 p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-forest-700">
                        <ShieldCheck size={12} />
                        <span>Supply Format</span>
                      </div>
                      <p className="mt-1 text-xs font-bold text-slate-900 truncate">
                        {activeProduct.size || "Complete Wholesale Rolls"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Commercial Actions: Direct WhatsApp & Details Link */}
                <div className="space-y-2.5 pt-1">
                  <a
                    href={`https://wa.me/${primaryWhatsapp}?text=Hello%20Mustafa%20Canvas%2C%20I%20am%20inquiring%20about%20the%20wholesale%20rate%20for%20${encodeURIComponent(activeProduct.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 text-xs font-bold tracking-wide text-white shadow-md shadow-[#25d366]/20 transition-all hover:bg-[#20ba59] active:scale-[0.98]"
                  >
                    <FaWhatsapp size={16} />
                    <span>Inquire Wholesale Rate on WhatsApp</span>
                  </a>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Link
                      href={`/products/${activeProduct.slug}`}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-forest-200/90 bg-white px-4 text-xs font-semibold text-forest-900 shadow-sm transition hover:bg-forest-50"
                    >
                      <span>Full Specifications</span>
                      <ArrowRight size={13} />
                    </Link>

                    <a
                      href={`tel:${primaryPhone.replace(/[^0-9]/g, "")}`}
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-forest-200/90 bg-white px-4 text-xs font-semibold text-forest-900 shadow-sm transition hover:bg-forest-50"
                      title={`Call ${primaryPhone}`}
                    >
                      <Phone size={13} className="text-forest-700" />
                      <span>{primaryPhone}</span>
                    </a>
                  </div>
                </div>

                {/* Symmetrical Bottom Bar: Product Switcher or Wholesale Guarantees */}
                {visibleProducts.length > 1 ? (
                  <div className="border-t border-forest-100/90 pt-4">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-forest-950">
                          Item {activeIndex + 1} <span className="text-slate-400 font-normal">of</span> {visibleProducts.length}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsPaused(!isPaused)}
                          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-forest-700 hover:bg-forest-50 transition-colors"
                          aria-label={isPaused ? "Resume autoplay" : "Pause autoplay"}
                          title={isPaused ? "Resume autoplay" : "Pause autoplay"}
                        >
                          {isPaused ? <Play size={10} /> : <Pause size={10} />}
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => move(-1)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-forest-200 text-forest-900 transition hover:bg-forest-50 active:scale-95"
                          aria-label="Previous product"
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(1)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-forest-200 text-forest-900 transition hover:bg-forest-50 active:scale-95"
                          aria-label="Next product"
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1 overflow-hidden rounded-full bg-forest-100/80 mb-3">
                      <span
                        key={`${activeProduct.id}-${isPaused ? "paused" : "running"}`}
                        className={`product-slide-progress block h-full bg-brass-500 ${isPaused ? "opacity-40" : ""}`}
                        style={{
                          animationDuration: `${slideshowDelayMs}ms`,
                          animationPlayState: isPaused ? "paused" : "running",
                        }}
                      />
                    </div>

                    {/* Horizontal Product Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                      {visibleProducts.map((p, idx) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          className={`shrink-0 whitespace-nowrap rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-all ${
                            idx === activeIndex
                              ? "bg-forest-900 text-white shadow-sm"
                              : "bg-canvas-100/60 text-slate-700 hover:bg-forest-50 hover:text-forest-950"
                          }`}
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* When 1 product exists: Symmetrical Trust & Assurance Bar (Never empty!) */
                  <div className="border-t border-forest-100/80 pt-4 grid grid-cols-2 gap-3 text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-50 text-forest-800 shrink-0">
                        <ShieldCheck size={14} />
                      </div>
                      <span>Direct Khori Garden Rates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-50 text-forest-800 shrink-0">
                        <Truck size={14} />
                      </div>
                      <span>Pakistan-Wide Freight Dispatch</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Empty Catalog State */
          <div className="rounded-3xl border border-forest-100 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-50 text-forest-700">
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
