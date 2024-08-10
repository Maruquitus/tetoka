import { Icon } from "./Icon";
import { ProgressBar } from "./ProgressBar";
export function Post(props: {
  title: string;
  content: string;
  _id: string;
  icon: string;
  status?: "finished" | "seen";
  progress?: number;
}) {
  return (
    <div
      onClick={() => (document.location.href = `/post/${props._id}`)}
      className="bg-primary dark:bg-primary-dark h-fit hover:scale-[98%] duration-300 transition-transform cursor-pointer rounded-lg p-6"
    >
      <div className="flex">
        <Icon className="mr-2 my-auto" whiteBackground icon={props.icon} />
        <h1 className="text-white my-auto text-lg sm:text-xl font-medium">
          {props.title}
        </h1>
        {props.status === "finished" && (
          <Icon
            noBackground
            icon="circle-check"
            size="xl"
            className="text-white my-auto ml-auto h-6 w-6 -mt-2 -mr-3"
          />
        )}
        {props.status === "seen" && (
          <Icon
            noBackground
            icon="check-double"
            size="xl"
            className="text-white my-auto ml-auto h-6 w-6 -mt-2 -mr-3"
          />
        )}
      </div>
      <p className="text-white text-sm sm:text-base line-clamp-2 sm:line-clamp-3 mt-2">
        {props.content}
      </p>
      {props.progress !== undefined && props.progress > 0 && (
        <ProgressBar small progress={props.progress * 100} />
      )}
    </div>
  );
}
