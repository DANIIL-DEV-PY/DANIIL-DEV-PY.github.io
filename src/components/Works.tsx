import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { Hammer, ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries/types";

export default function Works({ works }: { works: Dictionary["works"] }) {
  return (
    <section id="works" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        index="03"
        title={works.heading}
        subtitle={works.subheading}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {works.projects.map((project, i) => (
          <ScrollReveal key={project.title} delay={i * 0.08}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-square flex-col justify-between border-2 border-ink p-6 transition-colors hover:border-acid"
            >
              <div>
                <h3 className="font-display text-xl font-bold uppercase text-ink group-hover:text-acid">
                  {project.title}
                </h3>
                <p className="mt-3 font-mono text-sm text-ink/60">
                  {project.description}
                </p>
              </div>
              <div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-ink/30 px-2 py-1 font-mono text-xs uppercase text-ink/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-sm font-bold text-cyan">
                  {works.demoLabel}
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </a>
          </ScrollReveal>
        ))}

        {Array.from({ length: works.cardCount }).map((_, i) => (
          <ScrollReveal key={i} delay={(works.projects.length + i) * 0.08}>
            <div className="flex aspect-square flex-col items-center justify-center gap-3 border-2 border-dashed border-ink/40 p-6 text-center transition-colors hover:border-cyan">
              <Hammer className="text-ink/40" size={28} />
              <span className="font-display text-sm font-bold uppercase text-ink/60">
                {works.placeholderTitle}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <p className="mt-6 max-w-xl font-mono text-sm text-ink/50 sm:text-base">
          {works.placeholderText}
        </p>
      </ScrollReveal>
    </section>
  );
}
