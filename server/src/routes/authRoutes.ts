import { Router } from "express";
import { authTokenValidator, userAuthValidator, userLoginValidator } from "../validators/authValidator";
import { attachUser, createUserAccount, getCurrentUser, loginUser } from "../controllers/authController";


const authRoutes = Router();

authRoutes.post('/signup', userAuthValidator(), createUserAccount);
authRoutes.post('/login', userLoginValidator(), loginUser);
authRoutes.post('/user', authTokenValidator(), attachUser(), getCurrentUser);

export default authRoutes;