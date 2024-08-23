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
  filter?: string,
  userInterests?: string[]
) {
  let matchStage = {};
  let filteredPostIDs: ObjectId[] = [];

  if (userPostData && filter) {
    if (filter === "all") {
      matchStage = {};
    }

    if (["unseen", "seen"].includes(filter)) {
      Object.keys(userPostData).forEach((post_id: string) => {
        const postProgress = userPostData[post_id];
        if (postProgress >= 0) filteredPostIDs.push(new ObjectId(post_id));
      });

      if (filter === "unseen") matchStage = { _id: { $nin: filteredPostIDs } };
      if (filter === "seen") matchStage = { _id: { $in: filteredPostIDs } };
    }

    if (filter === "in-progress") {
      Object.keys(userPostData).forEach((post_id: string) => {
        const postProgress = userPostData[post_id];
        if (postProgress < 1 && postProgress > 0)
          filteredPostIDs.push(new ObjectId(post_id));
      });

      matchStage = { _id: { $in: filteredPostIDs } };
    }

    if (filter === "finished") {
      Object.keys(userPostData).forEach((post_id: string) => {
        const postProgress = userPostData[post_id];
        if (postProgress === 1) filteredPostIDs.push(new ObjectId(post_id));
      });

      matchStage = { _id: { $in: filteredPostIDs } };
    }
  }

  const pipeline: any[] = [
    { $match: matchStage },
    {
      $addFields: {
        matchScore: {
          $size: { $setIntersection: ["$tags", userInterests || []] },
        },
      },
    },
    { $sort: { matchScore: -1, _id: 1 } },
  ];

  if (pageNumber !== undefined) {
    pipeline.push(
      { $skip: (pageNumber - 1) * postsPerPage },
      { $limit: postsPerPage }
    );
  }

  return await posts.aggregate(pipeline).toArray();
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
