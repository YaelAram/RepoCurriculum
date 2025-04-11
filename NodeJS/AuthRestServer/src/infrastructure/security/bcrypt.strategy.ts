import { compare, genSalt, hash } from "bcryptjs";
import type { CryptoStrategy } from "../../interfaces/types";

const hashValue = async (value: string) => {
  const salt = await genSalt(10);
  const hashStr = await hash(value, salt);

  return hashStr;
};

const validate = async (plain: string, hash: string) => {
  const isEqual = await compare(plain, hash);
  return isEqual;
};

export const BcryptStrategy: CryptoStrategy = { hashValue, validate };
