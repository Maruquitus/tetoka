import { Request, Response } from "express";
import { create, getByID, deleteByID, clear } from "../services/PostService";
import { ObjectId } from "mongodb";

export const newPost = async (req: Request, res: Response) => {
  const [title, icon, content, steps] = [
    req.body.title,
    req.body.icon,
    req.body.content,
    req.body.steps,
  ];
  if (!title || !icon) return res.sendStatus(400);
  await create(title, icon, content, steps);
  return res.status(200).send("Post criado com sucesso!");
};

export const getPost = async (req: Request, res: Response) => {
  const postID = req.params.postid;
  if (!postID || postID.length !== 24) return res.sendStatus(400);

  const postData = await getByID(new ObjectId(postID));
  if (!postData) return res.sendStatus(404);
  return res.status(200).send(postData);
};

export const deletePost = async (req: Request, res: Response) => {
  const postID = req.params.postid;
  if (!postID || postID.length !== 24) return res.sendStatus(400);

  const deleteResult = await deleteByID(new ObjectId(postID));
  if (deleteResult.deletedCount === 0) return res.sendStatus(404);
  return res.status(200).send(deleteResult);
};

export const clearPosts = async (req: Request, res: Response) => {
  const deleteResult = await clear();
  if (deleteResult.deletedCount === 0) return res.sendStatus(404);
  return res.status(200).send(deleteResult);
};