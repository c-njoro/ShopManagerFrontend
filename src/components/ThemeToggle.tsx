"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const initialIsDark =
        savedTheme === "dark" || (!savedTheme && prefersDark);
      setIsDarkTheme(initialIsDark);

      if (initialIsDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newIsDarkTheme = !isDarkTheme;
    setIsDarkTheme(newIsDarkTheme);

    if (newIsDarkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newIsDarkTheme ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-full transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkTheme ? (
        <div className="w-full h-max flex flex-row gap-4 items-center direction py-3 px-2 rounded-sm">
          <Sun className="h-5 w-5" />
          <p className="hidden md:flex">Theme</p>
        </div>
      ) : (
        <div className="w-full h-max flex flex-row gap-4 items-center direction py-3 px-2 rounded-sm">
          <Moon className="h-5 w-5 " />
          <p className="hidden md:flex">Theme</p>
        </div>
      )}
    </button>
  );
}
