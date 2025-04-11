import type { UserObj } from "../../interfaces/dtos.types";
import { validateDto } from "../dtos/validate-dto";
import { userEntitySchema } from "../valibot/auth.schema";
import { CustomHttpError } from "./custom-http.error";

export class UserEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly emailValidated: boolean;
  public readonly password: string;
  public readonly roles: string[];
  public readonly active: boolean;
  public readonly avatar?: string;

  constructor({ id, name, email, emailValidated, password, roles, active, avatar }: UserObj) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.emailValidated = emailValidated;
    this.password = password;
    this.roles = roles;
    this.active = active;
    this.avatar = avatar;
  }

  static fromObj(obj: { [key: string]: any }) {
    const { id, _id, active, email, emailValidated, name, password, roles, avatar } = obj;

    const categoryId = id ?? _id?.toString();

    const userObjResult = validateDto<UserObj>(
      { id: categoryId, name, email, emailValidated, password, roles, active, avatar },
      userEntitySchema,
    );

    if (!userObjResult.ok) {
      throw CustomHttpError.ServerError("Error converting obj to UserEntity", userObjResult.issues);
    }

    return new UserEntity(userObjResult.result);
  }
}
