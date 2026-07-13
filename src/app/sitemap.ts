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
      images: [`${siteUrl}${ogImagePath}`, `${siteUrl}${logoPath}`],
    },
    {
      url: `${siteUrl}/products`,
      images: [`${siteUrl}${ogImagePath}`],
    },
    ...productEntries,
  ];
}
