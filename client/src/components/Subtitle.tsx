import { ReactNode } from "react";

export function Subtitle(props: {
  children: ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <h1
      className={`text-dark dark:text-light text-xl ${props.className} ${
        props.centered && "text-center"
      }`}
    >
      {props.children}
    </h1>
  );
}
