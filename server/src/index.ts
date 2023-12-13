import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 3000;


// setup .env
dotenv.config();

// setup express
const app = express();

// setup body-parser
app.use(bodyParser.urlencoded({extended:true}));

// setup cors
app.use(cors({
  origin: [String(process.env.CORS_ORIGIN)],
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); 

const allowedOrigins = [process.env.CORS_ORIGIN];
app.use(cors({
  origin: function(origin, callback){
      if(!origin || allowedOrigins.indexOf(origin) !== -1){
          callback(null,true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
}));

// setup express to receive json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
