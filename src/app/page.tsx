import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Hammer,
  Leaf,
  Layers,
  ShieldCheck,
  Sparkles,
  Sun,
  Waves,
} from "lucide-react";
import { ContactSection } from "./components/ContactSection";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProductShowcase } from "./components/ProductShowcase";
import {
  businessEmail,
  businessName,
  businessTagline,
  contactNumbers,
  facebookPageUrl,
  logoPath,
  ogImagePath,
  productNames,
  seoDescription,
  siteUrl,
} from "./seo";
import { imageQuality, siteLogo, siteNavItems } from "./site-config";

const imagePaths = {
  brandSheet: {
    src: "/mustafa-canvas-brand-sheet.png",
    alt: "Mustafa Canvas product range and business details",
    width: 2032,
    height: 774,
  },
  brandSheetMobile: {
    src: "/mustafa-canvas-brand-sheet-mobile.png",
    alt: "Mustafa Canvas product range and business details for mobile",
    width: 986,
    height: 1595,
  },
  shadeNetMaterial: {
    src: "/sun-shade-net-material.png",
    alt: "Sun shade net material details",
    width: 1254,
    height: 1254,
  },
  canvasRolls: {
    src: "/canvas-and-shade-net-rolls.png",
    alt: "Canvas and shade net rolls",
    width: 1254,
    height: 1254,
  },
  schoolParkingShade: {
    src: "/school-parking-shade-installation.png",
    alt: "School and parking shade installation",
    width: 941,
    height: 1672,
  },
  constructionNetting: {
    src: "/construction-netting-installation.png",
    alt: "Construction netting installation",
    width: 1254,
    height: 1254,
  },
  productRange: {
    src: "/mustafa-canvas-product-catalog.png",
    alt: "Mustafa Canvas shade net and canvas solutions catalog",
    width: 1448,
    height: 1086,
  },
  productRangeMobile: {
    src: "/mustafa-canvas-product-catalog-mobile.png",
    alt: "Mustafa Canvas shade net and canvas solutions catalog for mobile",
    width: 1024,
    height: 1536,
  },
  sunShadeScene: {
    src: "/sun-shade-net-installation.png",
    alt: "Sun shade net outdoor installation",
    width: 1254,
    height: 1254,
  },
};

const solutionItems = [
  {
    label: "Sun Shade Nets",
    icon: Sun,
    description: "High-density UV-treated shade fabric reducing surface heat up to 90% for outdoor, school & residential spaces.",
  },
  {
    label: "Construction Netting",
    icon: Hammer,
    description: "Heavy-duty safety debris netting engineered to prevent falling hazards on building and scaffolding projects.",
  },
  {
    label: "Nursery Netting",
    icon: Leaf,
    description: "Optimized diffuse sunlight diffusion and microclimate moisture retention for agricultural nurseries and crops.",
  },
  {
    label: "School & Parking Shades",
    icon: BriefcaseBusiness,
    description: "Tensile architectural shade structures shielding vehicles, campus pathways, and assembly grounds from UV damage.",
  },
  {
    label: "Swimming Pool Shades",
    icon: Waves,
    description: "Weather-resistant, breathable coverage guarding recreational waters and lounge decks from sun glare and dust.",
  },
];

const productItems = [
  "Waterproof Canvas Cloth",
  "Heavy-Duty Tarpaulin",
  "Vinyl PVC Cloth",
  "Commercial Tents",
  "Industrial Supply Bags",
  "Custom Stitched Tool Bags",
];

const qualityItems = [
  {
    title: "Heavy-Duty Density",
    desc: "Virgin polymer yarns with high tensile strength",
  },
  {
    title: "UV Blockade & Heat Guard",
    desc: "Stabilized against degradation and color fading",
  },
  {
    title: "Custom Cut & Stitched",
    desc: "Tailored widths, eyelets, and reinforced hems",
  },
  {
    title: "Direct Wholesale Pricing",
    desc: "Direct-from-foundry rates in Karachi Market",
  },
];

const galleryImages = [
  { ...imagePaths.shadeNetMaterial, label: "Sun Shade Net Material", tag: "Virgin HDPE Polymer" },
  { ...imagePaths.constructionNetting, label: "Construction Debris Netting", tag: "Safety Certified" },
  { ...imagePaths.schoolParkingShade, label: "School & Parking Shade", tag: "Architectural Tensile" },
  { ...imagePaths.canvasRolls, label: "Shade Net & Canvas Rolls", tag: "Wholesale Ready" },
];

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

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
      sameAs: [facebookPageUrl],
      telephone: contactNumbers.map((contact) => `+${contact.whatsapp}`),
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
      knowsAbout: productNames,
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

type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ResponsiveImageProps = {
  mobile: ImageAsset;
  desktop: ImageAsset;
  sizes: string;
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
};

function ResponsiveImage({
  mobile,
  desktop,
  sizes,
  className,
  fetchPriority,
}: ResponsiveImageProps) {
  const commonProps = {
    alt: mobile.alt,
    sizes,
    quality: imageQuality,
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonProps,
    src: desktop.src,
    width: desktop.width,
    height: desktop.height,
  });
  const {
    props: { srcSet: mobileSrcSet, ...imageProps },
  } = getImageProps({
    ...commonProps,
    src: mobile.src,
    width: mobile.width,
    height: mobile.height,
    fetchPriority,
  });

  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
      <img
        {...imageProps}
        srcSet={mobileSrcSet}
        className={className}
        style={{ width: "100%", height: "auto" }}
      />
    </picture>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header
        logo={siteLogo}
        navItems={siteNavItems}
        imageQuality={imageQuality}
      />

      {/* Hero Section */}
      <HeroSection
        brandSheet={imagePaths.brandSheet}
        brandSheetMobile={imagePaths.brandSheetMobile}
        sunShadeScene={imagePaths.sunShadeScene}
        imageQuality={imageQuality}
      />

      {/* Solutions Section (Deep Racing Forest Archetype with Subtle Brass Touches) */}
      <section id="solutions" className="relative overflow-hidden bg-gradient-to-b from-forest-950 via-[#071d18] to-forest-950 py-20 text-white sm:py-28">
        {/* Subtle radial ambient highlights */}
        <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-forest-800/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-brass-500/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-700/60 bg-forest-900/80 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-brass-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brass-400" />
              <span>Specialized Applications</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Engineered Shade &amp; Safety Netting
            </h2>
            <p className="mt-4 text-base font-normal leading-relaxed text-forest-200/90 sm:text-lg">
              Precision-woven polymer solutions designed for high-heat protection, dust suppression, agricultural microclimates, and commercial safety.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {solutionItems.map(({ label, icon: Icon, description }) => (
              <article
                key={label}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass-400/40 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-forest-950/40"
              >
                <div>
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest-900 border border-forest-700 text-brass-300 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-brass-400 group-hover:text-brass-200">
                    <Icon size={22} aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-bold tracking-normal text-white">
                    {label}
                  </h3>
                  <p className="mt-2.5 text-xs font-normal leading-relaxed text-forest-200/80">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core Products Overview Section */}
      <section id="products" className="bg-canvas-50/50 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-white px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-900 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
              <span>Core Manufacturing Line</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl lg:text-5xl">
              Canvas, Tarpaulin &amp; PVC Solutions
            </h2>
            <p className="mt-4 text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
              From heavy cotton duck canvas to waterproof vinyl tarpaulins and custom stitched tool kits, each fabric is manufactured to withstand intense abrasion, monsoon downpours, and relentless sun.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {productItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-forest-100/90 bg-white p-3.5 shadow-sm transition-all hover:border-forest-300 hover:shadow"
                >
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-forest-700"
                    aria-hidden
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/products"
                className="group inline-flex h-12 items-center justify-between gap-3 rounded-full bg-forest-900 pl-6 pr-2 text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
              >
                <span>Browse Full Product Range</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight size={14} aria-hidden />
                </span>
              </Link>
            </div>
          </div>

          <figure className="overflow-hidden rounded-3xl bg-white p-2.5 ring-1 ring-forest-200/70 shadow-lg doppelrand-card sm:p-3.5">
            <div className="overflow-hidden rounded-2xl bg-canvas-100/40">
              <ResponsiveImage
                mobile={imagePaths.productRangeMobile}
                desktop={imagePaths.productRange}
                sizes="(max-width: 639px) 100vw, (max-width: 1024px) 100vw, 56vw"
                className="h-auto w-full rounded-2xl object-cover"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* Dynamic Product Showcase with Slideshow & Skeletons */}
      <ProductShowcase />

      {/* Karachi Market Range Section */}
      <section aria-labelledby="karachi-products-heading" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-forest-50/60 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-900">
              <span>Karachi Market Authority</span>
            </div>
            <h2
              id="karachi-products-heading"
              className="mt-4 font-display text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl lg:text-5xl"
            >
              Supplying Canvas, Tarpaulin &amp; Nets Nationwide
            </h2>
            <p className="mt-4 text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
              Operating directly from Fazal Chamber, Market Quarter, Karachi, Mustafa Canvas supplies both commercial bulk contractors and individual projects across Pakistan with premium quality fabrics.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm doppelrand-card transition-all hover:border-forest-300 hover:shadow-md">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 border border-forest-100 text-forest-800">
                <Layers size={22} aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Industrial Canvas Cloth
              </h3>
              <p className="mt-2.5 text-xs font-normal leading-relaxed text-slate-600">
                Waterproof canvas cloth, tents, transport covers, and heavy-duty tool bags fabricated for extreme mechanical durability.
              </p>
            </article>

            <article className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm doppelrand-card transition-all hover:border-forest-300 hover:shadow-md">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 border border-forest-100 text-forest-800">
                <ShieldCheck size={22} aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Tarpaulins &amp; Vinyl PVC
              </h3>
              <p className="mt-2.5 text-xs font-normal leading-relaxed text-slate-600">
                Heavy-grade tarpaulin sheets and waterproof PVC coated fabrics designed to protect industrial machinery, grain, and transport cargo.
              </p>
            </article>

            <article className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm doppelrand-card transition-all hover:border-forest-300 hover:shadow-md">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 border border-forest-100 text-forest-800">
                <Sun size={22} aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Sun Shade &amp; Nursery Nets
              </h3>
              <p className="mt-2.5 text-xs font-normal leading-relaxed text-slate-600">
                UV-stabilized shade nets, agricultural nursery coverings, building safety netting, and car parking shades in custom dimensions.
              </p>
            </article>
          </div>

          <div className="mt-10">
            <Link
              href="/products"
              className="group inline-flex h-12 items-center justify-between gap-3 rounded-full bg-forest-900 pl-6 pr-2 text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
            >
              <span>Explore All Products</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight size={14} aria-hidden />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Guarantees Banner (Double-Bezel Micro-Cards) */}
      <section className="bg-canvas-50/80 border-y border-forest-100/80 py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {qualityItems.map(({ title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3.5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-forest-100/90 doppelrand-card"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-800">
                <ShieldCheck size={20} aria-hidden />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-slate-900">
                  {title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 font-normal leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality & Manufacturing Gallery */}
      <section id="quality" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-forest-50/60 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-900">
              <span>Manufacturing Standards</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl lg:text-5xl">
              Precision Weaving &amp; Reinforced Construction
            </h2>
            <p className="mt-3 text-base text-slate-600 font-normal">
              High-density virgin polymers, precision industrial stitching, and heat-sealed edges ensure supreme tear resistance under harsh weather.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-2">
            {galleryImages.map((image) => (
              <figure
                key={image.src}
                className="group relative self-start overflow-hidden rounded-3xl bg-white p-3 ring-1 ring-forest-100/90 shadow-sm doppelrand-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-4"
              >
                <div className="overflow-hidden rounded-2xl bg-canvas-100/40">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="h-auto w-full rounded-2xl transition-transform duration-700 ease-out group-hover:scale-102"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={imageQuality}
                  />
                </div>
                <figcaption className="mt-4 flex items-center justify-between px-2">
                  <span className="font-display text-sm font-bold text-slate-900">
                    {image.label}
                  </span>
                  <span className="rounded-full bg-forest-50 border border-forest-200/60 px-2.5 py-0.5 text-[11px] font-medium text-forest-800">
                    {image.tag}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </main>
  );
}
