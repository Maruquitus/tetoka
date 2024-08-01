import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function TabLink(props: {
  icon: IconDefinition;
  title: string;
  onClick?: Function;
  target?: string;
}) {
  const onClick = props.target
    ? () => {
        document.location.href = `/${props.target}`;
      }
    : props.onClick;
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        typeof onClick === "function" && onClick();
      }}
    >
      <li className="font-medium text-white text-xl my-4">
        <FontAwesomeIcon icon={props.icon} color="white" /> {props.title}
      </li>
      <hr className="mr-5" />
    </div>
  );
}
