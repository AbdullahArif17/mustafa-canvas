"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminSessionGuard({
  expiresAt,
  children,
}: {
  expiresAt: number;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const remainingMs = Math.max(0, expiresAt - Date.now());
    const timeout = window.setTimeout(() => router.refresh(), remainingMs);
    return () => window.clearTimeout(timeout);
  }, [expiresAt, router]);

  const logout = async () => {
    setLoggingOut(true);

    try {
      await fetch("/api/admin/session", { method: "DELETE" });
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      <div className="border-b border-emerald-100 bg-emerald-50">
        <div className="mx-auto flex max-w-7xl justify-end px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-emerald-700 px-4 text-sm font-bold uppercase tracking-normal text-emerald-900 hover:bg-white disabled:opacity-60"
          >
            <LogOut size={17} />
            {loggingOut ? "Signing Out" : "Sign Out"}
          </button>
        </div>
      </div>
      {children}
    </>
  );
}
