import { ReactNode } from "react";

export function Title(props: { children: ReactNode; centered?: boolean }) {
  return (
    <h1
      className={`text-gray-800 dark:text-white font-medium mt-10 text-2xl ${
        props.centered && "text-center"
      }`}
    >
      {props.children}
    </h1>
  );
}
