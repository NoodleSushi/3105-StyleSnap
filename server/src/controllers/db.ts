import mysql, { ConnectionOptions } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const DB_DATABASE = process.env.DB_DATABASE

const DB_OPTIONS: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
};

export const createMultilineConnection = (addDatabaseName: boolean) => {
  return mysql.createConnection({
    ...DB_OPTIONS,
    multipleStatements: true,
    database: addDatabaseName ? DB_DATABASE : undefined,
  });
}

const db = mysql.createPool({...DB_OPTIONS, database: DB_DATABASE});


export default db;