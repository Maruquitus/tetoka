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
import { setLastViewedPost } from "@/api/User";
import { useState, useEffect, useRef } from "react";

export default function PostPage(props: { params: { post_id: string } }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [currentStep, setStep] = useState(1);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    get(props.params.post_id).then(async (postData: Post | null) => {
      if (postData) {
        if (post?.steps) await setLastViewedPost(postData._id);
        setPost(postData);
        setLoading(false);
      }
    });
  }, []);

  const handleStepChange = (stepNumber: number) => {
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
            <div className="gap-y-4">
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
