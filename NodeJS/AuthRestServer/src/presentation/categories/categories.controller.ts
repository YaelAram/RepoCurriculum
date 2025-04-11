import type { Request, Response } from "express";

import type { CustomHttpError } from "../../domain/entities/custom-http.error";
import type { CategoryCreate, Pagination } from "../../interfaces/dtos.types";
import type { CategoriesService } from "./categories.service";

import { validateDto } from "../../domain/dtos/validate-dto";
import { categorySchema } from "../../domain/valibot/category.schema";
import { paginationSchema } from "../../domain/valibot/pagination.schema";

export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  getCategories = (req: Request, res: Response) => {
    const paginationResult = validateDto<Pagination>(req.query, paginationSchema);
    if (!paginationResult.ok) return res.status(400).json({ issues: paginationResult.issues });

    this.categoriesService
      .getCategories(paginationResult.result)
      .then((categoriesPage) => res.status(200).json(categoriesPage))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  createCategory = (req: Request, res: Response) => {
    const { userInfo, ...categoryInfo } = req.body;
    const categoryResult = validateDto<CategoryCreate>(categoryInfo, categorySchema);
    if (!categoryResult.ok) return res.status(400).json({ issues: categoryResult.issues });

    this.categoriesService
      .createCategory(categoryResult.result)
      .then((category) => res.status(201).json({ category }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };
}
