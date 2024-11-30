import { FilterKeyType, type Product } from "../interfaces";
import { productsApi } from "./products";

interface Options {
  filterKey?: FilterKeyType;
}

export const getProducts = async ({ filterKey }: Options) => {
  const searchParams = new URLSearchParams();
  searchParams.append("category", filterKey ?? "");

  const params = filterKey ? `?${searchParams.toString()}` : "";

  const { data } = await productsApi.get<Product[]>(`/products${params}`);

  return data;
};

export const getProduct = async (id: number) => {
  const { data } = await productsApi.get<Product>(`/products/${id}`);

  return data;
};

interface ProductLike {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const createProduct = async (product: ProductLike) => {
  const { data } = await productsApi.post<Product>("/products", product);

  return data;
};
