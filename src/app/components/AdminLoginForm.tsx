"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        setStatus(payload.error || "Could not sign in.");
        return;
      }

      setPassword("");
      router.refresh();
    } catch {
      setStatus("Could not connect. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex flex-1 items-center justify-center bg-gradient-to-b from-canvas-50 via-white to-canvas-50 py-20">
      <div className="mx-auto flex w-full max-w-md items-center justify-center px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="grid w-full gap-6 rounded-3xl bg-white p-7 shadow-xl ring-1 ring-forest-100/90 doppelrand-card sm:p-9"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-900 text-white shadow-sm">
            <LockKeyhole size={20} aria-hidden />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-forest-200/80 bg-forest-50/70 px-3 py-0.5 text-[11px] font-semibold tracking-widest uppercase text-forest-800">
              Admin Access
            </div>
            <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-forest-950 sm:text-3xl">
              Catalog Management
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-normal">
              Enter your administration password to manage products and imagery.
            </p>
          </div>

          <label className="grid gap-2 text-xs font-semibold text-slate-700">
            Security Key / Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              autoFocus
              required
              className="h-11 rounded-xl border border-forest-200 bg-white px-3.5 text-sm font-medium outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-100"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-11 items-center justify-center rounded-full bg-forest-900 px-6 text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-forest-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {submitting ? "Authenticating..." : "Sign In to Portal"}
          </button>

          {status && (
            <div role="alert" className="rounded-xl bg-red-50 p-3 text-xs font-medium text-red-700 ring-1 ring-red-200">
              {status}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
