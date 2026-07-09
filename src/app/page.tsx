"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Hammer,
  Leaf,
  Mail,
  MessageCircle,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sun,
  Waves,
  X,
} from "lucide-react";
import {
  businessEmail,
  businessName,
  businessTagline,
  contactNumbers,
  locationAddress,
  logoPath,
  ogImagePath,
  productNames,
  seoDescription,
  siteUrl,
} from "./seo";

const imagePaths = {
  logo: "/mustafa-canvas-logo.png",
  overview: "/mustafa-canvas-catalog.png",
  catalog: "/mustafa-canvas-catalog.png",
  shadeNet: "/mustafa-canvas-shade-net.png",
  canvasRolls: "/mustafa-canvas-rolls.png",
  schoolParkingShade: "/mustafa-canvas-parking-shade.png",
  constructionNetting: "/mustafa-canvas-construction-netting.png",
};

const navItems = [
  { href: "#solutions", label: "Solutions" },
  { href: "#products", label: "Products" },
  { href: "#quality", label: "Quality" },
  { href: "#contact", label: "Contact" },
];

const solutionItems = [
  { label: "Sun Shade Net", icon: Sun },
  { label: "Construction Netting", icon: Hammer },
  { label: "Nursery Netting", icon: Leaf },
  { label: "School & Parking Shade", icon: BriefcaseBusiness },
  { label: "Swimming Pool Shade", icon: Waves },
];

const productItems = [
  "Waterproof Canvas Cloth",
  "Tarpaulin",
  "PVC Cloth",
  "Tents",
  "Supply Bags",
  "Tool Bags",
];

const qualityItems = [
  "Premium Quality",
  "UV Protection & Durability",
  "Custom Sizes & Solutions",
  "Reliable & Trusted",
];

const proofImages = [
  {
    src: imagePaths.schoolParkingShade,
    label: "School & Parking Shade",
  },
  {
    src: imagePaths.constructionNetting,
    label: "Construction Netting",
  },
  {
    src: imagePaths.shadeNet,
    label: "Sun Shade Net",
  },
  {
    src: imagePaths.canvasRolls,
    label: "Shade Net & Canvas Solutions",
  },
];

const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `Mustafa Canvas, ${locationAddress}`
)}&output=embed`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: businessName,
      url: siteUrl,
      logo: `${siteUrl}${logoPath}`,
      image: [`${siteUrl}${ogImagePath}`, `${siteUrl}${logoPath}`],
      description: seoDescription,
      email: businessEmail,
      telephone: contactNumbers.map((contact) => `+${contact.whatsapp}`),
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Shop # 1, MR / 72, Fazal Chamber, Khoury Garden, Murad Khan Rd, Market Quarter",
        addressLocality: "Karachi",
        addressCountry: "PK",
      },
      areaServed: {
        "@type": "City",
        name: "Karachi",
      },
      makesOffer: productNames.map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: businessName,
      description: businessTagline,
      publisher: {
        "@id": `${siteUrl}/#localbusiness`,
      },
    },
  ],
};

export default function Home() {
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

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="#home"
            className="flex min-w-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Image
              src={imagePaths.logo}
              alt="Mustafa Canvas logo"
              width={56}
              height={56}
              className="h-12 w-12 rounded-full object-fill"
              unoptimized
            />
            <div className="min-w-0">
              <span className="block truncate text-lg font-black uppercase tracking-normal text-emerald-900 sm:text-xl">
                Mustafa Canvas
              </span>
              <span className="block truncate text-xs font-semibold uppercase tracking-normal text-emerald-700">
                Shade Net & Canvas Solutions
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                    activeSection === sectionId
                      ? "bg-emerald-700 text-white"
                      : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-emerald-200 text-emerald-900 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 md:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-emerald-100 bg-white px-4 py-3 md:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-3 text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section id="home" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Image
              src={imagePaths.logo}
              alt="Mustafa Canvas - Shade Net & Canvas Solutions"
              width={220}
              height={220}
              className="mb-6 h-24 w-24 rounded-full object-fill sm:h-32 sm:w-32"
              unoptimized
            />
            <p className="mb-3 text-sm font-black uppercase tracking-normal text-emerald-700">
              Shade Net & Canvas Solutions
            </p>
            <h1 className="max-w-2xl text-4xl font-black uppercase tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Mustafa Canvas
            </h1>
            <p className="mt-5 max-w-xl text-xl font-bold leading-tight text-emerald-800 sm:text-2xl">
              Quality Shade Nets, Canvas, Tarpaulin & PVC Solutions
            </p>
            <p className="mt-4 max-w-xl text-lg font-semibold text-slate-700">
              Built for Strength. Made to Last.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#products"
                className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-700 px-6 text-sm font-bold uppercase tracking-normal text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                Products
              </Link>
              <Link
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-md border border-emerald-700 px-6 text-sm font-bold uppercase tracking-normal text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-emerald-100 bg-white shadow-sm">
            <Image
              src={imagePaths.overview}
              alt="Mustafa Canvas product and contact overview"
              fill
              className="object-fill"
              sizes="(max-width: 1024px) 100vw, 58vw"
              preload
              unoptimized
            />
          </div>
        </div>
      </section>

      <section id="solutions" className="border-y border-emerald-100 bg-emerald-50/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
                Solutions
              </p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-normal text-slate-950 sm:text-4xl">
                Shade Net & Canvas Solutions
              </h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {solutionItems.map(({ label, icon: Icon }) => (
              <article
                key={label}
                className="rounded-md border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md bg-emerald-700 text-white">
                  <Icon size={22} aria-hidden />
                </div>
                <h3 className="text-lg font-black uppercase tracking-normal text-slate-950">
                  {label}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
                Products
              </p>
              <h2 className="mt-2 text-3xl font-black uppercase tracking-normal text-slate-950 sm:text-4xl">
                Canvas, Tarpaulin & PVC Solutions
              </h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {productItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-md border border-emerald-100 bg-emerald-50 px-4 py-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-emerald-700"
                      aria-hidden
                    />
                    <span className="font-bold uppercase tracking-normal text-slate-900">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-emerald-100 bg-white shadow-sm">
              <Image
                src={imagePaths.catalog}
                alt="Mustafa Canvas solutions and products catalog"
                fill
                className="object-fill"
                sizes="(max-width: 1024px) 100vw, 58vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {qualityItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-4"
            >
              <ShieldCheck size={22} className="shrink-0 text-emerald-200" />
              <span className="font-black uppercase tracking-normal">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="quality" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
              Quality
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-normal text-slate-950 sm:text-4xl">
              Built for Strength. Made to Last.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofImages.map((image) => (
              <figure
                key={image.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-md border border-emerald-100 bg-emerald-50 shadow-sm"
              >
                <Image
                  src={image.src}
                  alt={image.label}
                  fill
                  className="object-fill transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-emerald-950/85 px-4 py-3 text-sm font-black uppercase tracking-normal text-white">
                  {image.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-emerald-100 bg-emerald-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
              Contact
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-normal text-slate-950 sm:text-4xl">
              Mustafa Canvas
            </h2>
            <p className="mt-4 max-w-xl text-lg font-bold text-emerald-800">
              Shade Net & Canvas Solutions
            </p>
          </div>

          <div className="grid gap-3">
            <div className="grid gap-3">
              {contactNumbers.map((contact) => (
                <div
                  key={contact.name}
                  className="flex flex-col gap-4 rounded-md border border-emerald-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <Phone
                      className="mt-1 shrink-0 text-emerald-700"
                      size={22}
                    />
                    <div>
                      <div className="font-black uppercase tracking-normal text-slate-950">
                        {contact.name}: {contact.display}
                      </div>
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
                      href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                        "Hello Mustafa Canvas, I want to ask about your shade net and canvas solutions."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-emerald-700 px-4 text-sm font-bold uppercase tracking-normal text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                      aria-label={`Message ${contact.name} on WhatsApp`}
                    >
                      <MessageCircle size={17} aria-hidden />
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={`mailto:${businessEmail}`}
              className="flex items-center gap-4 rounded-md border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300"
            >
              <Mail className="shrink-0 text-emerald-700" size={22} />
              <span className="break-all font-bold text-slate-950">
                {businessEmail}
              </span>
            </a>

            <address className="flex items-start gap-4 rounded-md border border-emerald-100 bg-white p-5 not-italic shadow-sm">
              <MapPin className="mt-1 shrink-0 text-emerald-700" size={22} />
              <span className="font-bold leading-relaxed text-slate-950">
                {locationAddress}
              </span>
            </address>
          </div>

          <div className="overflow-hidden rounded-md border border-emerald-100 bg-white shadow-sm lg:col-span-2">
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

      <footer className="bg-emerald-950 px-4 py-8 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-black uppercase tracking-normal">Mustafa Canvas</p>
            <p className="text-sm font-semibold text-emerald-100">
              Shade Net & Canvas Solutions
            </p>
          </div>
          <p className="text-sm font-semibold text-emerald-100">
            Quality Shade Nets, Canvas, Tarpaulin & PVC Solutions
          </p>
        </div>
      </footer>
    </main>
  );
}
