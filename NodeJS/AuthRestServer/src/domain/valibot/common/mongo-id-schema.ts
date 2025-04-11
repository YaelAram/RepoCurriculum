import { length, pipe } from "valibot";
import { nonEmptyString } from "./non-empty-string.schema";

export const mongoIdSchema = (fieldName: string) => {
  return pipe(
    nonEmptyString(fieldName),
    length(24, `${fieldName} should have 24 characters of legth`),
  );
};
