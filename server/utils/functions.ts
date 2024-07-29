import { pbkdf2 } from "crypto";
import { Request } from "express";

const SALT = process.env.SALT as string;

export function checkAdmin(token: string) {
  return token === process.env.ADMIN_TOKEN;
}

export function checkBrowser(req: Request) {
  return req.headers.accept && req.headers.accept.includes("text/html");
}

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
