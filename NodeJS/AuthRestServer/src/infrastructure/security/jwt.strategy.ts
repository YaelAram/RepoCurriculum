import jwt from "jsonwebtoken";

import { envs } from "../../config/envs";
import { CustomHttpError } from "../../domain/entities/custom-http.error";
import type { TokenPair, TokenStrategy } from "../../interfaces/types";

const generateAuthTokenAndRefreshToken = async (payload: any): Promise<TokenPair | null> => {
  try {
    const token = jwt.sign(payload, envs.secretJwt, { expiresIn: "1h" });
    if (!token) return null;

    const refreshToken = jwt.sign(payload, envs.secretRefresh, { expiresIn: "1d" });
    if (!refreshToken) return null;

    return { token, refreshToken };
  } catch (error: any) {
    console.error(`JwtStrategy [ERROR]: ${error.message}`);
    return null;
  }
};

const generateAuthToken = async (payload: any): Promise<string | null> => {
  try {
    const token = jwt.sign(payload, envs.secretJwt, { expiresIn: "2h" });
    if (!token) return null;

    return token;
  } catch (error: any) {
    console.error(`JwtStrategy [ERROR]: ${error.message}`);
    return null;
  }
};

const validate = async (token: string, secret: string): Promise<any> => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error: any) {
    console.error(`JwtStrategy [ERROR]: ${error.message}`);
    throw CustomHttpError.BadRequest("Not valid JWT");
  }
};

export const JwtStrategy: TokenStrategy = {
  generateAuthTokenAndRefreshToken,
  generateAuthToken,
  validate,
};
