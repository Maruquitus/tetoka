import { checkAdmin } from "../utils/functions";
import { Request, Response, NextFunction } from "express";

export const requireAdminToken = (req: Request, res: Response, next: NextFunction) => {
  const auth_token = req.headers["authorization"];
  if (!auth_token)
    return res
      .status(400)
      .send("Insira o token de administrador para realizar essa ação!");

  const isAdmin = checkAdmin(auth_token);
  if (!isAdmin) return res.sendStatus(401);
  next();
};
