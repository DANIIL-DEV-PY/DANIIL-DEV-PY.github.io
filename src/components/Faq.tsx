import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import type { Dictionary } from "@/app/[lang]/dictionaries/types";

export default function Faq({ faq }: { faq: Dictionary["faq"] }) {
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading index="05" title={faq.heading} />

      <div className="flex flex-col">
        {faq.items.map((item, i) => (
          <ScrollReveal key={item.q} delay={i * 0.08}>
            <details
              className={`group py-5 ${i > 0 ? "border-t-2 border-ink/20" : ""}`}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold uppercase sm:text-lg">
                {item.q}
                <span className="shrink-0 font-mono text-2xl text-acid transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl font-mono text-sm text-ink/60 sm:text-base">
                {item.a}
              </p>
            </details>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
