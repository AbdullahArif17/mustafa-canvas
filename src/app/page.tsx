import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Hammer,
  Leaf,
  Layers,
  Package,
  Ruler,
  ShieldCheck,
  Sparkles,
  Sun,
  Truck,
  Waves,
} from "lucide-react";
import { ContactSection } from "./components/ContactSection";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ProductShowcase } from "./components/ProductShowcase";
import { SeoFaqSection } from "./components/SeoFaqSection";
import {
  businessEmail,
  businessName,
  businessTagline,
  contactNumbers,
  facebookPageUrl,
  faqItems,
  instagramPageUrl,
  locationAddress,
  logoPath,
  ogImagePath,
  productNames,
  seoDescription,
  seoKeywords,
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
    width: 1080,
    height: 2858,
  },
  shadeNetMaterial: {
    src: "/sun-shade-net-material.png",
    alt: "Green sun shade net material details with virgin HDPE knotting",
    width: 1254,
    height: 1254,
  },
  canvasRolls: {
    src: "/canvas-and-shade-net-rolls.png",
    alt: "Wholesale complete rolls of canvas and green shade nets",
    width: 1254,
    height: 1254,
  },
  schoolParkingShade: {
    src: "/school-parking-shade-installation.png",
    alt: "Tensile parking shade and school sunshade installation",
    width: 941,
    height: 1672,
  },
  constructionNetting: {
    src: "/construction-netting-installation.png",
    alt: "Green construction netting and debris safety installation",
    width: 1254,
    height: 1254,
  },
  productRange: {
    src: "/mustafa-canvas-product-catalog.png",
    alt: "Mustafa Canvas green nets, Haripur nets, and canvas catalog",
    width: 1396,
    height: 905,
  },
  productRangeMobile: {
    src: "/mustafa-canvas-product-catalog-mobile.png",
    alt: "Mustafa Canvas product catalog mobile view",
    width: 1080,
    height: 2607,
  },
  sunShadeScene: {
    src: "/sun-shade-net-installation.png",
    alt: "Green shade net outdoor installation in Karachi",
    width: 1254,
    height: 1254,
  },
};

const solutionItems = [
  {
    label: "Green Shade Nets",
    icon: Sun,
    description: "High-density UV-treated green fabric reducing heat up to 90% for outdoor, school & residential spaces.",
  },
  {
    label: "Construction Netting",
    icon: Hammer,
    description: "Heavy-duty safety debris netting engineered to prevent falling hazards on building and scaffolding projects.",
  },
  {
    label: "Haripur Nursery Netting",
    icon: Leaf,
    description: "Authentic Haripur agricultural netting for optimum sunlight diffusion and microclimate moisture retention.",
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

const wholesaleRollItems = [
  {
    title: "Green Shade Net Complete Rolls",
    spec: "50m & 100m Master Rolls",
    density: "50%, 75%, 85%, 90% Blockade",
    desc: "Virgin HDPE lock-stitched rolls that will not unravel when cut. Perfect for greenhouses, agricultural nurseries, and commercial parking canopies.",
    badge: "High Demand",
  },
  {
    title: "Authentic Haripur Net Rolls",
    spec: "Factory Sealed Complete Rolls",
    density: "Heavy Tensile Knotting",
    desc: "Genuine Haripur nets famous across Pakistan for extreme wind tolerance, tear resistance, and anti-aging UV stabilizers.",
    badge: "Haripur Certified",
  },
  {
    title: "Waterproof Canvas Cloth Rolls",
    spec: "50 Yards Master Bolts",
    density: "10oz, 12oz, 16oz Duck Fabric",
    desc: "Heavy-duty 100% cotton duck canvas rolls chemically treated for maximum water repellency, abrasion resistance, and military tent specs.",
    badge: "Industrial Grade",
  },
  {
    title: "Heavy-Duty PVC Tarpaulin Rolls",
    spec: "Standard Master Widths",
    density: "Multi-Layer Vinyl Coated",
    desc: "Tear-proof waterproof PVC vinyl fabric rolls engineered for long-haul transport truck covers, industrial floor tarps, and machinery sheds.",
    badge: "100% Waterproof",
  },
];

const productItems = [
  "Green Sun Shade Nets (50%-90%)",
  "Authentic Haripur Netting",
  "Wholesale Complete Rolls (50m/100m)",
  "Waterproof Canvas Cloth Rolls",
  "Heavy-Duty Vinyl Tarpaulin",
  "Vinyl PVC Coated Cloth",
  "Construction Debris Netting",
  "Agricultural Nursery Green Net",
  "Commercial Tents & Canopies",
  "Custom Stitched Tool & Supply Bags",
];

const qualityItems = [
  {
    title: "Virgin HDPE Polymer",
    desc: "100% pure polymer yarns with extreme tensile tear strength",
  },
  {
    title: "UV Blockade & Heat Guard",
    desc: "Stabilized against thermal degradation and intense sun radiation",
  },
  {
    title: "Wholesale Complete Rolls",
    desc: "Factory-sealed 50m and 100m rolls ready for bulk freight dispatch",
  },
  {
    title: "Direct Karachi Factory Pricing",
    desc: "Wholesale rates direct from our Khori Garden market shop",
  },
];

const galleryImages = [
  { ...imagePaths.shadeNetMaterial, label: "Green Shade Net Material", tag: "Virgin HDPE Polymer" },
  { ...imagePaths.constructionNetting, label: "Construction Debris Netting", tag: "Safety Certified" },
  { ...imagePaths.schoolParkingShade, label: "School & Parking Shade", tag: "Architectural Tensile" },
  { ...imagePaths.canvasRolls, label: "Wholesale Complete Rolls", tag: "Factory Ready" },
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
      "@type": ["LocalBusiness", "WholesaleStore"],
      "@id": `${siteUrl}/#localbusiness`,
      name: `${businessName} - Green Nets, Haripur Nets & Canvas Wholesale Shop`,
      url: siteUrl,
      logo: `${siteUrl}${logoPath}`,
      image: [
        `${siteUrl}${ogImagePath}`,
        `${siteUrl}${logoPath}`,
        `${siteUrl}/mustafa-canvas-business-card.jpg`,
      ],
      description: seoDescription,
      email: businessEmail,
      sameAs: [facebookPageUrl, instagramPageUrl],
      telephone: contactNumbers.map((contact) => `+${contact.whatsapp}`),
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Shop # 1, MR 1/72, Fazal Chamber, Murad Khan Rd, Khori Garden, Market Quarter",
        addressLocality: "Karachi",
        addressRegion: "Sindh",
        postalCode: "74000",
        addressCountry: "PK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 24.8569,
        longitude: 66.9998,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "20:00",
        },
      ],
      areaServed: [
        { "@type": "City", name: "Karachi" },
        { "@type": "City", name: "Lahore" },
        { "@type": "City", name: "Islamabad" },
        { "@type": "City", name: "Rawalpindi" },
        { "@type": "City", name: "Peshawar" },
        { "@type": "City", name: "Quetta" },
        { "@type": "City", name: "Multan" },
        { "@type": "City", name: "Faisalabad" },
        { "@type": "City", name: "Haripur" },
        { "@type": "Country", name: "Pakistan" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Wholesale Complete Rolls & Canvas Inventory",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Haripur Green Nets (Complete Master Rolls)",
              description:
                "Authentic Haripur UV-stabilized green nets for agricultural nurseries, greenhouses, and sunshade structures in 50m and 100m complete rolls.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Green Sun Shade Nets (50%, 75%, 85%, 90% Blockade)",
              description:
                "High-density virgin HDPE green shade net rolls for temperature reduction, car parking, and open lawns.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Waterproof Canvas Cloth Complete Rolls",
              description:
                "Heavy-duty cotton duck canvas cloth rolls for military tents, truck covers, and tool bags.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Heavy-Duty Vinyl PVC Tarpaulin Master Rolls",
              description:
                "100% waterproof heavy-duty PVC coated tarpaulin sheets and master rolls for industrial transport and weather protection.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Construction Safety Debris Netting Rolls",
              description:
                "Flame retardant building scaffolding debris netting rolls for construction site safety.",
            },
          },
        ],
      },
      knowsAbout: productNames,
      keywords: seoKeywords.join(", "),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
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

      {/* Hero Section with SEO Title & H1 */}
      <HeroSection
        brandSheet={imagePaths.brandSheet}
        brandSheetMobile={imagePaths.brandSheetMobile}
        sunShadeScene={imagePaths.sunShadeScene}
        imageQuality={imageQuality}
      />

      {/* Applications & Solutions Section */}
      <section id="solutions" className="relative overflow-hidden bg-gradient-to-b from-forest-950 via-[#071d18] to-forest-950 py-12 sm:py-20 lg:py-28 text-white">
        <div className="pointer-events-none absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-forest-800/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-brass-500/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-14 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-700/60 bg-forest-900/80 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-brass-300">
              <span className="h-1.5 w-1.5 rounded-full bg-brass-400" />
              <span>Specialized Applications</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Engineered Green Nets &amp; Safety Solutions
            </h2>
            <p className="mt-3 sm:mt-4 text-sm font-normal leading-relaxed text-forest-200/90 sm:text-lg">
              Precision-woven polymer solutions designed for high-heat protection, dust suppression, agricultural microclimates, and commercial safety across Pakistan.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {solutionItems.map(({ label, icon: Icon, description }) => (
              <article
                key={label}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass-400/40 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-forest-950/40"
              >
                <div>
                  <div className="mb-4 sm:mb-5 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-forest-900 border border-forest-700 text-brass-300 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-brass-400 group-hover:text-brass-200">
                    <Icon size={20} aria-hidden />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-bold tracking-normal text-white">
                    {label}
                  </h3>
                  <p className="mt-2 text-xs font-normal leading-relaxed text-forest-200/80">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Wholesale Complete Rolls Section (Targeting "wholesale complete rolls", "green nets", "haripur nets") */}
      <section id="wholesale-rolls" className="bg-white py-12 sm:py-20 lg:py-28 border-b border-forest-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-forest-50/70 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-900">
              <Boxes size={14} className="text-forest-700" />
              <span>Bulk Factory Supply</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-forest-950 sm:text-4xl lg:text-5xl">
              Wholesale Complete Rolls &amp; Master Sizing
            </h2>
            <p className="mt-3 sm:mt-4 text-sm font-normal leading-relaxed text-slate-600 sm:text-lg">
              Mustafa Canvas is Karachi&apos;s primary stockist of factory-sealed complete rolls. We deliver 50-meter and 100-meter master rolls of genuine Haripur nets, green shade fabric, waterproof canvas, and PVC tarpaulins directly to commercial contractors and agricultural resellers across Pakistan.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wholesaleRollItems.map((item) => (
              <article
                key={item.title}
                className="group flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-forest-100 bg-canvas-50/50 p-4 sm:p-6 shadow-sm doppelrand-card transition-all duration-300 hover:-translate-y-1 hover:border-forest-300 hover:bg-white hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-forest-100/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-forest-800">
                      {item.badge}
                    </span>
                    <Package size={18} className="text-forest-600" aria-hidden />
                  </div>

                  <h3 className="mt-3 sm:mt-4 font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-forest-800 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mt-2.5 sm:mt-3 space-y-1 text-xs">
                    <p className="font-semibold text-forest-800">{item.spec}</p>
                    <p className="text-slate-500 font-medium">{item.density}</p>
                  </div>

                  <p className="mt-2.5 sm:mt-3 text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-forest-100/70">
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-forest-800 group-hover:text-forest-950 transition-colors"
                  >
                    <span>Request Wholesale Rate</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 sm:mt-10 rounded-2xl border border-forest-200/80 bg-forest-50/60 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-forest-900 text-white">
                <Truck size={18} />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-forest-950">
                  Nationwide Bulk Freight &amp; Direct Transport Dispatch
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Daily wholesale dispatches of complete rolls to Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, Multan, Faisalabad, and all cities.
                </p>
              </div>
            </div>

            <Link
              href="#contact"
              className="inline-flex h-11 w-full sm:w-auto items-center justify-center whitespace-nowrap rounded-full bg-forest-900 px-5 text-xs font-semibold tracking-wide text-white transition hover:bg-forest-800"
            >
              Order Complete Rolls
            </Link>
          </div>
        </div>
      </section>

      {/* Core Products Overview Section */}
      <section id="products" className="bg-canvas-50/50 py-12 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 sm:gap-14 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-white px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-900 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
              <span>Core Manufacturing Line</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-forest-950 sm:text-4xl lg:text-5xl">
              Canvas, Tarpaulin &amp; Green Nets
            </h2>
            <p className="mt-3 sm:mt-4 text-sm font-normal leading-relaxed text-slate-600 sm:text-lg">
              From heavy cotton duck canvas to waterproof vinyl tarpaulins, authentic Haripur netting, and custom stitched tool kits, each fabric is manufactured to withstand intense abrasion, monsoon downpours, and relentless sun.
            </p>

            <div className="mt-6 sm:mt-8 grid gap-2.5 sm:gap-3 sm:grid-cols-2">
              {productItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-forest-100/90 bg-white p-3 sm:p-3.5 shadow-sm transition-all hover:border-forest-300 hover:shadow"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-forest-700"
                    aria-hidden
                  />
                  <span className="text-xs font-semibold text-slate-800">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <Link
                href="/products"
                className="group inline-flex h-12 w-full sm:w-auto items-center justify-between sm:justify-start gap-3 rounded-full bg-forest-900 pl-6 pr-2 text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
              >
                <span>Browse Full Product Range</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight size={14} aria-hidden />
                </span>
              </Link>
            </div>
          </div>

          <figure className="overflow-hidden rounded-2xl shadow-md">
            <ResponsiveImage
              mobile={imagePaths.productRangeMobile}
              desktop={imagePaths.productRange}
              sizes="(max-width: 639px) 100vw, (max-width: 1024px) 100vw, 56vw"
              className="h-auto w-full rounded-2xl object-cover"
            />
          </figure>
        </div>
      </section>

      {/* Dynamic Product Showcase with Slideshow & Skeletons */}
      <ProductShowcase />

      {/* Karachi Market Authority & Canvas Shop Section (Targeting "canvas shops in Karachi", "haripur nets") */}
      <section aria-labelledby="karachi-products-heading" className="bg-white py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-forest-50/60 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-900">
              <Building2 size={13} className="text-forest-700" />
              <span>Historic Karachi Wholesale Hub</span>
            </div>
            <h2
              id="karachi-products-heading"
              className="mt-4 font-display text-2xl font-extrabold tracking-tight text-forest-950 sm:text-4xl lg:text-5xl"
            >
              Leading Canvas Shop in Karachi &mdash; Khori Garden
            </h2>
            <p className="mt-3 sm:mt-4 text-sm font-normal leading-relaxed text-slate-600 sm:text-lg">
              Operating directly from Fazal Chamber, Murad Khan Road, Khori Garden, Market Quarter, Karachi, Mustafa Canvas is recognized as one of the most reliable canvas shops in Karachi. We supply authentic Haripur nets, heavy-duty tarpaulins, and wholesale complete rolls across Pakistan with unmatched quality control.
            </p>
          </div>

          <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
            <article className="rounded-2xl sm:rounded-3xl border border-forest-100 bg-white p-4 sm:p-6 shadow-sm doppelrand-card transition-all hover:border-forest-300 hover:shadow-md">
              <div className="mb-4 sm:mb-5 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-forest-50 border border-forest-100 text-forest-800">
                <Layers size={20} aria-hidden />
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                Canvas Shop &amp; Cloth Rolls
              </h3>
              <p className="mt-2 text-xs font-normal leading-relaxed text-slate-600">
                Waterproof canvas cloth, tents, transport covers, supply bags, and durable tool bags engineered for maximum tensile strength and longevity.
              </p>
            </article>

            <article className="rounded-2xl sm:rounded-3xl border border-forest-100 bg-white p-4 sm:p-6 shadow-sm doppelrand-card transition-all hover:border-forest-300 hover:shadow-md">
              <div className="mb-4 sm:mb-5 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-forest-50 border border-forest-100 text-forest-800">
                <ShieldCheck size={20} aria-hidden />
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                Tarpaulins &amp; Vinyl PVC
              </h3>
              <p className="mt-2 text-xs font-normal leading-relaxed text-slate-600">
                Heavy-duty tarpaulin sheets and waterproof PVC coated fabrics designed to protect industrial machinery, transport cargo, and raw materials.
              </p>
            </article>

            <article className="rounded-2xl sm:rounded-3xl border border-forest-100 bg-white p-4 sm:p-6 shadow-sm doppelrand-card transition-all hover:border-forest-300 hover:shadow-md">
              <div className="mb-4 sm:mb-5 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-forest-50 border border-forest-100 text-forest-800">
                <Sun size={20} aria-hidden />
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900">
                Haripur Green Nets
              </h3>
              <p className="mt-2 text-xs font-normal leading-relaxed text-slate-600">
                Genuine Haripur green nets, agricultural nursery netting, construction debris netting, and car parking shades available in custom sizes and wholesale complete rolls.
              </p>
            </article>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-3.5">
            <Link
              href="/products"
              className="group inline-flex h-12 w-full sm:w-auto items-center justify-between sm:justify-start gap-3 rounded-full bg-forest-900 pl-6 pr-2 text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
            >
              <span>Explore All Products</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowRight size={14} aria-hidden />
              </span>
            </Link>

            <Link
              href="#contact"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-forest-200 bg-white px-6 text-xs font-semibold tracking-wide text-forest-900 shadow-sm transition hover:bg-forest-50 hover:border-forest-300 active:scale-95"
            >
              <ShieldCheck size={16} className="text-forest-700" />
              <span>Official Business Card &amp; Shop Details</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Guarantees Banner */}
      <section className="bg-canvas-50/80 border-y border-forest-100/80 py-8 sm:py-12">
        <div className="mx-auto grid max-w-7xl gap-3 sm:gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {qualityItems.map(({ title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded-2xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-forest-100/90 doppelrand-card"
            >
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-800">
                <ShieldCheck size={18} aria-hidden />
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
      <section id="quality" className="bg-white py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-forest-50/60 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-900">
              <span>Manufacturing Standards</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-forest-950 sm:text-4xl lg:text-5xl">
              Precision Weaving &amp; Wholesale Complete Rolls
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal">
              High-density virgin polymers, precision industrial lock-stitching, and reinforced hems ensure supreme tear resistance under harsh monsoon weather and severe summer heat.
            </p>
          </div>

          <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-2">
            {galleryImages.map((image) => (
              <figure
                key={image.src}
                className="group relative self-start overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-auto w-full rounded-2xl transition-transform duration-700 ease-out group-hover:scale-102"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={imageQuality}
                />
                <figcaption className="mt-3 flex items-center justify-between px-1">
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

      {/* SEO FAQ Knowledge Base (Renders on-page & matches FAQPage Schema) */}
      <SeoFaqSection />

      {/* Contact & Business Card Section */}
      <ContactSection />
    </main>
  );
}
