export interface ServiceItem {
  name: string;
  price: number;
}

export interface ServiceGroup {
  title: string;
  items: ServiceItem[];
}

export interface PaymentRow {
  minRub: number;
  maxRub: number | null;
  prepay: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    pricing: string;
    works: string;
    process: string;
    faq: string;
    contact: string;
    cta: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  pitch: {
    headline: string;
    text: string;
    cta: string;
  };
  ticker: string[];
  stats: { value: string; label: string }[];
  services: {
    heading: string;
    subheading: string;
    fromWord: string;
    groups: ServiceGroup[];
  };
  payment: {
    heading: string;
    subheading: string;
    colRange: string;
    colPrepay: string;
    upToWord: string;
    overWord: string;
    rows: PaymentRow[];
  };
  works: {
    heading: string;
    subheading: string;
    placeholderTitle: string;
    placeholderText: string;
    cardCount: number;
    demoLabel: string;
    projects: {
      title: string;
      description: string;
      tags: string[];
      href: string;
    }[];
  };
  process: {
    heading: string;
    steps: { title: string; desc: string }[];
    policyHeading: string;
    policy: string[];
  };
  faq: {
    heading: string;
    items: { q: string; a: string }[];
  };
  contact: {
    heading: string;
    subheading: string;
    telegramLabel: string;
    vkLabel: string;
  };
  footer: {
    text: string;
  };
}
