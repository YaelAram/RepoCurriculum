import { nonEmpty, pipe, string, trim } from "valibot";

export const nonEmptyString = (fieldName: string) => {
  return pipe(
    string(`${fieldName} provided is not a string`),
    trim(),
    nonEmpty(`${fieldName} provided is an empty string`),
  );
};
