import { Router } from "express";
import { authTokenValidator } from "../validators/authValidator";
import { attachUser } from "../controllers/authController";
import { clothingCategoryIdParamValidator, clothingIdParamValidator, clothingTypeIdParamValidator, clothingUpdateValidator, clothingValidator } from "../validators/clothingValidator";
import { validateMulterUpload } from "../validators/generalValidator";
import { createClothing, deleteClothing, getClothing, getClothingByWardrobe, getClothingCategory, getClothingType, getClothingTypeHierarchy, updateClothing } from "../controllers/clothingController";
import { upload } from "../multer";
import { wardrobeIdParamValidator } from "../validators/wardrobeValidator";

const clothingRoutes = Router();

clothingRoutes.get('/clothing/hierarchy', getClothingTypeHierarchy);
clothingRoutes.get('/clothing/types/:clothingTypeId', clothingTypeIdParamValidator(), getClothingType);
clothingRoutes.get('/clothing/categories/:clothingCategoryId', clothingCategoryIdParamValidator(), getClothingCategory);

clothingRoutes.post('/user/wardrobes/:wardrobeId/clothing', authTokenValidator(), attachUser(), validateMulterUpload(upload.single('image')), wardrobeIdParamValidator(), clothingValidator(), createClothing);

clothingRoutes.get('/clothing/:clothingId', authTokenValidator(), attachUser(), clothingIdParamValidator(), getClothing);
clothingRoutes.get('/wardrobes/:wardrobeId/clothing', authTokenValidator(), attachUser(), wardrobeIdParamValidator(), getClothingByWardrobe);

clothingRoutes.patch('/clothing/:clothingId', authTokenValidator(), attachUser(), validateMulterUpload(upload.single('image'), true), clothingIdParamValidator(), clothingUpdateValidator(), updateClothing);

clothingRoutes.delete('/clothing/:clothingId', authTokenValidator(), attachUser(), clothingIdParamValidator(), deleteClothing);

export default clothingRoutes;