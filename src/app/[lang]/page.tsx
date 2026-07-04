import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import { contacts } from "@/data/contacts";
import GridBackground from "@/components/GridBackground";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pitch from "@/components/Pitch";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import Services from "@/components/Services";
import Payment from "@/components/Payment";
import Works from "@/components/Works";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="animate-fade-in">
      <GridBackground />
      <Header lang={lang} nav={dict.nav} ctaHref={contacts.telegramUrl} />

      <main>
        <Hero hero={dict.hero} ctaHref={contacts.telegramUrl} />
        <Pitch pitch={dict.pitch} ctaHref={contacts.telegramUrl} />
        <Marquee items={dict.ticker} />
        <Stats stats={dict.stats} />
        <CurrencyProvider enabled={lang === "en"}>
          <Services services={dict.services} lang={lang} />
          <Payment payment={dict.payment} lang={lang} />
        </CurrencyProvider>
        <Works works={dict.works} />
        <Process process={dict.process} />
        <Faq faq={dict.faq} />
        <Contact contact={dict.contact} />
      </main>

      <Footer footer={dict.footer} />
    </div>
  );
}
