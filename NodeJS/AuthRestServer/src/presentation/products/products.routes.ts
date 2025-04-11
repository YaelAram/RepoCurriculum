import { Router } from "express";

import { ProductRepositores } from "../../infrastructure/repositories/repositories";
import { checkToken, tokenMiddelwareOptions } from "../middlewares/auth.middleware";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

const routes = () => {
  const router = Router();
  const productsService = new ProductsService(ProductRepositores.mongoWithMongoCategoryRepository);
  const productsController = new ProductsController(productsService);

  router.get("/", productsController.getProducts);
  router.post("/", [checkToken(tokenMiddelwareOptions)], productsController.createProduct);

  return router;
};

export const ProductsRoutes = { routes };
