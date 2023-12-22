import { body, param } from "express-validator";

export const outfitIdParamValidator = () => param("outfitId")
  .notEmpty()
  .withMessage("Outfit ID is required.").bail()
  .isInt({ min: 1 })
  .withMessage("Outfit ID must be a positive integer.");

export const clothingIdsValidator = () => body("clothingIds")
  .isArray()
  .withMessage("Clothing IDs must be an array.").bail()
  .custom((clothingIds: number[]) => {
    for (const clothingId of clothingIds) {
      if (!Number.isInteger(clothingId) || clothingId < 1)
        return false;
    }
    return true;
  })
  .withMessage("Clothing IDs must be an array of positive integers.");

export const outfitNameValidator = () => body("name")
  .notEmpty()
  .withMessage("Outfit name is required.").bail()
  .isLength({ max: 45 })
  .withMessage("Outfit name must be no longer than 45 characters.");

export const outfitValidator = () => [
  outfitNameValidator(),
  clothingIdsValidator(),
];

export const outfitUpdateValidator = () => [
  outfitNameValidator().optional(),
  clothingIdsValidator().optional(),
];
