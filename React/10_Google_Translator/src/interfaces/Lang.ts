export const SUPPORTED_LANG = {
  es: "Español",
  en: "English",
  de: "Deutsch",
};

export const VOICE_FOR_LANGUAGE = {
  en: "en-GB",
  es: "es-MX",
  de: "de-DE",
};

export const AUTO_LANG = "auto";

export type Lang = keyof typeof SUPPORTED_LANG;
export type AutoLang = typeof AUTO_LANG;
export type FromLang = Lang | AutoLang;
