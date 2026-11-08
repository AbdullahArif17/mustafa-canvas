import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import {
  businessEmail,
  businessName,
  businessTagline,
  contactNumbers,
  facebookPageUrl,
  locationAddress,
} from "../seo";

const whatsappMessage = encodeURIComponent(
  "Hello Mustafa Canvas, I want to ask about your shade net and canvas solutions."
);

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${businessName}, ${locationAddress}`
)}&output=embed`;

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-forest-950 via-[#061915] to-forest-950 py-20 text-white sm:py-28">
      {/* Decorative ambient gradients */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[440px] w-[440px] rounded-full bg-forest-800/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-0 bottom-10 h-[400px] w-[400px] rounded-full bg-brass-600/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-forest-700/70 bg-forest-900/80 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-brass-300">
            <span className="h-1.5 w-1.5 rounded-full bg-brass-400" />
            <span>Direct Orders &amp; Inquiries</span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {businessName}
          </h2>
          <p className="mt-4 font-display text-lg font-semibold text-forest-200">
            {businessTagline}
          </p>
          <p className="mt-3 text-sm font-normal leading-relaxed text-forest-200/80">
            Visit our wholesale location in Market Quarter Karachi or contact our sales team directly for quotation requests, wholesale trade orders, and rapid dispatch across Pakistan.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-900 border border-forest-700 text-brass-300">
                <Clock size={18} aria-hidden />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-brass-300">Operational Hours</p>
                <p className="text-xs font-medium text-forest-100">Monday &ndash; Saturday: 10:00 AM &ndash; 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3.5">
          <div className="grid gap-3">
            {contactNumbers.map((contact) => (
              <div
                key={contact.name}
                className="flex flex-col gap-4 rounded-2xl border border-forest-100/80 bg-white p-5 text-slate-900 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-50 border border-forest-100 text-forest-800">
                    <Phone size={18} aria-hidden />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Direct Contact</span>
                    <div className="font-display text-base font-bold text-slate-900">
                      {contact.name}: {contact.display}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <a
                    href={`tel:${contact.tel}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-forest-900 px-4 text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-forest-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
                    aria-label={`Call ${contact.name}`}
                  >
                    <Phone size={13} aria-hidden />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-forest-200 bg-white px-4 text-xs font-semibold tracking-wide text-forest-900 transition-all hover:bg-forest-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
                    aria-label={`Message ${contact.name} on WhatsApp`}
                  >
                    <FaWhatsapp
                      size={15}
                      className="text-[#25d366]"
                      aria-hidden
                    />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <a
            href={`mailto:${businessEmail}`}
            className="flex items-center gap-3.5 rounded-2xl border border-forest-100/80 bg-white p-4 text-slate-900 shadow-sm transition hover:bg-forest-50 hover:border-forest-200"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-800">
              <Mail size={18} aria-hidden />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Inquiry</span>
              <p className="break-all font-display text-sm font-semibold text-slate-900">{businessEmail}</p>
            </div>
          </a>

          <a
            href={facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 rounded-2xl border border-forest-100/80 bg-white p-4 text-slate-900 shadow-sm transition hover:bg-forest-50 hover:border-forest-200"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1877f2]/10 text-[#1877f2]">
              <FaFacebookF size={17} aria-hidden />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Official Social</span>
              <p className="font-display text-sm font-semibold text-slate-900">Mustafa Canvas Facebook Community</p>
            </div>
          </a>

          <address className="flex items-start gap-3.5 rounded-2xl border border-forest-100/80 bg-white p-4 text-slate-900 not-italic shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-800">
              <MapPin size={18} aria-hidden />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Karachi Warehouse &amp; Shop</span>
              <p className="text-xs font-medium leading-relaxed text-slate-800">{locationAddress}</p>
            </div>
          </address>
        </div>

        {/* Embedded Interactive Map in Double-Bezel Enclosure */}
        <div className="overflow-hidden rounded-3xl bg-white p-2.5 shadow-2xl ring-1 ring-forest-800/50 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl">
            <iframe
              title="Mustafa Canvas location map in Market Quarter Karachi"
              src={mapEmbedSrc}
              className="h-[340px] w-full border-0 sm:h-[440px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
