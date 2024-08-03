import { Icon } from "./Icon";

export function Step(props: {
  title: string;
  content: string;
  icon: string;
  number: number;
}) {
  return (
    <div className="my-2">
      <div className="bg-foreground dark:bg-foreground-dark rounded-lg p-4">
        <div className="flex">
          <h1 className="text-dark p-1 pt-[0.3rem] text-white bg-primary rounded-full aspect-square w-8 h-8 text-center items-center text-md font-medium my-auto">
            {props.number}º
          </h1>
          <h1 className="text-primary font-medium text-xl my-auto ml-2">
            {props.title}
          </h1>
        </div>
        <p className="mt-2 text-dark dark:text-light">{props.content}</p>
        {/* <div className="w-full flex items-center">
          <Icon
            className="mx-auto sm:invisible sm:absolute visible text-4xl w-8 h-8"
            noBackground
            icon={props.icon}
          />
        </div> */}
      </div>
    </div>
  );
}
