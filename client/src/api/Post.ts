import { Post } from "@/interfaces";

export async function get(id: string) {
  const res = await fetch(`/api/posts/${id}`);
  if (res.status === 200) return (await res.json()) as Post;
  else return null;
}

export async function getByTags(tags: string[], page: number) {
  const query = new URLSearchParams();
  tags.forEach((tag) => query.append("tags", tag));

  const res = await fetch(`/api/posts/tags/page/${page}?${query.toString()}`);

  if (res.status === 200) {
    return (await res.json()) as Post[];
  } else {
    return null;
  }
}

export async function list(page: number, finishedPosts: string[]) {
  const query = {
    finishedPosts: JSON.stringify(finishedPosts),
  };

  const queryString = new URLSearchParams(query).toString();

  const res = await fetch(`/api/posts/page/${page}?${queryString}`);

  if (res.status === 200) {
    return (await res.json()) as Post[];
  } else {
    return null;
  }
}
