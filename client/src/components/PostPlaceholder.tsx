import Skeleton from "react-loading-skeleton";
export function PostPlaceholder() {
  return (
    <div className="bg-primary dark:bg-primary-dark h-fit hover:scale-[98%] duration-300 transition-transform cursor-pointer rounded-lg p-6">
      <div className="flex">
        <div className="w-8 h-8 aspect-square bg-white rounded-full mr-3" />
        <Skeleton
          baseColor="rgba(60, 185, 180, 0.5)"
          highlightColor="rgba(121, 201, 198, 0.5)"
          containerClassName="w-4/5 inline-flex"
          className={`my-auto h-7`}
        />
      </div>
      <Skeleton
        count={3}
        baseColor="rgba(60, 185, 180, 0.5)"
        highlightColor="rgba(121, 201, 198, 0.5)"
        containerClassName="w-[20rem] my-auto"
        className={`h-4 w-12 flex mt-2`}
      />
    </div>
  );
}
