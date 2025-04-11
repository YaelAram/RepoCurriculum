import { CustomHttpError } from "../../../domain/entities/custom-http.error";

export const handleError = (error: any, serverErrorMessage: string): CustomHttpError => {
  console.error(`AuthService [ERROR]: ${error.message}`);

  if (error instanceof CustomHttpError) return error;
  if (error.name === "MongoNetworkError") return CustomHttpError.ServerError("Not connected to DB");

  return CustomHttpError.ServerError(serverErrorMessage);
};
