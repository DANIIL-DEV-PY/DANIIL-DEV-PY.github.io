import ScrollReveal from "./ScrollReveal";
import { Send, MessageCircle } from "lucide-react";
import { contacts } from "@/data/contacts";
import type { Dictionary } from "@/app/[lang]/dictionaries/types";

export default function Contact({
  contact,
}: {
  contact: Dictionary["contact"];
}) {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6"
    >
      <ScrollReveal>
        <span className="font-mono text-sm font-bold text-magenta">
          {"// 06"}
        </span>
        <h2
          data-text={contact.heading}
          className="glitch mt-3 font-display text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl"
        >
          {contact.heading}
        </h2>
        <p className="mt-5 max-w-xl font-mono text-base text-ink/60 sm:text-lg">
          {contact.subheading}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.15}>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href={contacts.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 border-2 border-ink bg-acid px-8 py-5 font-mono text-base font-bold uppercase text-void transition-transform hover:-translate-y-1"
          >
            <Send size={20} />
            {contact.telegramLabel}
          </a>
          <a
            href={contacts.vkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 border-2 border-ink px-8 py-5 font-mono text-base font-bold uppercase text-ink transition-colors hover:bg-cyan hover:text-void"
          >
            <MessageCircle size={20} />
            {contact.vkLabel}
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
