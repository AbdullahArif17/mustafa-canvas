"use client";

import {
  maxProductImageBytes,
  maxProductImageMb,
  productImageBucket,
  type ProductImage,
} from "../product-data";
import { getSupabaseBrowserClient } from "../lib/supabase-browser";

type SignedUploadResponse = {
  error?: string;
  path?: string;
  publicUrl?: string;
  token?: string;
};

export async function uploadProductImages(
  files: File[]
): Promise<{ ok: true; images: ProductImage[] } | { ok: false; message: string }> {
  if (!files.length) {
    return { ok: true, images: [] };
  }

  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return {
      ok: false,
      message: "NEXT_PUBLIC_SUPABASE_ANON_KEY is required for image uploads.",
    };
  }

  const images: ProductImage[] = [];

  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      return { ok: false, message: "Only image files are allowed." };
    }

    if (file.size > maxProductImageBytes) {
      return {
        ok: false,
        message: `Each image must be ${maxProductImageMb} MB or smaller.`,
      };
    }

    const signResponse = await fetch("/api/product-images/sign", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type,
        size: file.size,
      }),
    });
    const signedUpload = (await signResponse
      .json()
      .catch(() => ({}))) as SignedUploadResponse;

    if (!signResponse.ok || !signedUpload.path || !signedUpload.token) {
      return {
        ok: false,
        message: signedUpload.error || "Could not prepare image upload.",
      };
    }

    const { error } = await supabase.storage
      .from(productImageBucket)
      .uploadToSignedUrl(signedUpload.path, signedUpload.token, file, {
        contentType: file.type,
      });

    if (error) {
      return {
        ok: false,
        message: error.message || "Could not upload image.",
      };
    }

    images.push({
      url: signedUpload.publicUrl || "",
      path: signedUpload.path,
      alt: file.name.replace(/\.[^.]+$/, ""),
    });
  }

  return {
    ok: true,
    images: images.filter((image) => image.url),
  };
}
