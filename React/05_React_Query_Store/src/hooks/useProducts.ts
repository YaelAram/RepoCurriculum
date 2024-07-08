import { useQuery } from "@tanstack/react-query";
import { FilterKeyType } from "../interfaces";
import { getProducts } from "../services";

interface Options {
  filterKey?: FilterKeyType;
}

export const useProducts = ({ filterKey }: Options) => {
  const {
    isLoading,
    isError,
    error,
    data: products = [],
    isFetching,
  } = useQuery(["products", { filterKey }], () => getProducts({ filterKey }), {
    staleTime: 1000 * 60 * 10,
  });

  return { isLoading, isError, error, products, isFetching };
};
