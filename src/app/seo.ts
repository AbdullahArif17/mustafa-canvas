export const businessName = "Mustafa Canvas";
export const businessTagline = "Shade Net & Canvas Solutions";
export const seoTitle =
  "Mustafa Canvas | Shade Net & Canvas Solutions Karachi";
export const seoDescription =
  "Mustafa Canvas supplies shade nets, waterproof canvas cloth, tarpaulin, PVC cloth, tents, supply bags and tool bags in Karachi, Pakistan.";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mustafa-canvas.vercel.app/";

export const siteUrl = (
  configuredSiteUrl.startsWith("http")
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`
).replace(/\/+$/, "");

export const siteBaseUrl = new URL(siteUrl);

export const logoPath = "/ChatGPT%20Image%20Jul%208%2C%202026%2C%2012_09_42%20PM.png";
export const ogImagePath =
  "/ChatGPT%20Image%20Jul%208%2C%202026%2C%2012_16_28%20PM.png";

export const businessEmail = "mustafacanvas.info@gmail.com";
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
  "shade net Karachi",
  "canvas solutions Karachi",
  "tarpaulin Karachi",
  "PVC cloth Karachi",
  "waterproof canvas cloth",
  "construction netting",
  "nursery netting",
  "school parking shade",
  "swimming pool shade",
];
