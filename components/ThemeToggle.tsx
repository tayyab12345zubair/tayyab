"use client";

import { useState } from "react";

export default function ThemeToggleClient({ initialTheme }: { initialTheme: string }) {
  const [theme, setTheme] = useState<string>(initialTheme);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle"
      aria-label="Toggle Theme"
      style={{
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        background: "var(--surface)",
        color: "var(--text)",
        border: "1px solid var(--border)"
      }}
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}