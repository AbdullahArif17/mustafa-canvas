import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

export function missingSupabaseEnv() {
  const missing = [];

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    missing.push("NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    missing.push("SUPABASE_SERVICE_ROLE_KEY");
  }

  return missing;
}

export function getSupabaseAdmin() {
  const missing = missingSupabaseEnv();

  if (missing.length) {
    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }

  return cachedClient;
}

export function checkAdminPassword(request: Request) {
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedPassword) {
    return {
      ok: false,
      status: 503,
      message: "ADMIN_PASSWORD is not configured.",
    };
  }

  const providedPassword = request.headers.get("x-admin-password") || "";

  if (providedPassword !== expectedPassword) {
    return {
      ok: false,
      status: 401,
      message: "Invalid admin password.",
    };
  }

  return {
    ok: true,
    status: 200,
    message: "OK",
  };
}
