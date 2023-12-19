import { Response } from "express";
import { validationResult } from "express-validator";

export const statusValidationError = (req: { [k: string]: any }, res: Response, msg?: string, mode: "batch" | "single" = "single"): Response | null => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (mode === "batch") {
      return res.status(422).json({
        success: false,
        message: msg,
        errors: errors.array().map((error) => error.msg),
      });
    } else {
      return res.status(422).json({
        success: false,
        message: msg || errors.array()[0].msg,
      });
    }
  }
  return null;
}

export const statusSuccessful = (res: Response, code: number, msg: string, add: object = {}): Response => {
  if (code < 200 || code >= 300)
    throw new Error("Invalid status code.");

  return res.status(code).json({
    success: true,
    message: msg,
    ...add,
  });
}

export const statusServerError = (res: Response, err?: any): Response => {
  if (err)
    console.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
}

export const statusClientUnauthorizedError = (res: Response, msg?: string): Response => {
  return res.status(401).json({
    success: false,
    message: msg || "Unauthorized.",
  });
}

export const statusClientForbiddenError = (res: Response, msg?: string): Response => {
  return res.status(403).json({
    success: false,
    message: msg || "Forbidden.",
  });
}

export const statusClientNotFoundError = (res: Response, msg?: string): Response => {
  return res.status(404).json({
    success: false,
    message: msg || "Not found.",
  });
}
