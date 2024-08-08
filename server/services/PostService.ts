import { PostStep, UserPostData } from "../interfaces";
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
export async function list(
  userPostData?: UserPostData,
  pageNumber?: number,
  filter?: string
) {
  let postData;
  let filteredPostIDs: ObjectId[] = [];

  if (pageNumber !== undefined) {
    if (userPostData && filter) {
      if (filter === "all") {
        postData = await posts.find({});
      }

      if (["unseen", "seen"].includes(filter)) {
        Object.keys(userPostData).forEach((post_id: string) => {
          const postProgress = userPostData[post_id];
          if (postProgress >= 0) filteredPostIDs.push(new ObjectId(post_id));
        });

        if (filter === "unseen")
          postData = await posts.find({ _id: { $nin: filteredPostIDs } });
        if (filter === "seen")
          postData = await posts.find({ _id: { $in: filteredPostIDs } });
      }

      if (filter === "in-progress") {
        Object.keys(userPostData).forEach((post_id: string) => {
          const postProgress = userPostData[post_id];
          if (postProgress < 1 && postProgress > 0) filteredPostIDs.push(new ObjectId(post_id));
        });

        postData = await posts.find({ _id: { $in: filteredPostIDs } });
      }

      if (filter === "finished") {
        Object.keys(userPostData).forEach((post_id: string) => {
          const postProgress = userPostData[post_id];
          if (postProgress === 1) filteredPostIDs.push(new ObjectId(post_id));
        });

        postData = await posts.find({ _id: { $in: filteredPostIDs } });
      }
    }

    if (postData)
      return postData
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
