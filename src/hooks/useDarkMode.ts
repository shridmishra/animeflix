import { useState, useEffect, useCallback } from "react";

export default function useDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("theme");
    const initial = saved === "dark"; // Default to light mode unless explicitly saved as dark

    setIsDarkMode(initial);

    // Apply theme immediately on mount
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