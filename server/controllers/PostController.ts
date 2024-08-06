import { Request, Response } from "express";
import {
  create,
  getByID,
  deleteByID,
  clear,
  list,
  getByTags,
} from "../services/PostService";
import { ObjectId } from "mongodb";

export const newPost = async (req: Request, res: Response) => {
  const [title, icon, content, steps, tags] = [
    req.body.title,
    req.body.icon,
    req.body.content,
    req.body.steps,
    req.body.tags,
  ];
  if (!title || !icon || !tags || !content) return res.sendStatus(400);
  await create(title, icon, tags, content, steps);
  return res.status(200).send("Post criado com sucesso!");
};

export const getPost = async (req: Request, res: Response) => {
  const postID = req.params.postid;
  if (postID.length !== 24) return res.sendStatus(400);

  const postData = await getByID(new ObjectId(postID));
  if (!postData) return res.sendStatus(404);
  return res.status(200).send(postData);
};

export const deletePost = async (req: Request, res: Response) => {
  const postID = req.params.postid;
  if (postID.length !== 24) return res.sendStatus(400);

  const deleteResult = await deleteByID(new ObjectId(postID));
  if (deleteResult.deletedCount === 0) return res.sendStatus(404);
  return res.status(200).send(deleteResult);
};

export const clearPosts = async (req: Request, res: Response) => {
  const deleteResult = await clear();
  if (deleteResult.deletedCount === 0) return res.sendStatus(404);
  return res.status(200).send(deleteResult);
};

export const listPosts = async (req: Request, res: Response) => {
  const finishedPosts = req.body.finishedPosts;
  let finishedPostIDs: ObjectId[] = [];
  finishedPosts.forEach((postId: string) => {
    finishedPostIDs.push(new ObjectId(postId));
  });
  return res.status(200).send(await list(finishedPostIDs));
};

export const loadPosts = async (req: Request, res: Response) => {
  const finishedPosts = req.query.finishedPosts
    ? JSON.parse(req.query.finishedPosts as string)
    : [];
  let finishedPostIDs: ObjectId[] = [];
  finishedPosts.forEach((postId: string) => {
    finishedPostIDs.push(new ObjectId(postId));
  });
  const pageNumber = parseInt(req.params.pagenumber);
  if (isNaN(pageNumber) || pageNumber <= 0) return res.sendStatus(400);

  return res.status(200).send(await list(finishedPostIDs, pageNumber));
};

export const loadPostsByTags = async (req: Request, res: Response) => {
  const pageNumber = parseInt(req.params.pagenumber);
  const tags = req.query.tags as string[] | string;
  if (!tags || isNaN(pageNumber) || pageNumber <= 0) return res.sendStatus(400);

  const postsData = await getByTags(
    Array.isArray(tags) ? tags : [tags],
    pageNumber
  );
  if (!postsData || postsData.length === 0) return res.sendStatus(404);
  return res.status(200).send(postsData);
};

export const queryPostsByTags = async (req: Request, res: Response) => {
  const tags = req.query.tags as string[] | string;
  if (!tags) return res.sendStatus(400);

  const postsData = await getByTags(Array.isArray(tags) ? tags : [tags]);
  if (!postsData || postsData.length === 0) return res.sendStatus(404);
  return res.status(200).send(postsData);
};
