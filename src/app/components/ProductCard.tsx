import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Palette, Package, Ruler, Weight } from "lucide-react";
import {
  type Product,
  productKindLabel,
  productMainImage,
  productSpecs,
} from "../product-data";

type ProductCardProps = {
  product: Product;
  actions?: ReactNode;
};

export function ProductCard({ product, actions }: ProductCardProps) {
  const specs = productSpecs(product);
  const coverImage = productMainImage(product);

  return (
    <article className="group flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm ring-1 ring-emerald-100/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/5 hover:ring-emerald-300">
      <div className="space-y-4">
        {coverImage && (
          <Link
            href={`/products/${product.slug}`}
            className="group/img relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-emerald-50/70"
          >
            <img
              src={coverImage.url}
              alt={coverImage.alt}
              className="h-full w-full object-contain p-2 transition-transform duration-500 ease-out group-hover/img:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" />
          </Link>
        )}

        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 ring-1 ring-emerald-200/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" aria-hidden />
              {productKindLabel(product.kind)}
            </span>
            <Link
              href={`/products/${product.slug}`}
              className="mt-3 block text-xl font-black uppercase tracking-normal text-slate-950 transition-colors group-hover:text-emerald-700"
            >
              {product.title}
            </Link>
          </div>
          {product.color && (
            <span
              className="h-8 w-8 shrink-0 rounded-full border-2 border-white ring-1 ring-emerald-300 shadow-sm"
              style={{ backgroundColor: product.color }}
              title={product.color}
            />
          )}
        </div>

        <p className="line-clamp-2 text-sm font-semibold leading-relaxed text-slate-600">
          {product.description}
        </p>

        <dl className="grid gap-2.5 text-xs font-bold text-slate-800">
          {product.color && (
            <div className="flex items-center gap-2.5">
              <Palette size={16} className="shrink-0 text-emerald-700" aria-hidden />
              <dt className="sr-only">Color</dt>
              <dd className="font-semibold text-slate-700">{product.color}</dd>
            </div>
          )}
          {product.company && (
            <div className="flex items-center gap-2.5">
              <Building2 size={16} className="shrink-0 text-emerald-700" aria-hidden />
              <dt className="sr-only">Company</dt>
              <dd className="font-semibold text-slate-700">{product.company}</dd>
            </div>
          )}
          {(product.lengthFeet || product.widthFeet) && (
            <div className="flex items-center gap-2.5">
              <Ruler size={16} className="shrink-0 text-emerald-700" aria-hidden />
              <dt className="sr-only">Dimensions</dt>
              <dd className="font-semibold text-slate-700">
                {product.lengthFeet ? `${product.lengthFeet} ft` : "Any length"}
                {" × "}
                {product.widthFeet ? `${product.widthFeet} ft` : "any width"}
              </dd>
            </div>
          )}
          {product.weight && (
            <div className="flex items-center gap-2.5">
              <Weight size={16} className="shrink-0 text-emerald-700" aria-hidden />
              <dt className="sr-only">Weight</dt>
              <dd className="font-semibold text-slate-700">{product.weight}</dd>
            </div>
          )}
          {product.size && (
            <div className="flex items-center gap-2.5">
              <Package size={16} className="shrink-0 text-emerald-700" aria-hidden />
              <dt className="sr-only">Size</dt>
              <dd className="font-semibold text-slate-700">{product.size}</dd>
            </div>
          )}
        </dl>

        {specs.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {specs.map((spec) => (
              <span
                key={spec}
                className="rounded-md bg-emerald-50/80 px-2.5 py-1 text-xs font-bold text-emerald-900 ring-1 ring-emerald-200/50"
              >
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 space-y-2">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-emerald-700/80 bg-white px-4 text-sm font-bold uppercase tracking-wider text-emerald-800 transition-all duration-200 hover:bg-emerald-700 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
        >
          <span>View Details</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>

        {actions}
      </div>
    </article>
  );
}
