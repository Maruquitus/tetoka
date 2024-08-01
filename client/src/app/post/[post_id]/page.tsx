"use client";
import { useState, useEffect } from "react";
import { get } from "@/api/Post";
import { Post } from "@/interfaces";
import { LoadDependent } from "@/components/LoadDependent";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { Subtitle } from "@/components/Subtitle";
import { Highlight } from "@/components/Highlight";
import { Icon } from "@/components/Icon";

export default function PostPage(props: { params: { post_id: string } }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    get(props.params.post_id).then((postData: Post | null) => {
      setLoading(false);
      if (postData) setPost(postData);
    });
  }, []);

  return (
    <LoadDependent isLoading={loading}>
      <main className="mx-auto w-4/5 mt-10">
        {post && (
          <div className="dark:text-white">
            <div className="flex">
              <Icon className="mr-2" icon={post?.icon} />
              <Title>{post?.title}</Title>
            </div>
            <p className="mt-2">{post?.content}</p>
          </div>
        )}
        {!post && (
          <main>
            <Title>O post não foi encontrado.</Title>
            <Subtitle>
              Código identificador:{" "}
              <Highlight selectable>{props.params.post_id}</Highlight>
            </Subtitle>
            <Button
              onClick={() => (document.location.href = "/home")}
              title="Voltar para home"
              className="w-fit mt-2"
            />
          </main>
        )}
      </main>
    </LoadDependent>
  );
}
