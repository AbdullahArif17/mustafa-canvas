import type { MetadataRoute } from "next";
import { businessName, businessTagline, logoPath } from "./seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${businessName} - ${businessTagline}`,
    short_name: businessName,
    description: businessTagline,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#047857",
    icons: [
      {
        src: logoPath,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
      },
    ],
  };
}
