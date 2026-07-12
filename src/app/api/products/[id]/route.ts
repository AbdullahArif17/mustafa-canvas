import { productImageBucket, type ProductImage } from "../../../product-data";
import {
  getSupabaseAdmin,
  missingSupabaseEnv,
} from "../../../lib/supabase";
import { requireAdminSession } from "../../../lib/admin-session";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
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

  const { id } = await context.params;

  if (!id) {
    return Response.json({ error: "Missing product id." }, { status: 400 });
  }

  const { data: existingProduct } = await supabase
    .from("products")
    .select("images")
    .eq("id", id)
    .maybeSingle();

  const paths = Array.isArray(existingProduct?.images)
    ? (existingProduct.images as ProductImage[])
        .map((image) => image.path)
        .filter(Boolean)
    : [];

  if (paths.length) {
    await supabase.storage.from(productImageBucket).remove(paths);
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
