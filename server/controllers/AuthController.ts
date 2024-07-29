import { NextFunction, Response } from "express";
import { AuthenticatedRequest, AuthenticatedUser } from "../interfaces";
import { getByID } from "../services/UserService";
import { checkAdmin, checkBrowser } from "../utils/functions";
import { ObjectId } from "mongodb";

const passport = require("passport");

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", (err: Error, user: any, info: any) => {
    const isBrowser = checkBrowser(req);
    if (user) {
      req.login(user, (err: Error) => {
        if (err) {
          if (isBrowser) return res.redirect(`/login?error=${err.message}`);
          else return res.status(401).send(err.message);
        } else {
          if (isBrowser) return res.redirect("/home");
          else return res.status(200).send("Login feito com sucesso!");
        }
      });
    } else {
      if (isBrowser) res.redirect(`/login?error=${info.message}`);
      else res.status(401).send(info.message);
    }
  })(req, res, next);
};

export const logOut = async (req: AuthenticatedRequest, res: Response) => {
  req.logOut((err: Error) => {
    if (err) res.status(500).send("Não foi possível sair");
    else {
      res.status(200).send("Saída feita com sucesso");
    }
  });
};

export const checkAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (req.user) {
    try {
      const userData = await getByID(new ObjectId(req.user._id));
      const filteredUserData = {
        _id: userData?._id,
        username: userData?.username,
      } as AuthenticatedUser;
      res.status(200).send([req.isAuthenticated(), filteredUserData]);
    } catch {
      res.sendStatus(500);
    }
  } else res.status(200).send([false, null]);
};
