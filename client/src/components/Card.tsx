"use client";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Card(props: { icon: IconProp | string; label: string }) {
  return (
    <div className="w-fit">
      <div className="mx-auto bg-foreground dark:bg-foreground-dark hover:bg-primary dark:hover:bg-primary-dark duration-300 transition-colors cursor-pointer p-5 flex align-middle rounded-lg w-32 h-32 sm:w-48 sm:h-48 group">
        {typeof props.icon !== "string" ? (
          <FontAwesomeIcon
            className="m-auto text-6xl duration-[125ms] sm:text-7xl text-gray-800 dark:text-white group-hover:text-white"
            icon={props.icon}
          />
        ) : (
          <img src={props.icon} className="w-full h-full" />
        )}
      </div>
      <span className="block text-center break-words h-fit w-32 sm:w-52 mx-auto text-md sm:text-xl mt-1 dark:text-white text-black">
        {props.label}
      </span>
    </div>
  );
}
