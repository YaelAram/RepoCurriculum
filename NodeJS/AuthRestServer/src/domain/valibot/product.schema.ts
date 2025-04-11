import { boolean, object, strictObject, string } from "valibot";

import { mongoIdSchema } from "./common/mongo-id-schema";
import {
  availableSchema,
  descriptionSchema,
  nameSchema,
  priceSchema,
} from "./field-schemas/product-category-related.schema";

export const productSchema = strictObject({
  name: nameSchema,
  available: availableSchema,
  price: priceSchema,
  description: descriptionSchema,
  user: mongoIdSchema("User"),
  category: mongoIdSchema("Category"),
});

export const productEntitySchema = object({
  id: mongoIdSchema("ID"),
  name: nameSchema,
  available: boolean("Available field must be a boolean"),
  price: priceSchema,
  description: string("Description field must be a string"),
  user: mongoIdSchema("User"),
  category: mongoIdSchema("Category"),
});
