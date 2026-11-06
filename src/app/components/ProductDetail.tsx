"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  Home,
  MessageCircleQuestion,
  Package,
  Palette,
  Phone,
  Ruler,
  ShieldCheck,
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
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="aspect-[4/3] rounded-2xl bg-emerald-50/60 animate-shimmer" />
            <div className="space-y-4">
              <div className="h-6 w-24 rounded-full animate-shimmer" />
              <div className="h-10 w-3/4 rounded-lg animate-shimmer" />
              <div className="h-20 w-full rounded-lg animate-shimmer" />
              <div className="h-32 w-full rounded-lg animate-shimmer" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-12">
            <h1 className="text-3xl font-black uppercase tracking-tight text-slate-950">
              Product Not Found
            </h1>
            <p className="mt-3 text-base font-semibold text-slate-600">
              The product you are looking for may have been moved or removed from our catalog.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 text-xs font-black uppercase tracking-wider text-white shadow-sm transition hover:bg-emerald-800"
            >
              <ArrowLeft size={16} />
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
    <section className="bg-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500"
        >
          <Link href="/" className="flex items-center gap-1.5 transition hover:text-emerald-700">
            <Home size={14} aria-hidden />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="text-slate-400" aria-hidden />
          <Link href="/products" className="transition hover:text-emerald-700">
            Products
          </Link>
          <ChevronRight size={13} className="text-slate-400" aria-hidden />
          <span className="truncate max-w-[200px] text-emerald-800 sm:max-w-none font-black">
            {product.title}
          </span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Images Section */}
          <div className="grid gap-4">
            {activeImage ? (
              <>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-emerald-50/70 p-4 ring-1 ring-emerald-100 shadow-sm sm:p-6">
                  <img
                    src={activeImage.url}
                    alt={activeImage.alt}
                    className="h-full w-full object-contain transition-all duration-300"
                  />
                  {detailImages.length > 1 && (
                    <div className="absolute bottom-3 right-3 rounded-full bg-slate-900/70 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                      Image {detailImages.findIndex((img) => img.path === activeImage.path) + 1} of {detailImages.length}
                    </div>
                  )}
                </div>

                {detailImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
                    {detailImages.map((image, index) => (
                      <button
                        key={image.path}
                        type="button"
                        onClick={() => setActiveImagePath(image.path)}
                        aria-label={`View image ${index + 1} for ${product.title}`}
                        className={`overflow-hidden rounded-xl bg-emerald-50/70 p-1.5 ring-offset-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                          image.path === activeImage.path
                            ? "ring-2 ring-emerald-700 shadow-sm"
                            : "opacity-75 hover:opacity-100 hover:ring-2 hover:ring-emerald-200"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          className="aspect-square w-full object-contain rounded-lg"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-emerald-50/50 p-6 text-center text-xs font-black uppercase tracking-wider text-emerald-900">
                No product images available
              </div>
            )}
          </div>

          {/* Details & Inquiries Column */}
          <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-emerald-100/90 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 ring-1 ring-emerald-200/60">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden />
                {productKindLabel(product.kind)}
              </span>

              {product.color && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Color:</span>
                  <span
                    className="h-7 w-7 rounded-full border-2 border-white ring-1 ring-emerald-300 shadow-sm"
                    style={{ backgroundColor: product.color }}
                    title={product.color}
                  />
                </div>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl">
              {product.title}
            </h1>

            <p className="mt-4 text-base font-semibold leading-relaxed text-slate-600">
              {product.description}
            </p>

            {/* Specifications Cards */}
            <div className="mt-8 border-t border-emerald-100 pt-6">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-900">
                Product Specifications
              </p>

              <dl className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {product.company && (
                  <div className="flex items-center gap-3 rounded-lg bg-emerald-50/60 p-3">
                    <Building2 size={18} className="shrink-0 text-emerald-700" aria-hidden />
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Company</dt>
                      <dd className="text-xs font-bold text-slate-900">{product.company}</dd>
                    </div>
                  </div>
                )}

                {(product.lengthFeet || product.widthFeet) && (
                  <div className="flex items-center gap-3 rounded-lg bg-emerald-50/60 p-3">
                    <Ruler size={18} className="shrink-0 text-emerald-700" aria-hidden />
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Dimensions</dt>
                      <dd className="text-xs font-bold text-slate-900">
                        {product.lengthFeet ? `${product.lengthFeet} ft` : "Any length"}
                        {" × "}
                        {product.widthFeet ? `${product.widthFeet} ft` : "any width"}
                      </dd>
                    </div>
                  </div>
                )}

                {product.weight && (
                  <div className="flex items-center gap-3 rounded-lg bg-emerald-50/60 p-3">
                    <Weight size={18} className="shrink-0 text-emerald-700" aria-hidden />
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Weight</dt>
                      <dd className="text-xs font-bold text-slate-900">{product.weight}</dd>
                    </div>
                  </div>
                )}

                {product.size && (
                  <div className="flex items-center gap-3 rounded-lg bg-emerald-50/60 p-3">
                    <Package size={18} className="shrink-0 text-emerald-700" aria-hidden />
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Size</dt>
                      <dd className="text-xs font-bold text-slate-900">{product.size}</dd>
                    </div>
                  </div>
                )}

                {product.color && (
                  <div className="flex items-center gap-3 rounded-lg bg-emerald-50/60 p-3">
                    <Palette size={18} className="shrink-0 text-emerald-700" aria-hidden />
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Color Tone</dt>
                      <dd className="text-xs font-bold text-slate-900">{product.color}</dd>
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
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-[#25d366] px-6 text-sm font-black uppercase tracking-wider text-white shadow-sm transition hover:bg-[#20ba59] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366] focus-visible:ring-offset-2"
              >
                <FaWhatsapp size={19} aria-hidden />
                <span>Inquire on WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:03482026858"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border-2 border-emerald-700 bg-white px-4 text-xs font-bold uppercase tracking-wider text-emerald-900 transition hover:bg-emerald-50 active:scale-[0.98]"
                >
                  <Phone size={15} aria-hidden />
                  <span>Call 0348</span>
                </a>

                <a
                  href="tel:03108117857"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border-2 border-emerald-700 bg-white px-4 text-xs font-bold uppercase tracking-wider text-emerald-900 transition hover:bg-emerald-50 active:scale-[0.98]"
                >
                  <Phone size={15} aria-hidden />
                  <span>Call 0310</span>
                </a>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-slate-500">
              <ShieldCheck size={16} className="text-emerald-700" aria-hidden />
              <span>Available for wholesale &amp; retail supply with delivery options.</span>
            </div>
          </article>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-emerald-100 pt-12">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
                  Recommended
                </p>
                <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-slate-950">
                  Related Products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-black uppercase tracking-wider text-emerald-800 hover:text-emerald-900"
              >
                View Catalog &rarr;
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
