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
