"use client";

import { usePathname } from "next/navigation";
import { contactNumbers } from "../seo";

// Primary official line: Mustafa from the official business card
const primaryWhatsApp =
  contactNumbers.find((c) => c.name.toLowerCase() === "mustafa")?.whatsapp ||
  "923108117857";

const whatsappUrl = `https://wa.me/${primaryWhatsApp}?text=${encodeURIComponent(
  "Hello Mustafa Canvas, I want to inquire about your products."
)}`;

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <aside aria-label="WhatsApp quick contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Mustafa Canvas on WhatsApp"
        className="group fixed bottom-4 right-4 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] hover:shadow-2xl hover:shadow-[#25D366]/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
      >
        {/* Subtle active status pulse */}
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
        </span>

        {/* Official Standard WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 sm:h-8 sm:w-8 fill-current transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <path d="M16.002 0C7.164 0 0 7.164 0 16.002c0 2.82.738 5.568 2.14 7.994L.138 31.862l8.077-1.956a15.938 15.938 0 0 0 7.787 2.016h.007c8.835 0 16-7.164 16-16.002 0-4.275-1.666-8.294-4.69-11.319C24.295 1.666 20.276 0 16.002 0zm0 29.288h-.006a13.25 13.25 0 0 1-6.75-1.854l-.484-.287-5.018 1.216 1.34-4.887-.315-.502a13.25 13.25 0 0 1-2.032-7.072C2.737 8.687 8.687 2.737 16.002 2.737c3.542 0 6.87 1.38 9.375 3.885 2.505 2.505 3.885 5.834 3.885 9.377 0 7.316-5.95 13.289-13.26 13.289zm7.283-9.948c-.398-.2-2.357-1.163-2.723-1.296-.367-.133-.634-.2-.9.2-.267.399-1.033 1.296-1.267 1.562-.233.267-.467.3-.866.1-.4-.2-1.688-.622-3.216-1.984-1.188-1.06-1.99-2.368-2.223-2.767-.233-.4-.025-.616.175-.815.18-.18.4-.467.6-.7.2-.234.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.966-.325-.78-.655-.674-.9-.686-.233-.012-.5-.015-.766-.015-.267 0-.7.1-1.066.5-.367.4-1.4 1.367-1.4 3.333s1.433 3.867 1.633 4.133c.2.267 2.82 4.306 6.833 6.037.955.412 1.7.658 2.28.843.958.305 1.83.262 2.518.159.767-.115 2.357-.964 2.69-1.895.333-.931.333-1.73.233-1.896-.1-.166-.366-.266-.766-.466z" />
        </svg>

        {/* Standard Floating Tooltip on Hover */}
        <span className="pointer-events-none absolute right-16 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/10 bg-forest-950/95 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-xl backdrop-blur transition-opacity duration-200 group-hover:opacity-100 sm:block">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
}
