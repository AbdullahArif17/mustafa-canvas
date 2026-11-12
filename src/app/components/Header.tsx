"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
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
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-forest-100/80 bg-white/95 shadow-sm shadow-forest-950/5 backdrop-blur-md"
            : "border-b border-forest-100/50 bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
          {/* Logo & Brand Identity */}
          <Link
            href="/#home"
            className="group flex shrink-0 items-center gap-2.5 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative overflow-hidden rounded-full ring-2 ring-forest-600/15 transition-all duration-300 group-hover:ring-forest-600/40 group-hover:scale-105 shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-9 w-9 sm:h-12 sm:w-12 rounded-full object-contain"
                sizes="48px"
                quality={imageQuality}
              />
            </div>
            <div className="min-w-0">
              <span className="block truncate font-display text-base sm:text-lg xl:text-xl font-bold tracking-tight text-forest-950">
                Mustafa <span className="text-forest-700">Canvas</span>
              </span>
              <span className="hidden xs:block lg:hidden xl:block truncate text-[11px] font-semibold tracking-wider uppercase text-forest-700/80">
                Shade Nets &amp; Industrial Fabrics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden shrink-0 items-center gap-0.5 rounded-full border border-forest-100/80 bg-canvas-50/70 p-1 xl:p-1.5 lg:flex xl:gap-1"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const sectionId = item.sectionId;
              const isProductsRoute = pathname?.startsWith("/products");
              const isActive = isProductsRoute
                ? item.href === "/products"
                : (!pathname || pathname === "/") && Boolean(sectionId && activeSection === sectionId);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative whitespace-nowrap rounded-full px-2 py-1.5 text-[11px] font-semibold tracking-wide transition-all duration-200 xl:px-3.5 xl:text-xs ${
                    isActive
                      ? "bg-forest-900 text-white shadow-sm shadow-forest-950/20"
                      : "text-slate-600 hover:text-forest-950 hover:bg-white/80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden shrink-0 items-center gap-1.5 lg:flex xl:gap-2.5">
            <a
              href="https://wa.me/923108117857?text=Hello%20Mustafa%20Canvas%2C%20I%20want%20to%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 xl:h-10 shrink-0 items-center gap-1.5 xl:gap-2 rounded-full border border-forest-200/90 bg-white px-2.5 xl:px-3.5 text-xs font-semibold tracking-wide text-forest-900 shadow-sm transition-all hover:bg-forest-50 hover:border-forest-300 active:scale-95 whitespace-nowrap"
              aria-label="Direct WhatsApp inquiry"
            >
              <FaWhatsapp size={15} className="text-[#25d366]" aria-hidden />
              <span>WhatsApp</span>
            </a>

            <a
              href="tel:03108117857"
              className="group inline-flex h-9 xl:h-10 shrink-0 items-center gap-1.5 xl:gap-2 rounded-full bg-forest-900 pl-3 pr-2 xl:pl-3.5 xl:pr-2.5 text-xs font-semibold tracking-wide text-white shadow-sm shadow-forest-950/15 transition-all hover:bg-forest-800 active:scale-95 whitespace-nowrap antialiased [transform:translateZ(0)]"
              aria-label="Call Mustafa Canvas"
            >
              <Phone size={13} aria-hidden />
              <span className="hidden xl:inline whitespace-nowrap font-mono tracking-tight">0310&#8209;8117857</span>
              <span className="xl:hidden">Call</span>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowUpRight size={11} aria-hidden />
              </span>
            </a>
          </div>

          {/* Mobile Right Controls: WhatsApp Quick Button + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="https://wa.me/923108117857?text=Hello%20Mustafa%20Canvas%2C%20I%20want%20to%20inquire%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-forest-200/90 bg-forest-50/80 px-3 text-xs font-semibold text-forest-900 shadow-sm transition-all hover:bg-forest-100 active:scale-95"
              aria-label="Quick WhatsApp chat"
            >
              <FaWhatsapp size={15} className="text-[#25d366]" aria-hidden />
              <span className="text-[11px] font-bold">Chat</span>
            </a>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-forest-200/80 bg-white text-forest-900 transition-colors hover:bg-forest-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
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
              className="fixed inset-0 top-16 sm:top-20 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 top-16 sm:top-20 z-50 border-b border-forest-100 bg-white/95 px-5 py-6 shadow-2xl backdrop-blur-md lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto"
              aria-label="Mobile Navigation"
            >
              <div className="mx-auto grid max-w-lg gap-2">
                {navItems.map((item) => {
                  const sectionId = item.sectionId;
                  const isProductsRoute = pathname?.startsWith("/products");
                  const isActive = isProductsRoute
                    ? item.href === "/products"
                    : (!pathname || pathname === "/") && Boolean(sectionId && activeSection === sectionId);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition-all ${
                        isActive
                          ? "bg-forest-900 text-white shadow-sm"
                          : "text-slate-700 hover:bg-forest-50 hover:text-forest-950"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="h-2 w-2 rounded-full bg-brass-400" />}
                    </Link>
                  );
                })}

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-forest-100 pt-4">
                  <a
                    href="https://wa.me/923108117857?text=Hello%20Mustafa%20Canvas%2C%20I%20want%20to%20inquire%20about%20your%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-forest-200 bg-white px-3 text-xs font-semibold tracking-wide text-forest-950 shadow-sm"
                  >
                    <FaWhatsapp size={15} className="text-[#25d366]" aria-hidden />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="tel:03108117857"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-forest-900 px-3 text-xs font-semibold tracking-wide text-white shadow-sm"
                  >
                    <Phone size={13} aria-hidden />
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
