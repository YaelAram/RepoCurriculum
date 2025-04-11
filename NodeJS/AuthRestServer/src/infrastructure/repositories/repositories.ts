import { BcryptStrategy } from "../security/bcrypt.strategy";

import { MongoAuthRepository } from "./auth/mongo-auth.repository";
import { MongoCategoryRepository } from "./categories/mongo-category.repository";
import { MongoProductRepository } from "./products/mongo-product.repository";

export const AuthRepositories = {
  mongoWithBcryptStrategy: new MongoAuthRepository(BcryptStrategy),
};

export const CategoryRepositories = {
  mongo: new MongoCategoryRepository(),
};

export const ProductRepositores = {
  mongoWithMongoCategoryRepository: new MongoProductRepository(CategoryRepositories.mongo),
};
