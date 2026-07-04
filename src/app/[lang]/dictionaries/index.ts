import "server-only";
import type { Dictionary } from "./types";

const dictionaries = {
  ru: () => import("./ru").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];

export const defaultLocale: Locale = "ru";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
