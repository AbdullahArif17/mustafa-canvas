import type { ReactNode } from "react";
import Link from "next/link";
import { Building2, Images, Palette, Package, Ruler, Weight } from "lucide-react";
import { type Product, productKindLabel, productSpecs } from "../product-data";

type ProductCardProps = {
  product: Product;
  actions?: ReactNode;
};

export function ProductCard({ product, actions }: ProductCardProps) {
  const specs = productSpecs(product);
  const coverImage = product.images[0];

  return (
    <article className="grid gap-5 rounded-md bg-white p-5 shadow-sm ring-1 ring-emerald-100">
      {coverImage && (
        <Link
          href={`/products/${product.slug}`}
          className="block overflow-hidden rounded-md bg-emerald-50"
        >
          <img
            src={coverImage.url}
            alt={coverImage.alt}
            className="aspect-[4/3] w-full object-contain"
            loading="lazy"
          />
        </Link>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-md bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-normal text-emerald-800">
            {productKindLabel(product.kind)}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="mt-3 block text-xl font-black uppercase tracking-normal text-slate-950 hover:text-emerald-800"
          >
            {product.title}
          </Link>
        </div>
        {product.color && (
          <span
            className="h-9 w-9 shrink-0 rounded-full border border-emerald-200"
            style={{ backgroundColor: product.color }}
            title={product.color}
          />
        )}
      </div>

      <p className="text-sm font-semibold leading-6 text-slate-700">
        {product.description}
      </p>

      <dl className="grid gap-3 text-sm font-bold text-slate-900">
        {product.color && (
          <div className="flex items-center gap-3">
            <Palette size={18} className="shrink-0 text-emerald-700" />
            <dt className="sr-only">Color</dt>
            <dd>{product.color}</dd>
          </div>
        )}
        {product.company && (
          <div className="flex items-center gap-3">
            <Building2 size={18} className="shrink-0 text-emerald-700" />
            <dt className="sr-only">Company</dt>
            <dd>{product.company}</dd>
          </div>
        )}
        {(product.lengthFeet || product.widthFeet) && (
          <div className="flex items-center gap-3">
            <Ruler size={18} className="shrink-0 text-emerald-700" />
            <dt className="sr-only">Dimensions</dt>
            <dd>
              {product.lengthFeet ? `${product.lengthFeet} ft` : "Any length"}
              {" x "}
              {product.widthFeet ? `${product.widthFeet} ft` : "any width"}
            </dd>
          </div>
        )}
        {product.weight && (
          <div className="flex items-center gap-3">
            <Weight size={18} className="shrink-0 text-emerald-700" />
            <dt className="sr-only">Weight</dt>
            <dd>{product.weight}</dd>
          </div>
        )}
        {product.size && (
          <div className="flex items-center gap-3">
            <Package size={18} className="shrink-0 text-emerald-700" />
            <dt className="sr-only">Size</dt>
            <dd>{product.size}</dd>
          </div>
        )}
        {product.images.length > 1 && (
          <div className="flex items-center gap-3">
            <Images size={18} className="shrink-0 text-emerald-700" />
            <dt className="sr-only">Images</dt>
            <dd>{product.images.length} images</dd>
          </div>
        )}
      </dl>

      {specs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {specs.map((spec) => (
            <span
              key={spec}
              className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-normal text-emerald-900"
            >
              {spec}
            </span>
          ))}
        </div>
      )}

      <Link
        href={`/products/${product.slug}`}
        className="inline-flex h-11 items-center justify-center rounded-md border border-emerald-700 px-4 text-sm font-bold uppercase tracking-normal text-emerald-800 hover:bg-emerald-50"
      >
        View Product
      </Link>

      {actions}
    </article>
  );
}
