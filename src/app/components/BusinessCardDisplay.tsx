"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Expand,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa6";
import {
  businessCardImagePath,
  businessName,
  contactNumbers,
  facebookPageUrl,
  instagramPageUrl,
  locationAddress,
} from "../seo";

export function BusinessCardDisplay() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-forest-800/80 bg-gradient-to-br from-forest-900/90 via-[#07241d] to-forest-950 p-3.5 sm:p-7 shadow-2xl backdrop-blur-md ring-1 ring-brass-500/20">
        {/* Subtle decorative gold ambient glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brass-500/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-forest-700/20 blur-3xl"
          aria-hidden
        />

        {/* Header Header & Verified Badge */}
        <div className="relative mb-4 sm:mb-5 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 border-b border-white/10 pb-3.5 sm:pb-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-forest-800/80 border border-forest-600/50 text-brass-300 shadow-sm">
              <ShieldCheck size={17} aria-hidden />
            </div>
            <div>
              <span className="block font-display text-sm sm:text-base font-bold text-white">
                Official Business Card
              </span>
              <span className="block text-[10px] sm:text-[11px] font-medium text-forest-200/80">
                Verified Commercial Manufacturer &middot; Karachi
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brass-400/40 bg-brass-500/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-brass-300">
              <Sparkles size={11} className="text-brass-400" />
              <span>Authentic</span>
            </span>
          </div>
        </div>

        {/* Business Card Visual Container with Doppelrand Frame */}
        <div className="relative group mx-auto w-full max-w-xl">
          <motion.div
            whileHover={{ scale: 1.012 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative cursor-pointer overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-brass-500/20"
            onClick={() => setModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setModalOpen(true);
              }
            }}
            aria-label="Click to enlarge official business card"
          >
            <div className="relative aspect-[1024/686] w-full overflow-hidden rounded-2xl bg-forest-950">
              <Image
                src={businessCardImagePath}
                alt={`${businessName} Official Business Card with contact numbers and Karachi shop address`}
                width={1024}
                height={686}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 560px"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center bg-forest-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-forest-900/90 px-4 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur">
                  <Expand size={14} />
                  <span>Click to Enlarge Card</span>
                </span>
              </div>
            </div>
          </motion.div>

          <p className="mt-2 text-center text-[10px] sm:text-[11px] font-medium text-forest-200/60 sm:hidden">
            Tap card to inspect high-resolution details
          </p>
        </div>

        {/* Quick Action Buttons (Full View, Socials) */}
        <div className="relative mt-4 sm:mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 sm:pt-5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-full border border-brass-400/50 bg-brass-500/15 px-3.5 sm:px-4 text-xs font-semibold text-brass-200 shadow-sm transition-all hover:bg-brass-500 hover:text-forest-950 active:scale-95"
            >
              <Expand size={13} />
              <span>Full View</span>
            </button>
          </div>

          {/* Social icons directly from card */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-medium text-forest-200/70">
              @Mustafacanvas:
            </span>
            <a
              href={instagramPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-pink-600 hover:border-pink-500"
              aria-label="Mustafa Canvas on Instagram"
              title="Instagram: @Mustafacanvas"
            >
              <FaInstagram size={13} />
            </a>
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-[#1877f2] hover:border-[#1877f2]"
              aria-label="Mustafa Canvas on Facebook"
              title="Facebook: @Mustafacanvas"
            >
              <FaFacebookF size={12} />
            </a>
          </div>
        </div>

        {/* Direct Card Key Personnel Contacts (Mustafa, Abid, Arif) */}
        <div className="mt-4 sm:mt-5 grid gap-2 sm:gap-2.5 sm:grid-cols-3">
          {contactNumbers.slice(0, 3).map((contact) => (
            <div
              key={contact.name}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-2.5 sm:p-3 text-white transition hover:bg-white/[0.08]"
            >
              <div>
                <span className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brass-300">
                  {contact.name}
                </span>
                <span className="block font-display text-xs font-bold text-white">
                  {contact.display}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`https://wa.me/${contact.whatsapp}?text=Hello%20${contact.name}%2C%20I%20got%20your%20number%20from%20Mustafa%20Canvas%20business%20card.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#25d366]/20 text-[#25d366] transition hover:bg-[#25d366] hover:text-white"
                  title={`WhatsApp ${contact.name}`}
                  aria-label={`WhatsApp ${contact.name}`}
                >
                  <FaWhatsapp size={14} />
                </a>
                <a
                  href={`tel:${contact.tel}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white hover:text-forest-950"
                  title={`Call ${contact.name}`}
                  aria-label={`Call ${contact.name}`}
                >
                  <Phone size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Address callout from card */}
        <div className="mt-3.5 sm:mt-4 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 sm:p-3 text-xs text-forest-200/80">
          <MapPin size={15} className="mt-0.5 shrink-0 text-brass-400" aria-hidden />
          <p className="leading-relaxed text-[11px] sm:text-xs">
            <strong className="text-white">Shop Address:</strong> {locationAddress}
          </p>
        </div>
      </div>

      {/* Fullscreen Card Inspection Modal (Accessible & Responsive) */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/85 p-4 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Official Business Card Enlarged Preview"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-forest-900 p-3 shadow-2xl ring-1 ring-brass-500/40 sm:p-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-3 sm:pb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={20} className="text-brass-400" />
                  <span className="font-display text-sm font-bold text-white sm:text-base">
                    Mustafa Canvas &mdash; Official Business Card
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Full Image */}
              <div className="relative aspect-[1024/686] w-full overflow-hidden rounded-2xl bg-forest-950 shadow-inner">
                <Image
                  src={businessCardImagePath}
                  alt="Mustafa Canvas Official Business Card Full Size"
                  width={1024}
                  height={686}
                  className="h-full w-full object-contain"
                  quality={95}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-forest-200/80">
                <span>Shop #1, MR 1/72, Fazal Chamber, Murad Khan Rd, Khori Garden, Karachi</span>
                <span className="font-semibold text-brass-300">Mustafa &middot; Abid &middot; Arif</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
