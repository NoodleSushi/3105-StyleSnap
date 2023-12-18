import { body, header } from "express-validator";
import { isEmailTaken, isUsernameTaken } from "../controllers/db";

const usernameValidator = (checkTaken: boolean = false) => body("username")
  .notEmpty()
  .withMessage("Username is required.").bail()
  .isLength({ min: 6 })
  .withMessage("Username must be at least 6 characters long.").bail()
  .isLength({ max: 16 })
  .withMessage("Username must be at most 16 characters long.").bail()
  .custom(async (username) => {
    if (!checkTaken) return;
    const isTaken = await isUsernameTaken(username);
    if (isTaken) {
      throw new Error("Username is already taken.");
    }
  })

const emailValidator = (checkTaken: boolean = false) => body("email")
  .notEmpty()
  .withMessage("Email is required.").bail()
  .isEmail()
  .withMessage("Invalid email address.").bail()
  .custom(async (email) => {
    if (!checkTaken) return;
    const isTaken = await isEmailTaken(email);
    if (isTaken) {
      throw new Error("Email is already taken.");
    }
  });

const passwordValidator = () => body("password")
  .notEmpty()
  .withMessage("Password is required.").bail()
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long.").bail()
  .isLength({ max: 32 })
  .withMessage("Password must be at most 32 characters long.").bail()
  .matches(/[a-z]/)
  .withMessage("Password must contain at least one lowercase letter.")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter.");

export const userAuthValidator = () => [usernameValidator(true), emailValidator(true), passwordValidator()];

export const userLoginValidator = () => [usernameValidator(), emailValidator(), passwordValidator()];

export const authTokenValidator = () => header("authorization")
  .notEmpty()
  .withMessage("Access token not found.");
