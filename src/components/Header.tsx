"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/app/[lang]/dictionaries/types";
import type { Locale } from "@/app/[lang]/dictionaries";

export default function Header({
  lang,
  nav,
  ctaHref,
}: {
  lang: Locale;
  nav: Dictionary["nav"];
  ctaHref: string;
}) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#services", label: nav.services },
    { href: "#pricing", label: nav.pricing },
    { href: "#works", label: nav.works },
    { href: "#process", label: nav.process },
    { href: "#faq", label: nav.faq },
    { href: "#contact", label: nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-ink bg-void/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href={`/${lang}`}
          className="font-display text-lg font-black uppercase tracking-tight text-ink sm:text-xl"
        >
          DANIIL<span className="text-acid">.</span>DEV
        </Link>

        <nav className="hidden items-center gap-6 font-mono text-sm uppercase tracking-wide lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-ink/70 transition-colors hover:text-acid"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LangSwitch lang={lang} />
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-ink bg-acid px-4 py-1.5 font-mono text-sm font-bold uppercase text-void transition-transform hover:-translate-y-0.5"
          >
            {nav.cta}
          </a>
        </div>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="border-2 border-ink p-2 text-ink lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="border-t-4 border-ink bg-void px-4 pb-6 pt-4 lg:hidden">
          <nav className="flex flex-col gap-4 font-mono text-base uppercase tracking-wide">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/20 pb-2 text-ink/80 hover:text-acid"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex items-center justify-between gap-4">
            <LangSwitch lang={lang} />
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-ink bg-acid px-4 py-1.5 font-mono text-sm font-bold uppercase text-void"
            >
              {nav.cta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function LangSwitch({ lang }: { lang: Locale }) {
  return (
    <div className="flex border-2 border-ink font-mono text-xs font-bold uppercase">
      <Link
        href="/ru"
        className={`px-2 py-1 ${lang === "ru" ? "bg-ink text-void" : "text-ink/60 hover:text-ink"}`}
      >
        RU
      </Link>
      <Link
        href="/en"
        className={`px-2 py-1 ${lang === "en" ? "bg-ink text-void" : "text-ink/60 hover:text-ink"}`}
      >
        EN
      </Link>
    </div>
  );
}
