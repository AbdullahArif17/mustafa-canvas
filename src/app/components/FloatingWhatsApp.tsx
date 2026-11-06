"use client";

import { FaWhatsapp } from "react-icons/fa6";

const whatsappUrl =
  "https://wa.me/923482026858?text=Hello%20Mustafa%20Canvas%2C%20I%20want%20to%20inquire%20about%20your%20products.";

export function FloatingWhatsApp() {
  return (
    <aside aria-label="WhatsApp quick contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Mustafa Canvas on WhatsApp"
        className="group fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg shadow-[#25d366]/30 transition-all duration-300 hover:scale-105 hover:bg-[#20ba59] hover:shadow-xl hover:shadow-[#25d366]/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-14 sm:w-auto sm:gap-2.5 sm:px-4"
      >
        <span className="flex items-center justify-center">
          <FaWhatsapp size={26} aria-hidden />
        </span>
        <span className="hidden text-xs font-black uppercase tracking-wider sm:inline">
          Chat With Us
        </span>
      </a>
    </aside>
  );
}
