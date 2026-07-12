"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, Palette, Package, Ruler, Weight } from "lucide-react";
import {
  productGalleryImages,
  productKindLabel,
  productMainImage,
} from "../product-data";
import { useProducts } from "./useProducts";

type ProductDetailProps = {
  slug: string;
};

export function ProductDetail({ slug }: ProductDetailProps) {
  const { loaded, products } = useProducts();
  const [activeImagePath, setActiveImagePath] = useState<string | null>(null);
  const product = products.find((item) => item.slug === slug);

  if (!loaded) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-md bg-emerald-50 p-6 text-sm font-bold text-slate-700">
            Loading product...
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="rounded-md bg-emerald-50 p-6">
            <h1 className="text-2xl font-black uppercase tracking-normal text-slate-950">
              Product not found
            </h1>
            <Link
              href="/products"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-md bg-emerald-700 px-5 text-sm font-bold uppercase tracking-normal text-white hover:bg-emerald-800"
            >
              Back To Products
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

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div className="grid gap-4">
          {activeImage ? (
            <>
              <div className="overflow-hidden rounded-md bg-emerald-50">
                <img
                  src={activeImage.url}
                  alt={activeImage.alt}
                  className="max-h-[680px] w-full object-contain"
                />
              </div>
              {detailImages.length > 1 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {detailImages.map((image, index) => (
                    <button
                      key={image.path}
                      type="button"
                      onClick={() => setActiveImagePath(image.path)}
                      aria-label={`View ${index === 0 ? "main" : `image ${index + 1}`} for ${product.title}`}
                      className={`overflow-hidden rounded-md bg-emerald-50 ring-offset-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                        image.path === activeImage.path
                          ? "ring-2 ring-emerald-700"
                          : "hover:ring-2 hover:ring-emerald-200"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="aspect-square w-full object-contain"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex min-h-64 items-center justify-center rounded-md bg-emerald-50 p-6 text-center text-sm font-bold uppercase tracking-normal text-emerald-900">
              No product images
            </div>
          )}
        </div>

        <article className="self-start rounded-md bg-white p-5 shadow-sm ring-1 ring-emerald-100">
          <span className="inline-flex rounded-md bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-normal text-emerald-800">
            {productKindLabel(product.kind)}
          </span>
          <h1 className="mt-4 text-4xl font-black uppercase tracking-normal text-slate-950 sm:text-5xl">
            {product.title}
          </h1>
          <p className="mt-5 text-base font-semibold leading-7 text-slate-700">
            {product.description}
          </p>

          <dl className="mt-7 grid gap-4 text-sm font-bold text-slate-900">
            {product.color && (
              <div className="flex items-center gap-3">
                <Palette size={19} className="shrink-0 text-emerald-700" />
                <dt className="w-28 shrink-0 text-slate-500">Color</dt>
                <dd>{product.color}</dd>
              </div>
            )}
            {product.company && (
              <div className="flex items-center gap-3">
                <Building2 size={19} className="shrink-0 text-emerald-700" />
                <dt className="w-28 shrink-0 text-slate-500">Company</dt>
                <dd>{product.company}</dd>
              </div>
            )}
            {(product.lengthFeet || product.widthFeet) && (
              <div className="flex items-center gap-3">
                <Ruler size={19} className="shrink-0 text-emerald-700" />
                <dt className="w-28 shrink-0 text-slate-500">Dimensions</dt>
                <dd>
                  {product.lengthFeet ? `${product.lengthFeet} ft` : "Any length"}
                  {" x "}
                  {product.widthFeet ? `${product.widthFeet} ft` : "any width"}
                </dd>
              </div>
            )}
            {product.weight && (
              <div className="flex items-center gap-3">
                <Weight size={19} className="shrink-0 text-emerald-700" />
                <dt className="w-28 shrink-0 text-slate-500">Weight</dt>
                <dd>{product.weight}</dd>
              </div>
            )}
            {product.size && (
              <div className="flex items-center gap-3">
                <Package size={19} className="shrink-0 text-emerald-700" />
                <dt className="w-28 shrink-0 text-slate-500">Size</dt>
                <dd>{product.size}</dd>
              </div>
            )}
          </dl>

          <Link
            href="/products"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-md border border-emerald-700 px-5 text-sm font-bold uppercase tracking-normal text-emerald-800 hover:bg-emerald-50"
          >
            Back To Products
          </Link>
        </article>
      </div>
    </section>
  );
}
