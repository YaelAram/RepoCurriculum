import { useReducer } from "react";
import { initialState, translatorReducer } from "../helpers";
import { ActionType, FromLang, Lang } from "../interfaces";

export const useStore = () => {
  const [state, dispatch] = useReducer(translatorReducer, initialState);

  const changeFromLang = (from: FromLang) => {
    dispatch({ type: ActionType.SET_FROM_LANG, payload: from });
  };

  const changeToLang = (to: Lang) => {
    dispatch({ type: ActionType.SET_TO_LANG, payload: to });
  };

  const swapLang = () => dispatch({ type: ActionType.SWAP_LANG });

  const changeFromText = (text: string) => {
    dispatch({ type: ActionType.SET_FROM_TEXT, payload: text });
  };

  const changeTranslation = (translation: string) => {
    dispatch({ type: ActionType.SET_TRANSLATION, payload: translation });
  };

  return {
    ...state,
    changeFromLang,
    changeToLang,
    swapLang,
    changeFromText,
    changeTranslation,
  };
};
