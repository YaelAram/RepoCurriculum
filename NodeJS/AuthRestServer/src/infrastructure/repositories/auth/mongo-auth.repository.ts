import { UserModel } from "../../../data/mongo/models/user.model";
import { CustomHttpError } from "../../../domain/entities/custom-http.error";
import { UserEntity } from "../../../domain/entities/user.entity";
import { handleError } from "../helpers/handleError";

import type { UserCreate, UserLogIn, UserUpdateRoles } from "../../../interfaces/dtos.types";
import type {
  AuthRepository,
  UpdateUserAvatarResult,
} from "../../../interfaces/repositories.types";
import type { CryptoStrategy } from "../../../interfaces/types";

export class MongoAuthRepository implements AuthRepository {
  constructor(private readonly cryptoStrategy: CryptoStrategy) {}

  signUp = async (user: UserCreate): Promise<UserEntity> => {
    try {
      const userExists = await UserModel.findOne({ email: user.email });
      if (userExists) throw CustomHttpError.BadRequest(`User ${user.email} already registered`);

      const createdUser = new UserModel(user);
      createdUser.password = await this.cryptoStrategy.hashValue(user.password);
      await createdUser.save();

      return UserEntity.fromObj(createdUser);
    } catch (error: any) {
      throw handleError(error, `Error creating user ${user.email}`);
    }
  };

  getUserByEmail = async ({ email, password }: UserLogIn): Promise<UserEntity> => {
    try {
      const mongoUser = await UserModel.findOne({ email });
      if (!mongoUser) throw CustomHttpError.NotFound(`User ${email} not found`);
      if (!mongoUser.active) throw CustomHttpError.BadRequest(`${email} account disabled`);

      const areEqual = await this.cryptoStrategy.validate(password, mongoUser.password);
      if (!areEqual) throw CustomHttpError.BadRequest("Wrong email and password");

      return UserEntity.fromObj(mongoUser);
    } catch (error: any) {
      throw handleError(error, `Error searching user ${email}`);
    }
  };

  validateEmail = async (email: string): Promise<boolean> => {
    try {
      const mongoUser = await UserModel.findOne({ email });
      if (!mongoUser) throw CustomHttpError.NotFound(`User ${email} not found`);

      mongoUser.emailValidated = true;
      await mongoUser.save();

      return true;
    } catch (error: any) {
      throw handleError(error, `Error validating user email ${email}`);
    }
  };

  findUserById = async (id: string): Promise<UserEntity | null> => {
    try {
      const mongoUser = await UserModel.findById(id);
      if (!mongoUser) return null;

      return UserEntity.fromObj(mongoUser);
    } catch (error: any) {
      throw handleError(error, "Error getting user by ID");
    }
  };

  updateUserRoles = async ({ id, roles }: UserUpdateRoles): Promise<UserEntity> => {
    try {
      const mongoUser = await UserModel.findById(id);

      if (!mongoUser) throw CustomHttpError.NotFound("User to update not found");
      if (!mongoUser.active) throw CustomHttpError.BadRequest("User to update is not active");

      mongoUser.roles = roles;
      await mongoUser.save();

      return UserEntity.fromObj(mongoUser);
    } catch (error: any) {
      throw handleError(error, "Error updating user roles");
    }
  };

  updateUserAvatar = async (id: string, avatar: string): Promise<UpdateUserAvatarResult> => {
    try {
      const mongoUser = await UserModel.findById(id);
      if (!mongoUser) throw CustomHttpError.NotFound("User to update not found");

      const lastAvatar = mongoUser.avatar;

      mongoUser.avatar = avatar;
      await mongoUser.save();

      return { user: UserEntity.fromObj(mongoUser), lastAvatar };
    } catch (error: any) {
      throw handleError(error, "Error updating user roles");
    }
  };
}
