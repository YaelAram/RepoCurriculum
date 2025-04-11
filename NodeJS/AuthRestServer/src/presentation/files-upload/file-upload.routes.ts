import { Router } from "express";
import { CloudinaryUploader } from "../../infrastructure/file-uploaders/cloudinary.uploader";
import { AuthRepositories } from "../../infrastructure/repositories/repositories";
import { checkToken, tokenMiddelwareOptions } from "../middlewares/auth.middleware";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadService } from "./file-upload.service";

const routes = () => {
  const router = Router();

  const fileUploadService = new FileUploadService(
    CloudinaryUploader,
    AuthRepositories.mongoWithBcryptStrategy,
  );
  const fileUploadController = new FileUploadController(fileUploadService);

  router.post(
    "/user-avatar",
    [checkToken(tokenMiddelwareOptions)],
    fileUploadController.updateUserAvatar,
  );

  return router;
};

export const FileUploadRoutes = { routes };
