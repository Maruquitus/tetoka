"use client";
import { get } from "@/api/Post";
import { Post } from "@/interfaces";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { Subtitle } from "@/components/Subtitle";
import { Highlight } from "@/components/Highlight";
import { LoadDependent } from "@/components/LoadDependent";
import { Icon } from "@/components/Icon";
import { Step } from "@/components/Step";
import { setLastViewedPost, setPostProgress } from "@/api/User";
import { checkAuthenticated } from "@/api/Auth";
import { useState, useEffect, useRef } from "react";

export default function PostPage(props: { params: { post_id: string } }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [currentStep, setStep] = useState(1);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const postId = props.params.post_id;
    get(postId).then(async (currentPostData: Post | null) => {
      const [_, user] = await checkAuthenticated();
      if (!user) {
        document.location.href = "/login";
        return;
      }
      if (currentPostData) {
        if (currentPostData.steps) {
          if (user.postData && user.postData[postId]) {
            setStep(user.postData[postId] * currentPostData.steps.length + 1);
          } else {
            await setPostProgress(
              props.params.post_id,
              0,
              currentPostData.steps.length
            );
          }
          await setLastViewedPost(postId);
        }
        setPost(currentPostData);
        setLoading(false);
      }
    });
  }, []);

  const handleStepChange = async (stepNumber: number) => {
    if (post?.steps)
      await setPostProgress(
        props.params.post_id,
        stepNumber - 1,
        post.steps.length
      );
    setStep(stepNumber);
    const stepRef = stepRefs.current[stepNumber - 1];
    if (stepRef) {
      stepRef.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <LoadDependent isLoading={loading}>
      <main className="mx-auto w-4/5 mt-10">
        {post && (
          <div className="dark:text-white">
            <div className="flex">
              <Icon className="mr-2" icon={post?.icon} />
              <Title>{post?.title}</Title>
            </div>
            <p className="text-dark dark:text-light mt-2 whitespace-pre-line">
              {post?.content}
            </p>
            <div className="gap-y-4 pb-6">
              {post.steps?.map((step, ind) => {
                return (
                  <div
                    key={ind}
                    ref={(ref: any) => (stepRefs.current[ind] = ref)}
                  >
                    <Step
                      setStep={handleStepChange}
                      currentStep={currentStep}
                      title={step.title}
                      content={step.content}
                      icon={step.icon}
                      number={ind + 1}
                    />
                  </div>
                );
              })}
            </div>
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
