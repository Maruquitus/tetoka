export function Post(props: { title: string; content: string }) {
  return (
    <div className="bg-primary dark:bg-primary-dark sm:w-full h-40 rounded-lg p-6">
      <h1 className="text-white text-lg sm:text-xl font-medium">
        {props.title}
      </h1>
      <p className="text-white text-sm sm:text-base line-clamp-2 sm:line-clamp-3 mt-2">
        {props.content}
      </p>
    </div>
  );
}
