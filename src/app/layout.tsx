// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
});
import {
  businessName,
  businessTagline,
  googleSiteVerification,
  ogImagePath,
  productNames,
  seoDescription,
  seoKeywords,
  seoTitle,
  siteBaseUrl,
} from './seo';

export const metadata: Metadata = {
  metadataBase: siteBaseUrl,
  applicationName: businessName,
  title: {
    default: seoTitle,
    template: `%s | ${businessName}`,
  },
  description: seoDescription,
  keywords: seoKeywords,
  category: 'business',
  classification: productNames.join(', '),
  authors: [{ name: businessName }],
  creator: businessName,
  publisher: businessName,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: businessName,
    title: seoTitle,
    description: seoDescription,
    locale: 'en_PK',
    images: [
      {
        url: ogImagePath,
        width: 2032,
        height: 774,
        alt: `${businessName} ${businessTagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    images: [ogImagePath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  verification: googleSiteVerification
    ? { google: googleSiteVerification }
    : undefined,
  other: {
    'geo.region': 'PK-SD',
    'geo.placename': 'Karachi',
    'business:contact_data:locality': 'Karachi',
    'business:contact_data:country_name': 'Pakistan',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#047857',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${outfit.variable}`}>
      <body className="flex min-h-screen flex-col font-sans bg-background text-foreground antialiased selection:bg-emerald-900 selection:text-white">
        <div className="flex flex-1 flex-col">{children}</div>
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}
