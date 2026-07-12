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
    <section className="flex flex-1 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid w-full max-w-md gap-5 rounded-md bg-emerald-50 p-5 sm:p-7"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-700 text-white">
            <LockKeyhole size={22} />
          </div>
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
              Private Area
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-normal text-slate-950 sm:text-4xl">
              Admin Access
            </h1>
          </div>
          <label className="grid gap-2 text-sm font-black uppercase tracking-normal text-slate-950">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              autoFocus
              required
              className="h-12 rounded-md border border-emerald-200 bg-white px-3 text-base font-semibold outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 items-center justify-center rounded-md bg-emerald-700 px-6 text-sm font-black uppercase tracking-normal text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300"
          >
            {submitting ? "Signing In" : "Sign In"}
          </button>
          {status && (
            <p role="alert" className="text-sm font-bold text-red-700">
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
