
"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    const isDark = savedTheme === "dark";

    setDark(isDark);
    document.documentElement.dataset.theme =
      isDark ? "dark" : "light";
  }, []);

  function toggleTheme() {
    const nextTheme = dark ? "light" : "dark";

    setDark(nextTheme === "dark");
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("app-theme", nextTheme);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
    >
      {dark ? "☀ Light Mode" : "☾ Dark Mode"}
    </button>
  );
}

