import Link from "next/link";
import { ExternalLink, MessageCircle } from "lucide-react";
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
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-black uppercase tracking-normal">{businessName}</p>
          <p className="text-sm font-semibold text-emerald-700">
            {businessTagline}
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-bold"
        >
          <Link href="/" className="hover:text-emerald-700">
            Home
          </Link>
          <Link href="/products" className="hover:text-emerald-700">
            All Products
          </Link>
          {contactNumbers.map((contact) => (
            <a
              key={contact.name}
              href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-600"
              aria-label={`Message ${contact.name} on WhatsApp`}
            >
              <MessageCircle size={16} aria-hidden />
              WhatsApp {contact.name}
            </a>
          ))}
          <a
            href={facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-600"
          >
            Facebook
            <ExternalLink size={15} aria-hidden />
          </a>
        </nav>
      </div>
    </footer>
  );
}
