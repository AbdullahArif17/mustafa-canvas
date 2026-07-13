import {
  getSupabaseAdmin,
  missingSupabaseEnv,
} from "../../../lib/supabase";

export const dynamic = "force-dynamic";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
};

function json(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: noStoreHeaders,
  });
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || cronSecret.length < 16) {
    return json({ error: "CRON_SECRET is not configured." }, 503);
  }

  if (request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return json({ error: "Unauthorized." }, 401);
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return json(
      {
        error: "Supabase is not configured.",
        missingEnv: missingSupabaseEnv(),
      },
      503
    );
  }

  const { data, error } = await supabase
    .from("products")
    .select("id")
    .limit(1);

  if (error) {
    console.error("Supabase health query failed:", error.message);
    return json({ error: "Supabase health query failed." }, 502);
  }

  return json({
    ok: true,
    checkedAt: new Date().toISOString(),
    rowsRead: data?.length || 0,
  });
}
