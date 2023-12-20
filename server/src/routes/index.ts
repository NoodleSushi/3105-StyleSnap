import { Router } from "express";
import authRoutes from "./authRoutes";
import swaggerRouter from "./swaggerRouter";
import wardrobeRoutes from "./wardrobeRoutes";
import clothingRoutes from "./clothingRoutes";

const routes: Router = Router();

routes.use("/api-docs", swaggerRouter);
routes.use("/auth", authRoutes);
routes.use(wardrobeRoutes);
routes.use(clothingRoutes);

export default routes;