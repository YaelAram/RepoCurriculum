import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Loader, ProductCard } from "..";
import { useProduct } from "../../hooks";

export const ProductPage = () => {
  const { id } = useParams();
  const { product, isLoading } = useProduct({ id: +id! });

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="flex-col justify-center w-full">
      {isLoading ? <Loader /> : <ProductCard product={product!} fullDes />}
    </div>
  );
};
