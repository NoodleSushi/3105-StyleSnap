export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
}

export type UserAuthUserInput = Omit<User, "user_id" | "is_admin">;
export type UserAuthInput = Omit<User, "user_id">;
export type UserInfo = Omit<User, "password">;

export interface Wardrobe {
  wardrobe_id: number;
  owner: number;
  name: string;
}

export type WardrobeUserInput = Omit<Wardrobe, "wardrobe_id" | "owner">;
export type WardrobeInput = Omit<Wardrobe, "wardrobe_id">;
