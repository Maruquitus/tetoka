import SkeletonLoading from "react-loading-skeleton";
export function Skeleton(props: { loading: boolean }) {
  if (!props.loading) return null;
  return (
    <SkeletonLoading
      baseColor="rgb(96 165 250)"
      highlightColor="rgb(147 197 253)"
      containerClassName="ml-auto w-60 my-auto -mt-2 -mb-2 flex"
      className="h-12 w-12 "
    />
  );
}
