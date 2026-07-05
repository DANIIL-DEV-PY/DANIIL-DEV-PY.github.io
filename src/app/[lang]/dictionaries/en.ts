import type { Dictionary } from "./types";

const en: Dictionary = {
  meta: {
    title: "Daniil — Web Developer",
    description:
      "Web developer: markup, Node.js/PHP/Python sites, Telegram and Discord bots, fixing other people's code.",
  },
  nav: {
    services: "Services",
    pricing: "Payment",
    works: "Works",
    process: "Process",
    faq: "FAQ",
    contact: "Contact",
    cta: "Get in touch",
  },
  hero: {
    kicker: "Freelance · Web Development",
    titleLine1: "DANIIL",
    titleLine2: "BUILDS WEBSITES",
    subtitle:
      "Web developer with over 1 year of experience. Always learning and growing, picking up new technologies and approaches. My goal is to build quality, modern web solutions that solve real problems.",
    ctaPrimary: "Discuss a project",
    ctaSecondary: "See services",
  },
  pitch: {
    headline: "No website. No clients.",
    text: "While you don't have a website, your clients go to whoever does. I can fix that — I'll build a site that actually sells.",
    cta: "Discuss your site",
  },
  ticker: [
    "HTML",
    "CSS",
    "JAVASCRIPT",
    "NODE.JS",
    "PHP",
    "PYTHON",
    "REST API",
    "TELEGRAM BOTS",
    "DISCORD BOTS",
  ],
  stats: [
    { value: "1+", label: "year of experience" },
    { value: "4", label: "service directions" },
    { value: "14", label: "days of guarantee" },
  ],
  services: {
    heading: "Services",
    subheading: "Frontend, backend, bots, and fixing other people's code",
    fromWord: "from",
    groups: [
      {
        title: "Frontend Development",
        items: [
          { name: "Website markup", price: 1500 },
          { name: "Responsive markup", price: 2000 },
          { name: "HTML + CSS + JS sites", price: 3000 },
          { name: "Interactive elements", price: 800 },
        ],
      },
      {
        title: "Backend Development",
        items: [
          { name: "Node.js sites", price: 5000 },
          { name: "PHP sites", price: 4000 },
          { name: "Python sites", price: 5000 },
          { name: "API / REST services", price: 3000 },
        ],
      },
      {
        title: "Bots",
        items: [
          { name: "Telegram bots", price: 3000 },
          { name: "Discord bots", price: 3500 },
        ],
      },
      {
        title: "Fixing Other People's Code",
        items: [
          { name: "Python", price: 850 },
          { name: "Node.js", price: 1250 },
          { name: "PHP", price: 1200 },
          { name: "HTML + CSS", price: 650 },
        ],
      },
    ],
  },
  payment: {
    heading: "Payment Terms",
    subheading: "The prepayment share depends on the order amount",
    colRange: "Order amount",
    colPrepay: "Prepayment",
    upToWord: "Up to",
    overWord: "Over",
    rows: [
      { minRub: 0, maxRub: 5000, prepay: "100%" },
      { minRub: 5000, maxRub: 15000, prepay: "80%" },
      { minRub: 15000, maxRub: 30000, prepay: "60%" },
      { minRub: 30000, maxRub: null, prepay: "50%" },
    ],
  },
  works: {
    heading: "Works",
    subheading: "Portfolio is currently being filled in",
    placeholderTitle: "In progress",
    placeholderText:
      "More projects will show up here soon. Reach out to discuss your task right now.",
    cardCount: 1,
    demoLabel: "View demo",
    projects: [
      {
        title: "Nullpoint",
        description:
          "Landing page for a fictional wearable body-thermostat gadget: canvas particles and gradient backgrounds, a sticky step stack with 3D icons, a floating pill header and line-by-line scroll reveals.",
        tags: ["HTML", "CSS", "JavaScript"],
        href: "/projects/nullpoint/",
      },
      {
        title: "Kholod Service",
        description:
          "Site for a fridge & appliance repair technician: services list with pricing, a dedicated page per service, a contact form, sticky-stacking service cards and scroll animations.",
        tags: ["HTML", "CSS", "JavaScript"],
        href: "/projects/holod-remont/",
      },
      {
        title: "Beauty Store",
        description:
          "A cosmetics e-commerce demo: catalog with category/brand/price/stock filters, search, cart with promo codes and free shipping, wishlist, checkout flow, dark theme.",
        tags: ["HTML", "CSS", "JavaScript"],
        href: "/projects/beauty-store/",
      },
    ],
  },
  process: {
    heading: "How the work happens",
    steps: [
      {
        title: "Message me",
        desc: "You message me on Telegram or VK and describe the task",
      },
      {
        title: "Discussion",
        desc: "We discuss timelines, cost, and project details",
      },
      {
        title: "Prepayment",
        desc: "Prepayment is made according to the order amount",
      },
      {
        title: "Delivery",
        desc: "Intermediate stages are agreed with you, source code is handed over after full payment",
      },
    ],
    policyHeading: "Cooperation Policy",
    policy: [
      "Timelines are discussed individually",
      "Intermediate stages are agreed with you",
      "Source code is handed over after full payment",
    ],
  },
  faq: {
    heading: "FAQ",
    items: [
      {
        q: "How does work start?",
        a: "You message me, we discuss the task, timeline, and cost, then I get started.",
      },
      {
        q: "Do you offer a guarantee?",
        a: "Yes! I fix bugs for free within 14 days after project delivery.",
      },
      {
        q: "Can I pay in installments?",
        a: "Yes, for larger orders an individual payment schedule is possible.",
      },
    ],
  },
  contact: {
    heading: "Contact",
    subheading: "Let's discuss your order — message me and I'll propose a solution.",
    telegramLabel: "Message on Telegram",
    vkLabel: "Message on VK",
  },
  footer: {
    text: "Web Development",
  },
};

export default en;
