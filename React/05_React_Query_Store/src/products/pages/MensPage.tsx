import { Loader, ProductList } from "..";
import { useProducts } from "../../hooks";
import { FilterKey } from "../../interfaces";

export const MensPage = () => {
  const { isLoading, products } = useProducts({ filterKey: FilterKey.MEN });

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para hombres</h1>
      {isLoading ? <Loader /> : <ProductList products={products} />}
    </div>
  );
};
