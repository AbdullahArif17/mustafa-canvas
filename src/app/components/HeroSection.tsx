"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";

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
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white">
      {/* Subtle decorative background glow */}
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] rounded-full bg-emerald-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-emerald-100/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl pt-3 sm:px-6 sm:pt-7 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="overflow-hidden shadow-sm sm:rounded-xl ring-1 ring-emerald-100/60"
        >
          <picture>
            <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
            <img
              {...imageProps}
              srcSet={mobileSrcSet}
              className="h-auto w-full"
              style={{ width: "100%", height: "auto" }}
            />
          </picture>
        </motion.div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 ring-1 ring-emerald-300/60">
            <Sparkles size={14} className="text-emerald-700" aria-hidden />
            <span>Premium Karachi Manufacturer</span>
          </div>

          <h1 className="mt-4 max-w-2xl text-4xl font-black uppercase tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Mustafa <span className="text-emerald-700">Canvas</span>
          </h1>

          <p className="mt-4 max-w-xl text-xl font-extrabold leading-snug text-emerald-900 sm:text-2xl">
            Quality Shade Nets, Canvas, Tarpaulin &amp; PVC Solutions
          </p>

          <p className="mt-3 max-w-xl text-base font-semibold leading-relaxed text-slate-600 sm:text-lg">
            Built for Strength. Made to Last. Supplying industrial-grade waterproof canvas,
            heat-reduction shade netting, and heavy-duty tarpaulins across Karachi and Pakistan.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#products"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-7 text-sm font-bold uppercase tracking-wider text-white shadow-md shadow-emerald-700/20 transition-all hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto"
              >
                <span>Explore Products</span>
                <ArrowRight size={17} aria-hidden />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-emerald-700 bg-white px-7 text-sm font-bold uppercase tracking-wider text-emerald-800 transition-all hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:w-auto"
              >
                <PhoneCall size={16} aria-hidden />
                <span>Contact Us</span>
              </Link>
            </motion.div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-emerald-100 pt-6 text-xs font-bold text-slate-600 sm:gap-6">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={18} className="text-emerald-700" aria-hidden />
              <span>100% Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={18} className="text-emerald-700" aria-hidden />
              <span>Custom Sizes Available</span>
            </div>
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="group relative overflow-hidden rounded-2xl bg-emerald-50/70 p-3 ring-1 ring-emerald-200/70 shadow-lg shadow-emerald-950/5 sm:p-4"
        >
          <div className="overflow-hidden rounded-xl bg-white">
            <Image
              src={sunShadeScene.src}
              alt={sunShadeScene.alt}
              width={sunShadeScene.width}
              height={sunShadeScene.height}
              className="h-auto w-full rounded-xl transition-transform duration-700 ease-out group-hover:scale-102"
              sizes="(max-width: 1024px) 100vw, 56vw"
              quality={imageQuality}
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between px-2 text-xs font-black uppercase tracking-wider text-emerald-900">
            <span>Sun Shade Net Installation</span>
            <span className="text-[11px] font-semibold text-emerald-700 lowercase">Commercial &amp; Residential</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

