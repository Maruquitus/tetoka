"use client";
import { useEffect, useRef, useState } from "react";

export function ProgressBar(props: { progress: number }) {
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (progressRef.current)
      progressRef.current.style.width = props.progress + "%";
  });

  return (
    <div className="bg-foreground dark:bg-foreground-dark mt-2 h-4 w-full rounded-full overflow-hidden">
      <div
        ref={progressRef}
        id="progress"
        className={`bg-primary dark:bg-primary-dark transition-all duration-200 flex h-4`}
      ></div>
    </div>
  );
}
