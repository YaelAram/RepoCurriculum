import { UserApi } from '../../auth/interfaces/user-api';

export interface ProductPageApi {
  count: number;
  pages: number;
  products: ProductApi[];
}

export interface ProductApi {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: UserApi;
}

export type Gender = 'kid' | 'men' | 'unisex' | 'women';
export type ProductFormData = Omit<ProductApi, 'id' | 'user'>;
export type ProductUpdate = Partial<ProductApi>;

export interface ImageUploadResponse {
  secureUrl: string;
  fileName: string;
}
