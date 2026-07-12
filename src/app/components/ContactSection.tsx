import { Mail, MapPin, Phone } from "lucide-react";
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
    <section id="contact" className="bg-emerald-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-emerald-200">
            Contact
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-normal sm:text-4xl">
            {businessName}
          </h2>
          <p className="mt-4 max-w-xl text-lg font-bold text-emerald-100">
            {businessTagline}
          </p>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-3">
            {contactNumbers.map((contact) => (
              <div
                key={contact.name}
                className="flex flex-col gap-4 rounded-md bg-white p-5 text-slate-950 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <Phone
                    className="mt-1 shrink-0 text-emerald-700"
                    size={22}
                  />
                  <div className="font-black uppercase tracking-normal">
                    {contact.name}: {contact.display}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <a
                    href={`tel:${contact.tel}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-bold uppercase tracking-normal text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    aria-label={`Call ${contact.name}`}
                  >
                    <Phone size={17} aria-hidden />
                    Call
                  </a>
                  <a
                    href={`https://wa.me/${contact.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-emerald-700 px-4 text-sm font-bold uppercase tracking-normal text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    aria-label={`Message ${contact.name} on WhatsApp`}
                  >
                    <FaWhatsapp
                      size={18}
                      className="text-[#25d366]"
                      aria-hidden
                    />
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <a
            href={`mailto:${businessEmail}`}
            className="flex items-center gap-4 rounded-md bg-white p-5 text-slate-950 transition hover:bg-emerald-50"
          >
            <Mail className="shrink-0 text-emerald-700" size={22} />
            <span className="break-all font-bold">{businessEmail}</span>
          </a>

          <a
            href={facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-md bg-white p-5 text-slate-950 transition hover:bg-emerald-50"
          >
            <FaFacebookF
              className="shrink-0 text-[#1877f2]"
              size={21}
              aria-hidden
            />
            <span className="font-bold">Mustafa Canvas on Facebook</span>
          </a>

          <address className="flex items-start gap-4 rounded-md bg-white p-5 text-slate-950 not-italic">
            <MapPin className="mt-1 shrink-0 text-emerald-700" size={22} />
            <span className="font-bold leading-relaxed">{locationAddress}</span>
          </address>
        </div>

        <div className="overflow-hidden rounded-md bg-white lg:col-span-2">
          <iframe
            title="Mustafa Canvas location map"
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
