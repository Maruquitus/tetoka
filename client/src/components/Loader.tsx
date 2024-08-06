export function Loader(props: { isLoading: boolean }) {
  return (
    <div className="bg-white text-center my-auto dark:bg-black fixed z-50 w-screen h-screen">
      <div className="loader mx-auto mt-52 mb-1 " />
      <span className="text-gray-700 dark:text-gray-400">Carregando...</span>
    </div>
  );
}
