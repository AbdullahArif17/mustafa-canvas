import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "../../components/ContactSection";
import { Header } from "../../components/Header";
import { ProductDetail } from "../../components/ProductDetail";
import { getServerProductBySlug } from "../../lib/products";
import {
  productKindLabel,
  productMainImage,
  type Product,
} from "../../product-data";
import { businessName, ogImagePath, siteUrl } from "../../seo";
import { imageQuality, siteLogo, siteNavItems } from "../../site-config";

type ProductDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

function localizedProductTitle(product: Product) {
  return product.title.toLowerCase().includes("karachi")
    ? product.title
    : `${product.title} in Karachi`;
}

function productDescription(product: Product) {
  const description = product.description.replace(/\s+/g, " ").trim();
  const value = `${product.title} from ${businessName} in Karachi, Pakistan. ${description}`;

  if (value.length <= 160) {
    return value;
  }

  const shortened = value.slice(0, 157).replace(/\s+\S*$/, "").trimEnd();
  return `${shortened}...`;
}

function productJsonLd(product: Product) {
  const url = `${siteUrl}/products/${product.slug}`;
  const additionalProperty = [
    product.company && { name: "Company", value: product.company },
    product.lengthFeet && {
      name: "Length",
      value: `${product.lengthFeet} ft`,
    },
    product.widthFeet && {
      name: "Width",
      value: `${product.widthFeet} ft`,
    },
    product.weight && { name: "Weight", value: product.weight },
    product.size && { name: "Size", value: product.size },
  ]
    .filter(Boolean)
    .map((property) => ({
      "@type": "PropertyValue",
      ...property,
    }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${url}#product`,
        name: product.title,
        description: product.description,
        url,
        image: product.images.map((image) => image.url),
        sku: product.id,
        category: productKindLabel(product.kind),
        brand: {
          "@type": "Brand",
          name: businessName,
        },
        color: product.color,
        additionalProperty:
          additionalProperty.length > 0 ? additionalProperty : undefined,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Products",
            item: `${siteUrl}/products`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.title,
            item: url,
          },
        ],
      },
    ],
  };
}

function serializeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getServerProductBySlug(slug);
  const product = result.product;

  if (!product) {
    return {
      title: "Product Details",
      description:
        "View product specifications and images from Mustafa Canvas in Karachi, Pakistan.",
      alternates: {
        canonical: `/products/${slug}`,
      },
      robots:
        result.status === "ok"
          ? { index: false, follow: true }
          : { index: true, follow: true },
    };
  }

  const title = localizedProductTitle(product);
  const description = productDescription(product);
  const url = `${siteUrl}/products/${product.slug}`;
  const mainImage = productMainImage(product);
  const socialImage = mainImage?.url || ogImagePath;

  return {
    title,
    description,
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      type: "website",
      url,
      title: `${title} | ${businessName}`,
      description,
      images: [
        {
          url: socialImage,
          alt: mainImage?.alt || `${product.title} from ${businessName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${businessName}`,
      description,
      images: [socialImage],
    },
  };
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const result = await getServerProductBySlug(slug);

  if (result.status === "ok" && !result.product) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col bg-white text-slate-950">
      {result.product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(productJsonLd(result.product)),
          }}
        />
      )}
      <Header
        logo={siteLogo}
        navItems={siteNavItems}
        imageQuality={imageQuality}
      />
      <div className="flex-1">
        <ProductDetail
          slug={slug}
          initialProduct={result.product || undefined}
        />
      </div>
      <ContactSection />
    </main>
  );
}
