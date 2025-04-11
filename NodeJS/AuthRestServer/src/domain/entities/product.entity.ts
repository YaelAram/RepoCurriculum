import type { ProductObj } from "../../interfaces/dtos.types";
import { validateDto } from "../dtos/validate-dto";
import { productEntitySchema } from "../valibot/product.schema";
import { CustomHttpError } from "./custom-http.error";

export class ProductEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly available: boolean;
  public readonly price: number;
  public readonly description: string;
  public readonly user: string;
  public readonly category: string;

  constructor({ id, name, available, price, description, user, category }: ProductObj) {
    this.id = id;
    this.name = name;
    this.available = available;
    this.price = price;
    this.description = description;
    this.user = user;
    this.category = category;
  }

  static fromObj(object: { [key: string]: any }): ProductEntity {
    const { id, _id, name, available, price, description, user, category } = object;

    const productId = id ?? _id?.toString();
    const userId = user?.toString();
    const categoryId = category?.toString();

    const productObjResult = validateDto<ProductObj>(
      { id: productId, name, available, price, description, user: userId, category: categoryId },
      productEntitySchema,
    );

    if (!productObjResult.ok) {
      throw CustomHttpError.ServerError(
        "Error converting obj to ProductEntity",
        productObjResult.issues,
      );
    }

    return new ProductEntity(productObjResult.result);
  }
}
