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
import Empty from "../../../public/Empty.svg";
import Image from "next/image";

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
    setTimeout(() => loadPosts({ filter, page: 1, resetPosts: true }), 250);
  };

  const loadPosts = async ({
    filter,
    page,
    resetPosts,
    userInterests,
  }: {
    filter?: PostFilters;
    page?: number;
    resetPosts?: boolean;
    userInterests?: string[];
  } = {}) => {
    const usrPostData = user?.postData ? user.postData : {};
    const usrInterests = userInterests || user?.interests || [];
    filter = filter || selectedFilter;
    page = page || currentPage;

    setPage(currentPage + 1);
    await list(page, usrPostData, filter, usrInterests).then(
      (newPosts: Post[] | null) => {
        if (newPosts) {
          if (resetPosts) setPosts(newPosts);
          else setPosts((prevPosts) => prevPosts.concat(newPosts));
        }
      }
    );
    setPostsLoading(false);
  };

  const loadData = async () => {
    const [isAuthenticated, user] = await checkAuthenticated();
    setUser(user);
    if (!isAuthenticated) {
      document.location.href = "/login";
      return;
    }
    if (user.lastViewedPost) {
      const post = await get(user.lastViewedPost);
      if (user.postData && user.postData[user.lastViewedPost]) {
        setProgress(user.postData[user.lastViewedPost] * 100);
      }
      setPost(post);
    }
    setLoading(false);
    await loadPosts({ userInterests: user.interests, resetPosts: true });
  };

  // Scroll e loading infinito
  const node = useRef() as any;
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = node.current;
    if (scrollTop + clientHeight === scrollHeight) {
      loadPosts();
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
            <span className="font-medium w-fit break-words mr-1.5 -mb-6 sm:-mb-4">
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
          <select
            className="sm:hidden rounded-lg text-white bg-primary dark:bg-primary-dark text-sm p-2 outline-none"
            value={selectedFilter}
            onChange={(e) =>
              handleFilterChange(e.currentTarget.value as PostFilters)
            }
          >
            <option value="all">Todos</option>
            <option value="unseen">Novos</option>
            <option value="in-progress">Em progresso</option>
            <option value="finished">Concluídos</option>
          </select>
        </Title>
        <div
          ref={node as any}
          className="grid grid-cols-1 mt-2 items-stretch md:grid-cols-2 rounded-lg pb-10 sm:h-[21rem] overflow-x-hidden overflow-y-scroll gap-3 pr-1"
        >
          {!postsLoading &&
            posts.length > 0 &&
            posts.map((post) => {
              let status;
              let progress;
              if (user && user.postData) {
                if (user.postData[post._id] == 1) status = "finished";
                if (user.postData[post._id] < 1) status = "seen";
                progress = user.postData[post._id];
              }
              return (
                <PostComponent
                  key={post._id}
                  status={status as "finished" | "seen" | undefined}
                  _id={post._id}
                  title={post.title}
                  content={post.content}
                  icon={post.icon}
                  progress={progress}
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
            <div className="overflow-hidden">
              <h1 className="text-dark dark:text-light">
                Nenhum post por enquanto.
              </h1>
              <Image className="sm:w-[60%] mx-auto" src={Empty} alt="" />
            </div>
          )}
        </div>
      </main>
    </LoadDependent>
  );
}
