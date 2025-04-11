import { array, email, literal, minLength, pipe, regex, union } from "valibot";
import { nonEmptyString } from "../common/non-empty-string.schema";

export const nameSchema = nonEmptyString("Name");

export const emailSchema = pipe(
  nonEmptyString("Email"),
  email("Email provided is not a valid email address"),
);

export const passwordSchema = pipe(
  nonEmptyString("Password"),
  minLength(8, "Password provided is less than 8 characters"),
  regex(/[a-z]/, "Your password must contain a lowercase letter."),
  regex(/[A-Z]/, "Your password must contain a uppercase letter."),
  regex(/[0-9]/, "Your password must contain a number."),
);

export const rolesSchema = pipe(
  array(union([literal("admin"), literal("user")]), "Roles field must be a string array"),
  minLength(1, "Roles can not be an empty array"),
);
