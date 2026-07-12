export type ProductKind = "net" | "plastic" | "other";

export const productImageBucket = "product-images";
export const maxProductImageBytes = 50 * 1024 * 1024;
export const maxProductImageMb = 50;

export type ProductImage = {
  url: string;
  path: string;
  alt: string;
};

export type Product = {
  id: string;
  kind: ProductKind;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  images: ProductImage[];
  color?: string;
  company?: string;
  lengthFeet?: number;
  widthFeet?: number;
  weight?: string;
  size?: string;
};

export type ProductInput = Omit<Product, "id" | "createdAt" | "slug" | "images"> & {
  slug?: string;
  images?: ProductImage[];
};

export type ProductRow = {
  id: string;
  kind: ProductKind;
  slug: string;
  title: string;
  description: string;
  color: string | null;
  company: string | null;
  created_at: string;
  length_feet: number | null;
  width_feet: number | null;
  weight: string | null;
  size: string | null;
  images: ProductImage[] | null;
};
export type ProductInsertRow = Omit<ProductRow, "id" | "created_at">;

export const productStorageKey = "mustafa-canvas-products-v1";
export const productStorageEvent = "mustafa-canvas-products-updated";

export const defaultProducts: Product[] = [];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function optionalText(value: unknown) {
  const result = text(value);
  return result || undefined;
}

function optionalPositiveNumber(value: unknown) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) && number > 0 ? number : undefined;
}

export function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "product";
}

function images(value: unknown): ProductImage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!isRecord(item)) {
        return null;
      }

      const url = text(item.url);
      const path = text(item.path);
      const alt = text(item.alt);

      if (!url || !path) {
        return null;
      }

      return {
        url,
        path,
        alt: alt || "Product image",
      };
    })
    .filter((item): item is ProductImage => item !== null);
}

function kind(value: unknown): ProductKind {
  if (value === "net" || value === "plastic" || value === "other") {
    return value;
  }

  return "other";
}

export function normalizeProduct(value: unknown): Product | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = text(value.id);
  const title = text(value.title);
  const description = text(value.description);
  const createdAt = text(value.createdAt) || text(value.created_at);

  if (!id || !title || !description || !createdAt) {
    return null;
  }

  return {
    id,
    kind: kind(value.kind),
    slug: slugify(text(value.slug) || title || id),
    title,
    description,
    createdAt,
    images: images(value.images),
    color: optionalText(value.color),
    company: optionalText(value.company),
    lengthFeet: optionalPositiveNumber(value.lengthFeet ?? value.length_feet),
    widthFeet: optionalPositiveNumber(value.widthFeet ?? value.width_feet),
    weight: optionalText(value.weight),
    size: optionalText(value.size),
  };
}

export function normalizeProductInput(value: unknown): ProductInput | null {
  if (!isRecord(value)) {
    return null;
  }

  const title = text(value.title);
  const description = text(value.description);

  if (!title || !description) {
    return null;
  }

  return {
    kind: kind(value.kind),
    slug: slugify(text(value.slug) || title),
    title,
    description,
    images: images(value.images),
    color: optionalText(value.color),
    company: optionalText(value.company),
    lengthFeet: optionalPositiveNumber(value.lengthFeet),
    widthFeet: optionalPositiveNumber(value.widthFeet),
    weight: optionalText(value.weight),
    size: optionalText(value.size),
  };
}

export function productRowToProduct(row: ProductRow): Product | null {
  return normalizeProduct({
    id: row.id,
    kind: row.kind,
    slug: row.slug,
    title: row.title,
    description: row.description,
    color: row.color,
    company: row.company,
    createdAt: row.created_at,
    images: row.images,
    lengthFeet: row.length_feet,
    widthFeet: row.width_feet,
    weight: row.weight,
    size: row.size,
  });
}

export function productInputToRow(product: ProductInput): ProductInsertRow {
  return {
    kind: product.kind,
    slug: slugify(product.slug || product.title),
    title: product.title,
    description: product.description,
    color: product.color || null,
    company: product.company || null,
    images: product.images || [],
    length_feet: product.lengthFeet || null,
    width_feet: product.widthFeet || null,
    weight: product.weight || null,
    size: product.size || null,
  };
}

export function productKindLabel(productKind: ProductKind) {
  if (productKind === "net") {
    return "Net";
  }

  if (productKind === "plastic") {
    return "Plastic";
  }

  return "Other";
}

export function productMainImage(product: Pick<Product, "images">) {
  return product.images[0];
}

export function productGalleryImages(product: Pick<Product, "images">) {
  return product.images.slice(1);
}

export function productSpecs(product: Product) {
  const specs = [];

  if (product.lengthFeet) {
    specs.push(`${product.lengthFeet} ft length`);
  }

  if (product.widthFeet) {
    specs.push(`${product.widthFeet} ft width`);
  }

  if (product.weight) {
    specs.push(product.weight);
  }

  if (product.size) {
    specs.push(product.size);
  }

  if (product.company) {
    specs.push(product.company);
  }

  return specs;
}
