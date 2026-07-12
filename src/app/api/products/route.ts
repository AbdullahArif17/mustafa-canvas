import {
  normalizeProductInput,
  productInputToRow,
  productRowToProduct,
  type ProductRow,
} from "../../product-data";
import {
  checkAdminPassword,
  getSupabaseAdmin,
  missingSupabaseEnv,
} from "../../lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return Response.json({
      mode: "local",
      products: [],
      missingEnv: missingSupabaseEnv(),
    });
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const products = ((data || []) as ProductRow[])
    .map(productRowToProduct)
    .filter(Boolean);

  return Response.json({
    mode: "supabase",
    products,
  });
}

export async function POST(request: Request) {
  const admin = checkAdminPassword(request);

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

  const input = normalizeProductInput(await request.json().catch(() => null));

  if (!input) {
    return Response.json({ error: "Invalid product data." }, { status: 400 });
  }

  const row = productInputToRow(input);
  row.slug = `${row.slug}-${crypto.randomUUID().slice(0, 8)}`;

  const { data, error } = await supabase
    .from("products")
    .insert(row)
    .select("*")
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const product = productRowToProduct(data as ProductRow);

  if (!product) {
    return Response.json(
      { error: "Product was saved but returned invalid data." },
      { status: 500 }
    );
  }

  return Response.json({ product }, { status: 201 });
}
