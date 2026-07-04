import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries/types";

export default function Pitch({
  pitch,
  ctaHref,
}: {
  pitch: Dictionary["pitch"];
  ctaHref: string;
}) {
  return (
    <section className="border-y-4 border-magenta bg-void-2 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <ScrollReveal>
          <h2
            data-text={pitch.headline}
            className="glitch text-glow-magenta font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-magenta sm:text-6xl"
          >
            {pitch.headline}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl font-mono text-base text-ink/70 sm:text-lg">
            {pitch.text}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex items-center gap-2 border-2 border-ink bg-magenta px-6 py-3 font-mono text-sm font-bold uppercase text-void transition-transform hover:-translate-y-0.5"
          >
            {pitch.cta}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
