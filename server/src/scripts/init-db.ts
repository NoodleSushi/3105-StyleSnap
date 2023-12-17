import fs from "fs";
import { createMultilineConnection, DB_DATABASE } from "../controllers/db";
import { Connection } from "mysql2";
import YAML from "yaml";

interface Inserts {
  tables: {
    name: string;
    columns: string[];
    values: (string | number)[][];
  }[]
}

const generatedScript = fs.readFileSync("src/models/db.sql").toString();

const inserts = YAML.parse(fs.readFileSync("src/models/inserts.yaml", "utf8")) as Inserts;
let insertScript = "";
inserts.tables.forEach((table) => {
  const columns = table.columns.join(", ");
  const values = table.values.map((row) => {
    return `(${row.map((value) => {
      if (typeof value === "string") {
        return `'${value}'`;
      } else {
        return value;
      }
    }).join(", ")})`;
  }).join(", ");
  insertScript += `INSERT INTO ${table.name} (${columns}) VALUES ${values};`;
});

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

  console.log(`Inserting data into database ${DB_DATABASE}...`);
  await db.promise().query(insertScript).catch((err) => {
    console.log(err);
  }).then(() => {
    console.log(`Data inserted into database ${DB_DATABASE}.`);
  });
  db.end();
})();
