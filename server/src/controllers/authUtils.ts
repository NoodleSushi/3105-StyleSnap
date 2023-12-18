import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { UserInfo } from "../interfaces";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 3);
  return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isPasswordValid = await compare(password, hashedPassword);
  return isPasswordValid;
}

export const createAccessToken = (user: UserInfo): string => {
  const accessToken = jwt.sign(
    {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      is_admin: user.is_admin,
    },
    process.env.ACCESS_TOKEN_SCERET!,
  );
  return accessToken;
}

export const userInfoResult = (req: { [k: string]: any }): UserInfo | null => {
  return req.user || null;
}
