import { Loader, ProductList } from "..";
import { useProducts } from "../../hooks";

export const CompleteListPage = () => {
  const { isLoading, products } = useProducts({});

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>
      {isLoading ? <Loader /> : <ProductList products={products} />}
    </div>
  );
};
