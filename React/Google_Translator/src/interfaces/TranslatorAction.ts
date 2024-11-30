import { FromLang, Lang } from ".";

export interface TranslatorState {
  fromLanguage: FromLang;
  toLanguage: Lang;
  fromText: string;
  translation: string;
  isLoading: boolean;
}

export enum ActionType {
  SWAP_LANG = "swap-lang",
  SET_FROM_LANG = "set-from-lang",
  SET_TO_LANG = "set-to-lang",
  SET_FROM_TEXT = "set-from-text",
  SET_TRANSLATION = "set-translation",
}

export type TranlatorAction =
  | {
      type: ActionType.SWAP_LANG;
    }
  | { type: ActionType.SET_FROM_LANG; payload: FromLang }
  | { type: ActionType.SET_TO_LANG; payload: Lang }
  | { type: ActionType.SET_FROM_TEXT; payload: string }
  | { type: ActionType.SET_TRANSLATION; payload: string };
