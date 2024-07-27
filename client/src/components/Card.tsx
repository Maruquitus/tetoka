"use client";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function Card(props: { icon: IconProp | string; label: string }) {
  const [selected, setSelected] = useState(false);
  return (
    <div className="w-fit">
      <div
        onClick={() => setSelected(!selected)}
        className={`mx-auto bg-foreground dark:bg-foreground-dark hover:scale-[102%] duration-300 transition-all cursor-pointer p-5 flex align-middle rounded-lg w-32 h-32 sm:w-48 sm:h-48 group ${
          selected && "bg-primary dark:bg-primary-dark"
        }`}
      >
        {typeof props.icon !== "string" ? (
          <FontAwesomeIcon
            className={`m-auto text-6xl transition-all duration-[125ms] sm:text-7xl text-gray-800 dark:text-white group-hover:scale-[102%] ${
              selected && "text-white"
            }`}
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
