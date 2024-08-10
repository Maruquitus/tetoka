import { Button } from "@/components/Button";
import DoveSVG from "../../../public/dove.svg";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <form className="space-y-4" method="POST" action="/api/auth/authenticate">
        <div className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium">Nome completo</label>
            <input 
             name="name"
             required
             id="nome"
             className="w-full text-black font-sans h-10 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-3" 
             type="text"
             />

        </div>
          <div className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium">E-mail</label>
            <input
              name="e-mail"
              required
              id="e-mail"
              className="w-full text-black font-sans h-10 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-3"
              type="email"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium">Senha</label>
            <input
              name="password"
              required
              id="senha"
              className="w-full text-black font-sans h-10 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-3"
              type="password"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-gray-700 text-sm font-medium">Confirmar senha</label>
            <input
              name="confirmPassword"
              required
              id="confirmarsenha"
              className="w-full text-black font-sans h-10 bg-slate-100 shadow-sm rounded-md outline-0 font-medium p-3"
              type="password"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" />
            <label className="text-gray-700 text-sm font-medium">Mostrar senha</label>
          </div>
          <div className="flex justify-center">
            <Button title="Entrar" />
          </div>
        </form>
        </div>
        <div className="flex justify-center ml-4">
          <img src={DoveSVG}/>
      </div>
    </div>
  );
}
