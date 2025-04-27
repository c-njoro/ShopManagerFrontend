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
      className="p-2 rounded-md bg-card hover:bg-input transition-colors"
      aria-label="Toggle theme"
    >
      {isDarkTheme ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-blue-500" />
      )}
    </button>
  );
}
