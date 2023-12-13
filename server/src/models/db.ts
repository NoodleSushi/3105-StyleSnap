import mysql, { ConnectionOptions } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const DB_DATABASE = process.env.DB_DATABASE || 'world';

const DB_OPTIONS: ConnectionOptions = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  port: Number(process.env.DB_PORT) || 3306,
  password: process.env.DB_PASSWORD || 'password',
};

const db = mysql.createPool({...DB_OPTIONS, database: DB_DATABASE});

const createMultilineConnection = (addDatabaseName: boolean) => {
  return mysql.createConnection({
    ...DB_OPTIONS,
    multipleStatements: true,
    database: addDatabaseName ? DB_DATABASE : undefined,
  });
}

export default db;
export { createMultilineConnection, DB_DATABASE };