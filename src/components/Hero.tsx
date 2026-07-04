import ScrollReveal from "./ScrollReveal";
import type { Dictionary } from "@/app/[lang]/dictionaries/types";
import { ArrowUpRight } from "lucide-react";

export default function Hero({
  hero,
  ctaHref,
}: {
  hero: Dictionary["hero"];
  ctaHref: string;
}) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 pt-28 sm:px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        <ScrollReveal>
          <div className="mb-5 flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-acid">
            <span className="h-2 w-2 animate-flicker bg-acid" />
            {hero.kicker}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="font-display text-[15vw] font-black uppercase leading-[0.85] tracking-tight sm:text-[9vw] lg:text-[7.5vw]">
            <span
              data-text={hero.titleLine1}
              className="glitch block text-ink"
            >
              {hero.titleLine1}
            </span>
            <span
              data-text={hero.titleLine2}
              className="glitch text-glow-acid block text-acid"
            >
              {hero.titleLine2}
            </span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-6 max-w-xl font-mono text-base text-ink/70 sm:text-lg">
            {hero.subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 border-2 border-ink bg-acid px-6 py-3 font-mono text-sm font-bold uppercase text-void transition-transform hover:-translate-y-0.5"
            >
              {hero.ctaPrimary}
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#services"
              className="border-2 border-ink px-6 py-3 font-mono text-sm font-bold uppercase text-ink transition-colors hover:bg-ink hover:text-void"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
