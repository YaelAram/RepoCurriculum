import { Router } from "express";

import { AuthRoutes } from "./auth/auth.routes";
import { CategoriesRoutes } from "./categories/categories.routes";
import { FileUploadRoutes } from "./files-upload/file-upload.routes";
import { ProductsRoutes } from "./products/products.routes";

const routes = () => {
  const router = Router();

  router.use("/api/auth", AuthRoutes.routes());
  router.use("/api/categories", CategoriesRoutes.routes());
  router.use("/api/products", ProductsRoutes.routes());
  router.use("/api/upload", FileUploadRoutes.routes());

  return router;
};

export const AppRoutes = { routes };
