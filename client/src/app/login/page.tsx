import { Button } from "@/components/Button";

export default function Login() {
  return (
    <form className="space-y-3" method="POST" action="/api/auth/authenticate">
      <div className="w-full row grid">
        <label className="text-gray-500 text-lg font-sans font-medium">
          Usuário
        </label>
        <input
          name="username"
          required
          id="usuário"
          className="text-black font-sans h-10 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-3"
          type="text"
        />
      </div>
      <div className="w-full row grid">
        <label className="text-gray-500 text-lg font-sans font-medium">
          Senha
        </label>
        <input
          name="password"
          required
          id="senha"
          className="text-black font-sans h-10 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-3"
          type="password"
        />
      </div>
      <div className="flex-row">
        <input type="checkbox" />
        <label className="text-gray-500 text-lg font-sans font-medium ml-1">
          Mostrar senha
        </label>
      </div>
      <div className="flex justify-center">
        <Button title="Entrar" />
      </div>
    </form>
  );
}
