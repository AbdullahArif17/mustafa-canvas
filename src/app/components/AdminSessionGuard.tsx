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
      <div className="border-b border-emerald-100 bg-emerald-50/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-emerald-800">
            Authenticated Administrator Session
          </span>
          <button
            type="button"
            onClick={logout}
            disabled={loggingOut}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-emerald-700/80 bg-white px-3.5 text-xs font-bold uppercase tracking-wider text-emerald-900 transition hover:bg-emerald-50 active:scale-95 disabled:opacity-60"
          >
            <LogOut size={15} />
            <span>{loggingOut ? "Signing Out..." : "Sign Out"}</span>
          </button>
        </div>
      </div>
      {children}
    </>
  );
}
