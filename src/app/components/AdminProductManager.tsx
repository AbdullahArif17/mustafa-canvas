"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import {
  maxProductImageMb,
  type ProductImage,
  type ProductKind,
} from "../product-data";
import { ProductCard } from "./ProductCard";
import { uploadProductImages } from "./uploadProductImages";
import { useProducts } from "./useProducts";

const fieldClass =
  "h-12 rounded-md border border-emerald-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100";
const labelClass = "grid gap-2 text-sm font-black uppercase tracking-normal";

function formText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function formNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

export function AdminProductManager() {
  const formRef = useRef<HTMLFormElement>(null);
  const { loaded, mode, error, products, addProduct, deleteProduct } =
    useProducts();
  const [kind, setKind] = useState<ProductKind>("net");
  const [adminPassword, setAdminPassword] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const formData = new FormData(event.currentTarget);
    let uploadedImages: ProductImage[] = [];

    if (selectedFiles.length) {
      if (mode !== "supabase") {
        setStatus("Image upload is available after Supabase is connected.");
        setSaving(false);
        return;
      }

      setStatus("Uploading images...");
      const uploadResult = await uploadProductImages(
        selectedFiles,
        adminPassword
      );

      if (!uploadResult.ok) {
        setStatus(uploadResult.message);
        setSaving(false);
        return;
      }

      uploadedImages = uploadResult.images;
    }

    const base = {
      kind,
      title: formText(formData, "title"),
      description: formText(formData, "description"),
      color: formText(formData, "color"),
      company: formText(formData, "company"),
      lengthFeet: formNumber(formData, "lengthFeet"),
      widthFeet: formNumber(formData, "widthFeet"),
      weight: formText(formData, "weight"),
      size: formText(formData, "size"),
      images: uploadedImages,
    };

    const result = await addProduct(base, adminPassword);

    if (!result.ok) {
      setStatus(result.message || "Could not add product.");
      setSaving(false);
      return;
    }

    formRef.current?.reset();
    setKind("net");
    setSelectedFiles([]);
    setStatus("Product added.");
    setSaving(false);
  };

  const handleDelete = async (productId: string) => {
    setStatus("");
    const result = await deleteProduct(productId, adminPassword);

    if (!result.ok) {
      setStatus(result.message || "Could not delete product.");
      return;
    }

    setStatus("Product deleted.");
  };

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
            Admin Portal
          </p>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-normal text-slate-950 sm:text-5xl">
            Add Products
          </h1>
          <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-slate-700">
            Net, plastic, and other product records for the Mustafa Canvas
            catalog.
          </p>
          <div className="mt-5 inline-flex rounded-md bg-emerald-50 px-3 py-2 text-xs font-black uppercase tracking-normal text-emerald-900">
            {mode === "supabase" ? "Supabase Connected" : "Local Browser Mode"}
          </div>
          {error && (
            <p className="mt-3 text-sm font-bold text-amber-700">{error}</p>
          )}
          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center rounded-md border border-emerald-700 px-5 text-sm font-bold uppercase tracking-normal text-emerald-800 hover:bg-emerald-50"
            >
              View Products
            </Link>
            <Link
              href="/#catalog"
              className="inline-flex h-11 items-center justify-center rounded-md bg-emerald-700 px-5 text-sm font-bold uppercase tracking-normal text-white hover:bg-emerald-800"
            >
              View Slideshow
            </Link>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-md bg-emerald-50 p-5"
        >
          {mode === "supabase" && (
            <label className={labelClass}>
              Admin Password
              <input
                type="password"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                className={fieldClass}
                required
              />
            </label>
          )}

          <label className={labelClass}>
            Product Type
            <select
              name="kind"
              value={kind}
              onChange={(event) => setKind(event.target.value as ProductKind)}
              className={fieldClass}
            >
              <option value="net">Net</option>
              <option value="plastic">Plastic</option>
              <option value="other">Other</option>
            </select>
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Title
              <input name="title" className={fieldClass} required />
            </label>
            <label className={labelClass}>
              Company
              <input name="company" className={fieldClass} />
            </label>
          </div>

          <label className={labelClass}>
            Description
            <textarea
              name="description"
              className="min-h-28 rounded-md border border-emerald-200 bg-white px-3 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              required
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Color
              <input
                name="color"
                type="text"
                className={fieldClass}
                placeholder="Green, black, blue"
              />
            </label>

            <label className={labelClass}>
              Size
              <input
                name="size"
                className={fieldClass}
                placeholder="Small, 12x18, 40 micron"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <label className={labelClass}>
              Length In Feet
              <input
                name="lengthFeet"
                type="number"
                min="1"
                step="0.01"
                className={fieldClass}
              />
            </label>
            <label className={labelClass}>
              Width In Feet
              <input
                name="widthFeet"
                type="number"
                min="1"
                step="0.01"
                className={fieldClass}
              />
            </label>
            <label className={labelClass}>
              Weight
              <input
                name="weight"
                className={fieldClass}
                placeholder="Example: 30 kg"
              />
            </label>
          </div>

          <label className={labelClass}>
            Product Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(event) =>
                setSelectedFiles(Array.from(event.target.files || []))
              }
              className="rounded-md border border-dashed border-emerald-300 bg-white px-3 py-4 text-sm font-semibold text-slate-950 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
            />
            <span className="text-xs font-bold normal-case tracking-normal text-slate-600">
              Up to {maxProductImageMb} MB per image.
            </span>
          </label>

          {selectedFiles.length > 0 && (
            <div className="grid gap-2 rounded-md bg-white p-3 text-sm font-bold text-slate-700">
              {selectedFiles.map((file) => (
                <div key={`${file.name}-${file.size}`} className="truncate">
                  {file.name}
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 text-sm font-black uppercase tracking-normal text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            <Plus size={18} />
            {saving ? "Saving" : "Add Product"}
          </button>

          {status && (
            <p className="text-sm font-bold text-emerald-900">{status}</p>
          )}
        </form>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
            Current Products
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase tracking-normal text-slate-950">
            Catalog
          </h2>
        </div>

        {!loaded ? (
          <div className="rounded-md bg-emerald-50 p-6 text-sm font-bold text-slate-700">
            Loading products...
          </div>
        ) : products.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                actions={
                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-red-200 px-4 text-sm font-bold uppercase tracking-normal text-red-700 hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                    Delete
                  </button>
                }
              />
            ))}
          </div>
        ) : (
          <div className="rounded-md bg-emerald-50 p-6 text-sm font-bold text-slate-700">
            No products added yet.
          </div>
        )}
      </div>
    </section>
  );
}
