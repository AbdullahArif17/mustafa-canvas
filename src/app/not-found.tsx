import Link from "next/link";
import { ArrowLeft, Home, PackageSearch } from "lucide-react";
import { Header } from "./components/Header";
import { imageQuality, siteLogo, siteNavItems } from "./site-config";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col bg-white text-slate-950">
      <Header
        logo={siteLogo}
        navItems={siteNavItems}
        imageQuality={imageQuality}
      />

      <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg rounded-3xl border border-forest-100 bg-canvas-50/60 p-8 sm:p-12 text-center doppelrand-card">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-50 text-forest-800 ring-1 ring-forest-200/80">
            <PackageSearch size={32} aria-hidden />
          </div>

          <span className="mt-5 inline-flex items-center rounded-full border border-forest-200/80 bg-white px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-forest-800">
            Error 404
          </span>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">
            Page Not Found
          </h1>

          <p className="mt-3 text-sm font-normal leading-relaxed text-slate-600 sm:text-base">
            The page or product you requested could not be found. It may have been renamed, moved, or is temporarily unavailable.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-forest-900 px-6 text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-forest-800 active:scale-95"
            >
              <Home size={15} aria-hidden />
              <span>Back To Home</span>
            </Link>

            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-forest-200 bg-white px-6 text-xs font-semibold tracking-wide text-forest-900 transition-all hover:bg-forest-50 active:scale-95"
            >
              <ArrowLeft size={15} aria-hidden />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

