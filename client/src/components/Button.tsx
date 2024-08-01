"use client";
export function Button(props: {
  className?: string;
  title: string;
  type?: "default" | "white" | "hollow";
  onClick?: Function;
}) {
  const defaultClass =
    "h-10 w-28 my-auto hover:scale-[102%] duration-300 transition-all rounded-lg p-2 text-white";
  const selectedType = props.type ? props.type : "default";
  const typeClasses = {
    default: "bg-primary dark:bg-primary-dark",
    hollow: "border border-white",
    white: "bg-white",
  };

  const buttonClass = `${defaultClass} ${typeClasses[selectedType]} ${props.className}`;

  return (
    <button onClick={() => props.onClick?.()} className={buttonClass}>
      <span
        className={`font-medium m-auto text-center ${
          selectedType === "white" && "text-black"
        }`}
      >
        {props.title}
      </span>
    </button>
  );
}
