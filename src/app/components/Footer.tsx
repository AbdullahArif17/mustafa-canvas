import Link from "next/link";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import {
  businessName,
  businessTagline,
  contactNumbers,
  facebookPageUrl,
  locationAddress,
} from "../seo";
import { BackToTopButton } from "./BackToTopButton";

const whatsappMessage = encodeURIComponent(
  "Hello Mustafa Canvas, I want to ask about your products."
);

export function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white px-4 py-10 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Link href="/" className="inline-block text-xl font-black uppercase tracking-tight text-slate-950 hover:text-emerald-800">
              {businessName}
            </Link>
            <p className="mt-1 text-sm font-semibold text-emerald-700">
              {businessTagline}
            </p>
            <p className="mt-3 text-xs font-medium leading-relaxed text-slate-600">
              {locationAddress}
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between lg:gap-12">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-emerald-900">
                Navigation
              </p>
              <nav aria-label="Footer navigation" className="mt-3 flex flex-col gap-2.5 text-sm font-bold">
                <Link href="/" className="text-slate-600 transition hover:text-emerald-700">
                  Home
                </Link>
                <Link href="/products" className="text-slate-600 transition hover:text-emerald-700">
                  All Products
                </Link>
                <Link href="/#solutions" className="text-slate-600 transition hover:text-emerald-700">
                  Solutions
                </Link>
                <Link href="/#contact" className="text-slate-600 transition hover:text-emerald-700">
                  Contact
                </Link>
                <Link href="/admin" className="text-xs font-semibold text-slate-400 transition hover:text-slate-600">
                  Admin Portal
                </Link>
              </nav>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-wider text-emerald-900">
                Quick Connect
              </p>
              <div className="mt-3 flex flex-col gap-2">
                {contactNumbers.map((contact) => (
                  <a
                    key={contact.name}
                    href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center gap-2 rounded-lg border border-emerald-200/90 bg-emerald-50/70 px-3.5 text-xs font-bold text-emerald-950 transition hover:bg-emerald-100 hover:border-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                    aria-label={`Message ${contact.name} on WhatsApp`}
                  >
                    <FaWhatsapp size={16} className="shrink-0 text-[#25d366]" aria-hidden />
                    <span>WhatsApp {contact.name}</span>
                  </a>
                ))}
                <a
                  href={facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-emerald-200/90 bg-emerald-50/70 px-3.5 text-xs font-bold text-emerald-950 transition hover:bg-emerald-100 hover:border-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                >
                  <FaFacebookF size={15} className="shrink-0 text-[#1877f2]" aria-hidden />
                  <span>Facebook Page</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-emerald-100 pt-6 text-xs font-semibold text-slate-500 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
}
