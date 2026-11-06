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
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-950 to-emerald-900 py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/90 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-700/60">
            Get In Touch
          </div>
          <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            {businessName}
          </h2>
          <p className="mt-4 max-w-xl text-lg font-bold text-emerald-200">
            {businessTagline}
          </p>
          <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-emerald-100/80">
            Visit our wholesale store in Karachi or contact our sales team directly via phone or WhatsApp for quotes, customized dimensions, and prompt delivery.
          </p>

          <div className="mt-8 rounded-xl bg-emerald-900/60 p-4 ring-1 ring-emerald-800">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-emerald-300 shrink-0" aria-hidden />
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-emerald-200">Business Hours</p>
                <p className="text-xs font-semibold text-emerald-100">Monday &ndash; Saturday: 10:00 AM &ndash; 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-3.5">
          <div className="grid gap-3">
            {contactNumbers.map((contact) => (
              <div
                key={contact.name}
                className="flex flex-col gap-4 rounded-xl bg-white p-5 text-slate-950 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Phone size={20} aria-hidden />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Contact</span>
                    <div className="text-base font-black text-slate-900">
                      {contact.name}: {contact.display}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <a
                    href={`tel:${contact.tel}`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-emerald-800 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    aria-label={`Call ${contact.name}`}
                  >
                    <Phone size={14} aria-hidden />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-emerald-700/80 bg-white px-4 text-xs font-bold uppercase tracking-wider text-emerald-800 transition-all hover:bg-emerald-50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
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
            className="flex items-center gap-3.5 rounded-xl bg-white p-4 text-slate-950 shadow-sm transition hover:bg-emerald-50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <Mail size={19} aria-hidden />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Inquiry</span>
              <p className="break-all text-sm font-bold text-slate-900">{businessEmail}</p>
            </div>
          </a>

          <a
            href={facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5 rounded-xl bg-white p-4 text-slate-950 shadow-sm transition hover:bg-emerald-50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-[#1877f2]">
              <FaFacebookF size={18} aria-hidden />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Social Page</span>
              <p className="text-sm font-bold text-slate-900">Mustafa Canvas Official Facebook</p>
            </div>
          </a>

          <address className="flex items-start gap-3.5 rounded-xl bg-white p-4 text-slate-950 not-italic shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <MapPin size={19} aria-hidden />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Shop Address</span>
              <p className="text-xs font-bold leading-relaxed text-slate-900">{locationAddress}</p>
            </div>
          </address>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-emerald-900/50 lg:col-span-2">
          <iframe
            title="Mustafa Canvas location map in Market Quarter Karachi"
            src={mapEmbedSrc}
            className="h-[320px] w-full border-0 sm:h-[420px]"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
