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
    <footer className="bg-emerald-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[minmax(220px,0.7fr)_minmax(0,1.3fr)] lg:items-end">
        <div>
          <p className="font-black uppercase tracking-normal">{businessName}</p>
          <p className="mt-1 text-sm font-semibold text-emerald-200">
            {businessTagline}
          </p>
        </div>

        <div className="grid gap-5">
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-3 text-sm font-bold sm:flex sm:justify-end sm:gap-6"
          >
            <Link href="/" className="hover:text-emerald-200">
              Home
            </Link>
            <Link href="/products" className="hover:text-emerald-200">
              All Products
            </Link>
          </nav>

          <div className="grid gap-2 sm:grid-cols-3">
            {contactNumbers.map((contact) => (
              <a
                key={contact.name}
                href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-md border border-emerald-700 bg-emerald-900 px-3 text-sm font-bold transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
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
              className="inline-flex h-11 min-w-0 items-center justify-center gap-2 rounded-md border border-emerald-700 bg-emerald-900 px-3 text-sm font-bold transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-950"
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
