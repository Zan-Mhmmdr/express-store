import crypto from "crypto";

export const hashPassword = async (password: string): Promise<string> => {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const hashed = await hashPassword(password);
  return hashed === hashedPassword;
};
