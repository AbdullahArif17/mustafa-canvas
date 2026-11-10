"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Home,
  Package,
  Palette,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  Weight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  productGalleryImages,
  productKindLabel,
  productMainImage,
  type Product,
} from "../product-data";
import { ProductCard } from "./ProductCard";
import { useProducts } from "./useProducts";

type ProductDetailProps = {
  slug: string;
  initialProduct?: Product;
};

export function ProductDetail({ slug, initialProduct }: ProductDetailProps) {
  const { loaded, products } = useProducts(
    initialProduct ? [initialProduct] : undefined
  );
  const [activeImagePath, setActiveImagePath] = useState<string | null>(null);
  const product = products.find((item) => item.slug === slug);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && (p.kind === product.kind || p.company === product.company))
      .slice(0, 3);
  }, [product, products]);

  if (!loaded) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="aspect-[4/3] rounded-3xl bg-canvas-100/60 animate-shimmer" />
            <div className="space-y-4">
              <div className="h-6 w-24 rounded-full animate-shimmer" />
              <div className="h-10 w-3/4 rounded-xl animate-shimmer" />
              <div className="h-20 w-full rounded-xl animate-shimmer" />
              <div className="h-32 w-full rounded-xl animate-shimmer" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="bg-white py-24">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-forest-100 bg-canvas-50/60 p-12 doppelrand-card">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-forest-950">
              Product Not Found
            </h1>
            <p className="mt-3 text-sm font-normal text-slate-500">
              The product you are looking for may have been moved or removed from our catalog.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-forest-900 px-6 text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-forest-800"
            >
              <ArrowLeft size={15} />
              <span>Back To All Products</span>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const mainImage = productMainImage(product);
  const detailImages = mainImage
    ? [mainImage, ...productGalleryImages(product)]
    : [];
  const activeImage =
    detailImages.find((image) => image.path === activeImagePath) || mainImage;

  const whatsappInquiryUrl = `https://wa.me/923482026858?text=${encodeURIComponent(
    `Hello Mustafa Canvas, I want to inquire about "${product.title}" (${productKindLabel(product.kind)}).`
  )}`;

  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500"
        >
          <Link href="/" className="flex items-center gap-1.5 transition hover:text-forest-900">
            <Home size={14} aria-hidden />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="text-slate-300" aria-hidden />
          <Link href="/products" className="transition hover:text-forest-900">
            Products
          </Link>
          <ChevronRight size={13} className="text-slate-300" aria-hidden />
          <span className="truncate max-w-[200px] text-forest-900 font-semibold sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Images Section */}
          <div className="grid gap-3 sm:gap-4">
            {activeImage ? (
              <>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-canvas-50/80 ring-1 ring-forest-100 shadow-sm doppelrand-card">
                  <img
                    src={activeImage.url}
                    alt={activeImage.alt}
                    className="h-full w-full object-cover transition-all duration-300"
                  />
                  {detailImages.length > 1 && (
                    <div className="absolute bottom-3 right-3 rounded-full bg-slate-900/75 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                      Image {detailImages.findIndex((img) => img.path === activeImage.path) + 1} of {detailImages.length}
                    </div>
                  )}
                </div>

                {detailImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 sm:grid-cols-5">
                    {detailImages.map((image, index) => (
                      <button
                        key={image.path}
                        type="button"
                        onClick={() => setActiveImagePath(image.path)}
                        aria-label={`View image ${index + 1} for ${product.title}`}
                        className={`overflow-hidden rounded-xl bg-canvas-50 ring-offset-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 ${
                          image.path === activeImage.path
                            ? "ring-2 ring-forest-800 shadow-sm"
                            : "opacity-75 hover:opacity-100 hover:ring-2 hover:ring-forest-200"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="aspect-square w-full object-cover rounded-xl"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl sm:rounded-3xl bg-canvas-50 p-6 text-center text-xs font-semibold text-slate-400">
                No product images available
              </div>
            )}
          </div>

          {/* Details & Inquiries Column */}
          <article className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-8 shadow-sm ring-1 ring-forest-100/90 doppelrand-card">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-50 border border-forest-200/60 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-forest-800">
                <span className="h-1.5 w-1.5 rounded-full bg-forest-600" aria-hidden />
                {productKindLabel(product.kind)}
              </span>

              {product.color && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-400">Color:</span>
                  <span
                    className="h-6 w-6 rounded-full border border-white ring-1 ring-forest-300 shadow-sm"
                    style={{ backgroundColor: product.color }}
                    title={`Color: ${product.color}`}
                  />
                </div>
              )}
            </div>

            <h1 className="mt-3.5 sm:mt-4 font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-forest-950">
              {product.title}
            </h1>

            <p className="mt-4 text-base font-normal leading-relaxed text-slate-600">
              {product.description}
            </p>

            {/* Specifications Cards */}
            <div className="mt-8 border-t border-forest-100/80 pt-6">
              <p className="font-display text-xs font-bold uppercase tracking-wider text-forest-950">
                Product Specifications
              </p>

              <dl className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {product.company && (
                  <div className="flex items-center gap-3 rounded-xl border border-forest-100/70 bg-canvas-50/60 p-3.5">
                    <Building2 size={18} className="shrink-0 text-forest-700" aria-hidden />
                    <div>
                      <dt className="text-[11px] font-medium text-slate-400">Origin / Brand</dt>
                      <dd className="font-display text-xs font-bold text-slate-900">{product.company}</dd>
                    </div>
                  </div>
                )}

                {(product.lengthFeet || product.widthFeet) && (
                  <div className="flex items-center gap-3 rounded-xl border border-forest-100/70 bg-canvas-50/60 p-3.5">
                    <Ruler size={18} className="shrink-0 text-forest-700" aria-hidden />
                    <div>
                      <dt className="text-[11px] font-medium text-slate-400">Dimensions</dt>
                      <dd className="font-display text-xs font-bold text-slate-900">
                        {product.lengthFeet ? `${product.lengthFeet} ft` : "Custom"}
                        {" × "}
                        {product.widthFeet ? `${product.widthFeet} ft` : "custom"}
                      </dd>
                    </div>
                  </div>
                )}

                {product.weight && (
                  <div className="flex items-center gap-3 rounded-xl border border-forest-100/70 bg-canvas-50/60 p-3.5">
                    <Weight size={18} className="shrink-0 text-forest-700" aria-hidden />
                    <div>
                      <dt className="text-[11px] font-medium text-slate-400">Weight Specification</dt>
                      <dd className="font-display text-xs font-bold text-slate-900">{product.weight}</dd>
                    </div>
                  </div>
                )}

                {product.size && (
                  <div className="flex items-center gap-3 rounded-xl border border-forest-100/70 bg-canvas-50/60 p-3.5">
                    <Package size={18} className="shrink-0 text-forest-700" aria-hidden />
                    <div>
                      <dt className="text-[11px] font-medium text-slate-400">Standard Spec</dt>
                      <dd className="font-display text-xs font-bold text-slate-900">{product.size}</dd>
                    </div>
                  </div>
                )}

                {product.color && (
                  <div className="flex items-center gap-3 rounded-xl border border-forest-100/70 bg-canvas-50/60 p-3.5">
                    <Palette size={18} className="shrink-0 text-forest-700" aria-hidden />
                    <div>
                      <dt className="text-[11px] font-medium text-slate-400">Color Tone</dt>
                      <dd className="font-display text-xs font-bold text-slate-900">{product.color}</dd>
                    </div>
                  </div>
                )}
              </dl>
            </div>

            {/* Direct Inquiries & Actions */}
            <div className="mt-8 space-y-3">
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#25d366] px-6 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:bg-[#20ba59] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] focus-visible:ring-offset-2"
              >
                <FaWhatsapp size={18} aria-hidden />
                <span>Inquire on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:03108117857"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-forest-200 bg-white px-4 text-xs font-semibold tracking-wide text-forest-900 transition hover:bg-forest-50 active:scale-[0.98]"
                >
                  <Phone size={14} aria-hidden />
                  <span>Call Mustafa</span>
                </a>

                <a
                  href="tel:03002661044"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-forest-200 bg-white px-4 text-xs font-semibold tracking-wide text-forest-900 transition hover:bg-forest-50 active:scale-[0.98]"
                >
                  <Phone size={14} aria-hidden />
                  <span>Call Abid</span>
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 border-t border-forest-100/70 pt-5 text-xs text-slate-500">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck size={16} className="text-forest-700 shrink-0" aria-hidden />
                <span>Available for wholesale &amp; retail supply with delivery options.</span>
              </div>
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 font-semibold text-forest-800 hover:text-forest-950 transition-colors"
              >
                <span>View Official Business Card &amp; Shop Location</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </article>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-forest-100/80 pt-14">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-full border border-forest-200/80 bg-forest-50/60 px-3 py-0.5 text-[10px] font-semibold tracking-widest uppercase text-forest-800">
                  <Sparkles size={11} className="text-brass-600" />
                  <span>Recommended</span>
                </p>
                <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-forest-950 sm:text-3xl">
                  Related Fabric Products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold tracking-wide text-forest-800 hover:text-forest-950"
              >
                View Full Catalog &rarr;
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
