import type { Metadata } from "next";
import { Header } from "../components/Header";
import { AdminProductManager } from "../components/AdminProductManager";
import { businessName } from "../seo";
import { imageQuality, siteLogo, siteNavItems } from "../site-config";

export const metadata: Metadata = {
  title: `Admin Portal | ${businessName}`,
  description: "Add and manage Mustafa Canvas browser catalog products.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <Header
        logo={siteLogo}
        navItems={siteNavItems}
        imageQuality={imageQuality}
      />
      <AdminProductManager />
    </main>
  );
}
