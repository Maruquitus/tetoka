import { Icon } from "./Icon";
export function Post(props: {
  title: string;
  content: string;
  _id: string;
  icon: string;
}) {
  return (
    <div
      onClick={() => (document.location.href = `/post/${props._id}`)}
      className="bg-primary dark:bg-primary-dark sm:w-full h-40 hover:scale-[98%] duration-300 transition-transform cursor-pointer rounded-lg p-6"
    >
      <div className="flex">
        <Icon className="mr-2" whiteBackground icon={props.icon} />
        <h1 className="text-white text-lg sm:text-xl font-medium">
          {props.title}
        </h1>
      </div>
      <p className="text-white text-sm sm:text-base line-clamp-2 sm:line-clamp-3 mt-2">
        {props.content}
      </p>
    </div>
  );
}
