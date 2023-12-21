import { Request, RequestHandler } from "express";
import { validationResult } from "express-validator";
import * as db from "./db";
import { hashPassword, comparePassword, createAccessToken, verifyAccessToken } from "./authUtils";
import { User, UserAuthInput, UserAuthUserInput, UserInfo } from "../interfaces";
import { statusServerError, statusSuccessOK, statusValidationError, statusClientUnauthorizedError, statusClientForbiddenError, statusSuccessCreated } from "./responseGenerators";

export const attachUser: (mode?: "user" | "admin") => RequestHandler = (mode = "user") => async (req: Request, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const accessToken = authorization.match(/^Bearer (\S+)/)![1];
    const user = verifyAccessToken(accessToken);
    if (!user)
      return statusClientUnauthorizedError(res, "Invalid access token.");
    if (mode === "admin" && !user.isAdmin)
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
    const body = req.body as UserAuthUserInput
    const hashedPassword = await hashPassword(body.password);
    const user: UserAuthInput = {
      ...body,
      password: hashedPassword,
      isAdmin: false,
    };
    await db.createUser(user);
    return statusSuccessCreated(res, "User registration successful.");
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
    const userAuth: UserAuthUserInput = req.body;
    const userRow = await db.getUser(userAuth.username, userAuth.email);
    if (!userRow)
      return failResGen();
    
    const isPasswordValid = await comparePassword(userAuth.password, userRow.password);
    if (!isPasswordValid) 
      return failResGen();

    const accessToken = createAccessToken({
      userId: userRow.userId,
      username: userRow.username,
      email: userRow.email,
      isAdmin: userRow.isAdmin,
    });

    return statusSuccessOK(res, "User login successful.",
      { accessToken }
    );
  } catch (err) {
    return statusServerError(res, err);
  }
}
