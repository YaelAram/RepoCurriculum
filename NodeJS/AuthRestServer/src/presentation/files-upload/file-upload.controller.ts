import type { Request, Response } from "express";
import type { CustomHttpError } from "../../domain/entities/custom-http.error";
import type { UserId } from "../../interfaces/dtos.types";
import type { FileUploadService } from "./file-upload.service";

import { fileUploadDto } from "../../domain/dtos/file-upload.dto";
import { validateDto } from "../../domain/dtos/validate-dto";
import { userIdSchema } from "../../domain/valibot/auth.schema";

export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  updateUserAvatar = async (req: Request, res: Response) => {
    const userIdResult = validateDto<UserId>(req.body, userIdSchema);
    if (!userIdResult.ok) return res.status(400).json({ issues: userIdResult.issues });

    const fileResult = fileUploadDto({
      allowedTypes: ["jpg", "jpeg", "png"],
      allowedMimes: ["image/jpeg", "image/png"],
      allowMultiple: false,
      input: req.files,
      maxSize: 5 * 1024 * 1024,
    });
    if (!fileResult.ok) return res.status(400).json({ issues: fileResult.issue });

    this.fileUploadService
      .uploadUserAvatar(userIdResult.result.user, fileResult.files[0], "users")
      .then((user) => res.status(200).json({ user }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };
}
