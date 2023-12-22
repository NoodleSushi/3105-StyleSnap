import { Router } from "express";
import { authTokenValidator } from "../validators/authValidator";
import { attachUser } from "../controllers/authController";
import { outfitIdParamValidator, outfitValidator } from "../validators/outfitValidator";
import { createOutfit, deleteOutfit, getOutfit, getOutfitsByUser, updateOutfit } from "../controllers/outfitController";

const outfitRoutes = Router();

outfitRoutes.post('/user/outfits', authTokenValidator(), attachUser(), outfitValidator(), createOutfit);

outfitRoutes.get('/outfits/:outfitId', authTokenValidator(), attachUser(), outfitIdParamValidator(), getOutfit);
outfitRoutes.get('/user/outfits', authTokenValidator(), attachUser(), getOutfitsByUser);

outfitRoutes.patch('/outfits/:outfitId', authTokenValidator(), attachUser(), outfitIdParamValidator(), updateOutfit);

outfitRoutes.delete('/outfits/:outfitId', authTokenValidator(), attachUser(), outfitIdParamValidator(), deleteOutfit);

export default outfitRoutes;