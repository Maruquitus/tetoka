"use client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      onClick={() => {
        if (theme === "light") setTheme("dark");
        else setTheme("light");
      }}
      className="h-full float-right w-10 flex align-middle"
    >
      <FontAwesomeIcon
        className="m-auto hover:scale-105 duration-300 cursor-pointer"
        color="white"
        size="xl"
        icon={theme === "dark" ? faMoon : faSun}
      />
    </div>
  );
}
