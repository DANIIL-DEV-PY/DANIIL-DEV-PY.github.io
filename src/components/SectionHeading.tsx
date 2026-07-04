export default function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      <span className="font-mono text-sm font-bold text-magenta">
        {`// ${index}`}
      </span>
      <h2
        data-text={title}
        className="glitch font-display text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-xl font-mono text-sm text-ink/60 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
