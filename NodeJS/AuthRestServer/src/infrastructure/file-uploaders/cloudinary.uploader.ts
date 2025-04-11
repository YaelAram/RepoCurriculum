import { v2 as cloudinary } from "cloudinary";

import { envs } from "../../config/envs";
import { CustomHttpError } from "../../domain/entities/custom-http.error";
import type { FileUploadOptions, FileUploader, FolderName } from "../../interfaces/types";

cloudinary.config({
  cloud_name: envs.cloudinaryCloudName,
  api_key: envs.cloudinaryApiKey,
  api_secret: envs.cloudinaryApiSecret,
  secure: true,
});

const upload = async ({ file, folder }: FileUploadOptions): Promise<string> => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(file.tempFilePath, { folder });
    return secure_url;
  } catch (error: any) {
    console.error(`CloudinaryUploader [ERROR]: Could not upload image (${error.message})`);

    if (error instanceof CustomHttpError) throw error;
    throw CustomHttpError.ServerError("Error while trying to upload image");
  }
};

const remove = async (folder: FolderName, url: string): Promise<boolean> => {
  try {
    const imageName = url.split("/").at(-1);
    if (!imageName) throw CustomHttpError.ServerError("Error getting image name");

    const imageId = imageName.split(".").at(0);
    if (!imageId) throw CustomHttpError.ServerError("Error getting image ID");

    await cloudinary.uploader.destroy(`${folder}/${imageId}`);

    return true;
  } catch (error: any) {
    console.error(`CloudinaryUploader [ERROR]: Could not upload image (${error.message})`);

    if (error instanceof CustomHttpError) throw error;
    throw CustomHttpError.ServerError("Error while deleting image");
  }
};

export const CloudinaryUploader: FileUploader = { upload, remove };
