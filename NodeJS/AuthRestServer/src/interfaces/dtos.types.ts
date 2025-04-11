import type { InferInput } from "valibot";

import type {
  LogInSchema,
  SignUpSchema,
  userEntitySchema,
  userIdSchema,
  userUpdateRoles,
} from "../domain/valibot/auth.schema";
import type { categoryEntitySchema, categorySchema } from "../domain/valibot/category.schema";
import type { productEntitySchema, productSchema } from "../domain/valibot/product.schema";

export type UserLogIn = InferInput<typeof LogInSchema>;
export type UserCreate = InferInput<typeof SignUpSchema>;
export type UserObj = InferInput<typeof userEntitySchema>;
export type UserUpdateRoles = InferInput<typeof userUpdateRoles>;
export type UserId = InferInput<typeof userIdSchema>;

export type CategoryCreate = InferInput<typeof categorySchema>;
export type CategoryObj = InferInput<typeof categoryEntitySchema>;

export type ProductCreate = InferInput<typeof productSchema>;
export type ProductObj = InferInput<typeof productEntitySchema>;

export type Pagination = {
  limit: number;
  offset: number;
};
