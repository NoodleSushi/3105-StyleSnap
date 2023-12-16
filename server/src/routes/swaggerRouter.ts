import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../docs/swagger.json";

const swaggerRouter = Router();
swaggerRouter.use(swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default swaggerRouter;