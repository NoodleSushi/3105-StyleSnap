import { Router } from "express";
import { userAuthValidator, userLoginValidator, authTokenValidator } from "../validators/authValidator";
import { createUserAccount, loginUser } from "../controllers/authController";


const authRoutes = Router();

authRoutes.post('/signup', userAuthValidator(), createUserAccount);
authRoutes.post('/login', userLoginValidator(), loginUser);

export default authRoutes;