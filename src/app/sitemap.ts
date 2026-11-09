import type { MetadataRoute } from "next";
import { getServerProducts } from "./lib/products";
import { logoPath, ogImagePath, siteUrl } from "./seo";

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await getServerProducts();
  const productEntries: MetadataRoute.Sitemap =
    result.status === "ok"
      ? result.products.map((product) => ({
          url: `${siteUrl}/products/${product.slug}`,
          lastModified: product.createdAt,
          images: product.images
            .map((image) => image.url)
            .filter((url) => /^https?:\/\//.test(url)),
        }))
      : [];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      images: [`${siteUrl}${ogImagePath}`, `${siteUrl}${logoPath}`],
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
      images: [`${siteUrl}${ogImagePath}`],
    },
    ...productEntries.map((entry) => ({
      ...entry,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
