// src/hooks/useDarkMode.ts
import { useState, useEffect, useCallback } from "react";

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial = saved === "dark" || (!saved && prefersDark);

    setIsDarkMode(initial);

    // ✅ Apply theme immediately on mount
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;

      if (typeof window !== "undefined") {
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
      }

      return next;
    });
  }, []);

  return { isDarkMode, toggleDarkMode };
}
