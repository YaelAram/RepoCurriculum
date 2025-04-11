import { boolean, object, strictObject } from "valibot";

import { mongoIdSchema } from "./common/mongo-id-schema";
import { availableSchema, nameSchema } from "./field-schemas/product-category-related.schema";

export const categorySchema = strictObject({
  name: nameSchema,
  available: availableSchema,
  user: mongoIdSchema("User"),
});

export const categoryEntitySchema = object({
  id: mongoIdSchema("ID"),
  name: nameSchema,
  available: boolean("Available field must be a boolean"),
  user: mongoIdSchema("User"),
});
