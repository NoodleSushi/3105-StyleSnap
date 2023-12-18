import fs from "fs";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";

const swaggerDocument = YAML.parse(fs.readFileSync("docs/swagger.yaml", "utf8"));

const swaggerRouter = Router();

swaggerRouter.use(swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default swaggerRouter;