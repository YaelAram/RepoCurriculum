import { SelectorType } from "../interfaces";

interface Params {
  type: SelectorType;
  loading?: boolean;
}

export const getPlaceholder = ({ type, loading = false }: Params) => {
  if (type === SelectorType.FROM) return "Enter text";
  if (loading) return "Loading...";
  return "Translation";
};

const commonStyles = {
  border: 0,
  height: "200px",
};

export const getStyles = (type: SelectorType) => {
  return type === SelectorType.FROM
    ? commonStyles
    : { ...commonStyles, backgroundColor: "#f5f5f5" };
};
