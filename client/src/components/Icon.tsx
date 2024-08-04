import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas, far);

export function Icon(props: {
  icon: string;
  regular?: boolean;
  whiteBackground?: boolean;
  noBackground?: boolean;
  className?: string;
  size?: SizeProp;
  onClick?: Function;
}) {
  const iconName = props.icon as any;
  const iconPrefix = props.regular ? "far" : "fas";
  const icon: IconProp = [iconPrefix, iconName];
  return (
    <FontAwesomeIcon
      onClick={() => props.onClick?.()}
      size={props.size}
      className={`h-4 w-4 transition-transform ${
        props.onClick && "hover:scale-[102%] cursor-pointer"
      } duration-300 ${
        !props.noBackground && "bg-primary dark:bg-primary-dark p-2"
      } rounded-full ${
        !props.noBackground &&
        (props.whiteBackground
          ? "text-dark bg-white dark:bg-white"
          : "text-white")
      } ${props.noBackground && "text-primary dark:text"} ${props.className}`}
      icon={icon}
    />
  );
}
