import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function TabLink(props: { icon: IconDefinition; title: string }) {
  return (
    <div>
      <li className="font-medium text-white text-xl my-4">
        <FontAwesomeIcon icon={props.icon} color="white" /> {props.title}
      </li>
      <hr className="mr-5" />
    </div>
  );
}
