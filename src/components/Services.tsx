"use client";

import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { formatPrice } from "@/lib/format";
import { useUsdRubRate } from "./CurrencyProvider";
import type { Dictionary } from "@/app/[lang]/dictionaries/types";
import type { Locale } from "@/app/[lang]/dictionaries";

export default function Services({
  services,
  lang,
}: {
  services: Dictionary["services"];
  lang: Locale;
}) {
  const usdRubRate = useUsdRubRate();
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        index="01"
        title={services.heading}
        subtitle={services.subheading}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {services.groups.map((group, i) => (
          <ScrollReveal key={group.title} delay={i * 0.08}>
            <div className="group h-full border-2 border-ink p-6 transition-colors hover:border-acid">
              <h3 className="mb-5 font-display text-xl font-bold uppercase text-ink group-hover:text-acid">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/20 pb-2 font-mono text-sm sm:text-base"
                  >
                    <span className="text-ink/80">{item.name}</span>
                    <span className="whitespace-nowrap font-bold text-cyan">
                      {services.fromWord}{" "}
                      {formatPrice(item.price, lang, usdRubRate)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
