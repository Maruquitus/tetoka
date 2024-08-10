"use client";
import { useEffect, useRef } from "react";

export function ProgressBar(props: { progress: number; small?: boolean }) {
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (progressRef.current)
      progressRef.current.style.width = props.progress + "%";
  });

  return (
    <div>
      <div
        className={`mt-2 ${
          props.small
            ? "h-3 border border-white"
            : "h-4 bg-foreground dark:bg-foreground-dark"
        } w-full rounded-full overflow-hidden`}
      >
        <div
          ref={progressRef}
          id="progress"
          className={`w-0 ${
            props.small ? "h-3 bg-white" : "bg-primary dark:bg-primary-dark"
          }   transition-transform duration-200 flex h-4`}
        />
      </div>
      <h1
        className={`${
          props.small
            ? "text-white text-sm -mb-3"
            : "dark:text-light text-dark font-medium"
        } text-right`}
      >
        {props.progress}%
      </h1>
    </div>
  );
}
