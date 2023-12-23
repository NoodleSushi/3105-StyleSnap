import fs from "fs";
import { createMultilineConnection, DB_DATABASE } from "../common/db";
import { Connection } from "mysql2";
import YAML from "yaml";
import { hashPassword } from "../controllers/authUtils";

interface Inserts {
  tables: {
    name: string;
    columns: string[];
    values: (string | number | boolean | { passHash?: string })[][];
  }[]
}

const generatedScript = fs.readFileSync("src/models/db.sql").toString();
const inserts = YAML.parse(fs.readFileSync("src/models/inserts.yaml", "utf8")) as Inserts;

(async () => {
  let insertScript = "";

  for (const table of inserts.tables) {
    const columns = table.columns.join(", ");
    const values = (await Promise.all(table.values.map(async (row) => {
      return `(${await Promise.all(row.map(async (value) => {
        if (typeof value === "object" && value.passHash) {
          return `'${await hashPassword(value.passHash)}'`;
        } else if (typeof value === "string") {
          return `'${value}'`;
        } else if (typeof value === "boolean") {
          return value ? 1 : 0;
        } else if (typeof value === "number") {
          return value;
        } else {
          throw new Error("Invalid value type.");
        }
      }))})`;
    }))).join(", ");
    insertScript += `INSERT INTO ${table.name} (${columns}) VALUES ${values};`;
  }
  
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
