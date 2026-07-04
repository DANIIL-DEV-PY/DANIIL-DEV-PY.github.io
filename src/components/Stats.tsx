import ScrollReveal from "./ScrollReveal";

export default function Stats({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="border-y-4 border-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-3">
        {stats.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 0.1}>
            <div
              className={`flex flex-col items-center gap-1 px-6 py-10 text-center ${
                i > 0 ? "sm:border-l-4 sm:border-ink" : ""
              } ${i > 0 ? "border-t-4 border-ink sm:border-t-0" : ""}`}
            >
              <span className="font-display text-5xl font-black text-acid sm:text-6xl">
                {s.value}
              </span>
              <span className="font-mono text-sm uppercase tracking-wide text-ink/60">
                {s.label}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
