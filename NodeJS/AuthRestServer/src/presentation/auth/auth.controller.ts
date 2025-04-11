import type { Request, Response } from "express";
import type { CustomHttpError } from "../../domain/entities/custom-http.error";
import type { UserCreate, UserLogIn, UserUpdateRoles } from "../../interfaces/dtos.types";
import type { AuthService } from "./auth.service";

import { envs } from "../../config/envs";
import { validateDto } from "../../domain/dtos/validate-dto";
import { LogInSchema, SignUpSchema, userUpdateRoles } from "../../domain/valibot/auth.schema";

export class AuthController {
  private readonly tokenKey = "token";
  private readonly refreshTokenKey = "refresh_token";
  private readonly cookieOptions = { httpOnly: true, secure: envs.nodeEnv === "production" };

  constructor(public readonly authService: AuthService) {}

  logIn = (req: Request, res: Response) => {
    const dtoResult = validateDto<UserLogIn>(req.body, LogInSchema);
    if (!dtoResult.ok) return res.status(400).json({ issues: dtoResult.issues });

    this.authService
      .logIn(dtoResult.result, req.headers["user-agent"])
      .then(({ user, refreshToken, token }) => {
        res
          .cookie(this.tokenKey, token, this.cookieOptions)
          .cookie(this.refreshTokenKey, refreshToken, this.cookieOptions)
          .status(200)
          .json({ user });
      })
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  logOut = (req: Request, res: Response) => {
    res
      .clearCookie(this.tokenKey)
      .clearCookie(this.refreshTokenKey)
      .status(200)
      .json({ message: "Logged Out" });
  };

  signUp = (req: Request, res: Response) => {
    const dtoResult = validateDto<UserCreate>(req.body, SignUpSchema);
    if (!dtoResult.ok) return res.status(400).json({ issues: dtoResult.issues });

    this.authService
      .signUp(dtoResult.result)
      .then((user) => res.status(201).json({ user }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;
    if (!token) return res.status(400).json({ issue: "Token is required" });

    this.authService
      .validateEmail(token)
      .then(() => res.status(200).json({ validated: true }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  refreshToken = (req: Request, res: Response) => {
    const userId = req.body.user as string;
    if (!userId) return res.status(400).json({ issue: "Not user received in token" });

    this.authService
      .refreshToken(userId, req.headers.origin)
      .then((token) => {
        res
          .cookie(this.tokenKey, token, this.cookieOptions)
          .status(200)
          .json({ message: "Token refreshed" });
      })
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };

  updateUserRole = (req: Request, res: Response) => {
    const { id, roles } = req.body;
    const uniqueRoles = Array.from(new Set<string>(roles));

    const userRolesResult = validateDto<UserUpdateRoles>(
      { id, roles: uniqueRoles },
      userUpdateRoles,
    );
    if (!userRolesResult.ok) return res.status(400).json({ issues: userRolesResult.issues });

    this.authService
      .updateUserRoles(userRolesResult.result)
      .then((user) => res.status(200).json({ user }))
      .catch((error: CustomHttpError) => res.status(error.httpCode).json(error.getJson()));
  };
}
