import { Express, Router } from "express";
import authRoutes from "./authRoutes";
import swaggerRouter from "./swaggerRouter";
const routes: Router = Router();

routes.use("/auth", authRoutes);
routes.use("/api-docs", swaggerRouter);

export default routes;