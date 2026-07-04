"use client";

import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { formatPaymentRange } from "@/lib/format";
import { useUsdRubRate } from "./CurrencyProvider";
import type { Dictionary } from "@/app/[lang]/dictionaries/types";
import type { Locale } from "@/app/[lang]/dictionaries";

export default function Payment({
  payment,
  lang,
}: {
  payment: Dictionary["payment"];
  lang: Locale;
}) {
  const usdRubRate = useUsdRubRate();
  return (
    <section
      id="pricing"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >
      <SectionHeading
        index="02"
        title={payment.heading}
        subtitle={payment.subheading}
      />

      <ScrollReveal>
        <div className="border-2 border-ink">
          <div className="grid grid-cols-2 bg-ink font-mono text-xs font-bold uppercase tracking-wide text-void sm:text-sm">
            <div className="px-4 py-3">{payment.colRange}</div>
            <div className="px-4 py-3 text-right">{payment.colPrepay}</div>
          </div>
          {payment.rows.map((row, i) => (
            <div
              key={`${row.minRub}-${row.maxRub}`}
              className={`grid grid-cols-2 font-mono text-sm sm:text-base ${
                i > 0 ? "border-t-2 border-ink/30" : ""
              }`}
            >
              <div className="px-4 py-4 text-ink/80">
                {formatPaymentRange(row, lang, usdRubRate, {
                  upTo: payment.upToWord,
                  over: payment.overWord,
                })}
              </div>
              <div className="px-4 py-4 text-right font-bold text-magenta">
                {row.prepay}
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
