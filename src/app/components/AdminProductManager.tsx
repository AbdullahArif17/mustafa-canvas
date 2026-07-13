"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import {
  maxProductImageMb,
  type Product,
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
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-emerald-700">
            Admin Portal
          </p>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-normal text-slate-950 sm:text-5xl">
            {editingProduct ? "Edit Product" : "Add Products"}
          </h1>
          <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-slate-700">
            {editingProduct
              ? `Update ${editingProduct.title} and manage its product images.`
              : "Net, plastic, and other product records for the Mustafa Canvas catalog."}
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
          key={editingProduct?.id || "new-product"}
          ref={formRef}
          onSubmit={handleSubmit}
          className="grid gap-5 rounded-md bg-emerald-50 p-5"
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
              Company
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
              className="min-h-28 rounded-md border border-emerald-200 bg-white px-3 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
              defaultValue={editingProduct?.description || ""}
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
                defaultValue={editingProduct?.color || ""}
              />
            </label>

            <label className={labelClass}>
              Size
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
              Length In Feet
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
              Width In Feet
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
                placeholder="Example: 30 kg"
                defaultValue={editingProduct?.weight || ""}
              />
            </label>
          </div>

          {editingProduct && retainedImages.length > 0 && (
            <div className="grid gap-3 border-y border-emerald-200 py-4">
              <div>
                <p className="text-sm font-black uppercase tracking-normal text-emerald-900">
                  Current Images
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-600">
                  Replace the main image below or remove optional images before
                  saving.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {retainedImages.map((image, index) => (
                  <figure
                    key={image.path}
                    className="relative overflow-hidden rounded-md bg-white"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="aspect-square w-full object-contain"
                    />
                    <figcaption className="px-2 py-2 text-xs font-black uppercase tracking-normal text-emerald-900">
                      {index === 0 ? "Main" : `Additional ${index}`}
                    </figcaption>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() =>
                          setRetainedImages((images) =>
                            images.filter((item) => item.path !== image.path)
                          )
                        }
                        className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-md bg-white text-red-700 shadow-sm ring-1 ring-red-100 hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                        aria-label={`Remove ${image.alt}`}
                        title="Remove image"
                      >
                        <X size={17} aria-hidden />
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
                className="min-w-0 rounded-md border border-dashed border-emerald-300 bg-white px-3 py-4 text-sm font-semibold text-slate-950 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
              />
              <span className="text-xs font-bold normal-case tracking-normal text-slate-600">
                {editingProduct
                  ? `Leave empty to keep the current main image. Up to ${maxProductImageMb} MB.`
                  : `Used on product cards. Up to ${maxProductImageMb} MB.`}
              </span>
            </label>

            <label className={labelClass}>
              Additional Images (Optional)
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(event) =>
                  setGalleryImageFiles(Array.from(event.target.files || []))
                }
                className="min-w-0 rounded-md border border-dashed border-emerald-300 bg-white px-3 py-4 text-sm font-semibold text-slate-950 file:mr-3 file:rounded-md file:border-0 file:bg-emerald-700 file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
              />
              <span className="text-xs font-bold normal-case tracking-normal text-slate-600">
                Shown only on the product details page.
              </span>
            </label>
          </div>

          {(mainImageFile || galleryImageFiles.length > 0) && (
            <div className="grid gap-3 rounded-md bg-white p-3 text-sm font-bold text-slate-700">
              {mainImageFile && (
                <div className="min-w-0">
                  <span className="text-xs uppercase text-emerald-700">
                    Main
                  </span>
                  <div className="truncate">{mainImageFile.name}</div>
                </div>
              )}
              {galleryImageFiles.length > 0 && (
                <div className="grid min-w-0 gap-1">
                  <span className="text-xs uppercase text-emerald-700">
                    Additional
                  </span>
                  {galleryImageFiles.map((file) => (
                    <div
                      key={`${file.name}-${file.size}-${file.lastModified}`}
                      className="truncate"
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
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-emerald-700 px-6 text-sm font-black uppercase tracking-normal text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              {editingProduct ? (
                <Pencil size={18} aria-hidden />
              ) : (
                <Plus size={18} aria-hidden />
              )}
              {saving
                ? "Saving"
                : editingProduct
                  ? "Save Changes"
                  : "Add Product"}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={saving}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-emerald-700 px-6 text-sm font-black uppercase tracking-normal text-emerald-900 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
              >
                <X size={18} aria-hidden />
                Cancel
              </button>
            )}
          </div>

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
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-emerald-700 px-4 text-sm font-bold uppercase tracking-normal text-emerald-800 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                    >
                      <Pencil size={17} aria-hidden />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product)}
                      disabled={deletingId === product.id}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-red-200 px-4 text-sm font-bold uppercase tracking-normal text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                    >
                      <Trash2 size={17} aria-hidden />
                      {deletingId === product.id ? "Deleting" : "Delete"}
                    </button>
                  </div>
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
