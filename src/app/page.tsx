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
    label: "Sun Shade Net",
    icon: Sun,
    description: "High-density UV-treated shade fabric reducing heat up to 90% for outdoor spaces.",
  },
  {
    label: "Construction Netting",
    icon: Hammer,
    description: "Heavy-duty safety debris nets preventing hazards on building and scaffolding sites.",
  },
  {
    label: "Nursery Netting",
    icon: Leaf,
    description: "Optimized sunlight diffusion and moisture retention for nurseries and crops.",
  },
  {
    label: "School & Parking Shade",
    icon: BriefcaseBusiness,
    description: "Durable tensile shade structures protecting parking lots, school grounds, and walkways.",
  },
  {
    label: "Swimming Pool Shade",
    icon: Waves,
    description: "Cool weather-resistant coverage shielding pool areas and patio spaces from harsh glare.",
  },
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

const galleryImages = [
  { ...imagePaths.shadeNetMaterial, label: "Sun Shade Net Material" },
  { ...imagePaths.constructionNetting, label: "Construction Netting" },
  { ...imagePaths.schoolParkingShade, label: "School & Parking Shade" },
  { ...imagePaths.canvasRolls, label: "Shade Net & Canvas Solutions" },
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
    <main className="flex flex-1 flex-col bg-white text-slate-950">
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

      {/* Hero Section with Framer Motion animations & micro-interactions */}
      <HeroSection
        brandSheet={imagePaths.brandSheet}
        brandSheetMobile={imagePaths.brandSheetMobile}
        sunShadeScene={imagePaths.sunShadeScene}
        imageQuality={imageQuality}
      />

      {/* Solutions Section */}
      <section id="solutions" className="relative overflow-hidden bg-gradient-to-b from-emerald-950 to-emerald-900 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/90 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-700/60">
              Applications
            </div>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
              Specialized Solutions &amp; Netting
            </h2>
            <p className="mt-3 text-sm font-medium text-emerald-200">
              Engineered fabric solutions tailored for agriculture, construction, commercial facilities, and residential spaces.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {solutionItems.map(({ label, icon: Icon, description }) => (
              <article
                key={label}
                className="group relative flex flex-col justify-between rounded-xl bg-emerald-900/70 p-5 ring-1 ring-emerald-800 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-850 hover:ring-emerald-500/50 hover:shadow-xl hover:shadow-emerald-950/20"
              >
                <div>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} aria-hidden />
                  </div>
                  <h3 className="text-base font-black uppercase tracking-tight text-white">
                    {label}
                  </h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-emerald-200/90">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Products Overview Section */}
      <section id="products" className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 ring-1 ring-emerald-300/60">
              Core Products
            </div>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl">
              Canvas, Tarpaulin &amp; PVC Solutions
            </h2>
            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-600">
              From waterproof canvas sheets to heavy-duty vinyl tarpaulins and custom stitched tool bags, our products are crafted to withstand extreme weather conditions.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {productItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-emerald-50/70 px-4 py-3.5 ring-1 ring-emerald-100/80 transition-all hover:bg-emerald-100/60"
                >
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-emerald-700"
                    aria-hidden
                  />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 text-xs font-black uppercase tracking-wider text-white shadow-sm transition hover:bg-emerald-800 active:scale-95"
              >
                <span>Browse Full Product Range</span>
                <ArrowRight size={15} aria-hidden />
              </Link>
            </div>
          </div>

          <figure className="overflow-hidden rounded-2xl bg-emerald-50/40 p-3 ring-1 ring-emerald-100 sm:p-4">
            <ResponsiveImage
              mobile={imagePaths.productRangeMobile}
              desktop={imagePaths.productRange}
              sizes="(max-width: 639px) 100vw, (max-width: 1024px) 100vw, 56vw"
              className="h-auto w-full rounded-xl"
            />
          </figure>
        </div>
      </section>

      {/* Dynamic Product Showcase with Slideshow & Skeletons */}
      <ProductShowcase />

      {/* Karachi Product Range Section */}
      <section aria-labelledby="karachi-products-heading" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 ring-1 ring-emerald-300/60">
              Karachi Market
            </div>
            <h2
              id="karachi-products-heading"
              className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl"
            >
              Canvas, Tarpaulin &amp; Sun Shade Nets in Karachi
            </h2>
            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-600 sm:text-lg">
              Mustafa Canvas supplies canvas cloth, tarpaulin, PVC cloth, sun
              shade nets, and netting products from its shop in Market Quarter,
              Karachi. We cater to wholesale commercial orders, agricultural supply, and individual retail needs.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Layers size={22} aria-hidden />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-emerald-950">
                Canvas Cloth
              </h3>
              <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600">
                Waterproof canvas cloth, tents, supply bags, and durable tool bags engineered for maximum tensile strength and longevity.
              </p>
            </article>

            <article className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <ShieldCheck size={22} aria-hidden />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-emerald-950">
                Tarpaulin &amp; PVC Cloth
              </h3>
              <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600">
                Heavy-duty tarpaulin sheets and waterproof PVC coated fabrics designed to protect industrial machinery, transport cargo, and raw materials.
              </p>
            </article>

            <article className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Sun size={22} aria-hidden />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-emerald-950">
                Sun Shade Nets
              </h3>
              <p className="mt-2 text-xs font-medium leading-relaxed text-slate-600">
                Sun shade net, nursery netting, construction safety netting, parking lot shade, and swimming pool shade solutions tailored to custom sizes.
              </p>
            </article>
          </div>

          <div className="mt-8">
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 text-xs font-black uppercase tracking-wider text-white shadow-sm transition hover:bg-emerald-800 active:scale-95"
            >
              <span>Browse All Products</span>
              <ArrowRight size={15} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Guarantees Banner */}
      <section className="bg-emerald-50/70 border-y border-emerald-100/80 py-10">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {qualityItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3.5 rounded-xl bg-white p-4 shadow-sm ring-1 ring-emerald-200/50"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <ShieldCheck size={20} aria-hidden />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-950">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Gallery Section */}
      <section id="quality" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 ring-1 ring-emerald-300/60">
              Manufacturing Standards
            </div>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl">
              Built for Strength. Made to Last.
            </h2>
            <p className="mt-3 text-sm font-medium text-slate-600">
              High-density polymers, precision stitching, and reinforced edges ensure peak performance and extreme tear resistance.
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-2">
            {galleryImages.map((image) => (
              <figure
                key={image.src}
                className="group relative self-start overflow-hidden rounded-2xl bg-emerald-50/70 p-3 ring-1 ring-emerald-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4"
              >
                <div className="overflow-hidden rounded-xl bg-white">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="h-auto w-full rounded-xl transition-transform duration-500 ease-out group-hover:scale-102"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={imageQuality}
                  />
                </div>
                <figcaption className="mt-3.5 px-1 text-xs font-black uppercase tracking-wider text-emerald-950">
                  {image.label}
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
