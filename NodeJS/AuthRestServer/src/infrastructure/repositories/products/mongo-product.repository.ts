import { ProductModel } from "../../../data/mongo/models/product.model";
import { CustomHttpError } from "../../../domain/entities/custom-http.error";
import { ProductEntity } from "../../../domain/entities/product.entity";
import { handleError } from "../helpers/handleError";

import type { Pagination, ProductCreate } from "../../../interfaces/dtos.types";
import type { CategoryRepository, ProductRepository } from "../../../interfaces/repositories.types";

export class MongoProductRepository implements ProductRepository {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  createProduct = async (product: ProductCreate): Promise<ProductEntity> => {
    try {
      const productExists = await ProductModel.findOne({ name: product.name });
      if (productExists)
        throw CustomHttpError.BadRequest(`Product ${product.name} already registered`);

      const categoryExists = await this.categoryRepository.findCategoryById(product.category);
      if (!categoryExists) throw CustomHttpError.BadRequest("Category not registered yet");

      const mongoProduct = new ProductModel(product);
      await mongoProduct.save();

      return ProductEntity.fromObj(mongoProduct);
    } catch (error: any) {
      throw handleError(error, `Error creating ${product.name} product`);
    }
  };

  getProducts = async ({ limit, offset }: Pagination): Promise<ProductEntity[]> => {
    try {
      const categories = await ProductModel.find().skip(offset).limit(limit);
      return categories.map((category) => ProductEntity.fromObj(category));
    } catch (error: any) {
      throw handleError(error, "Error getting products");
    }
  };

  countDocuments = async (): Promise<number> => {
    try {
      const total = await ProductModel.countDocuments();
      return total;
    } catch (error: any) {
      throw handleError(error, "Error counting product documents");
    }
  };
}
