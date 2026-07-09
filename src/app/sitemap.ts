import type { MetadataRoute } from "next";
import { logoPath, ogImagePath, siteUrl } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteUrl}${ogImagePath}`, `${siteUrl}${logoPath}`],
    },
  ];
}
