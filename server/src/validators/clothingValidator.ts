import { body, param } from "express-validator";

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
  .withMessage("Clothing type ID must be a positive integer.")
  .toInt();

export const clothingCategoryIdParamValidator = () => param("clothingCategoryId")
  .notEmpty()
  .withMessage("Clothing category ID is required.").bail()
  .isInt({ min: 1 })
  .withMessage("Clothing category ID must be a positive integer.");

export const clothingNameValidator = () => body("name")
  .trim()
  .notEmpty()
  .withMessage("Clothing name is required.").bail()
  .isString()
  .withMessage("Clothing name must be a string.")
  .isLength({ max: 45 })
  .withMessage("Clothing name must be at most 45 characters long.");

export const clothingValidator = () => [
  clothingTypeIdValidator(),
  clothingNameValidator(),
];

export const clothingUpdateValidator = () => [
  clothingTypeIdValidator().optional(),
  clothingNameValidator().optional(),
];
