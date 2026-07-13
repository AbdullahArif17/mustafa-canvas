import {
  normalizeProductInput,
  productImageBucket,
  productInputToRow,
  productRowToProduct,
  type ProductImage,
  type ProductRow,
} from "../../../product-data";
import {
  getSupabaseAdmin,
  missingSupabaseEnv,
} from "../../../lib/supabase";
import { requireAdminSession } from "../../../lib/admin-session";

export const dynamic = "force-dynamic";

function productImagePaths(images: unknown) {
  return Array.isArray(images)
    ? (images as ProductImage[])
        .map((image) => image.path)
        .filter((path): path is string => Boolean(path))
    : [];
}

export async function PATCH(
  request: Request,
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

  const input = normalizeProductInput(await request.json().catch(() => null));

  if (!input) {
    return Response.json(
      { error: "Title and description are required." },
      { status: 400 }
    );
  }

  if (!input.images?.length) {
    return Response.json(
      { error: "A main product image is required." },
      { status: 400 }
    );
  }

  const { data: existingData, error: existingError } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (existingError) {
    return Response.json({ error: existingError.message }, { status: 500 });
  }

  if (!existingData) {
    return Response.json({ error: "Product not found." }, { status: 404 });
  }

  const existingProduct = existingData as ProductRow;
  const existingPaths = productImagePaths(existingProduct.images);
  const nextPaths = productImagePaths(input.images);
  const newlyUploadedPaths = nextPaths.filter(
    (path) => !existingPaths.includes(path)
  );
  const removedPaths = existingPaths.filter((path) => !nextPaths.includes(path));
  const row = productInputToRow(input);

  // Keep existing public links stable when titles or other details are edited.
  row.slug = existingProduct.slug;

  const { data, error } = await supabase
    .from("products")
    .update(row)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    if (newlyUploadedPaths.length) {
      await supabase.storage
        .from(productImageBucket)
        .remove(newlyUploadedPaths);
    }

    return Response.json({ error: error.message }, { status: 500 });
  }

  if (removedPaths.length) {
    await supabase.storage.from(productImageBucket).remove(removedPaths);
  }

  const product = productRowToProduct(data as ProductRow);

  if (!product) {
    return Response.json(
      { error: "Product was updated but returned invalid data." },
      { status: 500 }
    );
  }

  return Response.json({ product });
}

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

  const paths = productImagePaths(existingProduct?.images);

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  if (paths.length) {
    await supabase.storage.from(productImageBucket).remove(paths);
  }

  return Response.json({ ok: true });
}
