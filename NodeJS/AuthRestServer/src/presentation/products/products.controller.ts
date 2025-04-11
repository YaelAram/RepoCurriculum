import type { Request, Response } from "express";
import type { CustomHttpError } from "../../domain/entities/custom-http.error";
import type { Pagination, ProductCreate } from "../../interfaces/dtos.types";
import type { ProductsService } from "./products.service";

import { validateDto } from "../../domain/dtos/validate-dto";
import { paginationSchema } from "../../domain/valibot/pagination.schema";
import { productSchema } from "../../domain/valibot/product.schema";

export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  getProducts = (req: Request, res: Response) => {
    const paginationResult = validateDto<Pagination>(req.query, paginationSchema);
    if (!paginationResult.ok) return res.status(400).json({ issues: paginationResult.issues });

    this.productService
      .getProducts(paginationResult.result)
      .then((productsPage) => res.status(200).json(productsPage))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  createProduct = (req: Request, res: Response) => {
    const { userInfo, ...productInfo } = req.body;
    const productResult = validateDto<ProductCreate>(productInfo, productSchema);
    if (!productResult.ok) return res.status(400).json({ issues: productResult.issues });

    this.productService
      .createProduct(productResult.result)
      .then((product) => res.status(201).json({ product }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };
}
