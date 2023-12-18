import { Request, RequestHandler } from "express";
import { validationResult } from "express-validator";
import { createUser, getUser } from "./db";
import { hashPassword, comparePassword, createAccessToken, userInfoResult } from "./authUtils";
import { User, UserAuth, UserInfo } from "../interfaces";
import { resServerErrorGen, resGen as statusGen, validationResGen } from "./utils";
import jwt from "jsonwebtoken";

export const attachUser: RequestHandler = async (req: Request, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const accessToken = authorization.match(/^Bearer (\S+)/)![1];
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SCERET!) as UserInfo;
    (req as any).user = payload;
  } catch (err) {
    return statusGen(res, 401, "Invalid access token.")
  }
  next();
}

export const createUserAccount: RequestHandler = async (req, res) => {
  const validationRes = validationResGen(req, res, 422, "Invalid user registration data.", "batch");
  if (validationRes)
    return validationRes;

  try {
    const user: User = req.body;
    const hashedPassword = await hashPassword(user.password);
    await createUser(user.username, user.email, hashedPassword);
    return statusGen(res, 201, "User registration successful.");
  } catch (err) {
    return resServerErrorGen(res);
  }
}

export const loginUser: RequestHandler = async (req, res) => {
  const failResGen = () => statusGen(res, 401, "Invalid username, email, and/or password.");
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return failResGen();

  try {
    const userAuth: UserAuth = req.body;
    const userRow = await getUser(userAuth.username, userAuth.email);
    if (!userRow)
      return failResGen();
    
    const isPasswordValid = await comparePassword(userAuth.password, userRow.password);
    if (!isPasswordValid) 
      return failResGen();

    const accessToken = createAccessToken({
      user_id: userRow.user_id,
      username: userRow.username,
      email: userRow.email,
      is_admin: userRow.is_admin,
    });

    return statusGen(res, 200, "User login successful.", { accessToken });
  } catch (err) {
    return resServerErrorGen(res);
  }
}

export const authTest: RequestHandler = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      message: errors.array()[0].msg,
    });
  }
  res.json({
    message: "You have a valid access token.",
    user: userInfoResult(req),
  });
}
