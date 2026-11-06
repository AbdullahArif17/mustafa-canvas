"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

type NavItem = {
  href: string;
  label: string;
  sectionId?: string;
};

type LogoImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type HeaderProps = {
  logo: LogoImage;
  navItems: NavItem[];
  imageQuality: number;
};

export function Header({ logo, navItems, imageQuality }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/90 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/#home"
            className="group flex min-w-0 items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative overflow-hidden rounded-full ring-2 ring-emerald-600/20 transition-all duration-300 group-hover:ring-emerald-600/60">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-12 w-12 rounded-full object-contain transition-transform duration-300 group-hover:scale-105"
                sizes="48px"
                quality={imageQuality}
              />
            </div>
            <div className="min-w-0">
              <span className="block truncate text-lg font-black uppercase tracking-tight text-emerald-950 sm:text-xl">
                Mustafa Canvas
              </span>
              <span className="block truncate text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Shade Net &amp; Canvas Solutions
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
            {navItems.map((item) => {
              const sectionId = item.sectionId;
              const isActive = sectionId && activeSection === sectionId;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://wa.me/923482026858?text=Hello%20Mustafa%20Canvas%2C%20I%20want%20to%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-50 px-4 text-xs font-black uppercase tracking-wider text-emerald-900 ring-1 ring-emerald-200/80 transition-all hover:bg-emerald-100 hover:ring-emerald-300 active:scale-95"
              aria-label="Direct WhatsApp inquiry"
            >
              <FaWhatsapp size={16} className="text-[#25d366]" aria-hidden />
              <span>WhatsApp</span>
            </a>

            <a
              href="tel:03482026858"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-700 px-4 text-xs font-black uppercase tracking-wider text-white shadow-sm transition-all hover:bg-emerald-800 active:scale-95"
              aria-label="Call Mustafa Canvas"
            >
              <Phone size={14} aria-hidden />
              <span>0348-2026858</span>
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-emerald-200 bg-white text-emerald-900 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-20 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-x-0 top-20 z-50 border-b border-emerald-100 bg-white px-5 py-6 shadow-xl lg:hidden"
              aria-label="Mobile Navigation"
            >
              <div className="mx-auto grid max-w-lg gap-2">
                {navItems.map((item) => {
                  const sectionId = item.sectionId;
                  const isActive = sectionId && activeSection === sectionId;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? "bg-emerald-700 text-white"
                          : "text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="h-2 w-2 rounded-full bg-white" />}
                    </Link>
                  );
                })}

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-emerald-100 pt-4">
                  <a
                    href="https://wa.me/923482026858?text=Hello%20Mustafa%20Canvas%2C%20I%20want%20to%20inquire%20about%20your%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-50 px-3 text-xs font-bold uppercase tracking-wider text-emerald-900 ring-1 ring-emerald-200"
                  >
                    <FaWhatsapp size={16} className="text-[#25d366]" aria-hidden />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="tel:03482026858"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3 text-xs font-bold uppercase tracking-wider text-white"
                  >
                    <Phone size={14} aria-hidden />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
