import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast/headless";
import { type Product } from "../interfaces";
import { createProduct } from "../services";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (product) => {
      queryClient.setQueryData<Product[]>(
        ["products", { filterKey: product.category }],
        (old) => {
          if (!old) return [product];

          return [...old, product];
        }
      );

      toast.success(`El producto ${product.title} fue creado con exito`);
    },
  });

  return {
    productMutation,
  };
};
