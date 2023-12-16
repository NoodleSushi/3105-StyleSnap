import { Router } from "express";
import { userAuthValidator, userLoginValidator, authToken } from "../validators/authValidator";
import { createUserAccount, loginUser } from "../controllers/authController";
import { validationResult } from "express-validator";


const authRoutes = Router();

authRoutes.post('/signup', ...userAuthValidator(), createUserAccount);
authRoutes.post('/login', ...userLoginValidator(), loginUser);
authRoutes.post('/authtest', authToken(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      message: "Invalid access token.",
    });
  }
  res.json({
    message: "You have a valid access token."
  });
});

export default authRoutes;