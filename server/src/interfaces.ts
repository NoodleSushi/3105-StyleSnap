export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
}

export type UserAuth = Omit<User, "user_id" | "is_admin">;
export type UserInfo = Omit<User, "password">;

export interface Wardrobe {
  wardrobe_id: number;
  owner: number;
  name: string;
}
