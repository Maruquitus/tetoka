export interface AuthenticatedUser {
  _id: string;
  username: string;
  lastViewedPost: string;
}

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
