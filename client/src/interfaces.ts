export interface AuthenticatedUser {
  _id: string;
  username: string;
  lastViewedPost: string;
  postData?: UserPostData;
  interests: string[];
}

export interface UserPostData {
  [keys: string]: number;
}

export type PostFilters = "all" | "unseen" | "in-progress" | "finished";

export interface Post {
  _id: string;
  title: string;
  content: string;
  icon: string;
  steps?: PostStep[];
}

export interface PostStep {
  title: string;
  content: string;
  icon: string;
}
