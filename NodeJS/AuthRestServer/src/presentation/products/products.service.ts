import type { Pagination, ProductCreate } from "../../interfaces/dtos.types";
import type { ProductRepository } from "../../interfaces/repositories.types";

export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getProducts(pagination: Pagination) {
    const [products, total] = await Promise.all([
      this.productRepository.getProducts(pagination),
      this.productRepository.countDocuments(),
    ]);

    return { settings: pagination, total, products };
  }

  createProduct(product: ProductCreate) {
    return this.productRepository.createProduct(product);
  }
}
