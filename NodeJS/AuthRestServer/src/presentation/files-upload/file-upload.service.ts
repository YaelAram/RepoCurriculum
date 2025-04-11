import type { UploadedFile } from "express-fileupload";
import type { AuthRepository } from "../../interfaces/repositories.types";
import type { FileUploader, FolderName } from "../../interfaces/types";

export class FileUploadService {
  constructor(
    private readonly fileUploader: FileUploader,
    private readonly authRepository: AuthRepository,
  ) {}

  async uploadUserAvatar(id: string, file: UploadedFile, folder: FolderName) {
    const imageUrl = await this.fileUploader.upload({ file, folder });
    const { lastAvatar, user } = await this.authRepository.updateUserAvatar(id, imageUrl);

    if (lastAvatar) await this.fileUploader.remove("users", lastAvatar);

    const { password, ...userInfo } = user;
    return userInfo;
  }
}
