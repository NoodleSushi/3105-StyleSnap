import { RequestHandler } from "express";
import { statusServerError, statusSuccessful, statusValidationError, statusClientNotFoundError, statusClientUnauthorizedError } from "./utils";
import { WardrobeInput } from "../interfaces";
import { userInfoResult } from "./authUtils";
import * as db from "./db";

export const createWardrobe: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res, "Invalid wardrobe data.", "batch");
  if (statusValidErr)
    return statusValidErr;

  try {
    const wardrobe: WardrobeInput = req.body;
    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);
    const user_id = user.user_id;
    const wardrobe_id = await db.createWardrobe(user_id, wardrobe.name);
    return statusSuccessful(res, 201, "Wardrobe creation successful.", { wardrobe_id });
  } catch (err) {
    return statusServerError(res);
  }
}

export const getWardrobes: (mode: "user" | "admin" | "param") => RequestHandler = (mode) => async (req, res) => {
  try {
    if (mode === "param") {
      const statusValidErr = statusValidationError(req, res);
      if (statusValidErr)
        return statusValidErr;
    }

    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);
    
    if (mode === "admin") {
      const wardrobes = await db.getAllWardrobes();
      return statusSuccessful(res, 200, "All wardrobes retrieval successful.", { wardrobes });
    }
    
    const user_id = mode === "param" && Number(req.params.userId) || user.user_id;
    const wardrobes = await db.getUserWardrobes(user_id);
    return statusSuccessful(res, 200, "User wardrobes retrieval successful.", { wardrobes });
  } catch (err) {
    return statusServerError(res);
  }
}

export const getWardrobe: RequestHandler = async (req, res) => {
  try {
    const statusValidErr = statusValidationError(req, res);
    if (statusValidErr)
      return statusValidErr;

    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);
    
    const wardrobe_id = Number(req.params.wardrobeId);
    const wardrobe = await db.getWardrobe(wardrobe_id);
    if (!wardrobe)
      return statusClientNotFoundError(res, "Wardrobe not found.");
    
    if (wardrobe.owner !== user.user_id && !user.is_admin)
      return statusClientUnauthorizedError(res);
    
    return statusSuccessful(res, 200, "Wardrobe retrieval successful.", { wardrobe });
  } catch (err) {
    return statusServerError(res);
  }
}

export const updateWardrobe: RequestHandler = async (req, res) => {
  try {
    const statusValidErr = statusValidationError(req, res);
    if (statusValidErr)
      return statusValidErr;

    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);
    
    const wardrobe_input: WardrobeInput = req.body;
    const wardrobe_id = Number(req.params.wardrobeId);
    const wardrobe = await db.getWardrobe(wardrobe_id);
    if (!wardrobe)
      return statusClientNotFoundError(res, "Wardrobe not found.");

    if (wardrobe.owner !== user.user_id && !user.is_admin)
      return statusClientUnauthorizedError(res);

    const isUpdated = await db.updateWardrobe(wardrobe_id, wardrobe_input);
    if (!isUpdated)
      return statusServerError(res);

    return statusSuccessful(res, 200, "Wardrobe update successful.");
  } catch (err) {
    return statusServerError(res);
  }
}

export const deleteWardrobe: RequestHandler = async (req, res) => {
  try {
    const statusValidErr = statusValidationError(req, res);
    if (statusValidErr)
      return statusValidErr;

    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);
    
    const wardrobe_id = Number(req.params.wardrobeId);
    const wardrobe = await db.getWardrobe(wardrobe_id);
    if (!wardrobe)
      return statusClientNotFoundError(res, "Wardrobe not found.");

    if (wardrobe.owner !== user.user_id && !user.is_admin)
      return statusClientUnauthorizedError(res);

    await db.deleteWardrobe(wardrobe_id);
    return statusSuccessful(res, 200, "Wardrobe deletion successful.");
  } catch (err) {
    return statusServerError(res);
  }
}
