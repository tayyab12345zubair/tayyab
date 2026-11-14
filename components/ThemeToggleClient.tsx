"use client";

import { useEffect, useState } from "react";

interface ThemeToggleClientProps {
  initialTheme?: string;
}

export default function ThemeToggleClient({ initialTheme = "dark" }: ThemeToggleClientProps) {
  const [dark, setDark] = useState(initialTheme === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      style={{ padding: "6px 12px", background: "#222", color: "#fff", border: "1px solid #444", borderRadius: "6px", cursor: "pointer" }}
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}