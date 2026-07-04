import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import type { Dictionary } from "@/app/[lang]/dictionaries/types";

export default function Process({
  process,
}: {
  process: Dictionary["process"];
}) {
  return (
    <section id="process" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading index="04" title={process.heading} />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col">
          {process.steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.08}>
              <div
                className={`flex gap-5 py-5 ${
                  i > 0 ? "border-t-2 border-ink/20" : ""
                }`}
              >
                <span className="font-display text-3xl font-black text-acid">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase">
                    {step.title}
                  </h3>
                  <p className="mt-1 font-mono text-sm text-ink/60 sm:text-base">
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="h-full border-2 border-magenta p-6">
            <h3 className="mb-4 font-display text-lg font-bold uppercase text-magenta">
              {process.policyHeading}
            </h3>
            <ul className="flex flex-col gap-3">
              {process.policy.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 font-mono text-sm text-ink/70 sm:text-base"
                >
                  <span className="text-magenta">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
