import { RequestHandler } from "express-serve-static-core";
import { param } from "express-validator";
import { statusClientBadRequestError } from "../controllers/responseGenerators";

export const userIdParamValidator = () => param("userId")
  .notEmpty()
  .withMessage("User ID is required.").bail()
  .isInt({ min: 1 })
  .withMessage("User ID must be a positive integer.");

export const validateMulterUpload: (upload: RequestHandler) => RequestHandler = (upload) => (req, res, next) => {
  upload(req, res, (err: any) => {
    if (err) {
      return statusClientBadRequestError(res, err.message);
    }
    next();
  });
}
