import { body, param } from "express-validator";
import { wardrobeIdParamValidator } from "./wardrobeValidator";

export const clothingIdParamValidator = () => param("clothingId")
  .notEmpty()
  .withMessage("Clothing ID is required.").bail()
  .isInt({ min: 1 })
  .withMessage("Clothing ID must be a positive integer.");

export const clothingTypeIdParamValidator = () => param("clothingTypeId")
  .notEmpty()
  .withMessage("Clothing type ID is required.").bail()
  .isInt({ min: 1 })
  .withMessage("Clothing type ID must be a positive integer.");

export const clothingTypeIdValidator = () => body("clothingTypeId")
  .notEmpty()
  .withMessage("Clothing type ID is required.").bail()
  .isInt({ min: 1 })
  .withMessage("Clothing type ID must be a positive integer.");

export const clothingCategoryIdParamValidator = () => param("clothingCategoryId")
  .notEmpty()
  .withMessage("Clothing category ID is required.").bail()
  .isInt({ min: 1 })
  .withMessage("Clothing category ID must be a positive integer.");

export const clothingValidator = () => [
  wardrobeIdParamValidator(),
  clothingTypeIdValidator(),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Clothing name is required.").bail()
    .isString()
    .withMessage("Clothing name must be a string.")
    .isLength({ max: 45 })
    .withMessage("Clothing name must be at most 45 characters long."),
];
