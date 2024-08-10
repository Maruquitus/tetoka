"use client";
import SkeletonLoading from "react-loading-skeleton";
export function Skeleton(props: { loading: boolean; className: string }) {
  if (!props.loading) return null;
  return (
    <SkeletonLoading
      baseColor="rgba(60, 185, 180, 0.5)"
      highlightColor="rgba(121, 201, 198, 0.5)"
      containerClassName="ml-auto w-[20rem] my-auto hidden sm:flex"
      className={`h-11 w-12 hidden sm:flex ${props.className}`}
    />
  );
}
