import { get } from "env-var";
process.loadEnvFile();

export const envs = {
  port: get("PORT").required().asPortNumber(),
  nodeEnv: get("NODE_ENV").required().asString(),
  publicDirectory: get("PUBLIC_DIRECTORY").default("public").asString(),
  mongoDbName: get("MONGO_DB_NAME").required().asString(),
  mongoUrl: get("MONGO_URL").required().asUrlString(),
  secretJwt: get("SECRET_JWT").required().asString(),
  secretRefresh: get("SECRET_REFRESH").required().asString(),
  mailSecret: get("MAIL_SECRET").required().asString(),
  mailAddress: get("MAIL_ADDRESS").required().asEmailString(),
  serverUrl: get("SERVER_URL").required().asString(),
  sendEmail: get("SEND_VERIFICATION_EMAIL").default("false").asBool(),
  cloudinaryApiSecret: get("CLOUDINARY_API_SECRET").required().asString(),
  cloudinaryCloudName: get("CLOUDINARY_CLOUD_NAME").required().asString(),
  cloudinaryApiKey: get("CLOUDINARY_API_KEY").required().asString(),
};
