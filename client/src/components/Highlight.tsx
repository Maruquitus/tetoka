"use client";
import { ReactNode } from "react";

export function Highlight(props: { children: ReactNode; onClick?: Function, selectable?: boolean }) {
  return (
    <div
      onClick={() => props.onClick?.()}
      className={`text-primary font-medium inline-flex ${
        props.selectable && "select-text"
      } ${
        props.onClick !== undefined &&
        "cursor-pointer duration-300 transition-all hover:scale-[102%]"
      }`}
    >
      {props.children}
    </div>
  );
}
