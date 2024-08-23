"use client";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function Card(props: { handleInterestChange: Function, interests: string[], tag: string, icon: IconProp | string; label: string }) {
  const selected = props.interests.includes(props.tag);
  return (
    <div className="w-fit">
      <div
        onClick={(e) => {
          props.handleInterestChange(props.tag);
          e.stopPropagation();
        }}
        className={`mx-auto bg-foreground dark:bg-foreground-dark hover:scale-[102%] duration-300 transition-all cursor-pointer p-5 flex align-middle rounded-lg aspect-square sm:w-32 sm:h-32 md:w-48 md:h-48 group ${
          selected && "bg-primary dark:bg-primary-dark"
        }`}
      >
        {typeof props.icon !== "string" ? (
          <FontAwesomeIcon
            className={`m-auto text-3xl sm:text-5xl transition-all duration-[125ms] md:text-7xl text-dark dark:text-light group-hover:scale-[102%] ${
              selected && "text-white"
            }`}
            icon={props.icon}
          />
        ) : (
          <img src={props.icon} className="w-full h-full" />
        )}
      </div>
      <span className="block drop-shadow-md text-center break-words h-fit w-24 sm:w-32 md:w-52 mx-auto sm:text-md md:text-xl mt-1 dark:text-white text-black">
        {props.label}
      </span>
    </div>
  );
}
