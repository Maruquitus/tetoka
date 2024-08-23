import { Response, Request } from "express";
import {
  clear,
  create,
  deleteByID,
  getByID,
  setLastViewedPost,
  setPostProgress,
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

  if (userID.length < 24 || postID.length < 24) return res.sendStatus(400);
  await setLastViewedPost(new ObjectId(userID), new ObjectId(postID));
  return res.status(200).send("Post visto com sucesso!");
};

export const setUserPostProgress = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userID = req.user._id;
  const postID = req.params.postid;
  const stepsCompleted = parseInt(req.params.stepscompleted);
  const totalSteps = parseInt(req.params.totalsteps);

  if (
    userID.length < 24 ||
    postID.length < 24 ||
    isNaN(stepsCompleted) ||
    isNaN(totalSteps)
  )
    return res.sendStatus(400);
  await setPostProgress(
    new ObjectId(userID),
    new ObjectId(postID),
    stepsCompleted,
    totalSteps
  );
  return res.status(200).send("Progress definido com sucesso!");
};

export const newUser = async (req: Request, res: Response) => {
  let result;
  const isBrowser = checkBrowser(req);

  if (!req.body.username) result = Error("Insira um nome de usuário.");

  if (req.body.confirmPassword !== req.body.password)
    result = Error("Confirmação de senha incorreta. Tente novamente.");

  if (req.body.password.length < 8)
    result = Error("Senha muito curta! Mínimo de 8 caracteres.");

  const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
  if (emailRegex.test(req.body.email))
    result = Error("Insira um email válido!");

  if (req.body.interests.length === 0)
    result = Error("Selecione ao menos um interesse!");

  if (!result)
    result = await create(
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.interests
    );

  if (result instanceof Error) {
    if (isBrowser) res.redirect(`/signup?error=${result.message}`);
    else res.status(400).send(result.message);
  } else {
    if (isBrowser) res.redirect("/login");
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
