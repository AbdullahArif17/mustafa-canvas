export const businessName = "Mustafa Canvas";
export const businessTagline = "Green Nets, Haripur Nets & Canvas Wholesale Shop";

export const seoTitle =
  "Green Nets, Haripur Nets & Canvas Shop Karachi | Wholesale Complete Rolls | Mustafa Canvas";

export const seoDescription =
  "Mustafa Canvas is Karachi's premier canvas shop and wholesale distributor of authentic Haripur green nets, sun shade nets, waterproof canvas, tarpaulins, and wholesale complete rolls at direct factory rates. Serving commercial, agricultural, and industrial clients across Pakistan.";

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
  "Green Nets",
  "Haripur Nets",
  "Wholesale Complete Rolls",
  "Sun Shade Nets (50%, 75%, 85%, 90%)",
  "Waterproof Canvas Cloth Rolls",
  "Heavy-Duty Tarpaulin Sheets",
  "PVC Coated Fabric",
  "Construction Debris Netting",
  "Agricultural Nursery Green Netting",
  "Commercial Tents",
  "Industrial Supply Bags",
  "Heavy Duty Tool Bags",
  "School & Parking Tensile Shades",
];

export const seoKeywords = [
  // Green Nets Keywords
  "green nets",
  "green net Karachi",
  "green nets Pakistan",
  "green shade nets",
  "green agro net",
  "green nursery netting",
  "green sun shade net price in Pakistan",
  "sun shade green nets wholesale",
  // Haripur Nets Keywords
  "haripur nets",
  "haripur nets Karachi",
  "haripur green nets",
  "haripur netting wholesale",
  "haripur shade net Pakistan",
  "genuine haripur nets",
  "haripur agro net supplier",
  // Canvas Shops Keywords
  "canvas shops",
  "canvas shops in Karachi",
  "canvas shop Karachi",
  "canvas cloth shop Karachi",
  "canvas dealer Market Quarter",
  "canvas shop Khori Garden",
  "waterproof canvas cloth Karachi",
  "best canvas shop in Karachi",
  // Wholesale Complete Rolls Keywords
  "wholesale complete rolls",
  "shade net complete rolls wholesale",
  "green net complete rolls",
  "wholesale canvas rolls",
  "tarpaulin rolls wholesale",
  "50m shade net roll wholesale",
  "100m green net complete roll",
  "factory rate shade net rolls",
  // Brand & Location
  "Mustafa Canvas",
  "Mustafa Canvas Karachi",
  "Fazal Chamber Murad Khan road canvas",
  "Khori Garden shade nets Karachi",
];

export const faqItems = [
  {
    question: "Where can I buy authentic Haripur nets and green nets in Karachi?",
    answer:
      "Mustafa Canvas is Karachi's trusted direct supplier of authentic Haripur nets and high-density UV-treated green nets. Our wholesale shop is located at Shop #1, MR 1/72, Fazal Chamber, Murad Khan Road, Khori Garden, Market Quarter, Karachi. We stock virgin HDPE green nets ranging from 50% to 90% shade densities.",
  },
  {
    question: "Do you supply wholesale complete rolls of green shade nets and canvas?",
    answer:
      "Yes, Mustafa Canvas specializes in wholesale complete rolls for commercial contractors, agricultural nurseries, building scaffolding, and retail resellers. We provide factory-sealed master rolls in 50-meter, 100-meter, and custom lengths, as well as wholesale rolls of waterproof canvas cloth and PVC tarpaulin sheets.",
  },
  {
    question: "Why are Haripur nets preferred for agricultural and outdoor sunshades?",
    answer:
      "Haripur nets are renowned across Pakistan for their superior tensile knotting, resistance to UV degradation, and weather endurance. Crafted from virgin polymers, authentic Haripur netting resists tearing in strong monsoon winds and harsh summer heat, making them ideal for crop nurseries, poultry farms, and car parking shades.",
  },
  {
    question: "What products are available at Mustafa Canvas shop in Karachi?",
    answer:
      "At Mustafa Canvas, we stock green nets, authentic Haripur netting, waterproof canvas cloth, heavy-duty vinyl tarpaulins, PVC fabrics, safety debris netting, commercial tents, stitched industrial supply bags, and customized tensile sunshade structures.",
  },
  {
    question: "Can I order custom sizes or request bulk delivery across Pakistan?",
    answer:
      "Yes, we provide both complete factory rolls and precision custom cuts with stitched hems and reinforced metal eyelets. We supply wholesale shipments and direct retail dispatches to Lahore, Islamabad, Rawalpindi, Peshawar, Quetta, Multan, Faisalabad, and all areas of Pakistan.",
  },
];

export const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined;
