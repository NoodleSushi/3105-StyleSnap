import { RequestHandler } from "express-serve-static-core";
import { param } from "express-validator";
import { statusClientBadRequestError } from "../common/responseGenerators";
import { MulterError } from "multer";

export const userIdParamValidator = () => param("userId")
  .notEmpty()
  .withMessage("User ID is required.").bail()
  .isInt({ min: 1 })
  .withMessage("User ID must be a positive integer.");

export const validateMulterUpload: (upload: RequestHandler, optional?: boolean) => RequestHandler = (upload, optional = false) => (req, res, next) => {
  upload(req, res, (err: any) => {
    if (err instanceof MulterError && !optional) {
      return statusClientBadRequestError(res, err.message);
    }
    next();
  });
}
