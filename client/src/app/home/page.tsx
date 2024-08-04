"use client";
import { ProgressBar } from "@/components/ProgressBar";
import { Title } from "@/components/Title";
import { useEffect, useState, useRef } from "react";
import { Highlight } from "@/components/Highlight";
import { Post } from "../../interfaces";
import { Post as PostComponent } from "@/components/Post";
import { get, list } from "@/api/Post";
import { LoadDependent } from "@/components/LoadDependent";
import { checkAuthenticated } from "@/api/Auth";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastViewedPost, setPost] = useState<Post | null>(null);

  const loadPosts = async () => {
    setPage(currentPage + 1);
    await list(currentPage).then((newPosts: Post[] | null) => {
      if (newPosts) setPosts(posts.concat(newPosts));
    });
  };

  const loadData = async () => {
    await loadPosts();
    checkAuthenticated().then(async (data) => {
      const [isAuthenticated, user] = data;
      if (!isAuthenticated) document.location.href = "/login";
      const post = await get(user.lastViewedPost);
      setPost(post);
      setLoading(false);
    });
  };

  // Scroll e loading infinito
  const node = useRef() as any;
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = node.current;
    if (scrollTop + clientHeight === scrollHeight) {
      loadPosts();
    } else {
    }
  };
  useEffect(() => {
    if (node.current) {
      node.current.addEventListener("scroll", handleScroll);
      return () => node.current.removeEventListener("scroll", handleScroll);
    }
  }, [node, handleScroll]);

  // Carregar dados iniciais
  useEffect(() => {
    loadData();
  }, []);

  return (
    <LoadDependent isLoading={loading}>
      <main className="w-4/5 mx-auto">
        <Title className="w-full flex sm:flex-row flex-col" top-margin>
          <span className="font-medium w-fit whitespace-nowrap mr-1.5">
            Progresso em
          </span>
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
        <div
          ref={node as any}
          className="grid grid-cols-1 mt-2 items-stretch md:grid-cols-2 rounded-lg pb-10 sm:h-80 overflow-x-hidden overflow-y-scroll gap-4 pr-1"
        >
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
