import { RequestHandler } from "express-serve-static-core";
import { body, param } from "express-validator";

export const userIdParamValidator = () => param("userId")
  .notEmpty()
  .withMessage("User ID is required.").bail()
  .isInt({ min: 1 })
  .withMessage("User ID must be a positive integer.");
