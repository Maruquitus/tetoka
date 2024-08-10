"use client";
import { Button } from "@/components/Button";
import DoveSVG from "../../../public/dove.svg";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Title } from "@/components/Title";
import { Error } from "@/components/Error";

export default function Login() {
  const [passwordVisible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const err = queryParameters.get("error");
    if (err) setError(err);
  }, []);

  return (
    <main className="w-4/5 h-fit mx-auto">
      <div className="flex md:flex-row flex-col items-center mt-10 justify-center h-fit">
        <aside className="md:w-1/2 h-fit">
          <Title className="text-3xl mb-2">Bem vindo de volta!</Title>
          <div className="bg-foreground dark:bg-foreground-dark p-8 py-6 rounded-xl shadow-lg w-full max-w-md">
            <form
              className="space-y-4"
              method="POST"
              action="/api/auth/authenticate"
            >
              <div className="space-y-1  ">
                <label className="block text-dark dark:text-light text-sm font-medium">
                  Usuário
                </label>
                <input
                  name="username"
                  required
                  id="usuário"
                  className="w-full text-black font-sans h-10 bg-white shadow-sm rounded-md outline-0 font-medium p-3"
                  type="text"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-dark dark:text-light text-sm font-medium">
                  Senha
                </label>
                <input
                  name="password"
                  required
                  id="senha"
                  className="w-full text-black font-sans h-10 bg-white shadow-sm rounded-md outline-0 font-medium p-3"
                  type={passwordVisible ? "text" : "password"}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => setVisible(!passwordVisible)}
                />
                <label className="text-dark dark:text-light text-sm font-medium">
                  Mostrar senha
                </label>
              </div>
              <div className="flex justify-center">
                <Button title="Entrar" />
              </div>
            </form>
            {error && <Error title={error} />}
          </div>
        </aside>
        <div className="md:flex hidden justify-center ml-4 h-fit">
          <Image
            className="animate-flying h-4/5 transition-all duration-300"
            src={DoveSVG}
            alt=""
          />
        </div>
      </div>
    </main>
  );
}
