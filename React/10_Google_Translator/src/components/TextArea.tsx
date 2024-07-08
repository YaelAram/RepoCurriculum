import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

import { SelectorType } from "../interfaces";
import { getPlaceholder, getStyles } from "../helpers";

interface Props {
  onChange: (text: string) => void;
  type: SelectorType;
  value: string;
  loading?: boolean;
}

export const TextArea: React.FC<Props> = ({
  onChange,
  type,
  value,
  loading = false,
}) => {
  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(evt.target.value);
  };

  return (
    <Form.Control
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SelectorType.FROM}
      style={getStyles(type)}
      onChange={handleChange}
      value={value}
      disabled={type === SelectorType.TO}
    />
  );
};
