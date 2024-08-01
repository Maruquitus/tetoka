import { Post } from "@/interfaces";

export async function get(id: string) {
  const res = await fetch(`/api/posts/${id}`);
  if (res.status === 200) return (await res.json()) as Post;
  else return null;
}

export async function getByTags(tags: string[]) {
  const query = new URLSearchParams();
  tags.forEach((tag) => query.append("tags", tag));

  const res = await fetch(`/api/posts/tags?${query.toString()}`);

  if (res.status === 200) {
    return (await res.json()) as Post[];
  } else {
    return null;
  }
}

export async function list() {
  const res = await fetch(`/api/posts/`);

  if (res.status === 200) {
    return (await res.json()) as Post[];
  } else {
    return null;
  }
}
