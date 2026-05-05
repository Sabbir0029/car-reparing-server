/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
import { config } from "../../config";
import { generateToken } from "../../utils/jwt";

// Credential login
const credentialLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new Error("User not found");
  }

  // Check if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    password as string,
    isUserExist.password as string,
  );

  if (!isPasswordMatched) {
    throw new Error("Incorrect password");
  }

  const jwtPayload = {
    id: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.JWT_SECRET as string,
    config.JWT_EXPIRES as string,
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    config.JWT_REFRESH_EXPIRES as string,
  );

  const { password: _, ...rest } = isUserExist.toObject();

  return {
    ...rest,
    accessToken,
    refreshToken,
  };
};
export const authServices = {
  credentialLogin,
};
