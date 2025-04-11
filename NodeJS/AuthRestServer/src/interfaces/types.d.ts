import type { UploadedFile } from "express-fileupload";

export interface Issue {
  message: string;
  field?: string;
  expected: string | null;
  received: string;
}

export interface CryptoStrategy {
  hashValue: (value: string) => Promise<string>;
  validate: (plain: string, hash: string) => Promise<boolean>;
}

export interface TokenPair {
  token: string;
  refreshToken: string;
}

export interface TokenStrategy {
  generateAuthTokenAndRefreshToken: (payload: any) => Promise<TokenPair | null>;
  generateAuthToken: (payload: any) => Promise<string | null>;
  validate: (token: string, secret: string) => Promise<any>;
}

export interface EmailSender {
  sendVerificationEmail: (to: string, token: string) => Promise<boolean>;
}

export type FolderName = "users" | "products" | "categories";
export interface FileUploadOptions {
  folder: FolderName;
  file: UploadedFile;
}

export interface FileUploader {
  upload: (options: FileUploadOptions) => Promise<string>;
  remove: (folder: FolderName, url: string) => Promise<boolean>;
}
