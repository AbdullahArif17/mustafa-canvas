import Link from "next/link";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import {
  businessName,
  businessTagline,
  contactNumbers,
  facebookPageUrl,
} from "../seo";

const whatsappMessage = encodeURIComponent(
  "Hello Mustafa Canvas, I want to ask about your products."
);

export function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
        <div>
          <p className="font-black uppercase tracking-normal">{businessName}</p>
          <p className="mt-1 text-sm font-semibold text-emerald-700">
            {businessTagline}
          </p>
        </div>

        <div className="grid w-full justify-items-center gap-4 lg:w-auto lg:justify-items-end">
          <nav
            aria-label="Footer navigation"
            className="flex items-center justify-center gap-6 text-sm font-bold"
          >
            <Link href="/" className="hover:text-emerald-700">
              Home
            </Link>
            <Link href="/products" className="hover:text-emerald-700">
              All Products
            </Link>
          </nav>

          <div className="grid w-full max-w-sm gap-2 sm:max-w-2xl sm:grid-cols-3 lg:w-auto lg:max-w-none">
            {contactNumbers.map((contact) => (
              <a
                key={contact.name}
                href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 text-sm font-bold text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                aria-label={`Message ${contact.name} on WhatsApp`}
              >
                <FaWhatsapp
                  size={18}
                  className="shrink-0 text-[#25d366]"
                  aria-hidden
                />
                <span className="truncate">WhatsApp {contact.name}</span>
              </a>
            ))}
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 text-sm font-bold text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              <FaFacebookF
                size={16}
                className="shrink-0 text-[#1877f2]"
                aria-hidden
              />
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
