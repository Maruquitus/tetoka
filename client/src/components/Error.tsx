import { ReactNode } from "react";

export function Error(props: { title: string }) {
  return (
    <h1 className="text-red-500 font-medium text-md text-center">
      {props.title}
    </h1>
  );
}
