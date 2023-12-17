import { body, header } from "express-validator";
import { isEmailTaken, isUsernameTaken } from "../controllers/db";
import jwt from "jsonwebtoken";

export const userAuthValidator = () => [
  body("username")
    .notEmpty()
    .withMessage("Username is required.").bail()
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long.").bail()
    .isLength({ max: 16 })
    .withMessage("Username must be at most 16 characters long.").bail()
    .custom(async (username) => {
      const isTaken = await isUsernameTaken(username);
      if (isTaken) {
        throw new Error("Username is already taken.");
      }
    }),
  body("email")
    .notEmpty()
    .withMessage("Email is required.").bail()
    .isEmail()
    .withMessage("Invalid email address.").bail()
    .custom(async (email) => {
      const isTaken = await isEmailTaken(email);
      if (isTaken) {
        throw new Error("Email is already taken.");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required.").bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.").bail()
    .isLength({ max: 32 })
    .withMessage("Password must be at most 32 characters long.").bail()
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter."),
];

export const userLoginValidator = () => [
  body("email")
    .notEmpty().bail()
    .isEmail(),
  body("username")
    .notEmpty().bail()
    .isLength({ min: 8, max: 16 }),
  body("password")
    .notEmpty().bail()
    .isLength({ min: 8, max: 32 }).bail()
    .matches(/[a-z]|[A-Z]/)
];

export const authToken = () => header("authorization")
  .notEmpty()
  .withMessage("Access token not found.")
  .bail()
  .custom(async (authorization: string) => {
    try {
      const accessToken = authorization.match(/^Bearer (\S+)/)![1];
      const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SCERET!);
      console.log(payload);
    } catch (err) {
      throw new Error("Access token is invalid.");
    }
  });
