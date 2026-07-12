import type { Metadata } from "next";
import { Header } from "../components/Header";
import { ProductsCatalog } from "../components/ProductsCatalog";
import { businessName } from "../seo";
import { imageQuality, siteLogo, siteNavItems } from "../site-config";

export const metadata: Metadata = {
  title: `All Products | ${businessName}`,
  description:
    "Browse Mustafa Canvas net and plastic products added from the admin portal.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header
        logo={siteLogo}
        navItems={siteNavItems}
        imageQuality={imageQuality}
      />
      <ProductsCatalog />
    </main>
  );
}
