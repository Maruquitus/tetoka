export async function setLastViewedPost(postID: string) {
  await fetch(`/api/users/view-post/${postID}`, { method: "POST" });
}

export async function setPostProgress(
  postID: string,
  stepsCompleted: number,
  totalSteps: number
) {
  await fetch(
    `/api/users/set-post-progress/${postID}/${stepsCompleted}/${totalSteps}`,
    {
      method: "POST",
    }
  );
}
