import { Router } from "express";
import {
  newUser,
  getUser,
  deleteUser,
  clearUsers,
  setLastViewedPostByUser,
  setUserPostProgress,
} from "../controllers/UserController";
import { requireAdminToken } from "../middleware/AdminAuthMiddleware";
import { AuthenticatedRequest } from "../interfaces";
import { requireAuthenticatedUser } from "../middleware/UserAuthMiddleware";

const router = Router();

router.post(
  "/set-post-progress/:postid/:stepscompleted/:totalsteps",
  (req: AuthenticatedRequest, res: any, next: any) =>
    requireAuthenticatedUser(req, res, next),
  (req: AuthenticatedRequest, res: any) => setUserPostProgress(req, res)
);
router.post(
  "/view-post/:postid",
  (req: AuthenticatedRequest, res: any, next: any) =>
    requireAuthenticatedUser(req, res, next),
  (req: AuthenticatedRequest, res: any) => setLastViewedPostByUser(req, res)
);
router.post("/", (req, res) => newUser(req, res));
router.get("/:userid", requireAdminToken, (req, res) => getUser(req, res));
router.delete("/:userid", requireAdminToken, (req, res) =>
  deleteUser(req, res)
);
router.delete("/", requireAdminToken, (req, res) => clearUsers(req, res));

export default router;
