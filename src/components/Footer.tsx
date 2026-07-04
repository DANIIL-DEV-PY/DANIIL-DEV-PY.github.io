import type { Dictionary } from "@/app/[lang]/dictionaries/types";

export default function Footer({ footer }: { footer: Dictionary["footer"] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-ink px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs uppercase tracking-wide text-ink/50 sm:flex-row">
        <span>
          DANIIL<span className="text-acid">.</span>DEV — {footer.text}
        </span>
        <span>© {year}</span>
      </div>
    </footer>
  );
}
