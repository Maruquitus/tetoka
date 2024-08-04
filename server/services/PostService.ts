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

const postsPerPage = 10;
export async function list(pageNumber?: number) {
  if (pageNumber !== undefined) {
    return await posts
      .find({})
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * postsPerPage)
      .limit(postsPerPage)
      .toArray();
  }
  return await posts.find({}).toArray();
}

export async function getByTags(postTags: string[], pageNumber?: number) {
  if (pageNumber !== undefined) {
    return await posts
      .find({ tags: { $in: postTags } })
      .sort({ _id: 1 })
      .skip((pageNumber - 1) * postsPerPage)
      .limit(postsPerPage)
      .toArray();
  }
  return await posts
    .find({ tags: { $in: postTags } })
    .sort({ _id: 1 })
    .toArray();
}

export async function deleteByID(_id: ObjectId) {
  return await posts.deleteOne({ _id: _id });
}

export async function clear() {
  return await posts.deleteMany({});
}
