type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export type UserAuthUserInput = Omit<User, "userId" | "isAdmin">;
export type UserAuthInput = Omit<User, "userId">;
export type UserInfo = Omit<User, "password">;

export interface Wardrobe {
  wardrobeId: number;
  owner: number;
  name: string;
}

export type WardrobeUserInput = Omit<Wardrobe, "wardrobeId" | "owner">;
export type WardrobeInput = Omit<Wardrobe, "wardrobeId">;

export interface ClothingCategory {
  clothingCatId: number;
  name: string;
}

export interface ClothingType {
  clothingTypeId: number;
  clothingCatId: number;
  name: string;
}

export interface Clothing {
  clothingId: number;
  wardrobeId: number;
  clothingTypeId: number;
  name: string;
  image: string;
}

export type ClothingInput = Omit<Clothing, "clothingId">;
export type ClothingUpdateInput = Optional<Omit<Clothing, "wardrobeId">, "clothingTypeId" | "name" | "image">;

export interface Outfit {
  outfitId: number;
  ownerId: number;
  name: string;
  clothingIds?: number[];
}

export type OutfitInput = Omit<Outfit, "outfitId">;
export type OutfitUpdateInput = Optional<Omit<Outfit, "ownerId">, "name">;
