import fs from "fs";
import path from "path";
import { createMultilineConnection, DB_DATABASE } from "./db";
import { Connection } from "mysql2";

const generatedScript = fs.readFileSync(path.join(__dirname, "db.sql")).toString();

(async () => {
  let db: Connection;

  db = createMultilineConnection(false);
  console.log(`Resetting database ${DB_DATABASE}...`);
  await db.promise().query(`DROP DATABASE IF EXISTS ${DB_DATABASE}; CREATE DATABASE ${DB_DATABASE};`).catch((err) => {
    console.log(err);
  }).then(() => {
    console.log(`Database ${DB_DATABASE} Resetted.`);
  });
  db.end();

  db = createMultilineConnection(true);
  console.log(`Initializing database ${DB_DATABASE}...`);
  await db.promise().query(generatedScript).catch((err) => {
    console.log(err);
  }).then(() => {
    console.log(`Database ${DB_DATABASE} initialized.`);
  });
  db.end();
})();
