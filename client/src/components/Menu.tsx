"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDoorOpen,
  faMountainSun,
  faUserPlus,
  faUser,
  faXmark,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { TabLink } from "./TabLink";
import { AuthenticatedUser } from "@/interfaces";

export function Menu(props: {
  menuOpen: boolean;
  setMenuOpen: Function;
  loggedUser?: AuthenticatedUser | null;
  isHome: boolean;
  handleLogOut: Function;
}) {
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
          className="z-10 sm:hidden cursor-pointer flex my-auto mt-6 ml-5"
          size="2x"
          color="white"
          icon={faXmark}
        />
        <ul className="ml-5 gap-y-8 mt-2">
          <TabLink
            onClick={() => (document.location.href = "/")}
            icon={faMountainSun}
            title="Início"
          />
          {!props.loggedUser && (
            <div>
              <TabLink
                onClick={() => (document.location.href = "/login")}
                icon={faDoorOpen}
                title="Entrar"
              />
              <TabLink
                onClick={() => (document.location.href = "/signup")}
                icon={faUserPlus}
                title="Cadastrar"
              />
            </div>
          )}
          {props.loggedUser &&
            (props.isHome ? (
              <TabLink
                onClick={props.handleLogOut}
                icon={faArrowRightFromBracket}
                title="Sair"
              />
            ) : (
              <TabLink
                onClick={() => (document.location.href = "/home")}
                icon={faUser}
                title={props.loggedUser ? props.loggedUser.username : "Usuário"}
              />
            ))}
        </ul>
      </nav>
    </div>
  );
}
