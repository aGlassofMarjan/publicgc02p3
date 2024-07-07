import bcryptjs from "bcryptjs";

export const hashText = (text: string): string => {
  return bcryptjs.hashSync(text);
};
export const compareTextWithHash = (text: string, hash: string) => {
  return bcryptjs.compareSync(text, hash);
};
