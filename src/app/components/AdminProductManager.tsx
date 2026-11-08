"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Pencil, Plus, Trash2, X } from "lucide-react";
import {
  maxProductImageMb,
  type Product,
  type ProductImage,
  type ProductKind,
} from "../product-data";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { uploadProductImages } from "./uploadProductImages";
import { useProducts } from "./useProducts";

const fieldClass =
  "h-11 rounded-xl border border-forest-200 bg-white px-3.5 text-xs font-medium text-slate-900 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-forest-100";
const labelClass = "grid gap-1.5 text-xs font-semibold text-slate-700";

function formText(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function formNumber(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

export function AdminProductManager() {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    loaded,
    mode,
    error,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const [kind, setKind] = useState<ProductKind>("net");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [retainedImages, setRetainedImages] = useState<ProductImage[]>([]);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);

  const clearEditor = () => {
    formRef.current?.reset();
    setEditingProduct(null);
    setKind("net");
    setRetainedImages([]);
    setMainImageFile(null);
    setGalleryImageFiles([]);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setKind(product.kind);
    setRetainedImages(product.images);
    setMainImageFile(null);
    setGalleryImageFiles([]);
    setStatus(`Editing ${product.title}.`);

    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handleCancelEdit = () => {
    clearEditor();
    setStatus("Edit cancelled.");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      const formData = new FormData(event.currentTarget);
      const currentMainImage = retainedImages[0];

      if (!mainImageFile && !currentMainImage) {
        setStatus("Select a main product image.");
        return;
      }

      const filesRequireUpload =
        Boolean(mainImageFile) || galleryImageFiles.length > 0;

      if (filesRequireUpload && mode !== "supabase") {
        setStatus("Image upload is available after Supabase is connected.");
        return;
      }

      const galleryFiles = mainImageFile
        ? galleryImageFiles.filter(
            (file) =>
              file.name !== mainImageFile.name ||
              file.size !== mainImageFile.size ||
              file.lastModified !== mainImageFile.lastModified
          )
        : galleryImageFiles;
      const filesToUpload = mainImageFile
        ? [mainImageFile, ...galleryFiles]
        : galleryFiles;
      let uploadedImages: ProductImage[] = [];

      if (filesToUpload.length) {
        setStatus("Uploading images...");
        const uploadResult = await uploadProductImages(filesToUpload);

        if (!uploadResult.ok) {
          setStatus(uploadResult.message);
          return;
        }

        uploadedImages = uploadResult.images;
      }

      const uploadedMainImage = mainImageFile
        ? uploadedImages[0]
        : undefined;
      const uploadedGalleryImages = mainImageFile
        ? uploadedImages.slice(1)
        : uploadedImages;
      const images = editingProduct
        ? [
            ...(uploadedMainImage
              ? [uploadedMainImage]
              : retainedImages.slice(0, 1)),
            ...retainedImages.slice(1),
            ...uploadedGalleryImages,
          ]
        : uploadedImages;
      const productInput = {
        kind,
        title: formText(formData, "title"),
        description: formText(formData, "description"),
        color: formText(formData, "color"),
        company: formText(formData, "company"),
        lengthFeet: formNumber(formData, "lengthFeet"),
        widthFeet: formNumber(formData, "widthFeet"),
        weight: formText(formData, "weight"),
        size: formText(formData, "size"),
        images,
      };
      const wasEditing = Boolean(editingProduct);
      const result = editingProduct
        ? await updateProduct(editingProduct.id, productInput)
        : await addProduct(productInput);

      if (!result.ok) {
        setStatus(
          result.message ||
            (wasEditing ? "Could not update product." : "Could not add product.")
        );
        return;
      }

      clearEditor();
      setStatus(wasEditing ? "Product updated." : "Product added.");
    } catch {
      setStatus("Could not save the product. Check the connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Delete ${product.title}? This cannot be undone.`)) {
      return;
    }

    setStatus("");
    setDeletingId(product.id);

    try {
      const result = await deleteProduct(product.id);

      if (!result.ok) {
        setStatus(result.message || "Could not delete product.");
        return;
      }

      if (editingProduct?.id === product.id) {
        clearEditor();
      }

      setStatus("Product deleted.");
    } catch {
      setStatus("Could not delete the product. Check the connection and try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-forest-200/80 bg-forest-50/70 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-800">
            Control Panel
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">
            {editingProduct ? "Edit Product" : "Add Products"}
          </h1>
          <p className="mt-3 max-w-xl text-sm font-normal leading-relaxed text-slate-600">
            {editingProduct
              ? `Update specifications and manage photo assets for ${editingProduct.title}.`
              : "Create net, plastic, tarpaulin, or canvas entries for the live customer catalog."}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-white px-3.5 py-1 text-xs font-semibold text-forest-900 shadow-sm">
            <span
              className={`h-2 w-2 rounded-full ${
                mode === "supabase" ? "bg-forest-600" : "bg-brass-500"
              }`}
            />
            <span>{mode === "supabase" ? "Supabase Connected" : "Local Browser Storage"}</span>
          </div>
          {error && (
            <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
              {error}
            </p>
          )}
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-forest-200 bg-white px-5 text-xs font-semibold tracking-wide text-forest-900 shadow-sm transition hover:bg-forest-50 active:scale-95"
            >
              <span>View Products</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/#catalog"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-forest-900 px-5 text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-forest-800 active:scale-95"
            >
              <span>View Slideshow</span>
            </Link>
          </div>
        </div>

        <form
          key={editingProduct?.id || "new-product"}
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-3xl border border-forest-100 bg-canvas-50/70 p-6 shadow-sm doppelrand-card sm:p-8"
        >
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
              <input
                name="title"
                className={fieldClass}
                defaultValue={editingProduct?.title || ""}
                required
              />
            </label>
            <label className={labelClass}>
              Company / Brand
              <input
                name="company"
                className={fieldClass}
                defaultValue={editingProduct?.company || ""}
              />
            </label>
          </div>

          <label className={labelClass}>
            Description
            <textarea
              name="description"
              className="min-h-28 rounded-lg border border-emerald-200 bg-white px-3.5 py-3 text-xs font-semibold text-slate-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              defaultValue={editingProduct?.description || ""}
              required
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Color Tone
              <input
                name="color"
                type="text"
                className={fieldClass}
                placeholder="Green, black, blue"
                defaultValue={editingProduct?.color || ""}
              />
            </label>

            <label className={labelClass}>
              Size / Thickness
              <input
                name="size"
                className={fieldClass}
                placeholder="Small, 12x18, 40 micron"
                defaultValue={editingProduct?.size || ""}
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <label className={labelClass}>
              Length (Feet)
              <input
                name="lengthFeet"
                type="number"
                min="1"
                step="0.01"
                className={fieldClass}
                defaultValue={editingProduct?.lengthFeet || ""}
              />
            </label>
            <label className={labelClass}>
              Width (Feet)
              <input
                name="widthFeet"
                type="number"
                min="1"
                step="0.01"
                className={fieldClass}
                defaultValue={editingProduct?.widthFeet || ""}
              />
            </label>
            <label className={labelClass}>
              Weight
              <input
                name="weight"
                className={fieldClass}
                placeholder="e.g. 30 kg"
                defaultValue={editingProduct?.weight || ""}
              />
            </label>
          </div>

          {editingProduct && retainedImages.length > 0 && (
            <div className="grid gap-3 border-y border-emerald-200 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-emerald-900">
                  Current Photo Assets
                </p>
                <p className="mt-0.5 text-xs font-semibold text-slate-500">
                  Replace the main image below or remove secondary shots before saving.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {retainedImages.map((image, index) => (
                  <figure
                    key={image.path}
                    className="relative overflow-hidden rounded-xl bg-white p-2 ring-1 ring-emerald-100"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="aspect-square w-full object-contain rounded-lg"
                    />
                    <figcaption className="mt-2 text-center text-[11px] font-black uppercase tracking-wider text-emerald-900">
                      {index === 0 ? "Main Cover" : `Photo ${index + 1}`}
                    </figcaption>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          setRetainedImages((images) =>
                            images.filter((item) => item.path !== image.path)
                          )
                        }
                        className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-red-700 shadow-sm ring-1 ring-red-200 hover:bg-red-50"
                        aria-label={`Remove ${image.alt}`}
                        title="Remove image"
                      >
                        <X size={15} aria-hidden />
                      </button>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              {editingProduct
                ? "Replace Main Image (Optional)"
                : "Main Product Image"}
              <input
                type="file"
                accept="image/*"
                required={!editingProduct || retainedImages.length === 0}
                onChange={(event) =>
                  setMainImageFile(event.target.files?.[0] || null)
                }
                className="min-w-0 rounded-lg border border-dashed border-emerald-300 bg-white px-3 py-3.5 text-xs font-semibold text-slate-950 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-700 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white"
              />
              <span className="text-[11px] font-semibold text-slate-500">
                {editingProduct
                  ? `Leave empty to keep current main image. Up to ${maxProductImageMb} MB.`
                  : `Primary card photo. Up to ${maxProductImageMb} MB.`}
              </span>
            </label>

            <label className={labelClass}>
              Additional Gallery Images (Optional)
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) =>
                  setGalleryImageFiles(Array.from(event.target.files || []))
                }
                className="min-w-0 rounded-lg border border-dashed border-emerald-300 bg-white px-3 py-3.5 text-xs font-semibold text-slate-950 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-700 file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-white"
              />
              <span className="text-[11px] font-semibold text-slate-500">
                Shown on the product detail page.
              </span>
            </label>
          </div>

          {(mainImageFile || galleryImageFiles.length > 0) && (
            <div className="grid gap-2.5 rounded-lg bg-white p-3 text-xs font-bold text-slate-700 ring-1 ring-emerald-100">
              {mainImageFile && (
                <div className="flex items-center gap-2">
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] uppercase text-emerald-800">
                    Main
                  </span>
                  <span className="truncate">{mainImageFile.name}</span>
                </div>
              )}
              {galleryImageFiles.length > 0 && (
                <div className="grid gap-1">
                  <span className="text-[10px] uppercase text-emerald-700">
                    Gallery ({galleryImageFiles.length} files)
                  </span>
                  {galleryImageFiles.map((file) => (
                    <div
                      key={`${file.name}-${file.size}-${file.lastModified}`}
                      className="truncate text-[11px] text-slate-500"
                    >
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div
            className={
              editingProduct ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"
            }
          >
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-forest-900 px-6 text-xs font-semibold tracking-wide text-white shadow-sm transition hover:bg-forest-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2"
            >
              {editingProduct ? (
                <Pencil size={15} aria-hidden />
              ) : (
                <Plus size={15} aria-hidden />
              )}
              {saving
                ? "Saving..."
                : editingProduct
                  ? "Save Changes"
                  : "Add Product"}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={saving}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-forest-200 bg-white px-6 text-xs font-semibold tracking-wide text-forest-900 transition hover:bg-forest-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={15} aria-hidden />
                <span>Cancel</span>
              </button>
            )}
          </div>

          {status && (
            <div className="rounded-xl bg-forest-50 p-3 text-xs font-medium text-forest-900 ring-1 ring-forest-200">
              {status}
            </div>
          )}
        </form>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between border-b border-forest-100/80 pb-4">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-forest-200/80 bg-forest-50/60 px-3 py-0.5 text-[10px] font-semibold tracking-widest uppercase text-forest-800">
              Database Records
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-forest-950 sm:text-3xl">
              All Catalog Products ({products.length})
            </h2>
          </div>
        </div>

        {!loaded ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        ) : products.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                actions={
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-forest-100/60">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-forest-200 bg-white px-3 text-xs font-semibold text-forest-900 transition hover:bg-forest-50 active:scale-95"
                    >
                      <Pencil size={13} aria-hidden />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      disabled={deletingId === product.id}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 text-xs font-semibold text-red-700 transition hover:bg-red-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={13} aria-hidden />
                      <span>{deletingId === product.id ? "Deleting" : "Delete"}</span>
                    </button>
                  </div>
                }
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-forest-200 bg-canvas-50/50 p-10 text-center text-xs font-medium text-slate-500">
            No products currently in the database. Use the form above to add your first product.
          </div>
        )}
      </div>
    </section>
  );
}
