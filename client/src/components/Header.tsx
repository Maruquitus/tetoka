"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { faBars, faDove } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { useState } from "react";
import { Menu } from "./Menu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary dark:bg-primary-dark px-4 h-20 w-full top-0 left-0 flex">
      <FontAwesomeIcon
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden flex my-auto mr-4 text-2xl"
        size="1x"
        color="white"
        icon={faBars}
      />
      <Menu setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
      <div className="w-full h-full flex my-auto text-2xl">
        <FontAwesomeIcon className="my-auto" color="white" icon={faDove} />
        <h1 className="font-medium ml-2 my-auto">
          Te<span className="text-white font-medium">toka!</span>
        </h1>
      </div>
      <div className="gap-x-2 mr-4 hidden sm:flex">
        <Button className="my-auto" title="Entrar" type="hollow" />
        <Button className="my-auto" title="Cadastrar" type="white" />
      </div>
      <ThemeSwitcher />
    </header>
  );
}
