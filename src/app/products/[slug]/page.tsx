import type { Metadata } from "next";
import { Header } from "../../components/Header";
import { ProductDetail } from "../../components/ProductDetail";
import { businessName } from "../../seo";
import { imageQuality, siteLogo, siteNavItems } from "../../site-config";

export const metadata: Metadata = {
  title: `Product Details | ${businessName}`,
  description: "View product details and product images from Mustafa Canvas.",
};

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header
        logo={siteLogo}
        navItems={siteNavItems}
        imageQuality={imageQuality}
      />
      <ProductDetail slug={slug} />
    </main>
  );
}
