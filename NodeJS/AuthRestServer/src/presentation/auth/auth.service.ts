import { envs } from "../../config/envs";
import { CustomHttpError } from "../../domain/entities/custom-http.error";

import type { UserCreate, UserLogIn, UserUpdateRoles } from "../../interfaces/dtos.types";
import type { AuthRepository } from "../../interfaces/repositories.types";
import type { EmailSender, TokenStrategy } from "../../interfaces/types";

interface AuthServiceSettings {
  authRepository: AuthRepository;
  tokenStrategy: TokenStrategy;
  emailSender: EmailSender;
}

export class AuthService {
  private readonly authRepository: AuthRepository;
  private readonly tokenStrategy: TokenStrategy;
  private readonly emailSender: EmailSender;

  constructor(settings: AuthServiceSettings) {
    this.authRepository = settings.authRepository;
    this.tokenStrategy = settings.tokenStrategy;
    this.emailSender = settings.emailSender;
  }

  async signUp(user: UserCreate) {
    const mongoUser = await this.authRepository.signUp(user);
    const { password, ...userInfo } = mongoUser;

    const token = await this.tokenStrategy.generateAuthToken({ email: userInfo.email });
    if (!token) throw CustomHttpError.ServerError("Error creating token for email verification");

    const sent = await this.emailSender.sendVerificationEmail(userInfo.email, token);
    if (!sent) throw CustomHttpError.ServerError("Error sending email verification mail");

    return userInfo;
  }

  async logIn(user: UserLogIn, origin?: string) {
    const mongoUser = await this.authRepository.getUserByEmail(user);
    const { password, ...userInfo } = mongoUser;

    const payload = { id: userInfo.id, origin };
    const strategyResult = await this.tokenStrategy.generateAuthTokenAndRefreshToken(payload);

    if (!strategyResult) throw CustomHttpError.ServerError("Error creating token");

    return {
      user: userInfo,
      token: strategyResult.token,
      refreshToken: strategyResult.refreshToken,
    };
  }

  async validateEmail(token: string) {
    const { email } = (await this.tokenStrategy.validate(token, envs.secretJwt)) as {
      email: string;
    };
    if (!email) throw CustomHttpError.ServerError("Empty token payload");

    return this.authRepository.validateEmail(email);
  }

  async refreshToken(userId: string, origin?: string) {
    const payload = { id: userId, origin };
    const tokenResult = await this.tokenStrategy.generateAuthToken(payload);

    if (!tokenResult) throw CustomHttpError.ServerError("Error refreshing token");

    return tokenResult;
  }

  async updateUserRoles(updateInfo: UserUpdateRoles) {
    return this.authRepository.updateUserRoles(updateInfo);
  }
}
