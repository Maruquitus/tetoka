import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { faDove } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  return (
    <div className="bg-primary dark:bg-primary-dark px-4 h-20 w-full top-0 left-0 flex">
      <div className="w-full h-full flex my-auto text-2xl">
        <FontAwesomeIcon className="my-auto" color="white" icon={faDove} />
        <h1 className="font-medium ml-2 my-auto">
          Te<span className="text-white font-medium">toka!</span>
        </h1>
      </div>
      <ThemeSwitcher />
    </div>
  );
}
