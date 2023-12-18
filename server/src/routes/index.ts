import { Router } from "express";
import authRoutes from "./authRoutes";
import swaggerRouter from "./swaggerRouter";
import wardrobeRoutes from "./wardrobeRoutes";

const routes: Router = Router();

routes.use("/api-docs", swaggerRouter);
routes.use("/auth", authRoutes);
routes.use(wardrobeRoutes);

export default routes;