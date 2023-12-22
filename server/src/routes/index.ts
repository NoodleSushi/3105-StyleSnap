import { Router } from "express";
import authRoutes from "./authRoutes";
import swaggerRouter from "./swaggerRouter";
import wardrobeRoutes from "./wardrobeRoutes";
import clothingRoutes from "./clothingRoutes";
import outfitRoutes from "./outfitRoutes";

const routes: Router = Router();

routes.use("/api-docs", swaggerRouter);
routes.use("/auth", authRoutes);
routes.use(wardrobeRoutes);
routes.use(clothingRoutes);
routes.use(outfitRoutes);

export default routes;