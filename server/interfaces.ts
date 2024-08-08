import { ObjectId } from "mongodb";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  login: Function;
  logOut: Function;
  logout: Function;
  isAuthenticated: Function;
  user: { _id: string };
  files?: Express.Multer.File[];
}
export interface AuthenticatedUser {
  _id: ObjectId;
  username: string;
  lastViewedPost: string;
}

export interface UserPostData {
  [keys: string]: number;
}

export interface Post {
  _id: ObjectId,
  title: string,
  content: string,
  icon: string,
  steps?: PostStep[]
}

export interface PostStep {
  title: string,
  content: string,
  icon: string,
}