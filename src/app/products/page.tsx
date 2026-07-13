import type { Metadata } from "next";
import { Header } from "../components/Header";
import { ProductsCatalog } from "../components/ProductsCatalog";
import { getServerProducts } from "../lib/products";
import {
  businessName,
  ogImagePath,
  siteUrl,
} from "../seo";
import { imageQuality, siteLogo, siteNavItems } from "../site-config";

const productsTitle = "Canvas, Tarpaulin & Sun Shade Nets Karachi";
const productsDescription =
  "Browse canvas cloth, tarpaulin, PVC cloth, sun shade nets and netting products from Mustafa Canvas in Karachi, Pakistan.";

export const revalidate = 300;

export const metadata: Metadata = {
  title: productsTitle,
  description: productsDescription,
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/products`,
    title: `${productsTitle} | ${businessName}`,
    description: productsDescription,
    images: [
      {
        url: ogImagePath,
        width: 2032,
        height: 774,
        alt: "Mustafa Canvas shade net, canvas and tarpaulin product range",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${productsTitle} | ${businessName}`,
    description: productsDescription,
    images: [ogImagePath],
  },
};

export default async function ProductsPage() {
  const result = await getServerProducts();

  return (
    <main className="flex flex-1 flex-col bg-white text-slate-950">
      <Header
        logo={siteLogo}
        navItems={siteNavItems}
        imageQuality={imageQuality}
      />
      <div className="flex-1">
        <ProductsCatalog
          initialProducts={result.status === "ok" ? result.products : undefined}
        />
      </div>
    </main>
  );
}
