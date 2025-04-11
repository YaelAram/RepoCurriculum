import { envs } from "../../config/envs";
import { AuthRepositories } from "../../infrastructure/repositories/repositories";
import { JwtStrategy } from "../../infrastructure/security/jwt.strategy";

import type { NextFunction, Request, Response } from "express";
import type { AuthRepository } from "../../interfaces/repositories.types";
import type { TokenStrategy } from "../../interfaces/types";

interface TokenPayload {
  id: string;
  origin?: string;
}

interface AuthMiddlewareOptions {
  tokenStrategy: TokenStrategy;
  authRepository: AuthRepository;
  tokenKey: "token" | "refresh_token";
  secret: string;
}

export const auth = ({
  authRepository,
  secret,
  tokenKey,
  tokenStrategy,
}: AuthMiddlewareOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies[tokenKey];
      if (!token) return res.status(401).json({ issue: "Not authenticated" });

      const payload = (await tokenStrategy.validate(token, secret)) as TokenPayload;
      if (!payload) return res.status(401).json({ issue: "Invalid empty token" });

      const user = await authRepository.findUserById(payload.id);
      if (!user) return res.status(404).json({ issue: "Invalid token, user not found" });
      if (!user.active) return res.status(403).json({ issue: "Invalid user info" });

      req.body = { ...req.body, user: user.id, userInfo: user };
      next();
    } catch (error: any) {
      console.error(`AuthMiddleware [ERROR]: ${error.message}`);
      res.status(403).json({ issue: "Invalid token" });
    }
  };
};

export const tokenMiddelwareOptions = {
  authRepository: AuthRepositories.mongoWithBcryptStrategy,
  tokenStrategy: JwtStrategy,
};

type TokenMiddlewareOptions = Omit<AuthMiddlewareOptions, "tokenKey" | "secret">;

export const checkToken = ({ authRepository, tokenStrategy }: TokenMiddlewareOptions) => {
  return auth({
    authRepository,
    tokenStrategy,
    secret: envs.secretJwt,
    tokenKey: "token",
  });
};

export const checkRefreshToken = ({ authRepository, tokenStrategy }: TokenMiddlewareOptions) => {
  return auth({
    authRepository,
    tokenStrategy,
    secret: envs.secretRefresh,
    tokenKey: "refresh_token",
  });
};
