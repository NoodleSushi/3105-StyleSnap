import { RequestHandler } from 'express';
import { statusClientForbiddenError, statusClientNotFoundError, statusServerError, statusSuccessCreated, statusSuccessOK, statusValidationError } from '../common/responseGenerators';
import * as db from '../common/db';
import { ClothingInput, ClothingUpdateInput } from '../common/interfaces';
import { userInfoResult } from './authUtils';
import { getImageUrl } from '../common/multer';

export const getClothingTypeHierarchy : RequestHandler = async (req, res) => {
  try {
    const hierarchy = await db.getClothingTypeHierarchy();
    return statusSuccessOK(res,
      "Clothing type hierarchy retrieved.",
      { hierarchy }
    );
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const getClothingType: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const clothing_type_id = Number(req.params.clothingTypeId);
    const clothingType = await db.getClothingType(clothing_type_id);
    if (!clothingType) {
      return statusClientNotFoundError(res, "Clothing type not found.");
    }
    return statusSuccessOK(res,
      "Clothing type retrieved.",
      { clothingType }
    );
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const getClothingCategories: RequestHandler = async (req, res) => {
  try {
    const clothingCategories = await db.getClothingCategories();
    return statusSuccessOK(res,
      "Clothing categories retrieved.",
      { clothingCategories }
    );
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const getClothingCategory: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const clothing_cat_id = Number(req.params.clothingCategoryId);
    const clothingCategory = await db.getClothingCategory(clothing_cat_id);
    if (!clothingCategory) {
      return statusClientNotFoundError(res, "Clothing category not found.");
    }
    return statusSuccessOK(res,
      "Clothing category retrieved.",
      { clothingCategory }
    );
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const createClothing: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);
  
    const imageFilename = req.file && req.file.filename;
    if (!imageFilename)
      return statusClientForbiddenError(res, "No image provided.");

    const wardrobeId = Number(req.params.wardrobeId);

    const clothing: ClothingInput = { ...req.body, image: imageFilename, wardrobeId };

    const wardrobe = await db.getWardrobe(clothing.wardrobeId);
    if (!wardrobe)
      return statusClientNotFoundError(res, "Wardrobe not found.");
    if (wardrobe.owner !== user.userId && !user.isAdmin)
      return statusClientForbiddenError(res, "You do not have permission to add clothing to this wardrobe.");

    const clothingType = await db.getClothingType(clothing.clothingTypeId);
    if (!clothingType)
      return statusClientNotFoundError(res, "Clothing type not found.");

    const clothing_id = await db.createClothing(clothing);
    return statusSuccessCreated(res,
      "Clothing created.",
      { clothingId: clothing_id }
    );
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const updateClothing: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);
  
    const clothingId = Number(req.params.clothingId);
    const clothing = await db.getClothing(clothingId);
    if (!clothing)
      return statusClientNotFoundError(res, "Clothing not found.");

    const wardrobe = await db.getWardrobe(clothing.wardrobeId);
    if (!wardrobe)
      return statusClientNotFoundError(res, "Wardrobe not found.");
    if (wardrobe.owner !== user.userId && !user.isAdmin)
      return statusClientForbiddenError(res, "You do not have permission to update this clothing.");

    const imageFilename = req.file && req.file.filename || undefined;

    const clothingInput: ClothingUpdateInput = { ...req.body, clothingId, image: imageFilename };
    await db.updateClothing(clothingInput);
    return statusSuccessOK(res, "Clothing updated.");
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const getClothing: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);

    const clothingId = Number(req.params.clothingId);
    const clothing = await db.getClothing(clothingId);
    if (!clothing)
      return statusClientNotFoundError(res, "Clothing not found.");
    clothing.image = getImageUrl(req, clothing.image);

    const wardrobe = await db.getWardrobe(clothing.wardrobeId);
    if (!wardrobe)
      return statusClientNotFoundError(res, "Wardrobe not found.");
    if (wardrobe.owner !== user.userId && !user.isAdmin)
      return statusClientForbiddenError(res, "You do not have permission to view this clothing.");

    return statusSuccessOK(res,
      "Clothing retrieved.",
      { clothing }
    );
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const getClothingByWardrobe: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);

    const wardrobeId = Number(req.params.wardrobeId);
    const wardrobe = await db.getWardrobe(wardrobeId);
    if (!wardrobe)
      return statusClientNotFoundError(res, "Wardrobe not found.");
    if (wardrobe.owner !== user.userId && !user.isAdmin)
      return statusClientForbiddenError(res, "You do not have permission to view this wardrobe.");

    const clothing = await db.getClothingByWardrobe(wardrobeId);
    for (const item of clothing) {
      item.image = getImageUrl(req, item.image);
    }
    return statusSuccessOK(res,
      "Clothing retrieved.",
      { clothing }
    );
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const deleteClothing: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);

    const clothingId = Number(req.params.clothingId);
    const clothing = await db.getClothing(clothingId);
    if (!clothing)
      return statusClientNotFoundError(res, "Clothing not found.");

    const wardrobe = await db.getWardrobe(clothing.wardrobeId);
    if (!wardrobe)
      return statusClientNotFoundError(res, "Wardrobe not found.");
    if (wardrobe.owner !== user.userId && !user.isAdmin)
      return statusClientForbiddenError(res, "You do not have permission to delete this clothing.");

    await db.deleteClothing(clothingId);
    return statusSuccessOK(res, "Clothing deleted.");
  } catch (err) {
    return statusServerError(res, err);
  }
}
