import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import {
  businessName,
  businessTagline,
  contactNumbers,
  facebookPageUrl,
  instagramPageUrl,
  locationAddress,
} from "../seo";
import { BackToTopButton } from "./BackToTopButton";

const whatsappMessage = encodeURIComponent(
  "Hello Mustafa Canvas, I want to ask about your products."
);

export function Footer() {
  return (
    <footer className="border-t border-forest-100 bg-canvas-50/70 px-4 py-14 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-block font-display text-2xl font-extrabold tracking-tight text-forest-950 hover:text-forest-700 transition-colors"
            >
              Mustafa <span className="text-forest-700">Canvas</span>
            </Link>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-forest-700">
              {businessTagline}
            </p>
            <p className="mt-3 text-xs font-normal leading-relaxed text-slate-500">
              {locationAddress}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between lg:gap-14">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-wider text-forest-950">
                Navigation
              </p>
              <nav aria-label="Footer navigation" className="mt-4 flex flex-col gap-2.5 text-xs font-semibold">
                <Link href="/" className="text-slate-600 transition hover:text-forest-900">
                  Home
                </Link>
                <Link href="/products" className="text-slate-600 transition hover:text-forest-900">
                  All Products
                </Link>
                <Link href="/#solutions" className="text-slate-600 transition hover:text-forest-900">
                  Applications &amp; Solutions
                </Link>
                <Link href="/#contact" className="text-slate-600 transition hover:text-forest-900">
                  Contact &amp; Wholesale
                </Link>
              </nav>
            </div>

            <div>
              <p className="font-display text-xs font-bold uppercase tracking-wider text-forest-950">
                Direct Contact
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {contactNumbers.map((contact) => (
                  <a
                    key={contact.name}
                    href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-forest-200/80 bg-white px-3.5 text-xs font-semibold text-forest-950 shadow-sm transition hover:bg-forest-50 hover:border-forest-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
                    aria-label={`Message ${contact.name} on WhatsApp`}
                  >
                    <FaWhatsapp size={15} className="shrink-0 text-[#25d366]" aria-hidden />
                    <span>WhatsApp {contact.name}</span>
                  </a>
                ))}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={instagramPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-forest-200/80 bg-white px-3 text-xs font-semibold text-forest-950 shadow-sm transition hover:bg-forest-50"
                  >
                    <FaInstagram size={14} className="text-pink-600" aria-hidden />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={facebookPageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-forest-200/80 bg-white px-3 text-xs font-semibold text-forest-950 shadow-sm transition hover:bg-forest-50"
                  >
                    <FaFacebookF size={13} className="text-[#1877f2]" aria-hidden />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-forest-200/60 pt-6 text-xs font-normal text-slate-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
}
