"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PhoneCall, ShieldCheck, Sparkles, Sun } from "lucide-react";

type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type HeroSectionProps = {
  brandSheetMobile: ImageAsset;
  brandSheet: ImageAsset;
  sunShadeScene: ImageAsset;
  imageQuality: number;
};

export function HeroSection({
  brandSheetMobile,
  brandSheet,
  sunShadeScene,
  imageQuality,
}: HeroSectionProps) {
  const commonProps = {
    alt: brandSheetMobile.alt,
    sizes: "(max-width: 639px) 100vw, (max-width: 1280px) 100vw, 1280px",
    quality: imageQuality,
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonProps,
    src: brandSheet.src,
    width: brandSheet.width,
    height: brandSheet.height,
  });
  const {
    props: { srcSet: mobileSrcSet, ...imageProps },
  } = getImageProps({
    ...commonProps,
    src: brandSheetMobile.src,
    width: brandSheetMobile.width,
    height: brandSheetMobile.height,
    fetchPriority: "high",
  });

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-canvas-50 via-white to-canvas-50/40">
      {/* Subtle architectural ambient lights */}
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-forest-200/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[440px] w-[440px] rounded-full bg-brass-200/20 blur-3xl"
        aria-hidden
      />

      {/* Top Banner Hero Showcase */}
      <div className="relative mx-auto max-w-7xl pt-4 sm:px-6 sm:pt-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl shadow-sm"
        >
          <picture>
            <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
            <img
              {...imageProps}
              srcSet={mobileSrcSet}
              className="h-auto w-full rounded-2xl object-cover"
              style={{ width: "100%", height: "auto" }}
            />
          </picture>
        </motion.div>
      </div>

      {/* Main Value Proposition & Visual Split */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Refined Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-white/90 px-3.5 py-1 text-xs font-semibold tracking-wider text-forest-900 shadow-sm backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-brass-500 animate-pulse" />
            <span className="font-semibold uppercase text-[11px] tracking-widest text-forest-800">
              Direct Wholesale Canvas Shop &middot; Khori Garden, Karachi
            </span>
          </div>

          {/* Primary Editorial Headline Optimized for SEO */}
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.03em] text-forest-950 sm:text-5xl lg:text-6xl leading-[1.08]">
            Green Nets, Haripur Nets &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-800 via-forest-600 to-forest-800">
              Canvas Wholesale Rolls
            </span>
          </h1>

          <p className="mt-5 font-display text-xl font-semibold leading-snug text-forest-900/90 sm:text-2xl">
            Karachi&apos;s Leading Canvas Shop for Authentic Haripur Green Nets &amp; Complete Rolls
          </p>

          <p className="mt-4 text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
            Mustafa Canvas supplies genuine Haripur green nets, UV-treated sun shade netting, waterproof canvas cloth, PVC tarpaulins, and wholesale complete rolls at direct factory prices for commercial, agricultural, and industrial buyers across Pakistan.
          </p>

          {/* CTA Group with Island Button Architecture */}
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#products"
                className="group inline-flex h-12 w-full items-center justify-between gap-3 rounded-full bg-forest-900 pl-6 pr-2 text-sm font-semibold tracking-wide text-white shadow-lg shadow-forest-950/20 transition-all hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 sm:w-auto"
              >
                <span>Explore Products</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={15} aria-hidden />
                </span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-forest-200/90 bg-white px-7 text-sm font-semibold tracking-wide text-forest-950 shadow-sm transition-all hover:bg-forest-50 hover:border-forest-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-700 focus-visible:ring-offset-2 sm:w-auto"
              >
                <PhoneCall size={15} className="text-forest-700" aria-hidden />
                <span>Contact &amp; Quotes</span>
              </Link>
            </motion.div>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-10 grid grid-cols-2 gap-3 border-t border-forest-100/80 pt-6 sm:grid-cols-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                <ShieldCheck size={16} />
              </div>
              <span className="text-xs font-semibold text-slate-700">Genuine Haripur Nets</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brass-50 text-brass-700">
                <Sun size={16} />
              </div>
              <span className="text-xs font-semibold text-slate-700">90% UV Green Nets</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                <CheckCircle2 size={16} />
              </div>
              <span className="text-xs font-semibold text-slate-700">Wholesale Complete Rolls</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brass-50 text-brass-700">
                <Sparkles size={16} />
              </div>
              <span className="text-xs font-semibold text-slate-700">Direct Karachi Shop</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Feature Visual Showcase */}
        <motion.figure
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="group relative overflow-hidden rounded-2xl shadow-lg shadow-forest-950/5"
        >
          <Image
            src={sunShadeScene.src}
            alt={sunShadeScene.alt}
            width={sunShadeScene.width}
            height={sunShadeScene.height}
            className="h-auto w-full rounded-2xl transition-transform duration-700 ease-out group-hover:scale-102"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={imageQuality}
          />
          <figcaption className="mt-3 flex items-center justify-between px-1 text-xs font-semibold text-forest-950">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-forest-600" />
              <span className="font-display font-bold text-sm">Sun Shade Net Architecture</span>
            </div>
            <span className="rounded-full bg-forest-50 border border-forest-200/60 px-2.5 py-0.5 text-[11px] font-medium text-forest-700">
              Commercial &amp; Residential
            </span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
