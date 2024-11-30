import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import {
  AUTO_LANG,
  FromLang,
  Lang,
  SUPPORTED_LANG,
  SelectorType,
} from "../interfaces";

type Props =
  | {
      type: SelectorType.FROM;
      onChange: (language: FromLang) => void;
      defaultLanguage: FromLang;
    }
  | {
      type: SelectorType.TO;
      onChange: (language: Lang) => void;
      defaultLanguage: Lang;
    };

export const LanguageSelector: React.FC<Props> = ({
  type,
  onChange,
  defaultLanguage,
}) => {
  const changeLang = (evt: ChangeEvent<HTMLSelectElement>) => {
    onChange(evt.target.value as Lang);
  };

  return (
    <Form.Select
      aria-label="Select a language"
      onChange={changeLang}
      value={defaultLanguage}
    >
      {type === SelectorType.FROM && (
        <option
          value={AUTO_LANG}
          defaultChecked={defaultLanguage === AUTO_LANG}
        >
          Detect language
        </option>
      )}
      {Object.entries(SUPPORTED_LANG).map(([key, language]) => (
        <option
          key={key}
          value={key}
          defaultChecked={language === defaultLanguage}
        >
          {language}
        </option>
      ))}
    </Form.Select>
  );
};
