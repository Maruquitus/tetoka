import { PostStep } from "../interfaces";
import { posts } from "../config/db";
import { ObjectId } from "mongodb";
export async function create(
  title: string,
  icon: string,
  tags: string[],
  content: string,
  steps?: PostStep[]
) {
  await posts.insertOne({
    title: title,
    icon: icon,
    content: content,
    steps: steps,
    tags: tags,
  });
}

export async function getByID(_id: ObjectId) {
  return await posts.findOne({ _id: _id });
}

export async function list() {
  return await posts.find({}).toArray();
}

export async function getByTags(postTags: string[]) {
  return await posts.find({ tags: { $in: postTags } }).toArray();
}

export async function deleteByID(_id: ObjectId) {
  return await posts.deleteOne({ _id: _id });
}

export async function clear() {
  return await posts.deleteMany({});
}
