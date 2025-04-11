import { minValue, number, optional, pipe, transform } from "valibot";
import { nonEmptyString } from "./non-empty-string.schema";

export const numericQueryParam = (fieldName: string, min: string) => {
  return optional(
    pipe(
      nonEmptyString(fieldName),
      transform(Number),
      number(`${fieldName} field is not a number`),
      minValue(0, `${fieldName} field can not be a negative number`),
    ),
    min,
  );
};
