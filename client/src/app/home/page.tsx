"use client";
import { ProgressBar } from "@/components/ProgressBar";
import { Title } from "@/components/Title";
import { useEffect, useState, useRef } from "react";
import { Highlight } from "@/components/Highlight";
import { AuthenticatedUser, Post, PostFilters } from "../../interfaces";
import { Post as PostComponent } from "@/components/Post";
import { get, list } from "@/api/Post";
import { LoadDependent } from "@/components/LoadDependent";
import { checkAuthenticated } from "@/api/Auth";
import { Filters } from "@/components/Filters";
import { PostPlaceholder } from "@/components/PostPlaceholder";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentPage, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setFilter] = useState<PostFilters>("all");
  const [lastViewedPost, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<AuthenticatedUser | undefined>();

  const handleFilterChange = (filter: PostFilters) => {
    setPostsLoading(true);
    setPage(1);
    setFilter(filter);
    setPosts([]);
    setTimeout(() => loadPosts(filter, 1, true), 250);
  };

  const loadPosts = async (
    filter?: PostFilters,
    page?: number,
    resetPosts?: boolean
  ) => {
    const usrPostData = user?.postData ? user.postData : {};
    filter = filter ? filter : selectedFilter;
    page = page ? page : currentPage;

    setPage(currentPage + 1);
    await list(page, usrPostData, filter).then((newPosts: Post[] | null) => {
      if (newPosts) {
        if (resetPosts) setPosts(newPosts);
        else setPosts(posts.concat(newPosts));
      }
    });
    setPostsLoading(false);
  };

  const loadData = async () => {
    checkAuthenticated().then(async (data) => {
      const [isAuthenticated, user] = data;
      setUser(user);
      if (!isAuthenticated) document.location.href = "/login";
      const post = await get(user.lastViewedPost);

      if (user.postData && user.postData[user.lastViewedPost])
        setProgress(user.postData[user.lastViewedPost] * 100);
      setLoading(false);
      setPost(post);
      await loadPosts();
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

      return () => {
        if (node.current) {
          node.current.removeEventListener("scroll", handleScroll);
        }
      };
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
          {lastViewedPost ? (
            <div>
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
            </div>
          ) : (
            <span className="font-medium w-fit whitespace-nowrap mr-1.5">
              Selecione um post para começar a acompanhar seu{" "}
              <Highlight>progresso</Highlight>.
            </span>
          )}
        </Title>
        {lastViewedPost && <ProgressBar progress={progress} />}

        <Title className="flex" top-margin>
          Seu feed
          <Filters
            selectedFilter={selectedFilter}
            handleFilterChange={handleFilterChange}
          />
        </Title>
        <div
          ref={node as any}
          className="grid grid-cols-1 mt-2 items-stretch md:grid-cols-2 rounded-lg pb-10 sm:h-[21rem] overflow-x-hidden overflow-y-scroll gap-3 pr-1"
        >
          {!postsLoading &&
            posts.length > 0 &&
            posts.map((post) => {
              let status;
              if (user && user.postData) {
                if (user.postData[post._id] == 1) status = "finished";
                if (user.postData[post._id] < 1) status = "seen";
              }
              return (
                <PostComponent
                  status={status as "finished" | "seen" | undefined}
                  _id={post._id}
                  title={post.title}
                  content={post.content}
                  icon={post.icon}
                />
              );
            })}
          {postsLoading && (
            <>
              <PostPlaceholder />
              <PostPlaceholder />
              <PostPlaceholder />
              <PostPlaceholder />
            </>
          )}

          {posts.length === 0 && !postsLoading && (
            <h1 className="text-dark dark:text-light">
              Nenhum post por enquanto.
            </h1>
          )}
        </div>
      </main>
    </LoadDependent>
  );
}
