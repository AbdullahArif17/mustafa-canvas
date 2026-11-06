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
    <section className="flex flex-1 items-center justify-center bg-gradient-to-b from-emerald-50/40 to-white py-16">
      <div className="mx-auto flex w-full max-w-md items-center justify-center px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          className="grid w-full gap-5 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-emerald-100 sm:p-8"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm">
            <LockKeyhole size={22} aria-hidden />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-800">
              Authorized Personnel
            </div>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-tight text-slate-950">
              Admin Access
            </h1>
            <p className="mt-1 text-xs font-semibold text-slate-500">
              Enter your administration password to manage the Mustafa Canvas catalog.
            </p>
          </div>

          <label className="grid gap-2 text-xs font-black uppercase tracking-wider text-slate-950">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              autoFocus
              required
              className="h-12 rounded-lg border border-emerald-200 bg-white px-3.5 text-sm font-semibold outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-700 px-6 text-xs font-black uppercase tracking-wider text-white shadow-sm transition hover:bg-emerald-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {submitting ? "Signing In..." : "Sign In to Portal"}
          </button>

          {status && (
            <div role="alert" className="rounded-lg bg-red-50 p-3 text-xs font-bold text-red-700 ring-1 ring-red-200">
              {status}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
