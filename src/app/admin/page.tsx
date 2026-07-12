import type { Metadata } from "next";
import { Header } from "../components/Header";
import { AdminLoginForm } from "../components/AdminLoginForm";
import { AdminProductManager } from "../components/AdminProductManager";
import { AdminSessionGuard } from "../components/AdminSessionGuard";
import { getAdminSession } from "../lib/admin-session";
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

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();

  return (
    <main className="flex flex-1 flex-col bg-white text-slate-950">
      <Header
        logo={siteLogo}
        navItems={siteNavItems}
        imageQuality={imageQuality}
      />
      {session ? (
        <AdminSessionGuard expiresAt={session.expiresAt}>
          <AdminProductManager />
        </AdminSessionGuard>
      ) : (
        <AdminLoginForm />
      )}
    </main>
  );
}
