import { array, boolean, object, optional, strictObject } from "valibot";

import { mongoIdSchema } from "./common/mongo-id-schema";
import { nonEmptyString } from "./common/non-empty-string.schema";
import {
  emailSchema,
  nameSchema,
  passwordSchema,
  rolesSchema,
} from "./field-schemas/user-related.schema";

export const LogInSchema = strictObject({
  email: emailSchema,
  password: passwordSchema,
});

export const SignUpSchema = strictObject({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const userEntitySchema = object({
  id: mongoIdSchema("ID"),
  name: nameSchema,
  email: emailSchema,
  emailValidated: boolean("EmailValidated field must be a boolean"),
  password: passwordSchema,
  active: boolean("Active field must be a boolean"),
  avatar: optional(nonEmptyString("Avatar")),
  roles: array(nonEmptyString("Role"), "Roles must be an array of non empty strings"),
});

export const userUpdateRoles = object({
  id: mongoIdSchema("ID"),
  roles: rolesSchema,
});

export const userIdSchema = object({
  user: mongoIdSchema("User"),
});
