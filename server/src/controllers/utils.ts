import { Response } from "express";
import { validationResult } from "express-validator";

export const validationResGen = (req: { [k: string]: any }, res: Response, code: number, msg?: string, mode: "batch" | "single" = "single"): Response | null => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (mode === "batch") {
      return res.status(code).json({
        message: msg,
        errors: errors.array().map((error) => error.msg),
      });
    } else {
      return res.status(code).json({
        message: msg || errors.array()[0].msg,
      });
    }
  }
  return null;
}

export const resGen = (res: Response, code: number, msg: string, add: object = {}): Response => {
  return res.status(code).json({
    message: msg,
    ...add,
  });
}

export const resServerErrorGen = (res: Response, err?: Error): Response => {
  if (err)
    console.error(err);
  return res.status(500).json({
    message: "Internal server error.",
  });
}
