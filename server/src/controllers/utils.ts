import { hash } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hash(password, 3);
  return hashedPassword;
}
