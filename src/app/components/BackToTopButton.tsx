"use client";

import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-forest-200/90 bg-white px-3.5 text-xs font-semibold text-forest-900 shadow-sm transition-all hover:bg-forest-50 hover:border-forest-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
      aria-label="Back to top of page"
    >
      <ArrowUp size={13} aria-hidden />
      <span>Back to top</span>
    </button>
  );
}
