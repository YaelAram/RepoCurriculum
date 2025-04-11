import type { FileArray, UploadedFile } from "express-fileupload";

const checkFileExtension = (allowedTypes: string[], fileName: string) => {
  const regex = new RegExp(`.(${allowedTypes.join("|")})$`);
  const issue = `File ${fileName} extension not allowed. Expected: ${allowedTypes.join(" | ")}`;

  if (regex.test(fileName)) return;
  return issue;
};

const checkMime = (allowedMimes: string[], fileMime: string, fileName: string) => {
  const regex = new RegExp(`^(${allowedMimes.join("|")})$`);
  const issue = `File ${fileName} mime not allowed (${fileMime}). Expected: ${allowedMimes.join(" | ")}`;

  if (regex.test(fileMime)) return;
  return issue;
};

const checkFileSize = (maxSize: number, fileName: string, fileSize: number) => {
  if (fileSize > maxSize)
    return `File ${fileName} size not allowed (${fileSize}). Max: ${maxSize} bytes`;
  return;
};

interface CheckFileParams {
  allowedTypes: string[];
  allowedMimes: string[];
  maxSize: number;
  file: UploadedFile;
}

const checkFile = ({ allowedMimes, allowedTypes, file, maxSize }: CheckFileParams) => {
  const extensionIssue = checkFileExtension(allowedTypes, file.name);
  if (extensionIssue) return extensionIssue;

  const mimeIssue = checkMime(allowedMimes, file.mimetype, file.name);
  if (mimeIssue) return mimeIssue;

  const sizeIssue = checkFileSize(maxSize, file.name, file.size);
  if (sizeIssue) return sizeIssue;

  return;
};

interface FileUploadDtoParams {
  allowedTypes: string[];
  allowedMimes: string[];
  allowMultiple: boolean;
  maxSize: number;
  input: FileArray | null | undefined;
}

type FileUploadDtoResult = { ok: true; files: UploadedFile[] } | { ok: false; issue: string };

export const fileUploadDto = ({
  allowMultiple,
  allowedMimes,
  allowedTypes,
  input,
  maxSize,
}: FileUploadDtoParams): FileUploadDtoResult => {
  if (!input || Object.keys(input).length === 0)
    return { ok: false, issue: "No files were uploaded" };

  if (Array.isArray(input.file) && !allowMultiple)
    return { ok: false, issue: "Multiple file upload not allowed" };

  if (!Array.isArray(input.file)) {
    const fileIssue = checkFile({ allowedMimes, allowedTypes, file: input.file, maxSize });
    if (fileIssue) return { ok: false, issue: fileIssue };

    return { ok: true, files: [input.file] };
  }

  for (const file of input.file) {
    const fileIssue = checkFile({ allowedMimes, allowedTypes, file, maxSize });
    if (fileIssue) return { ok: false, issue: fileIssue };
  }

  return { ok: true, files: input.file };
};
