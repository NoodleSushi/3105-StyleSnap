import { Router } from "express";
import { authTokenValidator } from "../validators/authValidator";
import { attachUser } from "../controllers/authController";
import { createWardrobe, deleteWardrobe, getWardrobe, getWardrobes, updateWardrobe } from "../controllers/wardrobeController";
import { userIdParamValidator, wardrobeIdParamValidator, wardrobeValidator } from "../validators/wardrobeValidator";

const wardrobeRoutes = Router();

wardrobeRoutes.post('/wardrobes', authTokenValidator(), attachUser(), wardrobeValidator(), createWardrobe);
wardrobeRoutes.get('/wardrobes', authTokenValidator(), attachUser("admin"), getWardrobes("admin"));
wardrobeRoutes.get('/wardrobes/:wardrobeId', authTokenValidator(), attachUser(), wardrobeIdParamValidator(), getWardrobe);
wardrobeRoutes.put('/wardrobes/:wardrobeId', authTokenValidator(), attachUser(), wardrobeIdParamValidator(), wardrobeValidator(), updateWardrobe);
wardrobeRoutes.delete('/wardrobes/:wardrobeId', authTokenValidator(), attachUser(), wardrobeIdParamValidator(), deleteWardrobe);

wardrobeRoutes.get('/wardrobes/user', authTokenValidator(), attachUser(), getWardrobes("user"));
wardrobeRoutes.get('/wardrobes/user/:userId', authTokenValidator(), attachUser("admin"), userIdParamValidator(), getWardrobes("param"));

export default wardrobeRoutes;