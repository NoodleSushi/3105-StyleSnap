import { body, param } from "express-validator"

export const wardrobeValidator = () => body("name")
  .notEmpty()
  .withMessage("Name is required.").bail()
  .isString()
  .withMessage("Name must be a string.");

export const wardrobeIdParamValidator = () => param("wardrobeId")
  .notEmpty()
  .withMessage("Wardrobe ID is required.").bail()
  .isInt({ min: 1 })
  .withMessage("Wardrobe ID must be a positive integer.");