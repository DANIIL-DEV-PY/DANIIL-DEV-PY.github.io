import type { Locale } from "@/app/[lang]/dictionaries";

export function formatPrice(priceRub: number, lang: Locale, usdRubRate: number) {
  if (lang === "en") {
    const usd = Math.round(priceRub / usdRubRate);
    return `$${new Intl.NumberFormat("en-US").format(usd)}`;
  }
  return `${new Intl.NumberFormat("ru-RU").format(priceRub)} ₽`;
}

export function formatPaymentRange(
  row: { minRub: number; maxRub: number | null },
  lang: Locale,
  usdRubRate: number,
  labels: { upTo: string; over: string },
) {
  if (row.maxRub === null) {
    return `${labels.over} ${formatPrice(row.minRub, lang, usdRubRate)}`;
  }
  if (row.minRub === 0) {
    return `${labels.upTo} ${formatPrice(row.maxRub, lang, usdRubRate)}`;
  }
  return `${formatPrice(row.minRub, lang, usdRubRate)} – ${formatPrice(row.maxRub, lang, usdRubRate)}`;
}
