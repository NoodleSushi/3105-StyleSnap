import { Response } from "express";
import { validationResult } from "express-validator";

const baseStatusGen = (res: Response, code: number, msg: string = "Untitled Message", add: object = {}): Response => {
  if (code < 200 || code >= 600)
    throw new Error("Invalid status code.");

  const success = code >= 200 && code < 300;

  return res.status(code).json({
    success,
    message: msg,
    ...add,
  });
}

export const statusValidationError = (req: { [k: string]: any }, res: Response, msg?: string, mode: "batch" | "single" = "single"): Response | null => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (mode === "batch") {
      return baseStatusGen(res, 422, msg, {
        errors: errors.array().map((error) => error.msg),
      });
    } else {
      return baseStatusGen(res, 422, msg || errors.array()[0].msg);
    }
  }
  return null;
}

export const statusSuccessOK = (res: Response, msg?: string, add: object = {}): Response => {
  return baseStatusGen(res, 200, msg || "OK.", add);
}

export const statusSuccessCreated = (res: Response, msg?: string, add: object = {}): Response => {
  return baseStatusGen(res, 201, msg || "Created.", add);
}

export const statusServerError = (res: Response, err?: any): Response => {
  if (err)
    console.error(err);
  return baseStatusGen(res, 500, "Internal server error.");
}

export const statusClientBadRequestError = (res: Response, msg?: string): Response => {
  return baseStatusGen(res, 400, msg || "Bad request.");
}

export const statusClientUnauthorizedError = (res: Response, msg?: string): Response => {
  return baseStatusGen(res, 401, msg || "Unauthorized.");
}

export const statusClientForbiddenError = (res: Response, msg?: string): Response => {
  return baseStatusGen(res, 403, msg || "Forbidden.");
}

export const statusClientNotFoundError = (res: Response, msg?: string): Response => {
  return baseStatusGen(res, 404, msg || "Not found.");
}
