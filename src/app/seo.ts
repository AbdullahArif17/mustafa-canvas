export const businessName = "Mustafa Canvas";
export const businessTagline = "Shade Net & Canvas Solutions";
export const seoTitle =
  "Canvas, Tarpaulin & Sun Shade Nets Karachi | Mustafa Canvas";
export const seoDescription =
  "Mustafa Canvas supplies canvas cloth, waterproof tarpaulin, PVC cloth, sun shade nets and construction netting in Karachi, Pakistan.";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mustafa-canvas.vercel.app/";

export const siteUrl = (
  configuredSiteUrl.startsWith("http")
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`
).replace(/\/+$/, "");

export const siteBaseUrl = new URL(siteUrl);

export const logoPath = "/mustafa-canvas-logo.png";
export const ogImagePath = "/mustafa-canvas-brand-sheet.png";

export const businessEmail = "mustafacanvas.info@gmail.com";
export const facebookPageUrl =
  "https://www.facebook.com/profile.php?id=61567021209977";
export const locationAddress =
  "Shop # 1, MR / 72, Fazal Chamber, Khoury Garden, Murad Khan Rd, Market Quarter, Karachi, Pakistan";

export const contactNumbers = [
  {
    name: "Taha",
    display: "03482026858",
    tel: "03482026858",
    whatsapp: "923482026858",
  },
  {
    name: "Mustafa",
    display: "03108117857",
    tel: "03108117857",
    whatsapp: "923108117857",
  },
];

export const productNames = [
  "Sun Shade Net",
  "Construction Netting",
  "Nursery Netting",
  "School & Parking Shade",
  "Swimming Pool Shade",
  "Waterproof Canvas Cloth",
  "Tarpaulin",
  "PVC Cloth",
  "Tents",
  "Supply Bags",
  "Tool Bags",
];

export const seoKeywords = [
  "Mustafa Canvas",
  "canvas Karachi",
  "canvas cloth Karachi",
  "waterproof canvas Karachi",
  "tarpaulin Karachi",
  "tarpaulin sheet Karachi",
  "sun shade net Karachi",
  "green shade net Karachi",
  "shade net supplier Karachi",
  "PVC cloth Karachi",
  "construction netting Karachi",
  "nursery shade net Karachi",
  "school parking shade Karachi",
];

export const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined;
