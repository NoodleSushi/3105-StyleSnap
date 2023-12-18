import { Router } from "express";
import { userAuthValidator, userLoginValidator, authTokenValidator } from "../validators/authValidator";
import { attachUser, authTest, createUserAccount, loginUser } from "../controllers/authController";


const authRoutes = Router();

authRoutes.post('/signup', userAuthValidator(), createUserAccount);
authRoutes.post('/login', userLoginValidator(), loginUser);
authRoutes.post('/authtest', authTokenValidator(), attachUser(), authTest);

export default authRoutes;