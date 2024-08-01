import { Response, Request } from "express";
import {
  clear,
  create,
  deleteByID,
  getByID,
  setLastViewedPost,
} from "../services/UserService";
import { checkBrowser } from "../utils/functions";
import { ObjectId } from "mongodb";
import { AuthenticatedRequest } from "../interfaces";

export const setLastViewedPostByUser = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userID = req.user._id;
  const postID = req.params.postid;

  if (userID.length < 24 || postID.length < 24)
    return await setLastViewedPost(new ObjectId(userID), new ObjectId(postID));
};

export const newUser = async (req: Request, res: Response) => {
  let result;
  const isBrowser = checkBrowser(req);
  if (req.body.confirmPassword !== req.body.password)
    result = Error("Confirmação de senha incorreta. Tente novamente.");
  if (!result && req.body.password.length < 8)
    result = Error("Senha muito curta! Mínimo de 8 caracteres.");
  if (!result) result = await create(req.body.username, req.body.password);
  if (result instanceof Error) {
    if (isBrowser) res.redirect(`/signup?erro=${result.message}`);
    else res.status(400).send(result.message);
  } else {
    if (isBrowser) res.redirect("/home");
    else res.status(200).send("Usuário criado com sucesso!");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userID = req.params.userid;
  if (userID.length !== 24) return res.sendStatus(400);

  const deleteResult = await deleteByID(new ObjectId(userID));
  if (deleteResult.deletedCount === 0) return res.sendStatus(404);
  return res.status(200).send(deleteResult);
};

export const clearUsers = async (req: Request, res: Response) => {
  const deleteResult = await clear();
  if (deleteResult.deletedCount === 0) return res.sendStatus(404);
  return res.status(200).send(deleteResult);
};

export const getUser = async (req: Request, res: Response) => {
  const userID = req.params.userid;
  if (userID.length !== 24) return res.sendStatus(400);

  const userData = await getByID(new ObjectId(userID));
  if (userData) return res.json(userData);
  else return res.sendStatus(404);
};
