export function Filters(props: {
  selectedFilter: string;
  handleFilterChange: Function;
}) {
  const types: { [keys: string]: string } = {
    all: "Todos",
    unseen: "Novos",
    "in-progress": "Em progresso",
    finished: "Concluídos",
  };
  const defaultFilterClassName =
    "h-8 min-w-20 px-3 mr-2 sm:mr-0 rounded-lg font-semibold text-sm text-white hover:scale-[102%] duration-300 transition-transform";
  const activeClassname = "bg-primary dark:bg-primary-dark";
  const inactiveClassname = "bg-primary-dark dark:bg-primary-dark/60";
  return (
    <div className="ml-auto flex flex-wrap justify-end gap-y-2 sm:space-x-2 sm:flex sm:mr-5">
      {Object.keys(types).map((type: string) => (
        <button
          onClick={() => props.handleFilterChange(type)}
          className={`${defaultFilterClassName} ${
            props.selectedFilter === type ? activeClassname : inactiveClassname
          }`}
        >
          {types[type]}
        </button>
      ))}
    </div>
  );
}
