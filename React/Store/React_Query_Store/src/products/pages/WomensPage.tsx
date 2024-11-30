import { Loader, ProductList } from "..";
import { useProducts } from "../../hooks";
import { FilterKey } from "../../interfaces";

export const WomensPage = () => {
  const { isLoading, products } = useProducts({ filterKey: FilterKey.WOMEN });

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para mujeres</h1>
      {isLoading ? <Loader /> : <ProductList products={products} />}
    </div>
  );
};
