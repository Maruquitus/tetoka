import { PostStep } from "../interfaces";
import { posts } from "../config/db";
import { ObjectId } from "mongodb";
export async function create(
  title: string,
  icon: string,
  content?: string,
  steps?: PostStep[]
) {
  await posts.insertOne({
    title: title,
    icon: icon,
    content: content,
    steps: steps,
  });
}

export async function getByID(_id: ObjectId) {
  return await posts.findOne({ _id: _id });
}

export async function deleteByID(_id: ObjectId) {
  return await posts.deleteOne({ _id: _id });
}

export async function clear() {
  return await posts.deleteMany({});
}
