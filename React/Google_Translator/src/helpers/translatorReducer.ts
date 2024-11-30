import { AUTO_LANG } from "../interfaces/Lang";
import {
  ActionType,
  type TranlatorAction,
  type TranslatorState,
} from "../interfaces";

export const initialState: TranslatorState = {
  fromLanguage: "auto",
  toLanguage: "en",
  fromText: "",
  translation: "",
  isLoading: false,
};

export const translatorReducer = (
  state: TranslatorState,
  action: TranlatorAction
): TranslatorState => {
  switch (action.type) {
    case ActionType.SWAP_LANG: {
      if (state.fromLanguage === AUTO_LANG) return state;
      const isLoading = state.fromText !== "";
      return {
        ...state,
        isLoading,
        translation: "",
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      };
    }
    case ActionType.SET_FROM_LANG: {
      if (state.fromLanguage === action.payload) return state;
      const isLoading = state.fromText !== "";
      return {
        ...state,
        fromLanguage: action.payload,
        translation: "",
        isLoading,
      };
    }
    case ActionType.SET_TO_LANG: {
      if (state.toLanguage === action.payload) return state;
      const isLoading = state.fromText !== "";
      return {
        ...state,
        toLanguage: action.payload,
        translation: "",
        isLoading,
      };
    }
    case ActionType.SET_FROM_TEXT: {
      const isLoading = action.payload !== "";
      return {
        ...state,
        isLoading,
        fromText: action.payload,
        translation: "",
      };
    }
    case ActionType.SET_TRANSLATION: {
      return {
        ...state,
        isLoading: false,
        translation: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
