import { pbkdf2 } from "crypto";

const SALT = process.env.SALT as string;

export function validateUser(usuário: string): boolean {
  const regex = /^[a-zA-Z0-9_]+$/;
  return regex.test(usuário);
}

export function validatePassword(senha: string): boolean {
  const regex = /\s/;
  return !regex.test(senha);
}

export function hashPassword(password: string) {
  return new Promise((resolve, reject) => {
    pbkdf2(password, SALT, 310000, 32, "sha256", (err, hash) => {
      if (err) return reject(err);
      resolve(hash.toString("hex"));
    });
  });
}
