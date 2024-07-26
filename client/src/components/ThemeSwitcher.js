"use client";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    }
  }, []);

  if (mounted) {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <div
      onClick={() => setDarkMode(!darkMode)}
      className="h-full float-right w-10 flex align-middle"
    >
      <FontAwesomeIcon
        className="m-auto hover:scale-105 duration-300 cursor-pointer"
        color="white"
        size="xl"
        icon={darkMode ? faMoon : faSun}
      />
    </div>
  );
}
