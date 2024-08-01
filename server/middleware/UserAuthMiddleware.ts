import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../interfaces";

export const requireAuthenticatedUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) return res.status(401);
  next();
};
