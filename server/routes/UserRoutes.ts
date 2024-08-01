import { Router } from "express";
import {
  newUser,
  getUser,
  deleteUser,
  clearUsers,
  setLastViewedPostByUser,
} from "../controllers/UserController";
import { requireAdminToken } from "../middleware/AdminAuthMiddleware";
import { AuthenticatedRequest } from "../interfaces";
import { requireAuthenticatedUser } from "../middleware/UserAuthMiddleware";

const router = Router();

router.post(
  "/view-post/:postid",
  (req: AuthenticatedRequest, res: any) => requireAuthenticatedUser,
  (req: AuthenticatedRequest, res: any) => setLastViewedPostByUser
);
router.put("/", (req, res) => newUser(req, res));
router.get("/:userid", requireAdminToken, (req, res) => getUser(req, res));
router.delete("/:userid", requireAdminToken, (req, res) =>
  deleteUser(req, res)
);
router.delete("/", requireAdminToken, (req, res) => clearUsers(req, res));

export default router;
