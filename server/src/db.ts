import mysql, { ConnectionOptions, ResultSetHeader, RowDataPacket } from "mysql2";
import dotenv from "dotenv";
import SQL from "sql-template-strings";
import { ClothingCategory, ClothingType, ClothingInput, User, UserAuthInput, Wardrobe, WardrobeUserInput, WardrobeInput, Clothing, ClothingUpdateInput, OutfitInput, OutfitUpdateInput, Outfit } from "./interfaces";

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

export const updateClothing = async (clothing: ClothingUpdateInput): Promise<boolean> => {
  try {
    let table: Record<string, any> = {
      clothing_type_id: clothing.clothingTypeId,
      name: clothing.name,
      image: clothing.image,
    };
    table = Object.fromEntries(Object.entries(table).filter(([_, value]) => value !== undefined));

    const query = SQL`UPDATE Clothing SET `;
    const entries = Object.entries(table);
    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      query.append(SQL``.append(mysql.escapeId(key)).append(SQL` = ${value}`));
      if (i !== entries.length - 1) {
        query.append(SQL`, `);
      }
    }
    query.append(SQL` WHERE clothing_id = ${clothing.clothingId}`);
    const [result] = await db.promise().query<ResultSetHeader>(query);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
}

export const getClothing = async (clothingId: number): Promise<Clothing | null> => {
  try {
    const query = SQL`
      SELECT c.*, ct.clothing_cat_id
      FROM Clothing c
      INNER JOIN ClothingType ct ON c.clothing_type_id = ct.clothing_type_id
      WHERE c.clothing_id = ${clothingId}
    `;
    const [result] = await db.promise().query<(RowDataPacket)[]>(query);
    const row = result && result[0];
    return row && {
      clothingId: row.clothing_id,
      wardrobeId: row.wardrobe_id,
      clothingTypeId: row.clothing_type_id,
      clothingCatId: row.clothing_cat_id,
      name: row.name,
      image: row.image,
    } || null;
  } catch (error) {
    throw error;
  }
}

export const getClothingByWardrobe = async (wardrobeId: number): Promise<Clothing[]> => {
  try {
    const query = SQL`
      SELECT c.*, ct.clothing_cat_id
      FROM Clothing c
      INNER JOIN ClothingType ct ON c.clothing_type_id = ct.clothing_type_id
      WHERE c.wardrobe_id = ${wardrobeId}
    `;
    const [result] = await db.promise().query<(RowDataPacket)[]>(query);
    return result.map(row => ({
      clothingId: row.clothing_id,
      wardrobeId: row.wardrobe_id,
      clothingTypeId: row.clothing_type_id,
      clothingCatId: row.clothing_cat_id,
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

export const isClothesExist = async (clothingIds: number[]): Promise<boolean> => {
  try {
    clothingIds = [...new Set(clothingIds)];
    
    const query = SQL`SELECT COUNT(*) AS count FROM Clothing WHERE clothing_id IN (${clothingIds})`;
    const [result] = await db.promise().query<RowDataPacket[]>(query);
    const row = result && result[0];
    return row && row.count == clothingIds.length || false;
  } catch (error) {
    throw error;
  }
}

export const isClothesAuthorized = async (userId: number, clothingIds: number[]): Promise<boolean> => {
  try {
    clothingIds = [...new Set(clothingIds)];

    const query = SQL`SELECT COUNT(*) AS count FROM Clothing INNER JOIN Wardrobe ON Clothing.wardrobe_id = Wardrobe.wardrobe_id WHERE Clothing.clothing_id IN (${clothingIds}) AND Wardrobe.owner = ${userId}`;
    const [result] = await db.promise().query<RowDataPacket[]>(query);
    const row = result && result[0];
    return row && row.count == clothingIds.length || false;
  } catch (error) {
    throw error;
  }
}

export const createOutfit = async (outfit: OutfitInput): Promise<number> => {
  try {
    const query = SQL`INSERT INTO Outfit (owner_id, name) VALUES (${outfit.ownerId}, ${outfit.name})`;
    const [result] = await db.promise().query<ResultSetHeader>(query);
    const { insertId } = result;
    return insertId;
  } catch (error) {
    throw error;
  }
}

export const deleteOutfit = async (outfitId: number): Promise<boolean> => {
  try {
    const deleteAssociationsQuery = SQL`DELETE FROM OutfitClothes WHERE outfit_id = ${outfitId}`;
    await db.promise().query(deleteAssociationsQuery);

    const deleteOutfitQuery = SQL`DELETE FROM Outfit WHERE outfit_id = ${outfitId}`;
    const [result] = await db.promise().query<ResultSetHeader>(deleteOutfitQuery);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
}

export const getOutfit = async (outfitId: number): Promise<Outfit | null> => {
  try {
    const outfitQuery = SQL`SELECT * FROM Outfit WHERE outfit_id = ${outfitId}`;
    const [outfitResult] = await db.promise().query<(RowDataPacket)[]>(outfitQuery);
    const outfitRow = outfitResult && outfitResult[0];
    if (!outfitRow) {
      return null;
    }

    const clothingIdsQuery = SQL`SELECT clothing_id FROM OutfitClothes WHERE outfit_id = ${outfitId}`;
    const [clothingIdsResult] = await db.promise().query<(RowDataPacket)[]>(clothingIdsQuery);
    const clothingIds = clothingIdsResult.map(row => row.clothing_id);

    return {
      outfitId: outfitRow.outfit_id,
      ownerId: outfitRow.owner_id,
      name: outfitRow.name,
      clothingIds,
    };
  } catch (error) {
    throw error;
  }
}

export const getOutfitsByUser = async (userId: number): Promise<Outfit[]> => {
  try {
    const outfitQuery = SQL`SELECT * FROM Outfit WHERE owner_id = ${userId}`;
    const [outfitResult] = await db.promise().query<(RowDataPacket)[]>(outfitQuery);
    const outfits = outfitResult.map(row => ({
      outfitId: row.outfit_id,
      ownerId: row.owner_id,
      name: row.name,
      clothingIds: [] as number[],
    }));

    const clothingIdsQuery = SQL`SELECT outfit_id, clothing_id FROM OutfitClothes WHERE outfit_id IN (${outfits.map(outfit => outfit.outfitId)})`;
    const [clothingIdsResult] = await db.promise().query<(RowDataPacket)[]>(clothingIdsQuery);
    const clothingIds = clothingIdsResult.reduce((acc: Record<number, number[]>, row) => {
      const { outfit_id: outfitId, clothing_id: clothingId } = row;
      if (acc[outfitId]) {
        acc[outfitId].push(clothingId);
      } else {
        acc[outfitId] = [clothingId];
      }
      return acc;
    }, {});

    for (const outfit of outfits) {
      outfit.clothingIds = clothingIds[outfit.outfitId] || [];
    }

    return outfits;
  } catch (error) {
    throw error;
  }
}

export const updateOutfitClothes = async (outfitId: number, clothingIds: number[] | undefined): Promise<void> => {
  try {
    clothingIds = [...new Set(clothingIds)];

    const deleteQuery = SQL`DELETE FROM OutfitClothes WHERE clothing_id NOT IN (${clothingIds}) AND outfit_id = ${outfitId}`;
    await db.promise().query(deleteQuery);

    const insertQuery = SQL`INSERT INTO OutfitClothes (outfit_id, clothing_id) VALUES `;
    for (let i = 0; i < clothingIds.length; i++) {
      insertQuery.append(SQL`(${outfitId}, ${clothingIds[i]})`);
      if (i !== clothingIds.length - 1) {
        insertQuery.append(SQL`, `);
      }
    }

    insertQuery.append(SQL` ON DUPLICATE KEY UPDATE clothing_id = VALUES(clothing_id)`);
    await db.promise().query(insertQuery);
  } catch (error) {
    throw error;
  }
}

export const getOutfitClothes = async (outfitId: number): Promise<Clothing[]> => {
  try {
    const query = SQL`
      SELECT c.*, ct.clothing_cat_id
      FROM Clothing c
      INNER JOIN ClothingType ct ON c.clothing_type_id = ct.clothing_type_id
      WHERE c.clothing_id IN (SELECT clothing_id FROM OutfitClothes WHERE outfit_id = ${outfitId})
    `;
    const [result] = await db.promise().query<(RowDataPacket & { clothing_cat_id: number })[]>(query);
    return result.map(row => ({
      clothingId: row.clothing_id,
      wardrobeId: row.wardrobe_id,
      clothingTypeId: row.clothing_type_id,
      clothingCatId: row.clothing_cat_id,
      name: row.name,
      image: row.image,
    }));
  } catch (error) {
    throw error;
  }
}

export const updateOutfit = async (outfitId: number, input: OutfitUpdateInput): Promise<boolean> => {
  try {
    let table: Record<string, any> = {
      name: input.name,
    };
    table = Object.fromEntries(Object.entries(table).filter(([_, value]) => value !== undefined));

    const query = SQL`UPDATE Outfit SET `;
    const entries = Object.entries(table);
    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      query.append(SQL``.append(mysql.escapeId(key)).append(SQL` = ${value}`));
      if (i !== entries.length - 1) {
        query.append(SQL`, `);
      }
    }
    query.append(SQL` WHERE outfit_id = ${outfitId}`);
    const [result] = await db.promise().query<ResultSetHeader>(query);
    return result.affectedRows > 0;
  } catch (error) {
    throw error;
  }
}
