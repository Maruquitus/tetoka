"use client";
import { ReactNode } from "react";

export function Highlight(props: {
  children: ReactNode;
  onClick?: Function;
  selectable?: boolean;
}) {
  return (
    <span
      onClick={() => props.onClick?.()}
      className={`text-primary inline-flex font-medium max-w-[100%] ${
        props.selectable && "select-text"
      } ${
        props.onClick !== undefined &&
        "cursor-pointer duration-300 transition-transform hover:scale-[101%]"
      }`}
    >
      {props.children}
    </span>
  );
}
