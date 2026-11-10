"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, PackagePlus, RotateCcw, Search, Sparkles, X } from "lucide-react";
import { type Product, type ProductKind } from "../product-data";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { useProducts } from "./useProducts";

type FilterKind = "all" | ProductKind;
type SortOption = "newest" | "title-asc" | "title-desc";

type ProductsCatalogProps = {
  initialProducts?: Product[];
};

const filterTabs: { kind: FilterKind; label: string }[] = [
  { kind: "all", label: "All Products" },
  { kind: "net", label: "Shade Nets" },
  { kind: "plastic", label: "Plastic & PVC" },
  { kind: "other", label: "Canvas & Other" },
];

export function ProductsCatalog({ initialProducts }: ProductsCatalogProps) {
  const { loaded, products } = useProducts(initialProducts);
  const [filter, setFilter] = useState<FilterKind>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const counts = useMemo(() => {
    return {
      all: products.length,
      net: products.filter((p) => p.kind === "net").length,
      plastic: products.filter((p) => p.kind === "plastic").length,
      other: products.filter((p) => p.kind === "other").length,
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (filter !== "all") {
      result = result.filter((product) => product.kind === filter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.company?.toLowerCase().includes(q) ||
          product.color?.toLowerCase().includes(q)
      );
    }

    return [...result].sort((a, b) => {
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filter, products, searchQuery, sortBy]);

  const resetFilters = () => {
    setFilter("all");
    setSearchQuery("");
    setSortBy("newest");
  };

  return (
    <section className="bg-white py-10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 flex flex-col gap-3.5 border-b border-forest-100/80 pb-6 sm:pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-forest-50/70 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-800">
              <Sparkles size={13} className="text-brass-600" />
              <span>Fabric Catalog</span>
            </div>
            <h1 className="mt-3 font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-forest-950">
              All Fabric Products
            </h1>
            <p className="mt-2 text-xs sm:text-sm font-normal text-slate-600">
              Explore our comprehensive range of industrial shade nets, canvas, and tarpaulins.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Showing <strong className="text-forest-950">{filteredProducts.length}</strong> of {products.length} products</span>
          </div>
        </div>

        {/* Filters, Search & Sort Bar */}
        <div className="mb-8 sm:mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {filterTabs.map(({ kind, label }) => {
              const count = counts[kind];
              const isSelected = filter === kind;
              return (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setFilter(kind)}
                  className={`inline-flex h-9 sm:h-10 shrink-0 whitespace-nowrap items-center gap-2 rounded-full px-3.5 sm:px-4 text-xs font-semibold tracking-wide transition-all active:scale-95 ${
                    isSelected
                      ? "bg-forest-900 text-white shadow-sm ring-1 ring-forest-900"
                      : "border border-forest-200/80 bg-white text-forest-950 hover:bg-forest-50 hover:border-forest-300"
                  }`}
                >
                  <span>{label}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-forest-100/70 text-forest-800"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="h-10 w-full rounded-full border border-forest-200/90 bg-white pl-10 pr-9 text-xs font-medium text-slate-900 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-100"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative flex w-full items-center sm:w-auto">
              <ArrowUpDown
                size={14}
                className="pointer-events-none absolute left-3.5 text-slate-400"
                aria-hidden
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-10 w-full rounded-full border border-forest-200/90 bg-white pl-9 pr-8 text-xs font-semibold tracking-wide text-slate-700 outline-none transition hover:border-forest-300 focus:border-forest-700 focus:ring-2 focus:ring-forest-100 sm:w-auto"
              >
                <option value="newest">Newest First</option>
                <option value="title-asc">Name: A to Z</option>
                <option value="title-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid / Skeletons / Empty State */}
        {!loaded ? (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        ) : filteredProducts.length ? (
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-forest-200 bg-canvas-50/60 p-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-100/70 text-forest-800">
              <PackagePlus size={26} />
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-slate-900">
              No products found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {searchQuery
                ? `No products matched "${searchQuery}". Try a different keyword.`
                : "No products currently available in this category."}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-forest-900 px-5 text-xs font-semibold tracking-wide text-white transition hover:bg-forest-800"
            >
              <RotateCcw size={14} />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
