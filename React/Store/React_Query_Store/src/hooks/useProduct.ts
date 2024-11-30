import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services";

interface Params {
  id: number;
}

export const useProduct = ({ id }: Params) => {
  const { isLoading, data: product } = useQuery(
    ["product", id],
    () => getProduct(id),
    {
      staleTime: 1000 * 60 * 10,
    }
  );

  return {
    isLoading,
    product,
  };
};
