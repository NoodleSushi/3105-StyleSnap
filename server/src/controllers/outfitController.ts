import { RequestHandler } from 'express';
import { statusClientForbiddenError, statusClientNotFoundError, statusServerError, statusSuccessCreated, statusSuccessOK, statusValidationError } from './responseGenerators';
import * as db from '../db';
import { userInfoResult } from './authUtils';
import { OutfitInput, OutfitUpdateInput } from '../interfaces';
import { getImageUrl } from '../multer';

export const createOutfit: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);

    const outfit = {...req.body as OutfitInput, ownerId: user.userId };
    const outfitId = await db.createOutfit(outfit);
    db.updateOutfitClothes(outfitId, outfit.clothingIds);
    return statusSuccessCreated(res, "Outfit creation successful", { outfitId });
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const getOutfit: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);

    const outfitId = Number(req.params.outfitId);
    const outfitBase = await db.getOutfit(outfitId);
    if (!outfitBase)
      return statusClientNotFoundError(res, "Outfit not found.");

    if (outfitBase.ownerId !== user.userId && !user.isAdmin)
      return statusClientForbiddenError(res, "Outfit does not belong to user.");

    const outfitClothes = await db.getOutfitClothes(outfitId);
    const outfit = { ...outfitBase, clothes: outfitClothes };

    
    return statusSuccessOK(res, "Outfit retrieval successful", { outfit } );
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const getOutfitsByUser: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);

    const outfits = await db.getOutfitsByUser(user.userId);
    // normalize clothes image into urls
    for (const outfit of outfits) {
      for (const clothing of outfit.clothes) {
        clothing.image = getImageUrl(req, clothing.image);
      }
    }
    
    return statusSuccessOK(res, "Outfits retrieval successful", { outfits });
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const updateOutfit: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const outfitId = Number(req.params.outfitId);
    const outfit = { ...req.body as OutfitUpdateInput, outfitId };
    const outfitExists = await db.updateOutfit(outfitId, outfit);
    if (!outfitExists)
      return statusClientNotFoundError(res, "Outfit not found.");
    if (outfit.clothingIds != undefined) {
      const exist = await db.isClothesExist(outfit.clothingIds);
      if (!exist)
        return statusClientNotFoundError(res, "Clothing not found.");
      db.updateOutfitClothes(outfitId, outfit.clothingIds);
    }
    return statusSuccessOK(res, "Outfit update successful");
  } catch (err) {
    return statusServerError(res, err);
  }
}

export const deleteOutfit: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res);
  if (statusValidErr)
    return statusValidErr;

  try {
    const outfitId = Number(req.params.outfitId);
    const outfitExists = await db.deleteOutfit(outfitId);
    if (!outfitExists)
      return statusClientNotFoundError(res, "Outfit not found.");
    return statusSuccessOK(res, "Outfit deletion successful");
  } catch (err) {
    return statusServerError(res, err);
  }
}
