import { Router } from "express";

import { CategoryRepositories } from "../../infrastructure/repositories/repositories";
import { checkToken, tokenMiddelwareOptions } from "../middlewares/auth.middleware";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

const routes = () => {
  const router = Router();
  const categoryService = new CategoriesService(CategoryRepositories.mongo);
  const categoriesController = new CategoriesController(categoryService);

  router.get("/", categoriesController.getCategories);
  router.post("/", [checkToken(tokenMiddelwareOptions)], categoriesController.createCategory);

  return router;
};

export const CategoriesRoutes = { routes };
