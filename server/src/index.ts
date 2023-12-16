import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";

// setup .env
dotenv.config();

const SERVER_PORT: number = Number(process.env.SERVER_PORT);

// setup express
const app = express();

// setup body-parser
app.use(bodyParser.urlencoded({extended:true}));

// setup cors
app.use(cors({
  origin: [process.env.CORS_ORIGIN!],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// setup express to receive json
app.use(express.json());

app.use(routes);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
