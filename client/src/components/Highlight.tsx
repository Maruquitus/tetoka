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
      className={`text-primary font-medium max-w-3/5 truncate ${
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
