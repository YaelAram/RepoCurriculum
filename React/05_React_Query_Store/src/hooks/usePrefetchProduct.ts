import { useQueryClient } from "@tanstack/react-query";
import { getProduct } from "../services";

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  const prefetchProduct = (id: number) => {
    queryClient.prefetchQuery(["product", id], () => getProduct(id), {
      staleTime: 1000 * 60 * 10,
    });
  };

  return { prefetchProduct };
};
