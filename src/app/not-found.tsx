import Link from "next/link";
import { ArrowLeft, Home, PackageSearch } from "lucide-react";
import { Header } from "./components/Header";
import { imageQuality, siteLogo, siteNavItems } from "./site-config";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-950">
      <Header
        logo={siteLogo}
        navItems={siteNavItems}
        imageQuality={imageQuality}
      />

      <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
            <PackageSearch size={40} aria-hidden />
          </div>

          <span className="mt-6 inline-flex items-center rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-800">
            Error 404
          </span>

          <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl">
            Page Not Found
          </h1>

          <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600 sm:text-base">
            The page or product you requested could not be found. It may have been renamed, moved, or is temporarily unavailable.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 text-xs font-black uppercase tracking-wider text-white shadow-sm transition-all hover:bg-emerald-800 active:scale-95"
            >
              <Home size={16} aria-hidden />
              <span>Back To Home</span>
            </Link>

            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-emerald-700 bg-white px-6 text-xs font-black uppercase tracking-wider text-emerald-800 transition-all hover:bg-emerald-50 active:scale-95"
            >
              <ArrowLeft size={16} aria-hidden />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

