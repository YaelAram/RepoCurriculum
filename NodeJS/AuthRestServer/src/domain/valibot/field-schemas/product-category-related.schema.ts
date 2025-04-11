import { boolean, minValue, number, optional, pipe, string } from "valibot";
import { nonEmptyString } from "../common/non-empty-string.schema";

export const nameSchema = nonEmptyString("Name");

export const availableSchema = optional(boolean("Available property is not a boolean"));

export const priceSchema = pipe(
  number("Price property is not a number"),
  minValue(0, "Price can not be a negative number"),
);

export const descriptionSchema = optional(string("Description field have to be a string"));
