import { Router } from "express";

import { EmailSenders } from "../../infrastructure/email-senders/senders";
import { AuthRepositories } from "../../infrastructure/repositories/repositories";
import { JwtStrategy } from "../../infrastructure/security/jwt.strategy";
import {
  checkRefreshToken,
  checkToken,
  tokenMiddelwareOptions,
} from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/check-role.middleware";
import { limiter } from "../middlewares/rate-limit.middleware";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const routes = () => {
  const router = Router();

  const authService = new AuthService({
    authRepository: AuthRepositories.mongoWithBcryptStrategy,
    emailSender: EmailSenders.gmail,
    tokenStrategy: JwtStrategy,
  });
  const authController = new AuthController(authService);

  router.post("/login", [limiter], authController.logIn);
  router.post("/logout", authController.logOut);
  router.post("/signup", authController.signUp);

  router.get("/validate-email/:token", authController.validateEmail);
  router.get(
    "/refresh",
    [limiter, checkRefreshToken(tokenMiddelwareOptions)],
    authController.refreshToken,
  );

  router.patch(
    "/assign-role",
    [limiter, checkToken(tokenMiddelwareOptions), checkRole(new Set<string>(["admin"]))],
    authController.updateUserRole,
  );

  return router;
};

export const AuthRoutes = { routes };
