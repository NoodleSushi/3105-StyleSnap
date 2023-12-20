import mysql, { ConnectionOptions, ResultSetHeader, RowDataPacket } from "mysql2";
import dotenv from "dotenv";
import SQL from "sql-template-strings";
import { ClothingCategory, ClothingType, ClothingInput, User, UserAuthInput, Wardrobe, WardrobeUserInput, WardrobeInput } from "../interfaces";

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


export const createUser = async (newUser: UserAuthInput): Promise<void> => {
  try {
    const query = SQL`INSERT INTO User (username, email, password, is_admin) VALUES (${newUser.username}, ${newUser.email}, ${newUser.password}, ${newUser.isAdmin})`;
    await db.promise().query(query);
  } catch (error) {
    throw error;
  }
}

export const isUsernameTaken = async (username: string): Promise<boolean> => {
  try {
    const query = SQL`SELECT EXISTS (SELECT * FROM User WHERE username = ${username}) AS is_taken`;
    const [result] = await db.promise().query<RowDataPacket[]>(query);
    const row = result && result[0];
    return row && row.is_taken == 1 || false;
  } catch (error) {
    throw error;
  }
}

export const isEmailTaken = async (email: string): Promise<boolean> => {
  try {
    const query = SQL`SELECT EXISTS (SELECT * FROM User WHERE email = ${email}) AS is_taken`;
    const [result] = await db.promise().query<RowDataPacket[]>(query);
    const row = result && result[0];
    return row && row.is_taken == 1 || false;
  } catch (error) {
    throw error;
  }
}

export const getUser = async (username: string, email: string): Promise<User | null> => {
  try {
    const query = SQL`SELECT * FROM User WHERE username = ${username} AND email = ${email} LIMIT 1`;
    const [result] = await db.promise().query<(RowDataPacket)[]>(query);
    const row = result && result[0];
    return row && {
      userId: row.user_id,
      username: row.username,
      email: row.email,
      password: row.password,
      isAdmin: Boolean(row.is_admin)
    } || null;
  } catch (error) {
    throw error;
  }
}

export const createWardrobe = async (wardrobe: WardrobeInput): Promise<number> => {
  try {
    const query = SQL`INSERT INTO Wardrobe (owner, name) VALUES (${wardrobe.owner}, ${wardrobe.name})`;
    const [result] = await db.promise().query<ResultSetHeader>(query);
    const { insertId } = result;
    return insertId;
  } catch (error) {
    throw error;
  }
}

export const getWardrobe = async (wardrobeId: number): Promise<Wardrobe | null> => {
  try {
    const query = SQL`SELECT * FROM Wardrobe WHERE wardrobe_id = ${wardrobeId}`;
    const [result] = await db.promise().query<(RowDataPacket)[]>(query);
    const row = result && result[0];
    return row && {
      wardrobeId: row.wardrobe_id,
      owner: row.owner,
      name: row.name,
    } || null;
  } catch (error) {
    throw error;
  }
}

export const getUserWardrobes = async (userId: number): Promise<Wardrobe[]> => {
  try {
    const query = SQL`SELECT * FROM Wardrobe WHERE owner = ${userId}`;
    const [result] = await db.promise().query<(RowDataPacket)[]>(query);
    return result.map(row => ({
      wardrobeId: row.wardrobe_id,
      owner: row.owner,
      name: row.name,
    }));
  } catch (error) {
    throw error;
  }
}

export const getAllWardrobes = async (): Promise<Wardrobe[]> => {
  try {
    const query = SQL`SELECT * FROM Wardrobe`;
    const [result] = await db.promise().query<(RowDataPacket)[]>(query);
    return result.map(row => ({
      wardrobeId: row.wardrobe_id,
      owner: row.owner,
      name: row.name,
    }));
  } catch (error) {
    throw error;
  }

}

export const updateWardrobe = async (wardrobeId: number, input: WardrobeUserInput): Promise<boolean> => {
  try {
    const query = SQL`UPDATE Wardrobe SET name = ${input.name} WHERE wardrobe_id = ${wardrobeId}`;
    const [result] = await db.promise().query<ResultSetHeader>(query);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
}

export const deleteWardrobe = async (wardrobeId: number): Promise<void> => {
  try {
    const query = SQL`DELETE FROM Wardrobe WHERE wardrobe_id = ${wardrobeId}`;
    await db.promise().query(query);
  } catch (error) {
    throw error;
  }
}