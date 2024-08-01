import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { findIconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export function Icon(props: {
  icon: string;
  whiteBackground?: boolean;
  className?: string;
}) {
  return (
    <FontAwesomeIcon
      className={`h-4 w-4 bg-primary dark:bg-primary-dark rounded-full p-2 ${
        props.whiteBackground
          ? "text-dark bg-white dark:bg-white"
          : "text-white"
      } ${props.className}`}
      icon={
        findIconDefinition({
          prefix: "fas",
          iconName: props.icon as any,
        })
          ? (props.icon as IconProp)
          : "question"
      }
    />
  );
}
