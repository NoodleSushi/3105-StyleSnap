import mysql, { ConnectionOptions, RowDataPacket } from "mysql2";
import dotenv from "dotenv";
import SQL from "sql-template-strings";

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


export const createUser = async (username: string, email: string, password: string): Promise<void> => {
  try {
    const query = SQL`INSERT INTO User (username, email, password) VALUES (${username}, ${email}, ${password})`;
    await db.promise().query(query);
  } catch (error) {
    throw error;
  }
}

export const isUsernameTaken = async (username: string): Promise<boolean> => {
  interface Result extends RowDataPacket {
    isTaken: number;
  }

  try {
    const query = SQL`SELECT EXISTS (SELECT * FROM User WHERE username = ${username}) AS isTaken`;
    const [result] = await db.promise().query<Result[]>(query);
    console.log(result);
    return result[0].isTaken == 1;
  } catch (error) {
    throw error;
  }
}

export const isEmailTaken = async (email: string): Promise<boolean> => {
  interface Result extends RowDataPacket {
    isTaken: number;
  }

  try {
    const query = SQL`SELECT EXISTS (SELECT * FROM User WHERE email = ${email}) AS isTaken`;
    const [result] = await db.promise().query<Result[]>(query);
    return result[0].isTaken == 1;
  } catch (error) {
    throw error;
  }
}

export const getUser = async (username: string, email: string) => {
  interface Result extends RowDataPacket {
    user_id: number;
    username: string;
    email: string;
    password: string;
  }

  try {
    const query = SQL`SELECT * FROM User WHERE username = ${username} AND email = ${email} LIMIT 1`;
    const [result] = await db.promise().query<Result[]>(query);
    return result && result[0] || null;
  } catch (error) {
    throw error;
  }
}

export default db;