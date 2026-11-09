"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { faqItems } from "../seo";

export function SeoFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-canvas-50/70 border-t border-forest-100/80 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest-200/80 bg-white px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase text-forest-800 shadow-sm">
            <HelpCircle size={13} className="text-brass-600" />
            <span>Buyer Guide &amp; Knowledge Base</span>
          </div>
          <h2
            id="faq-heading"
            className="mt-4 font-display text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl lg:text-5xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 font-normal">
            Everything you need to know about purchasing green nets, authentic Haripur nets, wholesale complete rolls, and custom canvas products in Karachi.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm doppelrand-card transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-forest-50/50 sm:p-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-bold text-slate-900 sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-forest-200 bg-forest-50 text-forest-800 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-forest-900 text-white border-forest-900" : ""
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-forest-100/70 bg-canvas-50/40 px-5 pb-6 pt-4 text-sm font-normal leading-relaxed text-slate-600 sm:px-6">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
