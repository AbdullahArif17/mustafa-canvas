import Image, { getImageProps } from "next/image";
import Link from "next/link";
import {
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Hammer,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sun,
  Waves,
} from "lucide-react";
import { Header } from "./components/Header";
import { ProductShowcase } from "./components/ProductShowcase";
import {
  businessEmail,
  businessName,
  businessTagline,
  contactNumbers,
  facebookPageUrl,
  locationAddress,
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

const galleryImages = [
  { ...imagePaths.shadeNetMaterial, label: "Sun Shade Net Material" },
  { ...imagePaths.constructionNetting, label: "Construction Netting" },
  { ...imagePaths.schoolParkingShade, label: "School & Parking Shade" },
  { ...imagePaths.canvasRolls, label: "Shade Net & Canvas Solutions" },
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
      sameAs: [facebookPageUrl],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header
        logo={siteLogo}
        navItems={siteNavItems}
        imageQuality={imageQuality}
      />

      <section id="home" className="bg-white">
        <div className="mx-auto max-w-7xl pt-3 sm:px-6 sm:pt-7 lg:px-8">
          <div>
            <ResponsiveImage
              mobile={imagePaths.brandSheetMobile}
              desktop={imagePaths.brandSheet}
              sizes="(max-width: 639px) 100vw, (max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full sm:rounded-md"
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8">
          <div>
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

          <figure className="rounded-md bg-emerald-50 p-3 sm:p-4">
            <Image
              src={imagePaths.sunShadeScene.src}
              alt={imagePaths.sunShadeScene.alt}
              width={imagePaths.sunShadeScene.width}
              height={imagePaths.sunShadeScene.height}
              className="h-auto w-full rounded-sm"
              sizes="(max-width: 1024px) 100vw, 56vw"
              quality={imageQuality}
            />
            <figcaption className="mt-3 text-sm font-black uppercase tracking-normal text-emerald-900">
              Sun Shade Installation
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="solutions" className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-black uppercase tracking-normal text-emerald-200">
              Solutions
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-normal sm:text-4xl">
              Shade Net & Canvas Solutions
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {solutionItems.map(({ label, icon: Icon }) => (
              <article key={label} className="rounded-md bg-emerald-900 p-5">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md bg-white text-emerald-800">
                  <Icon size={22} aria-hidden />
                </div>
                <h3 className="text-lg font-black uppercase tracking-normal">
                  {label}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
              Products
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-normal text-slate-950 sm:text-4xl">
              Canvas, Tarpaulin & PVC Solutions
            </h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {productItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-md bg-emerald-50 px-4 py-3"
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

          <figure className="-mx-4 bg-white sm:mx-0 sm:rounded-md">
            <ResponsiveImage
              mobile={imagePaths.productRangeMobile}
              desktop={imagePaths.productRange}
              sizes="(max-width: 639px) 100vw, (max-width: 1024px) 100vw, 56vw"
              className="h-auto w-full sm:rounded-md"
            />
          </figure>
        </div>
      </section>

      <ProductShowcase />

      <section className="bg-emerald-50">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {qualityItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-md bg-white px-4 py-4"
            >
              <ShieldCheck size={22} className="shrink-0 text-emerald-700" />
              <span className="font-black uppercase tracking-normal text-slate-950">
                {item}
              </span>
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

          <div className="grid items-start gap-5 lg:grid-cols-2">
            {galleryImages.map((image) => (
              <figure
                key={image.src}
                className="self-start rounded-md bg-emerald-50 p-3"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-auto w-full rounded-sm"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={imageQuality}
                />
                <figcaption className="mt-3 text-sm font-black uppercase tracking-normal text-emerald-900">
                  {image.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-emerald-200">
              Contact
            </p>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-normal sm:text-4xl">
              Mustafa Canvas
            </h2>
            <p className="mt-4 max-w-xl text-lg font-bold text-emerald-100">
              Shade Net & Canvas Solutions
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
                    <div>
                      <div className="font-black uppercase tracking-normal">
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
              <ExternalLink
                className="shrink-0 text-emerald-700"
                size={22}
              />
              <span className="font-bold">Mustafa Canvas on Facebook</span>
            </a>

            <address className="flex items-start gap-4 rounded-md bg-white p-5 text-slate-950 not-italic">
              <MapPin className="mt-1 shrink-0 text-emerald-700" size={22} />
              <span className="font-bold leading-relaxed">
                {locationAddress}
              </span>
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

    </main>
  );
}
