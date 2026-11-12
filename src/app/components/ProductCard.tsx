import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Palette, Package, Ruler, Weight } from "lucide-react";
import {
  type Product,
  productKindLabel,
  productMainImage,
  productSpecs,
} from "../product-data";

const isOptimizableUrl = (url: string) =>
  url.startsWith("/") || /^https:\/\/[^/]+\.supabase\.co\//.test(url);

type ProductCardProps = {
  product: Product;
  actions?: ReactNode;
};

export function ProductCard({ product, actions }: ProductCardProps) {
  const specs = productSpecs(product);
  const coverImage = productMainImage(product);
  const hasDetails = Boolean(
    product.color ||
      product.company ||
      product.lengthFeet ||
      product.widthFeet ||
      product.weight ||
      product.size
  );

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-sm ring-1 ring-forest-100/90 doppelrand-card transition-all duration-300 hover:-translate-y-1 hover:ring-forest-300 hover:shadow-md">
      <div>
        {coverImage && (
          <Link
            href={`/products/${product.slug}`}
            className="group/img relative block aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-canvas-100/60"
          >
            <Image
              src={coverImage.url}
              alt={coverImage.alt}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
              unoptimized={!isOptimizableUrl(coverImage.url)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" />

            {/* Category Pill floating directly on top-left of image */}
            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-950/85 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase text-white backdrop-blur shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brass-400" aria-hidden />
                {productKindLabel(product.kind)}
              </span>
            </div>
          </Link>
        )}

        <div className="p-4 sm:p-5 space-y-3 sm:space-y-3.5">
          <div className="flex items-start justify-between gap-3">
            <Link
              href={`/products/${product.slug}`}
              className="block font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-forest-700"
            >
              {product.title}
            </Link>
            {product.color && (
              <span
                className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 rounded-full border border-white ring-1 ring-forest-300/80 shadow-sm mt-0.5"
                style={{ backgroundColor: product.color }}
                title={`Color: ${product.color}`}
              />
            )}
          </div>

          <p className="line-clamp-2 text-xs font-normal leading-relaxed text-slate-600">
            {product.description}
          </p>

          {hasDetails && (
            <dl className="grid gap-2 border-t border-forest-100/60 pt-3 text-xs text-slate-700">
              {product.color && (
                <div className="flex items-center gap-2">
                  <Palette size={14} className="shrink-0 text-forest-700" aria-hidden />
                  <dt className="text-slate-400 font-medium">Color:</dt>
                  <dd className="font-semibold text-slate-800">{product.color}</dd>
                </div>
              )}
              {product.company && (
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="shrink-0 text-forest-700" aria-hidden />
                  <dt className="text-slate-400 font-medium">Origin:</dt>
                  <dd className="font-semibold text-slate-800">{product.company}</dd>
                </div>
              )}
              {(product.lengthFeet || product.widthFeet) && (
                <div className="flex items-center gap-2">
                  <Ruler size={14} className="shrink-0 text-forest-700" aria-hidden />
                  <dt className="text-slate-400 font-medium">Dimensions:</dt>
                  <dd className="font-semibold text-slate-800">
                    {product.lengthFeet ? `${product.lengthFeet} ft` : "Standard"}
                    {" × "}
                    {product.widthFeet ? `${product.widthFeet} ft` : "Standard"}
                  </dd>
                </div>
              )}
              {product.weight && (
                <div className="flex items-center gap-2">
                  <Weight size={14} className="shrink-0 text-forest-700" aria-hidden />
                  <dt className="text-slate-400 font-medium">Weight:</dt>
                  <dd className="font-semibold text-slate-800">{product.weight}</dd>
                </div>
              )}
              {product.size && (
                <div className="flex items-center gap-2">
                  <Package size={14} className="shrink-0 text-forest-700" aria-hidden />
                  <dt className="text-slate-400 font-medium">Spec:</dt>
                  <dd className="font-semibold text-slate-800">{product.size}</dd>
                </div>
              )}
            </dl>
          )}

          {specs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {specs.map((spec) => (
                <span
                  key={spec}
                  className="rounded-md bg-canvas-100/80 px-2 py-0.5 text-[11px] font-medium text-forest-900 border border-canvas-200/60"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-2">
        <Link
          href={`/products/${product.slug}`}
          className="group/btn inline-flex h-11 w-full items-center justify-between rounded-xl border border-forest-200/90 bg-white px-4 text-xs font-semibold tracking-wide text-forest-900 transition-all duration-200 hover:bg-forest-900 hover:text-white hover:border-forest-900 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
        >
          <span>View Specifications</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-50 text-forest-800 transition-transform group-hover/btn:bg-white/20 group-hover/btn:text-white group-hover/btn:translate-x-0.5">
            <ArrowRight size={13} aria-hidden />
          </span>
        </Link>

        {actions}
      </div>
    </article>
  );
}
