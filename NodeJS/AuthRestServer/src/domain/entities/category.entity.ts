import type { CategoryObj } from "../../interfaces/dtos.types";
import { validateDto } from "../dtos/validate-dto";
import { categoryEntitySchema } from "../valibot/category.schema";
import { CustomHttpError } from "./custom-http.error";

export class CategoryEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly available: boolean;
  public readonly user: string;

  constructor({ id, name, available, user }: CategoryObj) {
    this.id = id;
    this.name = name;
    this.available = available;
    this.user = user;
  }

  static fromObj(object: { [key: string]: any }): CategoryEntity {
    const { id, _id, name, available, user } = object;

    const categoryId = id ?? _id?.toString();
    const userId = user?.toString();

    const categoryObjResult = validateDto<CategoryObj>(
      { id: categoryId, name, available, user: userId },
      categoryEntitySchema,
    );

    if (!categoryObjResult.ok) {
      throw CustomHttpError.ServerError(
        "Error converting obj to CategoryEntity",
        categoryObjResult.issues,
      );
    }

    return new CategoryEntity(categoryObjResult.result);
  }
}
