import type { CategoryCreate, Pagination } from "../../interfaces/dtos.types";
import type { CategoryRepository } from "../../interfaces/repositories.types";

export class CategoriesService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getCategories(pagination: Pagination) {
    const [categories, total] = await Promise.all([
      this.categoryRepository.getCategories(pagination),
      this.categoryRepository.countDocuments(),
    ]);

    return { settings: pagination, total, categories };
  }

  createCategory(category: CategoryCreate) {
    return this.categoryRepository.createCategory(category);
  }
}
