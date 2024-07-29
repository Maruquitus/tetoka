import { Router } from "express";
import { newUser, getUser, deleteUser, clearUsers } from "../controllers/UserController";
import { authenticateAdmin } from "../middleware/AdminAuthMiddleware";

const router = Router();

router.put("/", (req, res) => newUser(req, res));
router.get("/:userid", authenticateAdmin, (req, res) => getUser(req, res));
router.delete("/all", authenticateAdmin, (req, res) =>
  clearUsers(req, res)
);
router.delete("/:userid", authenticateAdmin, (req, res) =>
  deleteUser(req, res)
);

export default router;
