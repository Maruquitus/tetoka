import { Request, Response, Router } from "express";
import {
  newPost,
  deletePost,
  getPost,
  clearPosts,
  listPosts,
  queryPostsByTags,
} from "../controllers/PostController";
import { requireAdminToken } from "../middleware/AdminAuthMiddleware";
const router = Router();

router.put("/", requireAdminToken, (req: Request, res: Response) =>
  newPost(req, res)
);
router.delete("/:postid", requireAdminToken, (req: Request, res: Response) =>
  deletePost(req, res)
);
router.delete("/", requireAdminToken, (req: Request, res: Response) =>
  clearPosts(req, res)
);
router.get("/tags", (req: Request, res: Response) =>
  queryPostsByTags(req, res)
);
router.get("/:postid", (req: Request, res: Response) => getPost(req, res));
router.get("/", (req: Request, res: Response) => listPosts(req, res));

export default router;
