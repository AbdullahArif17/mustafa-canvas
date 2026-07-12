import {
  maxProductImageBytes,
  maxProductImageMb,
  productImageBucket,
} from "../../../product-data";
import {
  getSupabaseAdmin,
  missingSupabaseEnv,
} from "../../../lib/supabase";
import { requireAdminSession } from "../../../lib/admin-session";

export const dynamic = "force-dynamic";

function safeFileName(fileName: string) {
  const cleanName = fileName
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleanName || "product-image";
}

export async function POST(request: Request) {
  const admin = await requireAdminSession();

  if (!admin.ok) {
    return Response.json({ error: admin.message }, { status: admin.status });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return Response.json(
      {
        error: "Supabase is not configured.",
        missingEnv: missingSupabaseEnv(),
      },
      { status: 503 }
    );
  }

  const payload = (await request.json().catch(() => null)) as {
    fileName?: unknown;
    contentType?: unknown;
    size?: unknown;
  } | null;

  const fileName =
    typeof payload?.fileName === "string" ? payload.fileName.trim() : "";
  const contentType =
    typeof payload?.contentType === "string"
      ? payload.contentType.trim()
      : "";
  const size = Number(payload?.size || 0);

  if (!fileName || !contentType.startsWith("image/")) {
    return Response.json(
      { error: "Only image files are allowed." },
      { status: 400 }
    );
  }

  if (!Number.isFinite(size) || size <= 0 || size > maxProductImageBytes) {
    return Response.json(
      { error: `Image must be ${maxProductImageMb} MB or smaller.` },
      { status: 400 }
    );
  }

  const path = `products/${crypto.randomUUID()}-${safeFileName(fileName)}`;
  const { data, error } = await supabase.storage
    .from(productImageBucket)
    .createSignedUploadUrl(path);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(productImageBucket).getPublicUrl(path);

  return Response.json({
    path,
    publicUrl,
    token: data.token,
    signedUrl: data.signedUrl,
    bucket: productImageBucket,
    maxBytes: maxProductImageBytes,
  });
}
