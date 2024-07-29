import { Request, Response, Router } from "express";
import {
  newPost,
  deletePost,
  getPost,
  clearPosts,
} from "../controllers/PostController";
import { authenticateAdmin } from "../middleware/AdminAuthMiddleware";
const router = Router();

router.put("/", authenticateAdmin, (req: Request, res: Response) =>
  newPost(req, res)
);
router.delete("/all", authenticateAdmin, (req: Request, res: Response) =>
  clearPosts(req, res)
);
router.delete("/:postid", authenticateAdmin, (req: Request, res: Response) =>
  deletePost(req, res)
);
router.get("/:postid", (req: Request, res: Response) => getPost(req, res));

export default router;
