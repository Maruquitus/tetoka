import { ReactNode } from "react";
import { Loader } from "./Loader";

export function LoadDependent(props: {
  children: ReactNode;
  isLoading: boolean;
}) {
  if (props.isLoading) return <Loader isLoading={props.isLoading} />;
  return props.children;
}
