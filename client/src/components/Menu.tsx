"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { TabLink } from "./TabLink";

export function Menu(props: { menuOpen: boolean; setMenuOpen: Function }) {
  const [isClosing, setClosing] = useState(false);
  function close() {
    setClosing(true);
    setTimeout(() => {
      props.setMenuOpen(false);
      setClosing(false);
    }, 500);
  }
  if (!props.menuOpen) return null;
  return (
    <div
      onClick={() => close()}
      className={`backdrop-blur-lg z-0 ${
        isClosing ? "animate-fade-out" : "animate-fade-in"
      } fixed w-screen h-screen top-0 left-0`}
    >
      <nav
        onClick={(e) => e.stopPropagation()}
        className={`bg-primary ${
          isClosing ? "animate-slide-out" : "animate-slide-in"
        } dark:bg-primary-dark w-2/3 h-screen absolute`}
      >
        <FontAwesomeIcon
          onClick={() => close()}
          className="z-10 sm:hidden flex my-auto mt-6 ml-5 text-4xl"
          size="1x"
          color="white"
          icon={faXmark}
        />
        <ul className="ml-5 gap-y-8 mt-2">
          <TabLink icon={faDoorOpen} title="Entrar" />
          <TabLink icon={faUserPlus} title="Cadastrar" />
        </ul>
      </nav>
    </div>
  );
}
