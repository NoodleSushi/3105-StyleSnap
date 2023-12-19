import { Request, RequestHandler } from "express";
import { validationResult } from "express-validator";
import { createUser, getUser } from "./db";
import { hashPassword, comparePassword, createAccessToken, userInfoResult } from "./authUtils";
import { User, UserAuth, UserInfo } from "../interfaces";
import { statusServerError, statusSuccessful, statusValidationError, statusClientUnauthorizedError, statusClientForbiddenError } from "./responseGenerators";
import jwt from "jsonwebtoken";

export const attachUser: (mode?: "user" | "admin") => RequestHandler = (mode = "user") => async (req: Request, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const accessToken = authorization.match(/^Bearer (\S+)/)![1];
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SCERET!) as UserInfo;
    if (mode === "admin" && !user.is_admin)
      return statusClientForbiddenError(res);
    (req as any).user = user;
  } catch (err) {
    return statusClientUnauthorizedError(res, "Invalid access token.")
  }
  next();
}

export const createUserAccount: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res, "Invalid user registration data.", "batch");
  if (statusValidErr)
    return statusValidErr;

  try {
    const user: User = req.body;
    const hashedPassword = await hashPassword(user.password);
    await createUser(user.username, user.email, hashedPassword);
    return statusSuccessful(res, 201, "User registration successful.");
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const loginUser: RequestHandler = async (req, res) => {
  const failResGen = () => statusClientUnauthorizedError(res, "Invalid username, email, and/or password.");
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

    return statusSuccessful(res, 200, "User login successful.", { accessToken });
  } catch (err) {
    return statusServerError(res, err);
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
