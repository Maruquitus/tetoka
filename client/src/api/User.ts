export async function setLastViewedPost(postID: string) {
  await fetch(`/api/users/view-post/${postID}`, { method: "POST" });
}
