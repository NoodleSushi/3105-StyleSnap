export interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

export type UserAuth = Omit<User, "user_id">;
