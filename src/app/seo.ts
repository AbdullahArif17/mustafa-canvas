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
export const businessCardImagePath = "/mustafa-canvas-business-card.jpg";

export const businessEmail = "mustafacanvas.info@gmail.com";
export const facebookPageUrl =
  "https://www.facebook.com/Mustafacanvas";
export const instagramPageUrl =
  "https://www.instagram.com/Mustafacanvas";
export const locationAddress =
  "Shop # 1, MR 1/72, Fazal Chamber, Murad Khan road, Khori garden, Karachi, Pakistan";

export const contactNumbers = [
  {
    name: "Mustafa",
    display: "0310-8117857",
    tel: "03108117857",
    whatsapp: "923108117857",
  },
  {
    name: "Abid",
    display: "0300-2661044",
    tel: "03002661044",
    whatsapp: "923002661044",
  },
  {
    name: "Arif",
    display: "0334-3678448",
    tel: "03343678448",
    whatsapp: "923343678448",
  },
  {
    name: "Taha",
    display: "0348-2026858",
    tel: "03482026858",
    whatsapp: "923482026858",
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
