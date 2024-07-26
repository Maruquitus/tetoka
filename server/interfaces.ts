import { ObjectId } from "mongodb";
export interface AuthenticatedUser {
  id: ObjectId;
  username: string;
}
