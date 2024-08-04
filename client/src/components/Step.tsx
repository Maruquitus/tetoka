import { Icon } from "./Icon";

export function Step(props: {
  title: string;
  content: string;
  icon: string;
  number: number;
  currentStep: number;
  setStep: Function;
}) {
  const done = props.currentStep > props.number;
  let icon = "lock";
  let open = false;
  if (props.number <= props.currentStep) {
    icon = "circle-check";
    open = true;
  }
  const isLastChecked = props.currentStep - 1 === props.number;
  const isCurrentStep = props.currentStep === props.number;
  const checkable = isLastChecked || isCurrentStep;

  return (
    <div className="my-2">
      <div
        className={`flex bg-primary dark:bg-primary-dark rounded-lg p-2 transition-all duration-300 ${
          open && "rounded-b-none"
        }`}
      >
        <h1 className="p-1 pt-[0.3rem] text-dark bg-white rounded-full aspect-square w-8 h-8 text-center items-center text-md font-medium my-auto">
          {props.number}º
        </h1>
        <h1 className="text-white font-medium text-lg my-auto ml-2 mr-2">
          {props.title}
        </h1>
        <Icon
          noBackground
          onClick={
            checkable
              ? () =>
                  props.setStep(props.currentStep + (isLastChecked ? -1 : 1))
              : undefined
          }
          regular={!done && icon === "circle-check"}
          icon={icon}
          className="ml-auto h-5 w-5 my-auto text-white "
          size={icon === "lock" ? "1x" : "2x"}
        />
      </div>
      <div
        className={`bg-foreground dark:bg-foreground-dark p-4 rounded-b-lg transition-all duration-300 overflow-hidden ${
          !open && "max-h-0 py-0 px-4"
        }`}
      >
        <p className="mt-2 text-dark dark:text-light transition-all">
          {props.content}
        </p>
      </div>
      {/* <div className="w-full flex items-center">
          <Icon
            className="mx-auto sm:invisible sm:absolute visible text-4xl w-8 h-8"
            noBackground
            icon={props.icon}
          />
        </div> */}
    </div>
  );
}
