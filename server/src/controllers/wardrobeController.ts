import { RequestHandler } from "express";
import { statusServerError, statusSuccessOK, statusValidationError, statusClientNotFoundError, statusClientForbiddenError, statusSuccessCreated } from "./responseGenerators";
import { WardrobeInput, WardrobeUserInput } from "../interfaces";
import { userInfoResult } from "./authUtils";
import * as db from "../db";

export const createWardrobe: RequestHandler = async (req, res) => {
  const statusValidErr = statusValidationError(req, res, "Invalid wardrobe data.", "batch");
  if (statusValidErr)
    return statusValidErr;

  try {
    const user = userInfoResult(req);
    if (!user)
      return statusServerError(res);
    const body: WardrobeUserInput = req.body;
    const wardrobe: WardrobeInput = {
      ...body,
      owner: user.userId,
    }
    const wardrobe_id = await db.createWardrobe(wardrobe);
    return statusSuccessCreated(res,
      "Wardrobe creation successful.",
      { wardrobeId: wardrobe_id }
    );
  } catch (err) {
    return statusServerError(res, err);
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
      return statusSuccessOK(res,
        "All wardrobes retrieval successful.",
        { wardrobes }
      );
    }
    
    const user_id = mode === "param" && Number(req.params.userId) || user.userId;
    if (user_id !== user.userId && !user.isAdmin)
      return statusClientForbiddenError(res,
        "You do not have permission to view this user's wardrobes."
      );

    const wardrobes = await db.getUserWardrobes(user_id);
    return statusSuccessOK(res,
      "User wardrobes retrieval successful.",
      { wardrobes }
    );
  } catch (err) {
    return statusServerError(res, err);
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
    
    if (wardrobe.owner !== user.userId && !user.isAdmin)
      return statusClientForbiddenError(res,
        "You do not have permission to view this wardrobe."
      );
    
    return statusSuccessOK(res,
      "Wardrobe retrieval successful.",
      { wardrobe }
    );
  } catch (err) {
    return statusServerError(res, err);
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

    if (wardrobe.owner !== user.userId && !user.isAdmin)
      return statusClientForbiddenError(res,
        "You do not have permission to update this wardrobe."
      );

    const isUpdated = await db.updateWardrobe(wardrobe_id, wardrobe_input);
    if (!isUpdated)
      return statusServerError(res);

    return statusSuccessOK(res, "Wardrobe update successful.");
  } catch (err) {
    return statusServerError(res, err);
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

    if (wardrobe.owner !== user.userId && !user.isAdmin)
      return statusClientForbiddenError(res,
        "You do not have permission to delete this wardrobe."
      );

    await db.deleteWardrobe(wardrobe_id);
    return statusSuccessOK(res, "Wardrobe deletion successful.");
  } catch (err) {
    return statusServerError(res, err);
  }
}
