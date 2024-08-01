import { ReactNode } from "react";

export function Title(props: {
  children: ReactNode;
  centered?: boolean;
  "top-margin"?: boolean;
  className?: string;
}) {
  return (
    <h1
      className={`text-dark dark:text-light font-medium text-2xl ${
        props["top-margin"] && "mt-10"
      } ${props.className} ${props.centered && "text-center"}`}
    >
      {props.children}
    </h1>
  );
}
