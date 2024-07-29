import { Router } from "express";
import {
  authenticate,
  checkAuthenticated,
  logOut,
} from "../controllers/AuthController";
import { AuthenticatedRequest } from "../interfaces";
const router = Router();

router.post("/authenticate", (req: AuthenticatedRequest, res: any, next: any) =>
  authenticate(req, res, next)
);
router.post("/logout", (req: AuthenticatedRequest, res: any) =>
  logOut(req, res)
);
router.get("/check", (req: AuthenticatedRequest, res: any) =>
  checkAuthenticated(req, res)
);

export default router;
