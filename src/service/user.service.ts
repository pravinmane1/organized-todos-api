import UserModel, { UserInput } from "../models/user.model";
import logger from '../utils/logger'

export const createUser = async (input: UserInput) => {
  try {
    return await UserModel.create(input);
} catch (e: any) {
    throw new Error(e);
  }
};
