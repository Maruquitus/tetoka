"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { faBars, faDove } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { useState, useEffect } from "react";
import { Menu } from "./Menu";
import { AuthenticatedUser } from "../interfaces";
import { checkAuthenticated, logOut } from "@/api/Auth";
import { Skeleton } from "./Skeleton";
import { Icon } from "./Icon";
import { usePathname } from "next/navigation";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isHome = pathname == "/home";
  const [loggedUser, setLoggedUser] = useState<
    undefined | null | AuthenticatedUser
  >();

  useEffect(() => {
    checkAuthenticated().then((data) => {
      const [isAuthenticated, user] = data;
      if (isAuthenticated) setLoggedUser(user);
      setLoading(false);
    });
  }, []);

  const handleLogOut = async () => {
    await logOut();
    document.location.href = "/";
  };

  return (
    <header className="bg-primary dark:bg-primary-dark px-4 h-20 w-full top-0 left-0 flex">
      <FontAwesomeIcon
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:invisible visible sm:absolute flex my-auto mr-4 cursor-pointer"
        size="lg"
        color="white"
        icon={faBars}
      />
      <Menu
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
        loggedUser={loggedUser}
        isHome={isHome}
        handleLogOut={handleLogOut}
      />
      <div className="w-full h-full flex my-auto text-2xl">
        <div
          onClick={() => (document.location.href = "/")}
          className="w-fit hover:scale-[102%] duration-300 transition-transform cursor-pointer flex"
        >
          <FontAwesomeIcon className="my-auto" color="white" icon={faDove} />
          <h1 className="font-medium text-black ml-2 my-auto">
            Te<span className="text-white font-medium">toka!</span>
          </h1>
        </div>
      </div>
      {loading && <Skeleton loading={loading} />}
      {!loading && !loggedUser && (
        <div className="gap-x-2 mr-4 hidden sm:flex">
          <Button
            onClick={() => (document.location.href = "/login")}
            className="my-auto"
            title="Entrar"
            type="hollow"
          />
          <Button
            onClick={() => (document.location.href = "/signup")}
            className="my-auto"
            title="Cadastrar"
            type="white"
          />
        </div>
      )}
      {!loading &&
        loggedUser &&
        (isHome ? (
          <div
            onClick={handleLogOut}
            className="text-lg md:flex hidden hover:scale-[102%] duration-300 transition-transform cursor-pointer mr-3 w-fit"
          >
            <Icon icon="arrow-right-from-bracket" className="my-auto h-5 w-5" />
            <h1 className="my-auto text-white font-medium">Sair</h1>
          </div>
        ) : (
          <div
            onClick={() => (document.location.href = "/home")}
            className="text-lg md:flex hidden mr-3 w-fit h-fit my-auto hover:scale-[102%] duration-300 transition-transform cursor-pointer"
          >
            <Icon icon="user" className="my-auto h-5 w-5" />
            <h1 className="my-auto text-white font-medium">
              {loggedUser.username}
            </h1>
          </div>
        ))}
      <ThemeSwitcher />
    </header>
  );
}
