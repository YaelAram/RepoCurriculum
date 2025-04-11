import { CategoryModel } from "../../../data/mongo/models/category.model";
import { CategoryEntity } from "../../../domain/entities/category.entity";
import { CustomHttpError } from "../../../domain/entities/custom-http.error";
import { handleError } from "../helpers/handleError";

import type { CategoryCreate, Pagination } from "../../../interfaces/dtos.types";
import type { CategoryRepository } from "../../../interfaces/repositories.types";

export class MongoCategoryRepository implements CategoryRepository {
  createCategory = async (category: CategoryCreate): Promise<CategoryEntity> => {
    try {
      const categoryExists = await CategoryModel.findOne({ name: category.name });
      if (categoryExists)
        throw CustomHttpError.BadRequest(`Category ${category.name} already registered`);

      const mongoCategory = new CategoryModel(category);
      await mongoCategory.save();

      return CategoryEntity.fromObj(mongoCategory);
    } catch (error: any) {
      throw handleError(error, `Error creating ${category.name} category`);
    }
  };

  getCategories = async ({ limit, offset }: Pagination): Promise<CategoryEntity[]> => {
    try {
      const categories = await CategoryModel.find().skip(offset).limit(limit);
      return categories.map((category) => CategoryEntity.fromObj(category));
    } catch (error: any) {
      throw handleError(error, "Error getting categories");
    }
  };

  countDocuments = async (): Promise<number> => {
    try {
      const total = await CategoryModel.countDocuments();
      return total;
    } catch (error: any) {
      throw handleError(error, "Error counting categories documents");
    }
  };

  findCategoryById = async (id: string): Promise<CategoryEntity | null> => {
    try {
      const category = await CategoryModel.findById(id);
      if (!category) return null;

      return CategoryEntity.fromObj(category);
    } catch (error: any) {
      throw handleError(error, "Error getting category by id");
    }
  };
}
