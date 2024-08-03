"use client";
import { ProgressBar } from "@/components/ProgressBar";
import { Title } from "@/components/Title";
import { useEffect, useState } from "react";
import { Highlight } from "@/components/Highlight";
import { Post } from "../../interfaces";
import { Post as PostComponent } from "@/components/Post";
import { get, list } from "@/api/Post";
import { LoadDependent } from "@/components/LoadDependent";
import { checkAuthenticated } from "@/api/Auth";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastViewedPost, setPost] = useState<Post | null>(null);

  const loadData = async () => {
    await list().then((posts: Post[] | null) => {
      if (posts) setPosts(posts);
    });
    checkAuthenticated().then(async (data) => {
      const [isAuthenticated, user] = data;
      if (!isAuthenticated) document.location.href = "/login";

      const post = await get(user.lastViewedPost);
      setPost(post);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <LoadDependent isLoading={loading}>
      <main className="w-4/5 mx-auto">
        <Title className="w-full flex" top-margin>
          <span className="font-medium w-[12.5rem]">Progresso em </span>
          <Highlight
            onClick={() =>
              (document.location.href = `/post/${lastViewedPost?._id}`)
            }
          >
            {lastViewedPost?.title}
          </Highlight>
        </Title>
        <ProgressBar progress={progress} />

        <Title top-margin>Seu feed</Title>
        <div className="grid grid-cols-1 mt-2 items-stretch md:grid-cols-2 rounded-lg h-80 overflow-x-hidden gap-x-4 gap-y-2 pr-1">
          {posts.length > 0 &&
            posts.map((post) => (
              <PostComponent
                _id={post._id}
                title={post.title}
                content={post.content}
                icon={post.icon}
              />
            ))}
          {posts.length === 0 && (
            <h1 className="text-dark dark:text-light">
              Nenhum post por enquanto.
            </h1>
          )}
        </div>
      </main>
    </LoadDependent>
  );
}
