import mysql, { ConnectionOptions, ResultSetHeader, RowDataPacket } from "mysql2";
import dotenv from "dotenv";
import SQL from "sql-template-strings";
import { ClothingCategory, ClothingType, ClothingInput, User, UserAuthInput, Wardrobe, WardrobeUserInput, WardrobeInput, Clothing } from "../interfaces";

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

export const getClothingTypeHierarchy = async () => {
  try {
    const hierarchy: (ClothingCategory & { types: ClothingType[]})[] = [];
    const [cat_result] = await db.promise().query<(RowDataPacket)[]>(SQL`SELECT * FROM ClothingCategory`);
    for (const cat_row of cat_result) {
      console.log(cat_row);
      const { clothing_cat_id: clothingCatId, name } = cat_row;
      const [type_result] = await db.promise().query<(RowDataPacket)[]>(SQL`SELECT * FROM ClothingType WHERE clothing_cat_id = ${clothingCatId}`);
      const types: ClothingType[] = type_result.map(type_row => (
        {
          clothingTypeId: type_row.clothing_type_id,
          clothingCatId: type_row.clothing_cat_id,
          name: type_row.name
        }
      ));
      hierarchy.push({ clothingCatId, name, types });
    }
    return hierarchy;
  } catch (error) {
    throw error;
  }
}

export const getClothingType = async (clothingTypeId: number): Promise<ClothingType | null> => {
  try {
    const query = SQL`SELECT * FROM ClothingType WHERE clothing_type_id = ${clothingTypeId}`;
    const [result] = await db.promise().query<(RowDataPacket)[]>(query);
    const row = result && result[0];
    return row && {
      clothingTypeId: row.clothing_type_id,
      clothingCatId: row.clothing_cat_id,
      name: row.name,
    } || null;
  } catch (error) {
    throw error;
  }
}

export const getClothingCategory = async (clothingCatId: number): Promise<ClothingCategory | null> => {
  try {
    const query = SQL`SELECT * FROM ClothingCategory WHERE clothing_cat_id = ${clothingCatId}`;
    const [result] = await db.promise().query<(RowDataPacket)[]>(query);
    const row = result && result[0];
    return row && {
      clothingCatId: row.clothing_cat_id,
      name: row.name,
    } || null;
  } catch (error) {
    throw error;
  }
}

export const createClothing = async (clothing: ClothingInput): Promise<number> => {
  try {
    const query = SQL`INSERT INTO Clothing (wardrobe_id, clothing_type_id, name, image) VALUES (${clothing.wardrobeId}, ${clothing.clothingTypeId}, ${clothing.name}, ${clothing.image})`;
    const [result] = await db.promise().query<ResultSetHeader>(query);
    const { insertId } = result;
    return insertId;
  } catch (error) {
    throw error;
  }
}

export const getClothing = async (clothingId: number): Promise<Clothing | null> => {
  try {
    const query = SQL`SELECT * FROM Clothing WHERE clothing_id = ${clothingId}`;
    const [result] = await db.promise().query<(RowDataPacket)[]>(query);
    const row = result && result[0];
    return row && {
      clothingId: row.clothing_id,
      wardrobeId: row.wardrobe_id,
      clothingTypeId: row.clothing_type_id,
      name: row.name,
      image: row.image,
    } || null;
  } catch (error) {
    throw error;
  }
}

export const getClothingByWardrobe = async (wardrobeId: number): Promise<Clothing[]> => {
  try {
    const query = SQL`SELECT * FROM Clothing WHERE wardrobe_id = ${wardrobeId}`;
    const [result] = await db.promise().query<(RowDataPacket)[]>(query);
    return result.map(row => ({
      clothingId: row.clothing_id,
      wardrobeId: row.wardrobe_id,
      clothingTypeId: row.clothing_type_id,
      name: row.name,
      image: row.image,
    }));
  } catch (error) {
    throw error;
  }
}

export const deleteClothing = async (clothingId: number): Promise<void> => {
  try {
    const query = SQL`DELETE FROM Clothing WHERE clothing_id = ${clothingId}`;
    await db.promise().query(query);
  } catch (error) {
    throw error;
  }
}
