import type { CategoryEntity } from "../domain/entities/category.entity";
import type { ProductEntity } from "../domain/entities/product.entity";
import type { UserEntity } from "../domain/entities/user.entity";
import type {
  CategoryCreate,
  Pagination,
  ProductCreate,
  UserCreate,
  UserLogIn,
  UserUpdateRoles,
} from "./dtos.types";

export interface UpdateUserAvatarResult {
  user: UserEntity;
  lastAvatar: string | null | undefined;
}

export interface AuthRepository {
  signUp: (user: UserCreate) => Promise<UserEntity>;
  getUserByEmail: (user: UserLogIn) => Promise<UserEntity>;
  validateEmail: (email: string) => Promise<boolean>;
  findUserById: (id: string) => Promise<UserEntity | null>;
  updateUserRoles: (updateInfo: UserUpdateRoles) => Promise<UserEntity>;
  updateUserAvatar: (id: string, avatar: string) => Promise<UpdateUserAvatarResult>;
}

export interface CategoryRepository {
  createCategory: (category: CategoryCreate) => Promise<CategoryEntity>;
  getCategories: (pagination: Pagination) => Promise<CategoryEntity[]>;
  countDocuments: () => Promise<number>;
  findCategoryById: (id: string) => Promise<CategoryEntity | null>;
}

export interface ProductRepository {
  createProduct: (product: ProductCreate) => Promise<ProductEntity>;
  getProducts: (pagination: Pagination) => Promise<ProductEntity[]>;
  countDocuments: () => Promise<number>;
}
