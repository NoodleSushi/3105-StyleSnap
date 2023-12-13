import express, { Express } from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import SQL from "sql-template-strings";
import db from "./models/db";

dotenv.config();

db.query(SQL`SELECT * FROM test`, (err, result) => {
  console.log(result);
})


const app: Express = express();
const SERVER_PORT: number = Number(process.env.SERVER_PORT) || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}`);
});
